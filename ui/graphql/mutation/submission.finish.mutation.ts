import { gql } from 'apollo-boost'

export const SUBMISSION_FINISH_MUTATION = gql`
  mutation start($submission: ID!, $field: SubmissionSetFieldInput!) {
    submission: submissionSetField(submission: $submission, field: $field) {
      id
      percentageComplete
    }
  }
`
