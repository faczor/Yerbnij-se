import React from 'react';
import styled from 'styled-components';

import Alert from '@material-ui/lab/Alert';

const ErrorAlertStyled = styled(Alert)`
  margin: 5px 0;
  max-width: ${({ maxWidth }) => maxWidth};

  .MuiAlert-message {
    font-size: 12px;
    @media only screen and (max-width: 959px) {
      font-size: 10px;
    }
  }
`;

const ErrorAlertSimple = styled.p`
  color: #F44335;
  font-size: 0.8rem;
  max-width: ${({ maxWidth }) => maxWidth};
`;

const ErrorAlert = ({ error, type, maxWidth }) => {
  if (type === 'simple') {
    return <ErrorAlertSimple maxWidth={maxWidth}>{error}</ErrorAlertSimple>;
  }

  return (
    <ErrorAlertStyled severity='error' maxWidth={maxWidth}>
      {error}
    </ErrorAlertStyled>
  );
};

export default ErrorAlert;
