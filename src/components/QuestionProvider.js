import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const QuestionContext = React.createContext({});

export default function QuestionProvider({ children, qid }) {
  const isDocument = typeof document !== `undefined`;
  let localQuestion = {};

  if (isDocument && localStorage.getItem(qid)) {
    localQuestion = JSON.parse(localStorage.getItem(qid));
  }

  const [answer, setAnswer] = useState(localQuestion);

  useEffect(() => {
    if (
      (localQuestion.answerId && !answer.answerId) ||
      localQuestion.answerId !== answer.answerId
    ) {
      setAnswer(localQuestion);
    }
  }, [answer.answerId, localQuestion]);

  return (
    <QuestionContext.Provider value={{ answer, setAnswer }}>
      {children}
    </QuestionContext.Provider>
  );
}

QuestionProvider.propTypes = {
  children: PropTypes.node.isRequired,
  qid: PropTypes.string.isRequired,
};
