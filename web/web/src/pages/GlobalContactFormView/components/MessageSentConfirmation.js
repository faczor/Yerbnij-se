import React from 'react';
import styled from 'styled-components';

import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const ThankYou = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40%;
  padding: 20px;

  h4 {
    align-self: center;
    text-align: center;
  }
`;

const InvitationSent = styled.p`
  text-align: center;
`;

const InvitationSummary = styled.div`
  border-top: 1px solid #959697;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60%;
  padding: 20px;
  text-align: center;
`;

const MessageSentConfirmation = () => {
  return (
    <>
      <ThankYou>
        <DoneOutlineIcon />
        <h4>Wiadomość została wysłana</h4>
        <InvitationSent>Dziękujemy za kontakt.</InvitationSent>
      </ThankYou>
      <InvitationSummary>
        Wkrótce odpowiemy na Pani/Pana wiadomość na podany adres e-mail.
      </InvitationSummary>
    </>
  );
};

export default MessageSentConfirmation;
