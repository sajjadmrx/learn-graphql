import {Field, InputType} from "type-graphql";


@InputType({description: "New post data"})
export class PostCreateInput {

    @Field(type => String, {nullable: false})
    title: string
    @Field(type => String, {nullable: false})
    content: string

    @Field(type => Boolean, {nullable: false})
    published: boolean
    @Field(type => String, {nullable: false})
    cover: string

    @Field(type => String, {nullable: false})
    tags: string


}