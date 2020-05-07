import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import AnswerStyles from '@styles/AnswerStyles';
import { QuestionContext } from '@components/QuestionProvider';

const ANSWER_QUESTION_MUTATION = gql`
  mutation answerQuestion($questionId: ID!, $answerId: ID!) {
    answerQuestion(questionId: $questionId, answerId: $answerId) {
      message
    }
  }
`;

export default function Answer({ answer, letter, questionId }) {
  const [answerQuestion] = useMutation(ANSWER_QUESTION_MUTATION);
  const { answered, refetchAnswered } = useContext(QuestionContext);
  const [thisQuestion] = answered.filter(({ id }) => id === questionId);
  const thisAnswer =
    thisQuestion &&
    answer.id &&
    thisQuestion.answerId &&
    answer.id === thisQuestion.answerId;

  return (
    <AnswerStyles
      type="button"
      className={`answer ${thisAnswer ? `answered` : ``}`}
      aria-disabled={!!thisAnswer}
      title={thisAnswer ? `Question already answered` : ``}
      onClick={async () => {
        await answerQuestion({
          variables: { questionId, answerId: answer.id },
        });
        refetchAnswered();
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
