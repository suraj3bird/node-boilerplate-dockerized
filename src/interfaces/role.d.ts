import {
  TEACHER_ROLE,
  ADMIN_ROLE,
  STUDENT_ROLE
} from "@constants/role.constant";

export type IRole =
  | typeof ADMIN_ROLE
  | typeof STUDENT_ROLE
  | typeof TEACHER_ROLE;
