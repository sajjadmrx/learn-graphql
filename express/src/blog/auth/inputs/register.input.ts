import {Field, InputType} from "type-graphql";

@InputType({description: "Signup data"})
export class AuthRegisterInput {
    @Field(type => String, {nullable: false})
    email: string

    @Field(type => String, {nullable: false})
    username: string

    @Field(type => String, {nullable: false})
    password: string
}
