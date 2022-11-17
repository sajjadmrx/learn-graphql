import express from 'express';
import "reflect-metadata";

import {PrismaClient, post, user_role} from '@prisma/client'
import {ApolloServer} from "apollo-server-express";
import {
    buildSchema,
    registerEnumType,
} from "type-graphql";
import {Container} from "typedi";


const prisma = new PrismaClient();


registerEnumType(user_role, {
    name: "roles", // this one is mandatory
    description: "The basic directions", // this one is optional
});


(async () => {
    const app = express();

    Container.set('prisma', prisma)

    const schema = await buildSchema({
        resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
        container: Container
    })


    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
    });
    await server.start()
    server.applyMiddleware({app})

    await app.listen({port: 4000})
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();


