-- =============================================
-- Supabase Migration: File-based → Database
-- Run this SQL in Supabase SQL Editor
-- =============================================

-- Posts table (blog)
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Experiences table
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  employment_type TEXT DEFAULT 'Full-time',
  location TEXT,
  logo TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT,
  description TEXT NOT NULL DEFAULT '',
  technologies TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image TEXT,
  technologies TEXT[] DEFAULT '{}',
  url TEXT,
  github TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contacts table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- Supabase Storage: Create 'uploads' bucket
-- Go to Storage in Supabase Dashboard → New Bucket
-- Name: uploads
-- Public: Yes
-- =============================================

-- Helper RPC: increment sort_order for experiences (push all down by 1)
CREATE OR REPLACE FUNCTION increment_experience_sort_order()
RETURNS void AS $$
BEGIN
  UPDATE experiences SET sort_order = sort_order + 1;
END;
$$ LANGUAGE plpgsql;

-- Helper RPC: increment sort_order for projects (push all down by 1)
CREATE OR REPLACE FUNCTION increment_project_sort_order()
RETURNS void AS $$
BEGIN
  UPDATE projects SET sort_order = sort_order + 1;
END;
$$ LANGUAGE plpgsql;
