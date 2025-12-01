'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import {
    TrendingUp,
    Award,
    Target,
    Lightbulb,
    RefreshCw,
    CheckCircle2,
    XCircle,
    Briefcase,
    FileText
} from 'lucide-react'

export default function DashboardClient({ initialData }) {
    const [analysis, setAnalysis] = useState(initialData)
    const [loading, setLoading] = useState(false)

    const handleReanalyze = async () => {
        setLoading(true)
        toast.info('Re-analyzing your resume...')

        try {
            const response = await fetch('/api/reports')
            const { data } = await response.json()

            if (data) {
                setAnalysis({
                    score: data.score,
                    skills: data.skills || [],
                    missing_skills: data.missing_skills || [],
                    career_path: data.career_paths || [],
                    summary: data.summary,
                    improvements: data.improvements || []
                })
                toast.success('Dashboard refreshed!')
            } else {
                toast.info('No analysis found. Please upload and analyze a resume first.')
            }
        } catch (error) {
            toast.error('Failed to refresh dashboard')
        } finally {
            setLoading(false)
        }
    }

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600'
        if (score >= 60) return 'text-yellow-600'
        return 'text-red-600'
    }

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent'
        if (score >= 60) return 'Good'
        return 'Needs Improvement'
    }

    if (!analysis) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6 animate-fade-in">
                <div className="text-center space-y-6 max-w-md">
                    <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <FileText className="h-12 w-12 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">No Resume Analysis Yet</h2>
                        <p className="text-muted-foreground">
                            Upload your resume to get started with AI-powered analysis and insights.
                        </p>
                    </div>
                    <Button size="lg" onClick={() => window.location.href = '/upload'} className="w-full">
                        Upload Resume
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background p-6 animate-fade-in">
            <div className="container mx-auto space-y-8 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Resume Analysis</h1>
                        <p className="text-muted-foreground mt-1">
                            AI-powered insights to improve your resume
                        </p>
                    </div>
                    <Button
                        onClick={handleReanalyze}
                        disabled={loading}
                        variant="outline"
                        className="gap-2"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Refreshing...' : 'Refresh Dashboard'}
                    </Button>
                </div>

                <Card className="border-none shadow-lg bg-gradient-to-br from-background to-secondary/20 animate-fade-up" style={{ animationDelay: '100ms' }}>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Award className="h-6 w-6 text-primary" />
                                    Overall Score
                                </CardTitle>
                                <CardDescription>Based on ATS standards and best practices</CardDescription>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <div className={`text-5xl font-bold tracking-tighter ${getScoreColor(analysis?.score || 0)}`}>
                                        {analysis?.score || 0}
                                    </div>
                                    <Badge variant={analysis?.score >= 80 ? 'default' : 'secondary'} className="mt-1">
                                        {getScoreLabel(analysis?.score || 0)}
                                    </Badge>
                                </div>
                                <Progress value={analysis?.score || 0} className="w-[100px] md:w-[200px] h-3" />
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {analysis?.summary && (
                    <Card className="shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '200ms' }}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lightbulb className="h-5 w-5 text-amber-500" />
                                Profile Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {analysis.summary}
                            </p>
                        </CardContent>
                    </Card>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '300ms' }}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                Identified Skills
                            </CardTitle>
                            <CardDescription>
                                {analysis?.skills?.length || 0} skills found in your resume
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {analysis?.skills?.length > 0 ? (
                                    analysis.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="px-3 py-1">
                                            {skill}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground italic">No skills identified</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '400ms' }}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <XCircle className="h-5 w-5 text-red-500" />
                                Missing Skills
                            </CardTitle>
                            <CardDescription>
                                Skills that could strengthen your resume
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {analysis?.missing_skills?.length > 0 ? (
                                    analysis.missing_skills.map((skill, index) => (
                                        <Badge key={index} variant="outline" className="px-3 py-1 border-red-200 text-red-700 bg-red-50 hover:bg-red-100 hover:border-red-300 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900">
                                            {skill}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground italic">No suggestions</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {analysis?.career_path && analysis.career_path.length > 0 && (
                    <Card className="shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '500ms' }}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-blue-500" />
                                Suggested Career Paths
                            </CardTitle>
                            <CardDescription>
                                Roles that match your profile
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                {analysis.career_path.map((path, index) => (
                                    <div
                                        key={index}
                                        className="p-4 border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                <TrendingUp className="h-4 w-4" />
                                            </div>
                                            <span className="font-medium">{path}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {analysis?.improvements && analysis.improvements.length > 0 && (
                    <Card className="shadow-md hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: '600ms' }}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-purple-500" />
                                Recommended Improvements
                            </CardTitle>
                            <CardDescription>
                                Action items to enhance your resume
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {analysis.improvements.map((improvement, index) => (
                                    <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                                        <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                        <span className="text-muted-foreground leading-relaxed">{improvement}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
