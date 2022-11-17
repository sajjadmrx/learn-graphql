import {Field, Int, ObjectType} from "type-graphql";
import {user_role} from "@prisma/client";

@ObjectType()
export class UserType {
    @Field(type => Int)
    id: number

    @Field((type) => String)
    username: string

    @Field((type) => String)
    email: string


    @Field(type => user_role)
    role: user_role
};
