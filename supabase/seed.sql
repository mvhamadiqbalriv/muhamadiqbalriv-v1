-- =============================================
-- Supabase Seed Data (from previous file-based content)
-- Run after migration.sql
-- =============================================

BEGIN;

TRUNCATE TABLE posts, experiences, projects, contacts;

INSERT INTO posts (slug, title, description, date, tags, published, content)
VALUES
  (
    'hello-world',
    $$Hello World - My First Blog$$,
    $$Welcome to my personal website. This is my first blog post written using MDX.$$,
    DATE '2026-03-15',
    ARRAY['intro', 'nextjs', 'mdx']::TEXT[],
    true,
    $$## Welcome! 👋

This is my first blog post on this personal website. This website was built using modern technologies:

- **Next.js** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **MDX** - Markdown with JSX support
- **Supabase** - Backend as a Service

## Why MDX?

MDX allows us to write blogs in the familiar Markdown format, but with the ability to add React components inside.

### Code Example

```typescript
const greeting = "Hello, World!";
console.log(greeting);
```

### Example List

1. Easy to write
2. Supports syntax highlighting
3. Can embed React components
4. SEO friendly

## What's Next?

I will continue writing about my experiences in software development. Stay tuned!

---

Thanks for reading! 🚀$$
  ),
  (
    'setup-personal-website',
    $$Setting Up a Personal Website with Next.js and Supabase$$,
    $$A brief guide on how I built this personal website using Next.js, Tailwind CSS, MDX, and Supabase.$$,
    DATE '2026-03-15',
    ARRAY['tutorial', 'nextjs', 'supabase', 'tailwind']::TEXT[],
    true,
    $$## Tech Stack

This website was built with the following tech stack:

### Frontend
- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling

### Content
- **MDX** for blog posts
- **gray-matter** for parsing frontmatter
- **rehype-pretty-code** for syntax highlighting

### Backend
- **Supabase** for database and authentication

## Project Structure

```
├── content/
│   └── blog/          # MDX blog posts
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # React components
│   └── lib/           # Utilities & configs
└── public/            # Static assets
```

## Features

- ✅ Blog with MDX
- ✅ Syntax highlighting
- ✅ Reading time
- ✅ Responsive design
- ✅ Dark mode support
- ✅ SEO friendly

Hope this helps!$$
  );

INSERT INTO experiences (
  company,
  position,
  employment_type,
  location,
  logo,
  start_date,
  end_date,
  description,
  technologies,
  sort_order
)
VALUES
  -- HashMicro: 2 positions (grouped)
  (
    'HashMicro',
    'Development Team Lead',
    'Full-time',
    'Remote',
    NULL,
    '2025-05',
    NULL,
    $$Contributed to and supported the development of several key projects, including Hashy (AI Agent), TMS (Tracking Management System), DMS (Document Management System), Booking Apps, and more.$$,
    ARRAY['Leading Development Teams', 'Development Coordination', 'Laravel', 'PHP', 'MySQL', 'Code Review', 'Sprint Planning', 'Architecture']::TEXT[],
    0
  ),
  (
    'HashMicro',
    'Laravel Developer',
    'Contract',
    'Jakarta, Indonesia',
    NULL,
    '2023-05',
    '2025-04',
    $$Developed and maintained a robust middleware system connecting enterprise accounting platforms with major Indonesian banking systems (BCA, Permata, CIMB, Mandiri, and others), enabling secure and seamless financial data integration.$$,
    ARRAY['Laravel', 'Web Services API', 'PHP', 'MySQL', 'Middleware', 'REST API']::TEXT[],
    1
  ),
  -- Giza Lab
  (
    'Giza Lab',
    'Web Developer',
    'Contract',
    'Bandung, West Java, Indonesia · Remote',
    NULL,
    '2023-03',
    '2023-05',
    $$Developed and maintained a comprehensive Learning Management System (LMS) platform called Mentify, designed to enhance online education through an intuitive user experience, automated course management.$$,
    ARRAY['Laravel']::TEXT[],
    2
  ),
  -- IM Creative Studio: 2 positions (grouped)
  (
    'IM Creative Studio',
    'Lead Fullstack Developer',
    'Full-time',
    'Sumedang, West Java, Indonesia',
    NULL,
    '2022-06',
    '2023-12',
    $$Led development of company profile websites for RSUD Kab. Sumedang and UMKM systems with features like UMKM management, catalog management, and geomaps. Mentored junior developers and managed project timelines.$$,
    ARRAY['Laravel', 'Vue.js', 'MySQL', 'Leadership', 'GeoMaps']::TEXT[],
    3
  ),
  (
    'IM Creative Studio',
    'Fullstack Developer',
    'Full-time',
    'Sumedang, West Java, Indonesia',
    NULL,
    '2022-01',
    '2022-05',
    $$Developed and maintained mobile apps SIMPATI JITU with features like health care management, baby measurement management, and integration with Minister Health (ASIK/SATU SEHAT).$$,
    ARRAY['Flutter', 'Laravel', 'REST API', 'Health System']::TEXT[],
    4
  ),
  -- Diskominfosanditik: 2 positions (grouped)
  (
    'Diskominfosanditik Kab. Sumedang',
    'Senior Programmer',
    'Contract',
    'Sumedang, West Java, Indonesia',
    NULL,
    '2022-06',
    '2023-12',
    $$Led the development of super apps E-Office including SIMANJA (Sistem Analisis Jabatan) and SIKOMPLIT (Sistem Informasi Kompilasi Inovasi Terintegrasi). Coordinated with multiple government departments for requirements gathering.$$,
    ARRAY['Laravel', 'Vue.js', 'PostgreSQL', 'E-Office']::TEXT[],
    5
  ),
  (
    'Diskominfosanditik Kab. Sumedang',
    'Programmer',
    'Contract',
    'Sumedang, West Java, Indonesia',
    NULL,
    '2021-01',
    '2022-05',
    $$Developed and maintained the official Sumedang government website. Built initial versions of internal government systems and dashboards.$$,
    ARRAY['PHP', 'MySQL', 'Bootstrap', 'Government System']::TEXT[],
    6
  ),
  -- NOIU TECH
  (
    'NOIU TECH',
    'Project Manager',
    'Freelance',
    'Remote',
    NULL,
    '2022-01',
    '2023-12',
    $$Developed and maintained E-Office United in Diversity with features like employee management, leave request, attendance, etc.$$,
    ARRAY['Project Management', 'E-Office', 'HR System']::TEXT[],
    7
  );

INSERT INTO projects (
  title,
  description,
  image,
  technologies,
  url,
  github,
  featured,
  sort_order
)
VALUES
  (
    $$Personal Website$$,
    $$Personal website and blog built with Next.js, Tailwind CSS, and MDX.$$,
    '/uploads/images/1773551538273-20916c1b.jpg',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX']::TEXT[],
    'https://muhamadiqbalriv.com',
    'https://github.com/muhamadiqbalriv/muhamadiqbalriv-v1',
    true,
    0
  ),
  (
    $$Task Manager App$$,
    $$A task management app with drag-and-drop and real-time collaboration features.$$,
    '/uploads/images/1773551559910-6bf18bad.jpg',
    ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB']::TEXT[],
    NULL,
    'https://github.com/muhamadiqbalriv/task-manager',
    true,
    1
  ),
  (
    $$E-Commerce Platform$$,
    $$An e-commerce platform with payment gateway and inventory management system.$$,
    NULL,
    ARRAY['Laravel', 'Vue.js', 'MySQL', 'Midtrans']::TEXT[],
    NULL,
    NULL,
    false,
    2
  );

COMMIT;
