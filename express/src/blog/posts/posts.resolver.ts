import {Arg, Field, InputType, Mutation, Query, Resolver} from "type-graphql";
import {PrismaClient, Prisma} from "@prisma/client";
import {PostType} from "./post.type";
import {Inject, Service} from "typedi";
import {PostCreateInput} from "./inputs/create.input";


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

    @Mutation(returns => PostType)
    async createPost(@Arg("data") args: PostCreateInput): Promise<PostType> {
        try {

            let tags = args.tags;
            if (!tags || !tags.split(',')[0])
                throw new Error("INVALID_TAGS")
            return await this.prisma.post.create({
                data: {
                    ...args,
                    authorId: 12,
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