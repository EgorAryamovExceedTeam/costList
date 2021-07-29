import { gql } from "@apollo/client";

export const GET_ALL_NOTES = gql`
  query {
    costs {
      id
      score
      date
      cost
    }
  }
`;

export const ADD_COST = gql`
  mutation ($score: String, $date: String, $cost: Int) {
    addCost(score: $score, date: $date, cost: $cost) {
      id
      score
      date
      cost
    }
  }
`;

export const DELETE_COST = gql`
  mutation ($id: ID) {
    deleteCost(id: $id) {
      id
      score
      date
      cost
    }
  }
`;

export const GET_INFO_ABOUT_COST = gql`
  query ($id: ID!) {
    cost(id: $id) {
      id
      score
      date
      cost
    }
  }
`;

export const UPDATE_INFO_ABOUT_COST = gql`
  mutation ($id: ID!, $score: String, $date: String, $cost: Int) {
    updateCost(id: $id, score: $score, date: $date, cost: $cost) {
      id
      score
      date
      cost
    }
  }
`;
