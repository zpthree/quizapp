import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import QuestionStyles from '@styles/QuestionStyles';
import Answer from '@components/Answer';
import QuestionPlaceholder from '@components/QuestionPlaceholder';
import FinalizeQuizBtn from '@components/FinalizeQuizBtn';
import { AppContext } from '@components/AppContext';

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
          firstName
          lastName
          username
        }
      }
    }
  }
`;

export default function Question({ slug, qid }) {
  const router = useRouter();
  const { activeQuiz, answeredQuestions, remainingQuestions } = useContext(
    AppContext
  );
  const { loading, error, data } = useQuery(GET_QUESTION_QUERY, {
    variables: { id: qid },
  });

  const [isAnswered] = answeredQuestions.filter(
    ({ id: questionId }) => questionId === qid
  );

  if (!activeQuiz || (activeQuiz && activeQuiz !== slug)) {
    if (typeof document !== `undefined`) {
      router.push(`/quiz/${slug}`);
    }
    return null;
  }

  if (loading) return <QuestionPlaceholder />;
  if (error) return `Error! ${error}`;

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
        <div className="question-nav-links">
          <button
            type="button"
            aria-label="Navigate to the previous view"
            className="btn btn__cancel"
            onClick={router.back}
          >
            Go Back
          </button>
          {remainingQuestions.length && isAnswered ? (
            <Link
              href="/quiz/[slug]/take-quiz/[qid]"
              as={`/quiz/${slug}/take-quiz/${remainingQuestions[0].id}`}
            >
              <a
                aria-label="Go to next unanswered question."
                className="btn btn__submit"
              >
                Next Unanswered Question
              </a>
            </Link>
          ) : null}
          {remainingQuestions.length && !isAnswered ? (
            <p className="btn btn__submit" aria-disabled="true">
              Next Unanswered Question
            </p>
          ) : null}
          {remainingQuestions.length === 0 ? (
            <FinalizeQuizBtn slug={slug} />
          ) : null}
        </div>
      </div>
    </QuestionStyles>
  );
}

Question.propTypes = {
  slug: PropTypes.string.isRequired,
  qid: PropTypes.string.isRequired,
};
