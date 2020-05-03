import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import withLayout from '@components/withLayout';

const GET_QUIZ_QUERY = gql`
  query($slug: String!) {
    oneQuiz(slug: $slug) {
      id
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
        id
      }
    }
  }
`;

function Quiz() {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, error, data } = useQuery(GET_QUIZ_QUERY, {
    variables: { slug },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const quiz = data.oneQuiz;

  return (
    <QuizStyles>
      <h1>{quiz.title}</h1>
      {quiz.description && <p>{quiz.description}</p>}
      {quiz.questions?.length ? (
        <>
          <p>{quiz.questions.length} questions</p>
          <button
            type="button"
            onClick={() => {
              router.push(
                '/quiz/[slug]/take-quiz/[qid]',
                `/quiz/${slug}/take-quiz/${quiz.questions[0].id}`
              );
              localStorage.setItem(
                'activeQuiz',
                JSON.stringify(quiz.questions)
              );
            }}
          >
            Start Quiz
          </button>
        </>
      ) : (
        <p>This quiz doesn't have any questions yet.</p>
      )}
    </QuizStyles>
  );
}

const QuizStyles = styled.div`
  padding: 0 var(--gutter);
`;

export default withLayout(Quiz);
