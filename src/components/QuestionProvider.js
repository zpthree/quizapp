// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { gql, useQuery } from '@apollo/client';

// const ANSWERED_QUESTION_QUERY = gql`
//   query ANSWERED_QUESTION_QUERY {
//     answeredQuestions {
//       id
//       question
//       quiz {
//         id
//         slug
//         title
//       }
//       answerId
//     }
//   }
// `;

// export const QuestionContext = React.createContext({});

// export default function QuestionProvider({ children }) {
//   return <div />;
//   const { loading, error, data, refetch } = useQuery(ANSWERED_QUESTION_QUERY);
//   const [answered, setAnswered] = useState([]);

//   useEffect(() => {
//     if (data?.answeredQuestions) {
//       setAnswered(data.answeredQuestions);
//     }
//   }, [data]);

//   if (loading) return null;
//   if (error) return `Error! ${error}`;

//   console.log(data);

//   // const answered = data.answeredQuestions;
//   let quizTitle;
//   let quizSlug;
//   if (answered.length) {
//     quizTitle = answered[0].quiz.title;
//     quizSlug = answered[0].quiz.slug;
//   }

//   return (
//     <QuestionContext.Provider
//       value={{ quizSlug, quizTitle, answered, refetchAnswered: refetch }}
//     >
//       {children}
//     </QuestionContext.Provider>
//   );
// }

// QuestionProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
