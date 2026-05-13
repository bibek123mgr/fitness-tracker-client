import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
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
export const REGISTER_USER = gql`
    mutation createUser(
        $name:String!
        $email:String!
        $age:Int!
        $gender:String!
        $height:Float!
        $weight:Float!
        $password:String!
    ){
        createUser(
            name : $name
            email:$email
            age:$age
            gender:$gender
            height : $height
            weight:$weight
            password:$password
        ){
            id
            
        }
    
    }
`