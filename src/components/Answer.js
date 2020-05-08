import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import AnswerStyles from '@styles/AnswerStyles';
import { AppContext } from '@components/AppContext';

const ANSWER_QUESTION_MUTATION = gql`
  mutation answerQuestion($questionId: ID!, $answerId: ID!) {
    answerQuestion(questionId: $questionId, answerId: $answerId) {
      message
    }
  }
`;

export default function Answer({ answer, letter, questionId }) {
  const [isLoading, setLoading] = useState(false);
  const [answerQuestion] = useMutation(ANSWER_QUESTION_MUTATION);
  const { answeredQuestions, refetchAppData } = useContext(AppContext);
  const [thisQuestion] = answeredQuestions.filter(
    ({ id }) => id === questionId
  );
  const thisAnswer =
    thisQuestion &&
    answer.id &&
    thisQuestion.answerId &&
    answer.id === thisQuestion.answerId;

  return (
    <AnswerStyles
      type="button"
      className={`answer ${thisAnswer ? `answered` : ``} ${
        isLoading ? `loading` : ``
      }`}
      aria-disabled={!!thisAnswer}
      onClick={async () => {
        if (isLoading) return null;

        setLoading(true);
        await answerQuestion({
          variables: { questionId, answerId: answer.id },
        });
        await refetchAppData();
        setLoading(false);
      }}
    >
      <p className="answer--letter">{letter}</p>
      <p>{answer.answer}</p>
    </AnswerStyles>
  );
}

Answer.propTypes = {
  questionId: PropTypes.string.isRequired,
  answer: PropTypes.object.isRequired,
  letter: PropTypes.string.isRequired,
};
