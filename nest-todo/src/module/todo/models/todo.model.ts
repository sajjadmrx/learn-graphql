import {Field, Int, ObjectType} from "@nestjs/graphql";

@ObjectType({
    description: "todo model"
})
export class TodoModel {
    @Field(type => Int)
    id: number
}