import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class TokenType {
    @Field(type => String)
    token: string
}