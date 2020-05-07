import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import useCorrectAnswer from '@hooks/CorrectAnswer';
import QuestionStyles from '@styles/QuestionStyles';
import Answer from '@components/Answer';
import { QuestionContext } from '@components/QuestionProvider';
import QuestionPlaceholder from '@components/QuestionPlaceholder';

const GET_QUESTION_QUERY = gql`
  query GET_QUESTION_QUERY($id: ID!) {
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
    answeredQuestions {
      id
      question
    }
  }
`;

export default function Question({ slug, qid }) {
  const isDocument = typeof document !== `undefined`;
  const router = useRouter();
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

  if (loading || !isAnswer) return <QuestionPlaceholder />;
  if (error) return `Error! ${error}`;

  console.log(data);

  const { answers, question, id } = data.oneQuestion;

  let i = 0;

  return (
    <QuestionStyles>
      <h2>{question}</h2>
      <div className="answers">
        {answers?.map(answer => {
          if (i >= answers.length) i = 0;
          i += 1;
          const letter = String.fromCharCode(97 + (i - 1)).toUpperCase();

          return (
            <Answer
              key={answer.answer}
              questionId={id}
              answer={answer}
              letter={letter}
            />
          );
        })}
      </div>
    </QuestionStyles>
  );
}

Question.propTypes = {
  slug: PropTypes.string.isRequired,
  qid: PropTypes.string.isRequired,
};
