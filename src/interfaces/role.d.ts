import {
  ADMIN_ROLE,
  SUPERADMIN_ROLE,
  USER_ROLE
} from "@constants/role.constant";

export type IRole =
  | typeof SUPERADMIN_ROLE
  | typeof ADMIN_ROLE
  | typeof USER_ROLE;
