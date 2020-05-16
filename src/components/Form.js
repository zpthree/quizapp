import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Form({ children }) {
  return <form method="post">{children}</form>;
}

export function Field({ type, label, defaultValue }) {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const newLabel =
    label
      .replace(/\s+/g, '')
      .charAt(0)
      .toLowerCase() + label.slice(1);

  return (
    <FieldStyles htmlFor={newLabel.replace(/\s+/g, '')}>
      <p>{label}</p>
      <input
        type={type}
        id={newLabel.replace(/\s+/g, '')}
        name={newLabel.replace(/\s+/g, '')}
        defaultValue={value}
        onChange={e => setValue(e.target.value)}
      />
    </FieldStyles>
  );
}

const FieldStyles = styled.label`
  p {
    font-weight: 600;
  }

  input {
    background: var(--bg-color);
    border: 0.1rem solid var(--border-color);
    border-radius: var(--br);
    color: var(--text-color);
  }
`;

Form.propTypes = {
  children: PropTypes.node,
};

Field.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
};

Field.defaultProps = {
  defaultValue: '',
};
