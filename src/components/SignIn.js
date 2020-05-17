import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { AppContext } from '@components/AppContext';
import Logo from '@icons/Logo';
import Form, { Field } from '@components/Form';
import FormWrapper from '@styles/FormWrapper';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

export default function SignIn() {
  const [signIn, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    errorPolicy: 'all',
  });
  const { refetchAppData, theme } = useContext(AppContext);
  const router = useRouter();

  return (
    <FormWrapper theme={theme}>
      <Form
        loading={loading}
        error={error}
        btnText="Sign In"
        onSubmit={async e => {
          e.preventDefault();
          const { email, password } = e.target;
          const { data } = await signIn({
            variables: { email: email.value, password: password.value },
          });
          await refetchAppData();
          router.push('/u/[username]', `/u/${data?.signIn.username}`);
        }}
      >
        <div className="logo">
          <Logo />
        </div>
        <Field type="email" label="Email" />
        <Field type="password" label="Password" />
      </Form>
    </FormWrapper>
  );
}
