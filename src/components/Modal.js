import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Portal from '@components/Portal';
import { AppContext } from '@components/AppContext';

export default function Modal({ children, btnText }) {
  const isDocument = typeof document !== `undefined`;
  const [isOpen, setOpen] = useState(false);
  const { theme } = useContext(AppContext);

  useEffect(() => {
    if (isDocument) {
      if (isOpen) {
        document.querySelector('body').classList.add('scrolled');
        document.querySelector('body').classList.add('model-open');
        return;
      }

      document.querySelector('body').classList.remove('scrolled');
      document.querySelector('body').classList.remove('model-open');
    }
  }, [isDocument, isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="Open alert modal"
        className="btn btn--submit"
        onClick={() => setOpen(true)}
      >
        {btnText}
      </button>
      {isOpen && (
        <Portal selector="#portal">
          <ModalStyles
            theme={theme}
            onClick={e => {
              if (e.target.classList.contains('close')) {
                setOpen(false);
              }
            }}
          >
            <div className="backdrop close" />
            {children}
          </ModalStyles>
        </Portal>
      )}
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  btnText: PropTypes.string.isRequired,
};

const ModalStyles = styled.div`
  ${({ theme }) => {
    if (theme === 'dark') {
      return `--box-shadow: 0 .2rem .2rem .2rem rgba(255, 255, 255, 0.1);`;
    }

    return `--box-shadow: 0 .2rem .2rem .1rem rgba(0, 0, 0, 0.1);`;
  }}

  display: flex;
  justify-content: center;
  padding: 0;

  @media screen and (min-width: 768px) {
    padding: 6rem;
  }

  &,
  .backdrop {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }

  .backdrop {
    background-color: var(--bg-color);
    opacity: 0.8;
    z-index: 50;
  }

  .container {
    background-color: var(--bg-color);
    border-radius: var(--br);
    box-shadow: var(--box-shadow);
    min-height: 100vh;
    padding: 1em;
    position: absolute;
    width: 100%;
    z-index: 100;

    @media screen and (min-width: 768px) {
      max-width: 50rem;
      min-height: auto;
    }
  }

  .current-quiz-alert-copy {
    font-size: var(--fs-lg);
    span {
      color: var(--primary-color);
    }
  }

  .btn-list {
    display: flex;
    justify-content: flex-end;
  }

  button {
    border-radius: var(--br);

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;
