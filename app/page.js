import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Sparkles, Target, TrendingUp, Shield, CheckCircle2, Zap, FileText } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary overflow-hidden">

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-secondary text-secondary-foreground text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AI-Powered Resume Intelligence
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Build a resume that <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
              gets you hired.
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up leading-relaxed" style={{ animationDelay: '200ms' }}>
            Unlock the power of AI to analyze, optimize, and perfect your resume.
            Get instant feedback and stand out from the competition.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '300ms' }}>
            <Link href="/signup">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all hover:scale-105">
                Analyze My Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-secondary/50 transition-all">
                View Sample Report
              </Button>
            </Link>
          </div>

          {/* Hero Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-border/50 pt-10 animate-fade-up" style={{ animationDelay: '400ms' }}>
            {[
              { label: 'Resumes Analyzed', value: '10k+' },
              { label: 'Success Rate', value: '92%' },
              { label: 'Time Saved', value: '5hrs' },
              { label: 'User Rating', value: '4.9/5' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ResumeAI?</h2>
            <p className="text-muted-foreground text-lg">
              We use advanced algorithms to ensure your resume passes ATS systems and catches recruiters' eyes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Target,
                title: "ATS Optimization",
                desc: "Ensure your resume gets past automated screening software with our ATS-friendly checks.",
                color: "text-blue-500",
                bg: "bg-blue-500/10"
              },
              {
                icon: Zap,
                title: "Instant Feedback",
                desc: "Get detailed, actionable insights on your resume's content, formatting, and impact in seconds.",
                color: "text-amber-500",
                bg: "bg-amber-500/10"
              },
              {
                icon: TrendingUp,
                title: "Career Growth",
                desc: "Receive personalized suggestions to highlight your achievements and boost your career trajectory.",
                color: "text-green-500",
                bg: "bg-green-500/10"
              }
            ].map((feature, i) => (
              <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <div className={`h-14 w-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Simple steps to your <br />
                <span className="text-primary">dream job.</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Upload Your Resume", desc: "Drag and drop your PDF resume into our secure analyzer." },
                  { title: "AI Analysis", desc: "Our advanced AI scans for keywords, formatting, and impact." },
                  { title: "Get Results", desc: "Receive a detailed score and actionable improvements instantly." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/signup">
                <Button size="lg" className="mt-4 rounded-full px-8">
                  Start Now
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-3xl blur-2xl -z-10"></div>
              <div className="bg-card border rounded-3xl p-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-8 w-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">
                      92/100
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-100 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                    <div className="h-4 w-4/6 bg-gray-100 rounded"></div>
                  </div>
                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="h-2 w-12 bg-blue-200 rounded mb-2"></div>
                      <div className="h-4 w-8 bg-blue-300 rounded"></div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="h-2 w-12 bg-purple-200 rounded mb-2"></div>
                      <div className="h-4 w-8 bg-purple-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-primary px-6 py-20 text-center md:px-20">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-blue-900"></div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Ready to transform your career?
              </h2>
              <p className="text-blue-100 text-xl max-w-2xl mx-auto">
                Join thousands of professionals who have optimized their resumes and landed better jobs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full shadow-lg hover:scale-105 transition-transform">
                    Get Started for Free
                  </Button>
                </Link>
              </div>
              <p className="text-blue-200 text-sm mt-6">
                No credit card required • Free analysis included
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
