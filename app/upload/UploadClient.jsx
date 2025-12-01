'use client'

import { useState } from 'react'
import { uploadResume } from './actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UploadClient() {
    const router = useRouter()
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [analyzing, setAnalyzing] = useState(false)
    const [uploadedUrl, setUploadedUrl] = useState(null)

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                toast.error('Please select a PDF file')
                return
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB')
                return
            }
            setFile(selectedFile)
            setUploadedUrl(null)
        }
    }

    const handleAnalyze = async (fileUrl) => {
        setAnalyzing(true)
        toast.info('Extracting text from resume...')

        try {
            const extractResponse = await fetch('/api/extract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileUrl }),
            })

            if (!extractResponse.ok) {
                throw new Error('Failed to extract text from PDF')
            }

            const { text } = await extractResponse.json()
            toast.success('Text extracted successfully!')
            toast.info('Analyzing resume with AI...')

            const analyzeResponse = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            })

            if (!analyzeResponse.ok) {
                throw new Error('Failed to analyze resume')
            }

            const analysis = await analyzeResponse.json()
            toast.success('Analysis complete!')
            toast.info('Saving report...')

            const saveResponse = await fetch('/api/reports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resume_url: fileUrl,
                    resume_text: text,
                    score: analysis.score,
                    skills: analysis.skills,
                    missing_skills: analysis.missing_skills,
                    career_paths: analysis.career_path,
                    improvements: analysis.improvements,
                    summary: analysis.summary,
                }),
            })

            if (!saveResponse.ok) {
                throw new Error('Failed to save report')
            }

            toast.success('Report saved successfully! Redirecting to dashboard...')

            setTimeout(() => {
                router.push('/dashboard')
            }, 1000)

        } catch (error) {
            console.error('Analysis error:', error)
            toast.error(error.message || 'Failed to analyze resume')
        } finally {
            setAnalyzing(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!file) {
            toast.error('Please select a file')
            return
        }

        setUploading(true)
        const formData = new FormData()
        formData.append('resume', file)

        try {
            const result = await uploadResume(formData)

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Resume uploaded successfully!')
                setUploadedUrl(result.url)

                await handleAnalyze(result.url)
            }
        } catch (error) {
            toast.error('An unexpected error occurred')
        } finally {
            setUploading(false)
        }
    }

    const isProcessing = uploading || analyzing

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Upload Your Resume</h1>
                    <p className="text-muted-foreground text-lg">
                        Get instant AI-powered analysis and personalized recommendations
                    </p>
                </div>

                <Card className="shadow-xl">
                    <CardHeader>
                        <CardTitle>Resume Upload</CardTitle>
                        <CardDescription>
                            Upload your resume in PDF format (max 5MB) for AI analysis
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors bg-muted/30">
                                <input
                                    id="resume-upload"
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    disabled={isProcessing}
                                />
                                <label
                                    htmlFor="resume-upload"
                                    className="cursor-pointer flex flex-col items-center"
                                >
                                    <Upload className="h-16 w-16 text-muted-foreground mb-4" />
                                    <span className="text-lg font-medium mb-2">
                                        Click to upload or drag and drop
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        PDF files only (max 5MB)
                                    </span>
                                </label>
                            </div>

                            {file && (
                                <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
                                    <FileText className="h-10 w-10 text-primary flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{file.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    {uploadedUrl && (
                                        <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                                    )}
                                </div>
                            )}

                            {isProcessing && (
                                <div className="flex items-center gap-3 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                                    <div>
                                        <p className="font-medium text-blue-900 dark:text-blue-100">
                                            {uploading ? 'Uploading resume...' : 'Analyzing with AI...'}
                                        </p>
                                        <p className="text-sm text-blue-700 dark:text-blue-300">
                                            {uploading
                                                ? 'Please wait while we upload your file'
                                                : 'This may take a few moments'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={!file || isProcessing}
                                className="w-full"
                                size="lg"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        {uploading ? 'Uploading...' : 'Analyzing...'}
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-5 w-5" />
                                        Upload & Analyze Resume
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                What happens next?
                            </h3>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• Your resume will be uploaded securely to cloud storage</li>
                                <li>• AI will extract and analyze the content</li>
                                <li>• You'll receive a detailed report with scores and recommendations</li>
                                <li>• Results will be saved to your dashboard</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
