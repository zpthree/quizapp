import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

export const UserAccountContext = React.createContext({});

const GET_USER_QUERY = gql`
  query GET_USER_QUERY($username: String!) {
    oneUser(username: $username) {
      id
      firstName
      lastName
      username
      email
      themeColor
    }
    userQuizzes(username: $username) {
      id
      slug
      title
      description
    }
  }
`;

export default function UserAccountProvider({ children }) {
  const isDocument = typeof document !== `undefined`;
  const [user, setUser] = useState();
  const [quizzes, setQuizzes] = useState();
  const { query } = useRouter();
  const { username } = query;
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { username },
  });

  useEffect(() => {
    if (isDocument && data) {
      setUser(data.oneUser);
      setQuizzes(data.userQuizzes);
    }
  }, [data, isDocument]);

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;

  return (
    <UserAccountContext.Provider value={{ user, quizzes }}>
      {children}
    </UserAccountContext.Provider>
  );
}

UserAccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
