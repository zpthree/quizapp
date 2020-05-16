import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UserPageNav from '@components/UserPageNav';
import styled from 'styled-components';
import withLayout from '@components/withLayout';
import { AppContext } from '@components/AppContext';
import UserAccountProvider from '@components/UserAccountProvider';

function UserAccount({ children }) {
  const { theme } = useContext(AppContext);

  return (
    <UserAccountProvider>
      <UserAccountStyles theme={theme}>
        <UserPageNav theme={theme} />
        <div className="container">{children}</div>
      </UserAccountStyles>
    </UserAccountProvider>
  );
}

UserAccount.propTypes = {
  children: PropTypes.node.isRequired,
};

const UserAccountStyles = styled.div`
  width: 100%;
  margin: 4rem auto;
  max-width: 120rem;
  display: grid;
  grid-template-columns: 30rem auto;

  .container {
    border-top: none;
    padding: 0 4rem;

    h1 {
      margin: 0;
    }
  }
`;

export default withLayout(UserAccount);
