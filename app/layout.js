import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "ResumeAI - AI-Powered Resume Analysis",
  description: "Get instant AI-powered feedback on your resume with personalized insights and recommendations",
};

export default async function RootLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Navbar user={user} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
