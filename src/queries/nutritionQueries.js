import { gql } from "@apollo/client";

export const GET_NUTRITIONS = gql`
  query nutritions {
    nutritions {
      id
      meal_type
      food_item
      quantity
      calories
      goal
      user
    }
  }
`;

export const GET_NUTRITION = gql`
  query nutrition($id: ID!) {
    nutrition(id: $id) {
      id
      meal_type
      food_item
      quantity
      calories
      goal
      user
    }
  }
`;

export const CREATE_NUTRITION = gql`
  mutation CreateNutrition(
    $meal_type: String!
    $food_item: String!
    $quantity: Float!
    $calories: Float!
    $goal: ID!
  ) {
    createNutrition(
      meal_type: $meal_type
      food_item: $food_item
      quantity: $quantity
      calories: $calories
      goal: $goal
    ) {
      id
      meal_type
      food_item
      quantity
      calories
      goal
      user
    }
  }
`;

export const UPDATE_NUTRITION = gql`
  mutation UpdateNutrition(
    $id: ID!
    $meal_type: String!
    $food_item: String!
    $quantity: Float!
    $calories: Float!
    $goal: ID!
  ) {
    updateNutrition(
      id: $id
      meal_type: $meal_type
      food_item: $food_item
      quantity: $quantity
      calories: $calories
      goal: $goal
    ) {
      id
      meal_type
      food_item
      quantity
      calories
      goal
      user
    }
  }
`;

export const DELETE_NUTRITION = gql`
  mutation DeleteNutrition($id: ID!) {
    deleteNutrition(id: $id) {
      id
      meal_type
      food_item
    }
  }
`;