import React, { useContext } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import UserAccount from '@components/UserAccount';
import { UserAccountContext } from '@components/UserAccountProvider';
import { useMutation, gql } from '@apollo/client';
import FormWrapper from '@styles/FormWrapper';
import { AppContext } from '@components/AppContext';
import Form, { Field } from '@components/Form';

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $firstName: String
    $lastName: String
    $username: String
    $email: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
    ) {
      id
      firstName
      lastName
      username
    }
  }
`;

export default function UserPage() {
  function UserAccountLayout() {
    const router = useRouter();
    const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
      errorPolicy: 'all',
    });
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
            const { firstName, lastName, username, email } = e.target;

            await updateUser({
              variables: {
                id: user.id,
                firstName: firstName.value,
                lastName: lastName.value,
                username: username.value,
                email: email.value,
              },
            });

            await refetchAppData();
            router.push(
              '/u/[username]/update-info',
              `/u/${username.value}/update-info`
            );
          }}
        >
          <Field type="text" label="First Name" defaultValue={user.firstName} />
          <Field
            type="text"
            label="Last Name"
            defaultValue={user.lastName ?? ''}
          />
          <Field type="text" label="Username" defaultValue={user.username} />
          <Field type="email" label="Email" defaultValue={user.email} />
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
