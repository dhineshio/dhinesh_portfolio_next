type Contribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

const LEVEL_COLORS = [
  '#e8f5e9',
  '#a5d6a7',
  '#4caf50',
  '#2e7d32',
  '#1b5e20',
];

export async function fetchContributions(): Promise<Contribution[]> {
  const res = await fetch(
    'https://github-contributions-api.jogruber.de/v4/dhineshio?y=last',
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data.contributions ?? [];
}

export default async function GitHubContributions() {
  let contributions: Contribution[] = [];
  try {
    contributions = await fetchContributions();
  } catch {
    return null;
  }

  const recent = contributions.slice(-364);
  const weeks: Contribution[][] = [];
  for (let i = 0; i < recent.length; i += 7) {
    weeks.push(recent.slice(i, i + 7));
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
      <div className="flex gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <div
                key={di}
                className="w-[10px] h-[10px] rounded-[2px]"
                style={{ backgroundColor: LEVEL_COLORS[day.level] }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
