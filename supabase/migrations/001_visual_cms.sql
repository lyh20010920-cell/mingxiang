-- Visual CMS Database Migration
-- Run this SQL in Supabase SQL Editor to create the page_components table

-- Create page_components table for visual CMS
CREATE TABLE IF NOT EXISTS page_components (
  id SERIAL PRIMARY KEY,
  page_slug TEXT NOT NULL,
  component_type TEXT NOT NULL,
  title TEXT DEFAULT '',
  content JSONB DEFAULT '{}'::jsonb,
  order_index INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_page_components_slug ON page_components(page_slug);
CREATE INDEX IF NOT EXISTS idx_page_components_order ON page_components(page_slug, order_index);

-- Enable RLS
ALTER TABLE page_components ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON page_components
  FOR SELECT USING (true);

-- Allow service role full access
CREATE POLICY "Allow service role full access" ON page_components
  FOR ALL USING (auth.role() = 'service_role');

-- Create storage bucket for images if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-images', 'cms-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public image access
CREATE POLICY "Public can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'cms-images');

-- Create storage policy for authenticated uploads
CREATE POLICY "Authenticated can upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'cms-images' AND auth.role() = 'authenticated');
