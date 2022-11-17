import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {UserType} from "./user.type";
import {PrismaClient} from "@prisma/client";
import {Inject, Service} from "typedi";

@Service()
@Resolver(of => UserType)
class UserResolver {
    constructor(@Inject('prisma') private prisma: PrismaClient) {
    }

    @Query((returns) => [UserType])
    async allUsers() {
        return this.prisma.user.findMany()
    }

    @Query((returns) => UserType || null)
    async findUserById(@Arg("id") userId: number) {
        return this.prisma.user.findUnique({where: {id: userId}})
    }
}

export default UserResolver