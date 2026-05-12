import { gql } from "@apollo/client";

export const USER_LOGIN=gql`
    mutation loginUser(
        $email:String!
        $password:String!
    ){
        loginUser(
            email:$email
            password:$password
        ){
            success
            message
            token
        }
    }
`