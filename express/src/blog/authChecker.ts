import {AuthChecker} from "type-graphql";
import {MyContext} from "./interfaces/context.interface";
import {GraphQLError} from 'graphql';
import {User, UserRoleType} from "./interfaces/user.interface";


export const authChecker: AuthChecker<MyContext, UserRoleType> = ({context}, roles) => {
    const myContext: MyContext = context
    if (myContext.user) {
        const user: User = myContext.user
        if (roles.length) {
            const hasRole: Array<Boolean> = roles.map((role) => role == user.role);
            if (hasRole.includes(true)) return true;
            throw new GraphQLError('UN_AUTHORIZATION')
        } else
            return true;
    }
    throw new GraphQLError('AUTHENTICATION_FAILED')
};
