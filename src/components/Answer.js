import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import bcrypt from 'bcryptjs';
import { CorrectAnswerIcon, WrongAnswerIcon } from '@icons';
import AnswerStyles from '@styles/AnswerStyles';
import { QuestionContext } from '@components/QuestionProvider';

function checkAnswer({ questionId, selectedAnswer, correctAnswer }) {
  let correct = false;

  if (bcrypt.compareSync(selectedAnswer, correctAnswer)) {
    correct = true;
  }

  localStorage.setItem(
    questionId,
    JSON.stringify({
      answerId: selectedAnswer,
    })
  );

  return correct;
}

export default function Answer({ answer, letter, isAnswer, questionId }) {
  const isDocument = typeof document !== `undefined`;
  const {
    answer: { answerId },
    setAnswer,
  } = useContext(QuestionContext);

  const thisAnswer = answer.id === answerId;

  function answerBadge() {
    if (answerId && answerId === answer.id) {
      if (answer.correct !== true) {
        return <WrongAnswerIcon />;
      }
      return <CorrectAnswerIcon />;
    }
  }

  return (
    <AnswerStyles
      type="button"
      className={`${thisAnswer ? `answered` : ``} ${
        thisAnswer && answer.correct === true ? `correct` : `incorrect`
      }`}
      aria-disabled={!!answerId}
      title={answerId && `Question already answered`}
      onClick={() => {
        if (answerId) return null;
        checkAnswer({
          questionId,
          selectedAnswer: answer.id,
          correctAnswer: isAnswer,
        });
        if (isDocument) {
          setAnswer(JSON.parse(localStorage.getItem(questionId)));
        }
      }}
    >
      <p className="answer--letter">{letter}</p>
      <p>{answer.answer}</p>
      {answerId && <div className="badge">{answerBadge()}</div>}
    </AnswerStyles>
  );
}

Answer.propTypes = {
  questionId: PropTypes.string.isRequired,
  isAnswer: PropTypes.string.isRequired,
  answer: PropTypes.object.isRequired,
  letter: PropTypes.string.isRequired,
};
