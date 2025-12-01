'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signout } from '@/app/auth/actions'
import { LogOut, LayoutDashboard, Upload, FileText, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navbar({ user }) {
    const pathname = usePathname()

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/upload', label: 'Upload Resume', icon: Upload },
    ]

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="group flex items-center gap-2 transition-opacity hover:opacity-90">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-110">
                            <FileText className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            ResumeAI
                        </span>
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-6">
                            <div className="hidden md:flex items-center gap-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon
                                    const isActive = pathname === item.href
                                    return (
                                        <Link key={item.href} href={item.href}>
                                            <Button
                                                variant={isActive ? 'secondary' : 'ghost'}
                                                className={cn(
                                                    'gap-2 transition-all duration-200',
                                                    isActive && 'bg-secondary text-secondary-foreground shadow-sm',
                                                    !isActive && 'hover:bg-muted hover:text-foreground'
                                                )}
                                            >
                                                <Icon className="h-4 w-4" />
                                                {item.label}
                                            </Button>
                                        </Link>
                                    )
                                })}
                            </div>

                            <div className="flex items-center gap-4 border-l pl-4">
                                <div className="hidden sm:block text-right">
                                    <p className="text-sm font-medium leading-none">{user.email}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Free Plan</p>
                                </div>
                                <form action={signout}>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive transition-colors">
                                        <LogOut className="h-5 w-5" />
                                        <span className="sr-only">Logout</span>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/login">
                                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button className="gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105">
                                    Get Started
                                    <Sparkles className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
