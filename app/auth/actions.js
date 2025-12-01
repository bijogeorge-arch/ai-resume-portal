'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        console.error('Login error:', error)
        redirect('/login?error=Could not authenticate user')
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signup(formData) {
    const supabase = await createClient()
    const origin = (await headers()).get('origin')

    const email = formData.get('email')
    const password = formData.get('password')

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        console.error('Signup error:', error)
        return redirect('/signup?error=Could not authenticate user')
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard?message=Check email to continue sign in process')
}

export async function signout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}
