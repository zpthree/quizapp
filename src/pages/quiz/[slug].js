import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import withLayout from '@components/withLayout';
import Error from '@components/ErrorMessage';

export const GET_QUIZ_QUERY = gql`
  query GET_QUIZ_QUERY($slug: String!) {
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
        question
      }
    }
  }
`;

const TAKE_QUIZ_MUTATION = gql`
  mutation TAKE_QUIZ_MUTATION($id: ID!) {
    takeQuiz(id: $id) {
      id
      slug
      title
    }
  }
`;

function Quiz() {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, error, data } = useQuery(GET_QUIZ_QUERY, {
    variables: { slug },
  });
  const [takeQuiz, { data: mutatedData }] = useMutation(TAKE_QUIZ_MUTATION, {
    errorPolicy: 'all',
  });

  if (loading) return null;
  if (error) return <Error error={error} />;

  const quiz = data.oneQuiz;
  const activeQuiz = localStorage.getItem('activeQuiz');
  const isActiveQuiz = activeQuiz && activeQuiz === slug;

  // function takeQuiz() {
  //   if (activeQuiz && !isActiveQuiz) {
  //     const isConfirmed = window.confirm(
  //       'There is already a quiz in progress. Are you sure you want to proceed'
  //     );
  //     if (!isConfirmed) {
  //       return router.push('/quiz/[slug]', `/quiz/${activeQuiz}`);
  //     }

  //     resetQuiz();
  //   }

  //   router.push(
  //     '/quiz/[slug]/take-quiz/[qid]',
  //     `/quiz/${slug}/take-quiz/${quiz.questions[0].id}`
  //   );
  //   if (isDocument) {
  //     localStorage.setItem('activeQuiz', slug);
  //   }
  // }

  function renderTakeQuizBtn() {
    if (!isActiveQuiz && quiz.questions?.length) {
      return (
        <>
          <p>{quiz.questions.length} questions</p>
          <button
            type="button"
            onClick={async () => {
              const res = await takeQuiz({ variables: { id: quiz.id } });
              if (res.errors) {
                alert(res.errors[0].message);
              }
              if (quiz.id !== res.data.takeQuiz.id) {
                const isConfirmed = window.confirm(
                  'There is already a quiz in progress. Are you sure you want to proceed'
                );

                if (!isConfirmed) {
                  return router.push(
                    '/quiz/[slug]',
                    `/quiz/${res.data.takeQuiz.slug}`
                  );
                }
                router.push(
                  '/quiz/[slug]/take-quiz/[qid]',
                  `/quiz/${slug}/take-quiz/${quiz.questions[0].id}`
                );
              }
            }}
          >
            Start Quiz
          </button>
        </>
      );
    }

    if (isActiveQuiz) {
      return (
        <Link
          href="/quiz/[slug]/take-quiz/[qid]"
          as={`/quiz/${slug}/take-quiz/${quiz.questions[0].id}`}
        >
          <a>Resume Quiz</a>
        </Link>
      );
    }

    if (!quiz.questions?.length) {
      return <p>This quiz doesn't have any questions yet.</p>;
    }
  }

  return (
    <QuizStyles className="inner">
      <h1>{quiz.title}</h1>
      {quiz.description && <p>{quiz.description}</p>}
      {renderTakeQuizBtn()}
    </QuizStyles>
  );
}

const QuizStyles = styled.div`
  padding: 4rem var(--gutter);
`;

export default withLayout(Quiz);
