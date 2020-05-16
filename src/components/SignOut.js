import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import { AppContext } from '@components/AppContext';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signOut {
      message
    }
  }
`;

export default function SignOut() {
  const [signOut] = useMutation(SIGNOUT_MUTATION);
  const { refetchAppData } = useContext(AppContext);
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await signOut();
        await refetchAppData();
        router.push('/');
      }}
    >
      Sign Out
    </button>
  );
}
