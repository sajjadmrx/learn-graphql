import {Field, InputType} from "type-graphql";

@InputType({description: "SignIn data"})
export class AuthLoginInput {

    @Field(type => String, {nullable: false})
    username: string

    @Field(type => String, {nullable: false})
    password: string

}
