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
  margin: 0 auto 4rem;
  max-width: 120rem;
  padding: 2rem var(--gutter);
  display: grid;

  @media screen and (min-width: 990px) {
    grid-template-columns: 30rem auto;
    margin-top: 4rem;
  }

  .container {
    border-top: none;

    @media screen and (min-width: 990px) {
      padding-left: 4rem;
    }

    h1 {
      margin: 0;
    }
  }
`;

export default withLayout(UserAccount);
