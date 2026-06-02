import { ActivityGraph } from "@/components/ActivityGraph";
import { BentoGrid } from "@/components/BentoGrid";
import { CourseCard } from "@/components/CourseCard";
import { Footer } from "@/components/Footer";
import { HeroTile } from "@/components/HeroTile";
import { QuickActions } from "@/components/QuickActions";
import { Sidebar } from "@/components/Sidebar";
import { StatsCard } from "@/components/StatsCard";
import { UpcomingCard } from "@/components/UpcomingCard";
import { getDashboardData } from "@/lib/supabase";
import { BookOpenCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Page() {
  const {
    profile,
    courses,
    stats,
    quickActions,
    upcomingEvents,
    activityMetrics,
    activityDays,
    copy,
    navigationItems
  } = await getDashboardData();
  const averageProgress =
    courses.length > 0
      ? Math.round(courses.reduce((total, course) => total + course.progress, 0) / courses.length)
      : 0;

  return (
    <div className="min-h-screen overflow-hidden bg-obsidian text-slate-100">
      <Sidebar profile={profile} items={navigationItems} />
      <main className="pb-28 pt-4 md:pb-8 md:pl-[5.75rem] lg:pl-72">
        <BentoGrid>
          <section className="col-span-12">
            <HeroTile
              profile={profile}
              labels={{
                streak: copy.hero_streak_label,
                activeCourses: copy.hero_active_courses_label,
                averageProgress: copy.hero_average_progress_label,
                streakSuffix: copy.hero_streak_suffix
              }}
              streak={profile.streak_days}
              activeCourses={courses.length}
              averageProgress={averageProgress}
            />
          </section>

          <section className="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatsCard key={stat.id} stat={stat} />
            ))}
          </section>

          <section className="col-span-12 xl:col-span-8" aria-labelledby="courses-heading">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-sky-300">{copy.courses_eyebrow}</p>
                <h2 id="courses-heading" className="text-2xl font-semibold text-white">
                  {copy.courses_title}
                </h2>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-2 text-sm text-slate-300 sm:flex">
                <BookOpenCheck className="h-4 w-4 text-sky-300" />
                {courses.length} {copy.active_tracks_label}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} buttonLabel={copy.course_button_label} />
              ))}
            </div>
          </section>

          <aside className="col-span-12 grid grid-cols-1 gap-4 xl:col-span-4">
            <QuickActions title={copy.quick_actions_title} actions={quickActions} />
            <UpcomingCard title={copy.upcoming_title} events={upcomingEvents} />
          </aside>

          <section className="col-span-12">
            <ActivityGraph
              eyebrow={copy.activity_eyebrow}
              title={copy.activity_title}
              metrics={activityMetrics}
              days={activityDays}
            />
          </section>
        </BentoGrid>
      </main>
      <Footer />
    </div>
  );
}
