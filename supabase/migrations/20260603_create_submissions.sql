create table public.submissions (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  first_name  text        not null,
  last_name   text        not null,
  email       text        not null,
  phone       text,
  service     text,
  message     text
);

alter table public.submissions enable row level security;
