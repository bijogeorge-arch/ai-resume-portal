import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const supabase = await createClient()

        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json(
                { error: 'User not authenticated' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const {
            resume_url,
            resume_text,
            score,
            skills,
            missing_skills,
            career_paths,
            improvements,
            summary,
        } = body

        if (!resume_text || score === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields: resume_text and score' },
                { status: 400 }
            )
        }

        const { data, error } = await supabase
            .from('analysis_reports')
            .insert({
                user_id: user.id,
                resume_url: resume_url || null,
                resume_text,
                score,
                skills: skills || [],
                missing_skills: missing_skills || [],
                career_paths: career_paths || [],
                improvements: improvements || [],
                summary: summary || null,
            })
            .select()
            .single()

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: 'Failed to save analysis report' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('Save report error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET(request) {
    try {
        const supabase = await createClient()

        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json(
                { error: 'User not authenticated' },
                { status: 401 }
            )
        }

        const { data, error } = await supabase
            .from('analysis_reports')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ data: null })
            }
            console.error('Database error:', error)
            return NextResponse.json(
                { error: 'Failed to fetch analysis report' },
                { status: 500 }
            )
        }

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Fetch report error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
