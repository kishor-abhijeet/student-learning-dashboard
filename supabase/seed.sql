create extension if not exists "pgcrypto";

create table if not exists public.dashboard_profile (
  id uuid primary key default gen_random_uuid(),
  sidebar_label text not null,
  sidebar_brand text not null,
  focus_title text not null,
  focus_description text not null,
  student_name text not null,
  welcome_label text not null,
  eyebrow text not null,
  headline text not null,
  description text not null,
  streak_days integer not null check (streak_days >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.dashboard_stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  delta text not null,
  icon_name text not null,
  sort_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.dashboard_copy (
  key text primary key,
  value text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  icon_name text not null,
  sort_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  sort_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.quick_actions (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  icon_name text not null,
  sort_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.upcoming_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_time text not null,
  icon_name text not null,
  sort_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.activity_metrics (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  sort_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.learning_activity_days (
  id uuid primary key default gen_random_uuid(),
  activity_date date not null unique,
  sessions integer not null check (sessions >= 0 and sessions <= 4),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.dashboard_profile add column if not exists sidebar_label text not null default 'Student OS';
alter table public.dashboard_profile add column if not exists sidebar_brand text not null default 'LearnFlow';
alter table public.dashboard_profile add column if not exists focus_title text not null default 'Weekly focus';
alter table public.dashboard_profile add column if not exists focus_description text not null default 'Ship the System Design module and keep the 18-day streak alive.';
alter table public.dashboard_profile add column if not exists student_name text not null default 'Abhijeet';
alter table public.dashboard_profile add column if not exists welcome_label text not null default 'Welcome back';
alter table public.dashboard_profile add column if not exists eyebrow text not null default 'AI-curated learning path';
alter table public.dashboard_profile add column if not exists headline text not null default 'Your next skill leap is already queued.';
alter table public.dashboard_profile add column if not exists description text not null default 'Continue your focused track, protect your streak, and turn today''s session into measurable progress.';
alter table public.dashboard_profile add column if not exists streak_days integer not null default 18;

alter table public.dashboard_stats add column if not exists icon_name text not null default 'Clock3';
alter table public.dashboard_stats add column if not exists sort_order integer not null default 0;
alter table public.courses add column if not exists icon_name text not null default 'BookOpen';
alter table public.courses add column if not exists sort_order integer not null default 0;
alter table public.quick_actions add column if not exists icon_name text not null default 'PlayCircle';
alter table public.quick_actions add column if not exists sort_order integer not null default 0;
alter table public.upcoming_events add column if not exists icon_name text not null default 'Video';
alter table public.upcoming_events add column if not exists sort_order integer not null default 0;
alter table public.activity_metrics add column if not exists sort_order integer not null default 0;
alter table public.navigation_items add column if not exists icon_name text not null default 'LayoutDashboard';
alter table public.navigation_items add column if not exists sort_order integer not null default 0;

alter table public.dashboard_profile enable row level security;
alter table public.dashboard_stats enable row level security;
alter table public.dashboard_copy enable row level security;
alter table public.navigation_items enable row level security;
alter table public.courses enable row level security;
alter table public.quick_actions enable row level security;
alter table public.upcoming_events enable row level security;
alter table public.activity_metrics enable row level security;
alter table public.learning_activity_days enable row level security;

drop policy if exists "Allow public dashboard profile read" on public.dashboard_profile;
drop policy if exists "Allow public dashboard stats read" on public.dashboard_stats;
drop policy if exists "Allow public dashboard copy read" on public.dashboard_copy;
drop policy if exists "Allow public navigation items read" on public.navigation_items;
drop policy if exists "Allow public courses read" on public.courses;
drop policy if exists "Allow public quick actions read" on public.quick_actions;
drop policy if exists "Allow public upcoming events read" on public.upcoming_events;
drop policy if exists "Allow public activity metrics read" on public.activity_metrics;
drop policy if exists "Allow public activity days read" on public.learning_activity_days;

create policy "Allow public dashboard profile read"
  on public.dashboard_profile for select
  using (true);

create policy "Allow public dashboard stats read"
  on public.dashboard_stats for select
  using (true);

create policy "Allow public dashboard copy read"
  on public.dashboard_copy for select
  using (true);

create policy "Allow public navigation items read"
  on public.navigation_items for select
  using (true);

create policy "Allow public courses read"
  on public.courses for select
  using (true);

create policy "Allow public quick actions read"
  on public.quick_actions for select
  using (true);

create policy "Allow public upcoming events read"
  on public.upcoming_events for select
  using (true);

create policy "Allow public activity metrics read"
  on public.activity_metrics for select
  using (true);

create policy "Allow public activity days read"
  on public.learning_activity_days for select
  using (true);

truncate table
  public.dashboard_profile,
  public.dashboard_stats,
  public.dashboard_copy,
  public.navigation_items,
  public.courses,
  public.quick_actions,
  public.upcoming_events,
  public.activity_metrics,
  public.learning_activity_days
restart identity;

insert into public.dashboard_profile (
  sidebar_label,
  sidebar_brand,
  focus_title,
  focus_description,
  student_name,
  welcome_label,
  eyebrow,
  headline,
  description,
  streak_days
) values (
  'Student Dashboard',
  'LearnFlow',
  'Weekly focus',
  'Ship the System Design module and keep the 18-day streak alive.',
  'Abhijeet',
  'Welcome back',
  'AI-curated learning path',
  'Your next skill leap is already queued.',
  'Continue your focused track, protect your streak, and turn today''s session into measurable progress.',
  18
);

insert into public.dashboard_stats (label, value, delta, icon_name, sort_order)
values
  ('Hours Learned', '128h', '+12.4%', 'Clock3', 1),
  ('Certificates', '09', '+2 this mo.', 'Award', 2),
  ('Goal Completion', '82%', '+8.1%', 'Target', 3),
  ('Study Groups', '14', '3 active', 'UsersRound', 4);

insert into public.dashboard_copy (key, value)
values
  ('hero_streak_label', 'Learning streak'),
  ('hero_active_courses_label', 'Active courses'),
  ('hero_average_progress_label', 'Average progress'),
  ('hero_streak_suffix', 'days'),
  ('courses_eyebrow', 'Curriculum'),
  ('courses_title', 'Continue Learning'),
  ('course_button_label', 'Continue Learning'),
  ('active_tracks_label', 'active tracks'),
  ('quick_actions_title', 'Quick Actions'),
  ('upcoming_title', 'Upcoming'),
  ('activity_eyebrow', 'Learning Activity'),
  ('activity_title', 'Session consistency');

insert into public.navigation_items (label, icon_name, sort_order)
values
  ('Dashboard', 'LayoutDashboard', 1),
  ('Courses', 'BookOpen', 2),
  ('Analytics', 'BarChart3', 3),
  ('Settings', 'Settings', 4);

insert into public.courses (title, progress, icon_name, sort_order)
values
  ('Advanced React Patterns', 75, 'Atom', 1),
  ('System Design', 50, 'Network', 2),
  ('Node.js Mastery', 90, 'ServerCog', 3),
  ('TypeScript Deep Dive', 65, 'Braces', 4);

insert into public.quick_actions (label, icon_name, sort_order)
values
  ('Resume last session', 'PlayCircle', 1),
  ('Bookmarked lessons', 'Bookmark', 2),
  ('Offline downloads', 'Download', 3);

insert into public.upcoming_events (title, event_time, icon_name, sort_order)
values
  ('React performance lab', 'Today, 6:30 PM', 'Video', 1),
  ('System design cohort', 'Tomorrow, 7:00 PM', 'Video', 2),
  ('TypeScript office hours', 'Fri, 5:00 PM', 'CalendarClock', 3);

insert into public.activity_metrics (label, value, sort_order)
values
  ('Total Sessions', '186', 1),
  ('Avg per week', '9.4', 2),
  ('Best Week', '17', 3),
  ('Current Streak', '18d', 4);

insert into public.learning_activity_days (activity_date, sessions)
select
  date '2026-03-09' + day_index,
  greatest(0, least(4, round(2 + sin(day_index * 0.75) + cos(day_index * 0.31))::integer))
from generate_series(0, 83) as day_index;
