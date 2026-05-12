import { gql } from "@apollo/client";

export const CREATE_ACTIVITY = gql`
  mutation createActivity(
    $type: String!
    $duration: Float!
    $distance: Float!
    $calories_burned:Float!
    $goal:ID!
  ) {
    createActivity(
      type: $type
      duration: $duration
      distance: $distance
      calories_burned:$calories_burned
      goal:$goal
      ) {
      id
      type
      duration
      distance
      calories_burned
    }
  }
`;

export const UPDATE_ACTIVITY = gql`
  mutation updateActivity(
    $id: ID!
     $type: String!
    $duration: Float!
    $distance: Float!
    $deadline: Date!
    $calories_burned:Float!
  ) {
    updateActivity(
      id: $id
      type: $type
      duration: $duration
      distance: $distance
      deadline: $deadline
      calories_burned:$calories_burned
    ) {
     id
      type
      duration
      distance
      deadline
      calories_burned
    }
  }
`;

export const DELETE_ACTIVITY = gql`
  mutation deleteActivity(
    $id: ID!
  ) {
    deleteActivity(
      id: $id
    ) {
      id
    }
  }
`;

export const GET_ACTIVITYS = gql`
    query activities{
        activities{
            id
            type
            duration
            distance
            calories_burned
        }
    }
`

export const GET_ACTIVITY = gql`
    query get_activity($id:ID){
        activity(id:ID){
            id
            type
            duration
            distance
            calories_burned
            user
        }
    }
`