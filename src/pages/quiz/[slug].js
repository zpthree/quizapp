import React, { useContext } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import withLayout from '@components/withLayout';
import Error from '@components/ErrorMessage';
import { AppContext } from '@components/AppContext';

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
  const { finalized, activeQuiz, refetchAppData } = useContext(AppContext);
  const { loading, error, data } = useQuery(GET_QUIZ_QUERY, {
    variables: { slug },
  });
  const [takeQuiz] = useMutation(TAKE_QUIZ_MUTATION, {
    errorPolicy: 'all',
  });

  if (loading) return null;
  if (error) return <Error error={error} />;

  const quiz = data.oneQuiz;
  const isActiveQuiz = activeQuiz && activeQuiz === slug;

  function renderTakeQuizBtn() {
    const thisQuizIsFinalized = finalized && finalized === slug;

    if (thisQuizIsFinalized) {
      return (
        <Link href="/quiz/[slug]/results" as={`/quiz/${slug}/results`}>
          <a className="btn btn--submit">See Results</a>
        </Link>
      );
    }

    if (!isActiveQuiz && quiz.questions?.length) {
      return (
        <>
          <p>{quiz.questions.length} questions</p>
          <button
            className="btn btn--submit"
            type="button"
            onClick={async () => {
              if (activeQuiz && activeQuiz === slug) {
                return router.push(
                  '/quiz/[slug]/take-quiz/[qid]',
                  `/quiz/${slug}/take-quiz/${quiz.id}`
                );
              }

              if (activeQuiz && activeQuiz !== slug) {
                const isConfirmed = window.confirm(
                  'Another quiz is already in progress. Are you sure you want to proceed?'
                );

                const res = await takeQuiz({ variables: { id: quiz.id } });

                if (res.errors) {
                  return alert(res.errors[0].message);
                }

                await refetchAppData();

                if (!isConfirmed) {
                  return router.push(
                    '/quiz/[slug]',
                    `/quiz/${res.data.takeQuiz.slug}`
                  );
                }
                return router.push(
                  '/quiz/[slug]/take-quiz/[qid]',
                  `/quiz/${slug}/take-quiz/${quiz.questions[0].id}`
                );
              }

              const resTwo = await takeQuiz({ variables: { id: quiz.id } });

              if (resTwo.errors) {
                return alert(resTwo.errors[0].message);
              }

              await refetchAppData();

              router.push(
                '/quiz/[slug]/take-quiz/[qid]',
                `/quiz/${slug}/take-quiz/${quiz.questions[0].id}`
              );
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
          <a className="btn btn--submit">Resume Quiz</a>
        </Link>
      );
    }

    if (!quiz.questions?.length) {
      return <p>This quiz doesn't have any questions yet.</p>;
    }
  }

  return (
    <QuizStyles>
      <h1>{quiz.title}</h1>
      {quiz.description && <p>{quiz.description}</p>}
      {renderTakeQuizBtn()}
    </QuizStyles>
  );
}

const QuizStyles = styled.div`
  padding: 4rem var(--gutter);
  width: 100%;
  max-width: var(--small-page-width);
  margin: auto;
`;

export default withLayout(Quiz);
