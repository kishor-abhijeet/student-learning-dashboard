export type DashboardProfile = {
  id: string;
  sidebar_label: string;
  sidebar_brand: string;
  focus_title: string;
  focus_description: string;
  student_name: string;
  welcome_label: string;
  eyebrow: string;
  headline: string;
  description: string;
  streak_days: number;
};

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  delta: string;
  icon_name: string;
  sort_order: number;
};

export type QuickAction = {
  id: string;
  label: string;
  icon_name: string;
  sort_order: number;
};

export type UpcomingEvent = {
  id: string;
  title: string;
  event_time: string;
  icon_name: string;
  sort_order: number;
};

export type ActivityMetric = {
  id: string;
  label: string;
  value: string;
  sort_order: number;
};

export type ActivityDay = {
  id: string;
  activity_date: string;
  sessions: number;
};

export type DashboardCopy = {
  key: string;
  value: string;
};

export type NavigationItem = {
  id: string;
  label: string;
  icon_name: string;
  sort_order: number;
};
