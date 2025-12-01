import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: report } = await supabase
        .from('analysis_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    const analysisData = report ? {
        score: report.score,
        skills: report.skills || [],
        missing_skills: report.missing_skills || [],
        career_path: report.career_paths || [],
        summary: report.summary,
        improvements: report.improvements || []
    } : null

    return <DashboardClient initialData={analysisData} />
}
