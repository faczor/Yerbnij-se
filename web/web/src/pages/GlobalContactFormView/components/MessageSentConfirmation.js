import React from 'react';
import styled from 'styled-components';

import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40%;
  padding: 20px;
  background-color: rgba(68, 74, 77, 0.7);
`;

const MessageSentConfirmation = () => {
  return (
    <>
      <Wrapper>
        <DoneOutlineIcon />
        <h4>Wiadomość została wysłana</h4>
        <p>Dziękujemy za kontakt.</p>
      </Wrapper>
    </>
  );
};

export default MessageSentConfirmation;
