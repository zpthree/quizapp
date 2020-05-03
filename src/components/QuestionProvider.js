import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const QuestionContext = React.createContext({});

export default function QuestionProvider({ children, qid }) {
  const isDocument = typeof document !== `undefined`;
  const [answer, setAnswer] = useState(
    isDocument && (JSON.parse(localStorage.getItem(qid)) || {})
  );

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
