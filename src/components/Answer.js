import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AnswerStyles from '@styles/AnswerStyles';
import { QuestionContext } from '@components/QuestionProvider';

function checkAnswer({ questionId, selectedAnswer }) {
  // if (bcrypt.compareSync(selectedAnswer, correctAnswer)) {
  //   correct = true;
  // }

  return localStorage.setItem(
    questionId,
    JSON.stringify({
      answerId: selectedAnswer,
    })
  );
}

export default function Answer({ answer, letter, questionId }) {
  const isDocument = typeof document !== `undefined`;
  const {
    answer: { answerId },
    setAnswer,
  } = useContext(QuestionContext);

  const thisAnswer = answer.id === answerId;

  // function answerBadge() {
  //   if (answerId && answerId === answer.id) {
  //     if (answer.correct !== true) {
  //       return <WrongAnswerIcon />;
  //     }
  //     return <CorrectAnswerIcon />;
  //   }
  // }

  return (
    <AnswerStyles
      type="button"
      className={`${thisAnswer ? `answered` : ``}`}
      aria-disabled={!!answerId}
      title={answerId && `Question already answered`}
      onClick={() => {
        checkAnswer({
          questionId,
          selectedAnswer: answer.id,
        });
        if (isDocument) {
          setAnswer(JSON.parse(localStorage.getItem(questionId)));
        }
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
