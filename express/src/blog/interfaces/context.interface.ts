import {User} from "./user.interface";
import {Context} from "vm";

export interface MyContext extends Context {
    user: User;
}