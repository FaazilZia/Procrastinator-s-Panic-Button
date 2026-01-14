export interface UserFormData {
  semester: string;
  subjects: string;
  exams: string;
  freeTime: string;
  goals: string;
  vibe: 'chill' | 'hardcore' | 'roast';
}

export interface Task {
  time: string;
  activity: string;
  description: string;
}

export interface DayPlan {
  day: string;
  theme: string;
  tasks: Task[];
}

export interface Resource {
  title: string;
  type: string; // Video, Article, Project
  description: string;
}

export interface StudyPlanResponse {
  roast: string;
  weeklySchedule: DayPlan[];
  resources: Resource[];
  careerAdvice: string;
  motivationalQuote: string;
}
