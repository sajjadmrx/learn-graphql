import {jwt} from "@prisma/client";
import {User} from "./user.interface";

export interface Jwt extends jwt {
}

export interface JwtWithUser extends jwt {
    user: User
}