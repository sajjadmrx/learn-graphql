import {Arg, Authorized, Ctx, Field, InputType, Mutation, Query, Resolver, Root} from "type-graphql";
import {PrismaClient, Prisma, user_role} from "@prisma/client";
import {PostType} from "./post.type";
import {Inject, Service} from "typedi";
import {PostCreateInput} from "./inputs/create.input";
import {MyContext} from "../interfaces/context.interface";
import {UserRoleType} from "../interfaces/user.interface";


@Service()
@Resolver()
class PostsResolver {
    constructor(
        @Inject('prisma') private prisma: PrismaClient) {
    }

    @Query((returns) => [PostType])
    async findPosts() {
        return await this.prisma.post.findMany({
            include: {
                user: true
            }

        })
    }

    @Query((returns) => PostType)
    async findPostById(@Arg('postId') postId: number) {
        return this.prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true
            }
        })

    }

    @Authorized<UserRoleType>(["ADMIN", "MANAGE_POSTS"])
    @Mutation(returns => PostType)
    async createPost(@Arg("data") args: PostCreateInput, @Ctx() {user}: MyContext): Promise<PostType> {
        try {

            let tags = args.tags;
            if (!tags || !tags.split(',')[0])
                throw new Error("INVALID_TAGS")
            return await this.prisma.post.create({
                data: {
                    ...args,
                    authorId: user.id,
                },
                include: {
                    user: true
                }
            },)
        } catch (e) {
            throw e
        }

    }
}

export default PostsResolver