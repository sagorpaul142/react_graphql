import {gql} from "@apollo/client";


export const GET_AllPosts = gql`
    query{
        allPosts{
        id
        title
        views
        user_id
      }
    }
`

export const GET_POST_BY_ID = gql`
    query($id:ID!){
        Post(id:$id){
            id,
            title,
            views,
            user_id
        }
    }
`