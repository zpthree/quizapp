import React from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';

const APP_DATA_QUERY = gql`
  query APP_DATA_QUERY {
    appData {
      activeUser {
        id
        firstName
        lastName
        username
        themeColor
      }
      theme
      activeQuiz
      finalized
      activeQuizTitle
      answeredQuestions {
        id
        answerId
      }
      remainingQuestions {
        id
      }
    }
  }
`;

export const AppContext = React.createContext({});

export default function AppProvider({ children }) {
  const { error, data, refetch } = useQuery(APP_DATA_QUERY);

  if (error) return `Error! ${error}`;

  if (data) {
    let primaryColor;

    if (data.appData.activeUser?.themeColor) {
      primaryColor = JSON.parse(data.appData.activeUser?.themeColor);
    }
    return (
      <AppContext.Provider
        value={{
          theme: data.appData.theme,
          activeUser: data.appData.activeUser,
          primaryColor: primaryColor?.hex ?? '#00a15c',
          finalized: data.appData.finalized,
          activeQuiz: data.appData.activeQuiz,
          activeQuizTitle: data.appData.activeQuizTitle,
          answeredQuestions: data.appData.answeredQuestions || [],
          remainingQuestions: data.appData.remainingQuestions || [],
          refetchAppData: refetch,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }

  return null;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
