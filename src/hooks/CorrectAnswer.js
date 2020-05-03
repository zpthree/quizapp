import { gql, useQuery } from '@apollo/client';
import bcrypt from 'bcryptjs';

const GET_ANSWER_QUERY = gql`
  query($questionId: ID!) {
    checkAnswer(questionId: $questionId) {
      correctAnswer {
        id
        answer
      }
    }
  }
`;

export default function CorrectAnswer({ questionId }) {
  const { loading, error, data } = useQuery(GET_ANSWER_QUERY, {
    variables: { questionId },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return bcrypt.hashSync(data.checkAnswer.correctAnswer.id, 10);
}
