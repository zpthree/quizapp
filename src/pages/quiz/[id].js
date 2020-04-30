import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import withLayout from '@components/withLayout';

const GET_QUIZ_QUERY = gql`
  query($id: ID!) {
    oneQuiz(id: $id) {
      title
      description
      tags
      user {
        name
      }
      user {
        name
      }
      questions {
        question
        answers {
          answer
        }
        explanation
      }
    }
  }
`;

const Quiz = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_QUIZ_QUERY, {
    variables: { id },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return <h1>{data.oneQuiz.title}</h1>;
};

export default withLayout(Quiz);
