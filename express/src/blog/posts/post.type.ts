import {Field, Int, ObjectType} from "type-graphql";
import {UserType} from "../users/user.type";

@ObjectType()
export class PostType {
    @Field(type => Int)
    id: number
    @Field(type => String)
    title: string
    @Field(type => String)
    content: string
    @Field(type => Int)
    authorId: number
    @Field(type => Boolean)
    published: boolean
    @Field(type => String, {nullable: true})
    cover: string
    @Field(type => UserType)
    user: UserType

    @Field(type => String)
    tags: string
}
