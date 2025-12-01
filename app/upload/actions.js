'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function uploadResume(formData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'User not authenticated' }
    }

    const file = formData.get('resume')

    if (!file || !(file instanceof File)) {
        return { error: 'No file provided' }
    }

    if (file.type !== 'application/pdf') {
        return { error: 'Only PDF files are allowed' }
    }

    if (file.size > 5 * 1024 * 1024) {
        return { error: 'File size must be less than 5MB' }
    }

    const fileExt = 'pdf'
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    const filePath = `${user.id}/${fileName}`

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        })

    if (uploadError) {
        return { error: `Upload failed: ${uploadError.message}` }
    }

    const {
        data: { publicUrl },
    } = supabase.storage.from('resumes').getPublicUrl(filePath)

    const { error: dbError } = await supabase
        .from('profiles')
        .upsert(
            {
                user_id: user.id,
                resume_url: publicUrl,
                resume_filename: file.name,
                updated_at: new Date().toISOString(),
            },
            {
                onConflict: 'user_id',
            }
        )

    if (dbError) {
        return { error: `Database error: ${dbError.message}` }
    }

    revalidatePath('/upload')
    return { success: true, url: publicUrl }
}
