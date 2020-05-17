import React, { useContext } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import UserAccount from '@components/UserAccount';
import { UserAccountContext } from '@components/UserAccountProvider';
import { useMutation, gql } from '@apollo/client';
import FormWrapper from '@styles/FormWrapper';
import { AppContext } from '@components/AppContext';
import Form, { Field } from '@components/Form';

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
      <UserInfoPageStyles>
        <Form
          loading={loading}
          error={error}
          btnText="Update"
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
          <Field type="password" label="Old Password" />
          <Field type="password" label="New Password" />
          <Field type="password" label="Confirm Password" />
        </Form>
      </UserInfoPageStyles>
    );
  }

  return (
    <UserAccount>
      <UserAccountLayout />
    </UserAccount>
  );
}

const UserInfoPageStyles = styled(FormWrapper)`
  form {
    max-width: none;
    box-shadow: none;
  }

  fieldset {
    display: grid;
  }

  button.btn__submit {
    max-width: 12rem;
    margin-left: auto;
  }
`;

export default UserPage;
