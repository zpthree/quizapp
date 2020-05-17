import React, { useContext } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import withLayout from '@components/withLayout';
import Error from '@components/Form/ErrorMessage';
import { AppContext } from '@components/AppContext';
import { loading } from '@styles/AnswerStyles';
import Modal from '@components/Modal';

export const GET_QUIZ_QUERY = gql`
  query GET_QUIZ_QUERY($slug: String!) {
    oneQuiz(slug: $slug) {
      id
      title
      description
      tags
      user {
        firstName
        lastName
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
  const { finalized, activeQuiz, activeQuizTitle, refetchAppData } = useContext(
    AppContext
  );
  const { loading: isLoading, error, data } = useQuery(GET_QUIZ_QUERY, {
    variables: { slug },
  });
  const [takeQuiz] = useMutation(TAKE_QUIZ_MUTATION, {
    errorPolicy: 'all',
  });

  if (isLoading)
    return (
      <QuizStyles className="loading">
        <div className="heading" />
        <div className="body" />
        <div className="btn" />
      </QuizStyles>
    );
  if (error) return <Error error={error} />;

  const quiz = data.oneQuiz;
  const isActiveQuiz = activeQuiz && activeQuiz === slug;

  function renderTakeQuizBtn() {
    const thisQuizIsFinalized = finalized && finalized === slug;

    if (thisQuizIsFinalized) {
      return (
        <Link href="/quiz/[slug]/results" as={`/quiz/${slug}/results`}>
          <a aria-label="See quiz results" className="btn btn__submit">
            See Results
          </a>
        </Link>
      );
    }

    if (activeQuiz && !isActiveQuiz) {
      return (
        <Modal btnText="Start Quiz">
          <div className="container">
            <p className="current-quiz-alert-copy">
              You are currently in the middle of taking{' '}
              <span>{activeQuizTitle}</span>. Are you sure you want to start
              another quiz? All progress will be lost on the current quiz.
            </p>
            <div className="btn-list">
              <button
                type="button"
                aria-label="Close modal"
                className="close btn btn__cancel"
              >
                Close
              </button>
              <button
                type="button"
                aria-label="Start taking quiz"
                className="btn btn__submit"
                onClick={async () => {
                  const res = await takeQuiz({
                    variables: { id: quiz.id },
                  });

                  if (res.errors) {
                    return alert(res.errors[0].message);
                  }

                  await refetchAppData();

                  document.querySelector('body').classList.remove('scrolled');
                  document.querySelector('body').classList.remove('model-open');

                  return router.push(
                    '/quiz/[slug]/take-quiz/[qid]',
                    `/quiz/${slug}/take-quiz/${quiz.questions[0].id}`
                  );
                }}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </Modal>
      );
    }

    if (!isActiveQuiz && quiz.questions?.length) {
      return (
        <>
          <p>{quiz.questions.length} questions</p>
          <button
            className="btn btn__submit"
            type="button"
            onClick={async () => {
              if (activeQuiz && activeQuiz === slug) {
                return router.push(
                  '/quiz/[slug]/take-quiz/[qid]',
                  `/quiz/${slug}/take-quiz/${quiz.id}`
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
          <a className="btn btn__submit">Resume Quiz</a>
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
  margin: auto;
  max-width: var(--small-page-width);
  padding: 4rem var(--gutter);
  width: 100%;

  &.loading > div {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${loading};
    animation-timing-function: linear;
    background: linear-gradient(
      to right,
      var(--bg-color-alt) 25%,
      var(--bg-color) 50%,
      var(--bg-color-alt) 75%
    );
    background-size: 100rem 10.4rem;
    border-radius: var(--br);
    cursor: progress;
    margin-bottom: 2rem;
    overflow: hidden;
    position: relative;
  }

  &.loading .heading {
    height: 6rem;
    width: 50%;
  }

  &.loading .body {
    min-height: 30rem;
  }

  &.loading .btn {
    height: 4rem;
    width: 12rem;
  }
`;

export default withLayout(Quiz);
