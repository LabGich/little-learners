-- Run this in the Supabase SQL Editor after creating your project.
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  score integer not null default 0 check (score >= 0),
  total integer not null default 0 check (total >= 0),
  completed_at timestamptz not null,
  primary key (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "Users can read their own progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
