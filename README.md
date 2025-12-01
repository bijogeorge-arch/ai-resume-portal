# AI Resume Analyzer

An intelligent resume analysis application built with Next.js that uses Google's Gemini AI to provide comprehensive feedback on resumes.

## Features

- 🔐 **User Authentication** - Secure signup/login with Supabase
- 📄 **PDF Resume Upload** - Upload and store resumes in Supabase Storage
- 🤖 **AI-Powered Analysis** - Get detailed feedback using Google Gemini AI
- 📊 **Resume Scoring** - Receive a comprehensive score for your resume
- 💡 **Skill Analysis** - Identify existing skills and get suggestions for missing ones
- 🎯 **Career Path Recommendations** - Get personalized career suggestions
- 📈 **Improvement Suggestions** - Receive actionable feedback to enhance your resume
- 📱 **Responsive Design** - Beautiful UI that works on all devices

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4 + ShadCN UI
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **AI:** Google Generative AI (Gemini)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account ([supabase.com](https://supabase.com))
- Google AI API key ([aistudio.google.com](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd new
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Generative AI
GEMINI_API_KEY=your_gemini_api_key
```

4. **Set up Supabase Database**

Run the SQL schema in your Supabase SQL Editor:
```bash
# Copy contents from supabase_schema.sql and run in Supabase Dashboard
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── analyze/       # AI resume analysis endpoint
│   │   ├── extract/       # PDF text extraction endpoint
│   │   └── reports/       # Resume reports management
│   ├── auth/              # Authentication callback
│   ├── dashboard/         # User dashboard
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   └── upload/            # Resume upload page
├── components/            # React components
│   └── ui/               # ShadCN UI components
├── lib/                  # Utility libraries
│   └── supabase/         # Supabase client configuration
├── utils/                # Helper functions
└── public/               # Static assets
```

## Deployment

### Deploy to Vercel (Recommended)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**Important:** After deployment, update your Supabase redirect URLs to include your Vercel domain.

## Environment Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |
| `GEMINI_API_KEY` | Google AI API key | [Google AI Studio](https://aistudio.google.com/app/apikey) |

## Usage

1. **Sign Up/Login** - Create an account or login
2. **Upload Resume** - Upload your PDF resume
3. **Get Analysis** - AI analyzes your resume and provides feedback
4. **View Results** - See your score, skills, and recommendations
5. **Download Report** - Save the analysis for future reference

## Features in Detail

### AI Analysis Includes:
- Overall resume score (0-100)
- Identified skills from your resume
- Suggested skills to add
- Career path recommendations
- Major improvement suggestions
- Detailed feedback on formatting and content

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Google AI Documentation](https://ai.google.dev/docs)
- [ShadCN UI](https://ui.shadcn.com/)

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

