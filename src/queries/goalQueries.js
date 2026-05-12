import { gql } from "@apollo/client";

export const CREATE_GOAL = gql`
  mutation createGoal(
    $goal_type: String!
    $target_weight: Float!
    $progress: Float!
    $deadline: Date!
  ) {
    createGoal(
      goal_type: $goal_type
      target_weight: $target_weight
      progress: $progress
      deadline: $deadline
      ) {
      id
      goal_type
      target_weight
      progress
      deadline
      status
      user
    }
  }
`;

export const UPDATE_GOAL = gql`
  mutation updateGoal(
    $id: ID!
    $goal_type: String!
    $target_weight: Float!
    $progress: Float!
    $deadline: Date!
    $status: String!
  ) {
    updateGoal(
      id: $id
      goal_type: $goal_type
      target_weight: $target_weight
      progress: $progress
      deadline: $deadline
      status: $status
    ) {
      id
      goal_type
      target_weight
      progress
      deadline
      status
      user
    }
  }
`;

export const DELETE_GOAL = gql`
  mutation deleteGoal(
    $id: ID!
  ) {
    deleteGoal(
      id: $id
    ) {
      id
    }
  }
`;

export const GET_GOALS = gql`
    query get_goals{
        goals{
            id
            goal_type
            target_weight
            progress
            deadline
            user
            status
        }
    }
`

export const GET_GOAL = gql`
    query get_goal($id:ID){
        goals(id:ID){
            id
            goal_type
            target_weight
            progress
            deadline
            user
            status
        }
    }
`