create table if not exists profielen (
  id uuid primary key references auth.users(id) on delete cascade,
  standaard_leeftijd int,
  standaard_wijk text,
  bijgewerkt_op timestamptz default now()
);
alter table profielen enable row level security;
create policy "eigen profiel select" on profielen for select using (auth.uid() = id);
create policy "eigen profiel upsert" on profielen for insert with check (auth.uid() = id);
create policy "eigen profiel update" on profielen for update using (auth.uid() = id);

create table if not exists opgeslagen_activiteiten (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activiteit_id text not null,
  aangemaakt_op timestamptz default now(),
  unique (user_id, activiteit_id)
);
alter table opgeslagen_activiteiten enable row level security;
create policy "eigen opgeslagen select" on opgeslagen_activiteiten for select using (auth.uid() = user_id);
create policy "eigen opgeslagen insert" on opgeslagen_activiteiten for insert with check (auth.uid() = user_id);
create policy "eigen opgeslagen delete" on opgeslagen_activiteiten for delete using (auth.uid() = user_id);
