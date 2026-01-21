import { Course } from "../../../models/models";

export interface CoursesFilters {
  category: string | null;
  difficulty: string | null;
  language: string | null;
}

export interface CoursesState {
  courses: Course[];
  filters: CoursesFilters;
}