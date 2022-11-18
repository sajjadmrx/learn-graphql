import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {TodoModule} from "./module/todo/todo.module";
import {DirectiveLocation, GraphQLDirective} from "graphql";


@Module({
    imports: [
        TodoModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            installSubscriptionHandlers: true,
            buildSchemaOptions: {
                directives: [
                    new GraphQLDirective({
                        name: 'upper',
                        locations: [DirectiveLocation.FIELD_DEFINITION],
                    }),
                ],
            },
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
