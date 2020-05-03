import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';
import { CorrectAnswerIcon, WrongAnswerIcon } from '@icons';
import AnswerStyles from '@styles/AnswerStyles';

function checkAnswer({ questionId, selectedAnswer, correctAnswer }) {
  let correct = false;
  // TODO add answer functionality
  // if answered disallow answering again
  const questions = JSON.parse(localStorage.getItem('activeQuiz'));
  const question = questions.find(({ id }) => id === questionId);
  const newQuestions = questions.filter(({ id }) => id !== questionId);

  if (bcrypt.compareSync(selectedAnswer, correctAnswer)) {
    correct = true;
  }

  localStorage.setItem(
    'activeQuiz',
    JSON.stringify([
      ...newQuestions,
      {
        ...question,
        correct,
        answerId: selectedAnswer,
      },
    ])
  );

  return correct;
}

function Answer({ answer, letter, isAnswer, questionId }) {
  const router = useRouter();
  const { slug } = router.query;

  const [localQuestions, setLocalQuestions] = useState([]);
  const [localQuestion, setLocalQuestion] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(false);

  useEffect(() => {
    if (typeof document !== `undefined`) {
      if (!localStorage.getItem('activeQuiz')) {
        router.push('/quiz/[slug]', `/quiz/${slug}`);
      }

      setLocalQuestion(JSON.parse(localStorage.getItem('activeQuiz')));

      if (localQuestions?.length) {
        setLocalQuestion(localQuestions.find(({ id }) => id === questionId));
      }
      if (localQuestion?.answerId === answer.id) {
        setSelectedAnswer(true);
      }
    }
  }, [
    localQuestions,
    localQuestion,
    selectedAnswer,
    answer.id,
    questionId,
    router,
    slug,
  ]);

  function answerBadge() {
    if (selectedAnswer) {
      if (localQuestion.correct !== true) {
        return <WrongAnswerIcon />;
      }
      return <CorrectAnswerIcon />;
    }
  }

  return (
    <AnswerStyles
      type="button"
      className={`${selectedAnswer ? `answered` : ``} ${
        localQuestion.correct === true ? `correct` : `incorrect`
      }`}
      aria-disabled={!!localQuestion.answerId}
      title={localQuestion.answerId && `Question already answered`}
      onClick={() => {
        if (localQuestion.answerId) return null;
        checkAnswer({
          questionId,
          selectedAnswer: answer.id,
          correctAnswer: isAnswer,
        });
        setLocalQuestions(JSON.parse(localStorage.getItem('activeQuiz')));
        setLocalQuestion(localQuestions.find(({ id }) => id === questionId));
      }}
    >
      <p className="answer--letter">
        {String.fromCharCode(97 + (letter - 1)).toUpperCase()}
      </p>
      <p>{answer.answer}</p>
      {localQuestion.answerId && <div className="badge">{answerBadge()}</div>}
    </AnswerStyles>
  );
}

Answer.propTypes = {
  questionId: PropTypes.string.isRequired,
  isAnswer: PropTypes.string.isRequired,
  answer: PropTypes.object.isRequired,
  letter: PropTypes.number.isRequired,
};

export default Answer;
