import { gql } from "@apollo/client";

export const CREATE_GOAL = gql`
  mutation createGoal(
    $goal_type: String!
    $target_weight: Float!
    $progress: Float!
    $deadline: Date!
    $user: ID!
  ) {
    createGoal(
      goal_type: $goal_type
      target_weight: $target_weight
      progress: $progress
      deadline: $deadline
      user: $user
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