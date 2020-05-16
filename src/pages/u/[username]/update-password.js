import React, { useContext } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import UserAccount from '@components/UserAccount';
import { UserAccountContext } from '@components/UserAccountProvider';
import { useMutation, gql } from '@apollo/client';
import { SignInFormStyles } from '@components/SignIn';
import { AppContext } from '@components/AppContext';
import { Field } from '@components/Form';
import Error from '@components/ErrorMessage';

const UPDATE_PASSWORD_MUTATION = gql`
  mutation UPDATE_PASSWORD_MUTATION(
    $username: String!
    $oldPassword: String!
    $password: String!
    $confirmPassword: String!
  ) {
    updatePassword(
      username: $username
      oldPassword: $oldPassword
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      firstName
      lastName
      username
    }
  }
`;

function UserPage() {
  function UserAccountLayout() {
    const router = useRouter();
    const [
      updatePassword,
      { loading, error },
    ] = useMutation(UPDATE_PASSWORD_MUTATION, { errorPolicy: 'all' });
    const { refetchAppData } = useContext(AppContext);
    const { user } = useContext(UserAccountContext);

    if (!user) return null;

    return (
      <UserInfoPageStyles
        method="post"
        onSubmit={async e => {
          e.preventDefault();
          const { oldPassword, newPassword, confirmPassword } = e.target;

          const res = await updatePassword({
            variables: {
              username: user.username,
              oldPassword: oldPassword.value,
              password: newPassword.value,
              confirmPassword: confirmPassword.value,
            },
          });

          if (!res.errors?.length) {
            await refetchAppData();
            router.push(
              '/u/[username]/update-password',
              `/u/${user.username}/update-password`
            );
          }
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          {error && <Error error={error} />}
          <Field type="password" label="Old Password" defaultValue="" />
          <Field type="password" label="New Password" defaultValue="" />
          <Field type="password" label="Confirm Password" defaultValue="" />
          <button type="submit" className="btn btn__submit">
            Update
          </button>
        </fieldset>
      </UserInfoPageStyles>
    );
  }

  return (
    <UserAccount>
      <UserAccountLayout />
    </UserAccount>
  );
}

const UserInfoPageStyles = styled(SignInFormStyles)`
  max-width: none;
  box-shadow: none;

  fieldset {
    display: grid;
  }

  button.btn__submit {
    max-width: 12rem;
    margin-left: auto;
  }
`;

export default UserPage;
