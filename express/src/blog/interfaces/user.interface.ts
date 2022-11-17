import {user, user_role} from "@prisma/client";

export interface User extends user {
}

export type UserRoleType = user_role;