import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { AppContext } from '@components/AppContext';
import { SignInFormStyles } from '@components/SignIn';
import { Field } from '@components/Form';
import Logo from '@icons/Logo';

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $firstName: String!
    $lastName: String
    $email: String!
    $username: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      id
      firstName
      lastName
      email
      username
    }
  }
`;

export default function SignIn() {
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const { refetchAppData } = useContext(AppContext);

  return (
    <div>
      <SignInFormStyles
        method="post"
        onSubmit={async e => {
          e.preventDefault();
          const { firstName, lastName, username, email, password } = e.target;
          await createUser({
            variables: {
              firstName: firstName.value,
              lastName: lastName.value,
              email: email.value,
              username: username.value,
              password: password.value,
            },
          });
          refetchAppData();
        }}
      >
        <div className="logo">
          <Logo />
        </div>
        <Field type="text" label="First Name" />
        <Field type="text" label="Last Name" />
        <Field type="text" label="Username" />
        <Field type="email" label="Email" />
        <Field type="Password" label="Password" />

        <button type="submit" className="btn btn__submit">
          Sign Up
        </button>
      </SignInFormStyles>
    </div>
  );
}
