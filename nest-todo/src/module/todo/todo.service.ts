import {Injectable} from "@nestjs/common";


@Injectable()
export class TodoService {
    constructor() {
    }

    find() {
        return [{id: 1}]
    }
}