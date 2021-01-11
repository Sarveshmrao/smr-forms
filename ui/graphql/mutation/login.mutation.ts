import { gql } from 'apollo-boost'

export interface LoginMutationData {
  tokens: {
    access: string
    refresh: string
  }
}

export interface LoginMutationVariables {
  username: string
  password: string
}

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    tokens: authLogin(username: $username, password: $password) {
      access: accessToken
      refresh: refreshToken
    }
  }
`
