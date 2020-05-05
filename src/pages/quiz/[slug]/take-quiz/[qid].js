import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import useCorrectAnswer from '@hooks/CorrectAnswer';
import withLayout from '@components/withLayout';
import Question from '@components/Question';
import QuestionNavigator from '@components/QuestionNavigator';

const GET_QUESTION_QUERY = gql`
  query($id: ID!) {
    oneQuestion(id: $id) {
      id
      question
      answers {
        id
        answer
        correct
      }
      answerCount
      quiz {
        id
        title
        user {
          name
          username
        }
      }
    }
  }
`;

function QuestionPage() {
  const isDocument = typeof document !== `undefined`;
  const router = useRouter();
  const { slug, qid } = router.query;
  const { loading, error, data } = useQuery(GET_QUESTION_QUERY, {
    variables: { id: qid },
  });
  const isAnswer = useCorrectAnswer({ questionId: qid });

  if (isDocument) {
    const activeQuiz = localStorage.getItem('activeQuiz');
    if (!activeQuiz || (activeQuiz && activeQuiz !== slug)) {
      router.push('/quiz/[slug]', `/quiz/${slug}`);
      return null;
    }
  }

  if (loading || !isAnswer) return null;
  if (error) return `Error! ${error}`;
  const question = { ...data.oneQuestion, id: qid };

  return (
    <QuestionStyles>
      <div className="quiz-title">
        <div className="inner">
          <h1>{question.quiz.title}</h1>
        </div>
      </div>
      <div className="wrapper inner">
        <Question question={question} />
        <QuestionNavigator />
      </div>
    </QuestionStyles>
  );
}

export default withLayout(QuestionPage);

const QuestionStyles = styled.div`
  .quiz-title {
    background-color: var(--primary-color);
    color: var(--white);
  }

  .quiz-title .inner {
    padding: 2rem var(--gutter);
  }

  h1 {
    font-size: var(--fs-2xl);
    width: 100%;
    margin: 0;
  }

  .wrapper.inner {
    display: grid;
    grid-template-columns: 3fr 1.15fr;
    grid-gap: 4rem;
    padding: 4rem var(--gutter);
    position: relative;
  }

  .question {
    max-height: calc(100vh - 25rem);
  }

  h2 {
    font-size: var(--fs-xl);
  }

  .answers {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1;
    width: 100%;
    position: relative;
  }
`;
