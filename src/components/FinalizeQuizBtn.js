import React from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Modal from '@components/Modal';

const FINALIZE_QUIZ_MUTATION = gql`
  mutation FINALIZE_QUIZ_MUTATION($slug: String!) {
    getQuizResults(slug: $slug) {
      message
    }
  }
`;

export default function FinalizeQuizBtn({ slug }) {
  const router = useRouter();
  const [getQuizResults] = useMutation(FINALIZE_QUIZ_MUTATION, {
    errorPolicy: 'all',
  });
  return (
    <Modal btnText="Get Results">
      <div className="container">
        <p className="current-quiz-alert-copy">
          Are you sure you want turn in the current quiz?
        </p>
        <div className="btn-list">
          <button
            type="button"
            aria-label="Don't turn in the current quiz"
            className="close btn btn__cancel"
          >
            Not yet
          </button>
          <button
            type="button"
            className="btn btn__submit"
            aria-label="Turn in the current quiz"
            onClick={async () => {
              await getQuizResults({ variables: { slug } });

              document.querySelector('body').classList.remove('scrolled');
              document.querySelector('body').classList.remove('model-open');

              router.push('/quiz/[slug]/results', `/quiz/${slug}/results`);
            }}
          >
            Turn in
          </button>
        </div>
      </div>
    </Modal>
  );
}

FinalizeQuizBtn.propTypes = {
  slug: PropTypes.string.isRequired,
};
