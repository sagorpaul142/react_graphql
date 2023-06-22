import {gql} from "@apollo/client";


export const GET_USERS = gql`
    query{
        allUsers{
            id
            name
        }
    }
`