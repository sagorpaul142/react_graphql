import {gql} from "@apollo/client";


export const ADD_POST = gql`
    mutation($title:String!, $views: Int!, $user_id: ID!){
      createPost(title:$title, views:$views, user_id:$user_id){
        title
        views
        user_id
      }
    }
`

export const UPDATE_POST = gql`
    mutation($id:ID!, $title:String,$views:Int,$user_id:ID){
      updatePost(id:$id, title:$title, views:$views, user_id:$user_id){
        id
        title
        views
        user_id
      }
    }
`

export const DELETE_POST_BY_ID = gql`
  mutation($id:ID!){
    removePost(id:$id){
      id
    }
  }
`