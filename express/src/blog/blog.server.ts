import express from 'express';
import "reflect-metadata";

import {PrismaClient, user_role} from '@prisma/client'
import {ApolloServer} from "apollo-server-express";
import {
    buildSchema,
    registerEnumType,
} from "type-graphql";
import {Container} from "typedi";
import {Jwt, JwtWithUser} from "./interfaces/jwt.interface";
import jwt from "jsonwebtoken";
import {MyContext} from "./interfaces/context.interface";
import {authChecker} from "./authChecker";


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
        container: Container,
        authChecker: authChecker
    })

    const server = new ApolloServer<MyContext>({
        schema,
        csrfPrevention: true,
        context: async ({req}) => {
            const token: string | undefined = req.headers.authorization;

            if (token) {
                const jwtPayload: any = jwt.verify(token, "JWT-SECRET");

                const jwtDB: JwtWithUser | undefined = await prisma.jwt.findUnique({
                    where: {id: jwtPayload.userKey},
                    include: {
                        user: true
                    }
                })
                if (jwtDB) {
                    req.user = jwtDB.user;
                }
            }
            return req
        },
    });
    await server.start()
    server.applyMiddleware({app})

    await app.listen({port: 4000})
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();


