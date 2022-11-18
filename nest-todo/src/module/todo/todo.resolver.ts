import {Query, Resolver} from "@nestjs/graphql";
import {TodoModel} from "./models/todo.model";
import {TodoService} from "./todo.service";


@Resolver(of => TodoModel)
export class TodoResolver {
    constructor(private todoService: TodoService) {
    }

    @Query(returns => [TodoModel])
    async getAll() {
        return this.todoService.find()
    }
}