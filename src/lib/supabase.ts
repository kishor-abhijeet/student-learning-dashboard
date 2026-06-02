import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import type {
  ActivityDay,
  ActivityMetric,
  DashboardCopy,
  DashboardProfile,
  DashboardStat,
  NavigationItem,
  QuickAction,
  UpcomingEvent
} from "@/types/dashboard";
import type { Course } from "@/types/course";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options: CookieOptions;
        }[]
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always mutate cookies. Auth middleware can handle refreshes.
        }
      }
    }
  });
}

export type DashboardData = {
  profile: DashboardProfile;
  courses: Course[];
  stats: DashboardStat[];
  quickActions: QuickAction[];
  upcomingEvents: UpcomingEvent[];
  activityMetrics: ActivityMetric[];
  activityDays: ActivityDay[];
  copy: Record<string, string>;
  navigationItems: NavigationItem[];
};

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createSupabaseServerClient();

  const [
    profileResult,
    coursesResult,
    statsResult,
    quickActionsResult,
    upcomingEventsResult,
    activityMetricsResult,
    activityDaysResult,
    copyResult,
    navigationItemsResult
  ] = await Promise.all([
    supabase
      .from("dashboard_profile")
      .select("id,sidebar_label,sidebar_brand,focus_title,focus_description,student_name,welcome_label,eyebrow,headline,description,streak_days")
      .single(),
    supabase
    .from("courses")
      .select("id,title,progress,icon_name,sort_order,created_at")
      .order("sort_order", { ascending: true }),
    supabase
      .from("dashboard_stats")
      .select("id,label,value,delta,icon_name,sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("quick_actions")
      .select("id,label,icon_name,sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("upcoming_events")
      .select("id,title,event_time,icon_name,sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("activity_metrics")
      .select("id,label,value,sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("learning_activity_days")
      .select("id,activity_date,sessions")
      .order("activity_date", { ascending: true }),
    supabase
      .from("dashboard_copy")
      .select("key,value"),
    supabase
      .from("navigation_items")
      .select("id,label,icon_name,sort_order")
      .order("sort_order", { ascending: true })
  ]);

  const results = [
    profileResult,
    coursesResult,
    statsResult,
    quickActionsResult,
    upcomingEventsResult,
    activityMetricsResult,
    activityDaysResult,
    copyResult,
    navigationItemsResult
  ];
  const failed = results.find((result) => result.error);

  if (failed?.error) {
    throw new Error(`Unable to load dashboard data: ${failed.error.message}`);
  }

  if (!profileResult.data) {
    throw new Error("Dashboard profile row is missing.");
  }

  return {
    profile: profileResult.data,
    courses: coursesResult.data ?? [],
    stats: statsResult.data ?? [],
    quickActions: quickActionsResult.data ?? [],
    upcomingEvents: upcomingEventsResult.data ?? [],
    activityMetrics: activityMetricsResult.data ?? [],
    activityDays: activityDaysResult.data ?? [],
    copy: ((copyResult.data ?? []) as DashboardCopy[]).reduce<Record<string, string>>(
      (values, item) => {
        values[item.key] = item.value;
        return values;
      },
      {}
    ),
    navigationItems: navigationItemsResult.data ?? []
  };
}
