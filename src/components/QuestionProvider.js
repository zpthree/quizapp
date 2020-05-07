import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';

const ANSWERED_QUESTION_QUERY = gql`
  query ANSWERED_QUESTION_QUERY {
    answeredQuestions {
      id
      question
      quiz {
        title
      }
      answerId
    }
  }
`;

export const QuestionContext = React.createContext({});

export default function QuestionProvider({ children }) {
  const { loading, error, data, refetch } = useQuery(ANSWERED_QUESTION_QUERY);
  const [answered, setAnswered] = useState([]);

  useEffect(() => {
    if (data?.answeredQuestions) {
      setAnswered(data.answeredQuestions);
    }
  }, [data]);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  // const answered = data.answeredQuestions;
  let quizTitle;
  if (answered.length) {
    quizTitle = answered[0].quiz.title;
  }

  return (
    <QuestionContext.Provider
      value={{ quizTitle, answered, refetchAnswered: refetch }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

QuestionProvider.propTypes = {
  children: PropTypes.node.isRequired,
  qid: PropTypes.string.isRequired,
};
