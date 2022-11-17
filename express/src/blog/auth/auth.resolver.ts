import {Inject, Service} from "typedi";
import {Arg, Field, InputType, Mutation, Resolver} from "type-graphql";
import {PrismaClient, Prisma} from "@prisma/client";
import {TokenType} from "./auth.type";
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import {User} from "../interfaces/user.interface";

@InputType({description: "Signup data"})
class AuthRegister {
    @Field(type => String, {nullable: false})
    email: string

    @Field(type => String, {nullable: false})
    username: string

    @Field(type => String, {nullable: false})
    password: string
}


@InputType({description: "SignIn data"})
class AuthLogin {

    @Field(type => String, {nullable: false})
    username: string

    @Field(type => String, {nullable: false})
    password: string

}

@Service()
@Resolver()
class AuthResolver {
    constructor(
        @Inject('prisma') private prisma: PrismaClient) {
    }


    @Mutation(returns => TokenType)
    async register(@Arg("data") args: AuthRegister): Promise<TokenType> {
        const usersCount: number = await this.prisma.user.count({
            where: {
                OR: [{email: args.email}, {username: args.username}]
            }
        })
        if (usersCount >= 1)
            throw  new Error('duplicate Email OR Username');


        let passwordHashed: string = await bcrypt.hash(args.password, 10)

        const user: User = await this.prisma.user.create({
            data: {
                email: args.email,
                username: args.username,
                password: passwordHashed,
            }
        });

        return {token: createTokenAndGet(user.id)}
    }


    @Mutation(returns => TokenType)
    async login(@Arg("data") args: AuthLogin): Promise<TokenType> {
        const user: User | undefined = await this.prisma.user.findUnique({
            where: {
                username: args.username
            }
        });

        if (!user)
            throw new Error("INVALID PASSWORD OR USERNAME");

        const checkPassword: boolean = bcrypt.compare(user.password, args.password);
        if (!checkPassword)
            throw new Error("INVALID PASSWORD OR USERNAME");


        return {token: createTokenAndGet(user.id)}

    }
}


function createTokenAndGet(userKey: number) {
    return jwt.sign({
        userKey: userKey
    }, "JWT-SECRET",)


}

export default AuthResolver