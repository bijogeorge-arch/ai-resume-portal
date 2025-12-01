-- Create analysis_reports table
CREATE TABLE IF NOT EXISTS analysis_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  resume_url TEXT,
  resume_text TEXT,
  score INTEGER,
  skills JSONB DEFAULT '[]'::jsonb,
  missing_skills JSONB DEFAULT '[]'::jsonb,
  career_paths JSONB DEFAULT '[]'::jsonb,
  improvements JSONB DEFAULT '[]'::jsonb,
  summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_analysis_reports_user_id ON analysis_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_reports_created_at ON analysis_reports(created_at DESC);

-- Enable Row Level Security
ALTER TABLE analysis_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own reports
CREATE POLICY "Users can view own reports"
  ON analysis_reports FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own reports
CREATE POLICY "Users can insert own reports"
  ON analysis_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own reports
CREATE POLICY "Users can update own reports"
  ON analysis_reports FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own reports
CREATE POLICY "Users can delete own reports"
  ON analysis_reports FOR DELETE
  USING (auth.uid() = user_id);
