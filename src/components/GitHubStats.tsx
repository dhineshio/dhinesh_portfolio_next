import { Fragment } from "react";
import { fetchContributions } from "./GitHubContributions";

function calcStreak(contributions: { count: number }[]): number {
  let streak = 0;
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) streak++;
    else break;
  }
  return streak;
}

export default async function GitHubStats() {
  let contributions: { date: string; count: number }[] = [];
  try {
    contributions = await fetchContributions();
  } catch {
    return null;
  }

  const recent = contributions.slice(-364);
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayCount = contributions.find(c => c.date === todayStr)?.count ?? 0;
  const totalThisYear = recent.reduce((s, c) => s + c.count, 0);
  const streak = calcStreak(contributions);

  const stats = [
    { label: "Today", value: todayCount },
    { label: "This Year", value: totalThisYear },
    { label: "Day Streak", value: streak },
  ];

  return (
    <div className="absolute top-4 left-4 pointer-events-none z-10 hidden lg:block">
      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-black/5">
        {stats.map((s, i) => (
          <Fragment key={s.label}>
            <div className="text-center">
              <div className="text-sm font-bold text-[#1a1a1a] leading-none">{s.value}</div>
              <div className="text-[8px] text-[#666] mt-0.5 uppercase tracking-widest">{s.label}</div>
            </div>
            {i < stats.length - 1 && (
              <div className="w-px h-5 bg-black/10" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
