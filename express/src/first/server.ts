import express from 'express';

import {ApolloServer, gql} from 'apollo-server-express'
import axios from 'axios'

const wait = (ms: number) => new Promise((res, rej) => setTimeout(res, ms))

const typeDefs = gql`

    type Query {
        todos: [Todo]
        findTodoById(todoId:Int!): Todo
        findUserById(userId:Int!) : User
    }


    type Todo {
        userId: Int!
        id: Int!
        title: String!
        completed: Boolean!
    }

    type User {
        id: Int!
        name: String
        username: String
        email: String
        email_us: String @deprecated(reason: "not supported")
        phone: String
    }

`;


const resolvers = {
    Query: {
        todos: async () => {
            return await findTodos()
        },
        findTodoById: async (parent: any, args: { todoId: number }) => {
            return await findTodoById(args.todoId)
        },
        findUserById: async (parent: any, args: { userId: number }) => {
            return await findUserById(args.userId)
        }
    },
};

(async () => {
    const app = express();

    const server = new ApolloServer({
        typeDefs, resolvers,
        plugins: [],
        csrfPrevention: true,
    });
    await server.start()
    server.applyMiddleware({app})

    await app.listen({port: 4000})
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();


const todoAxios = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/todos'
})

async function findTodoById(id: number) {
    const result = await todoAxios.get(`/${id}`);
    return result.data
}

async function findTodos() {
    const result = await todoAxios.get(`/`);
    return result.data
}


const userAxios = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/users'
})

async function findUserById(id: number) {
    const result = await userAxios.get(`/${id}`);
    return result.data
}

