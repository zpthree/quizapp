import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import { AppContext } from '@components/AppContext';
import FormWrapper from '@styles/FormWrapper';
import Form, { Field } from '@components/Form';
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
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    errorPolicy: 'all',
  });
  const { refetchAppData } = useContext(AppContext);
  const router = useRouter();

  return (
    <div>
      <FormWrapper>
        <Form
          loading={loading}
          error={error}
          btnText="Sign Up"
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
            await refetchAppData();
            router.push('/quizzes');
          }}
        >
          <div className="logo">
            <Logo />
          </div>
          <Field label="First Name" />
          <Field label="Last Name" />
          <Field label="Username" />
          <Field type="email" label="Email" />
          <Field type="Password" label="Password" />
        </Form>
      </FormWrapper>
    </div>
  );
}
