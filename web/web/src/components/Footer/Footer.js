import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { role } from 'auth/constans';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import { device } from 'styles/devices';

const Wrapper = styled.footer`
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;

  h3,
  a,
  p {
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.footer};
    svg {
      margin: auto 10px auto 0px;
      color: ${({ theme }) => theme.svg};
    }
  }

  a {
    text-decoration: underline;
  }

  h3 {
    font-size: 18px;
    font-weight: 700;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 14px;
  text-decoration: underline;
  margin: 5px 0;
  padding: 0;
  color: ${({ theme }) => theme.footer};
  cursor: pointer;
`;

const Footer = ({ setModalOpen }) => {
  const { user } = useSelector(state => state.auth);

  const handleOpen = () => {
    setModalOpen(prev => !prev);
  };

  return (
    <Wrapper>
      {(!user || user?.role === role.user) && (
        <>
          <ContactWrapper>
            <h3>Kontakt</h3>
            <Button onClick={handleOpen}>Formularz kontaktowy</Button>
            <p>
              <PhoneOutlinedIcon /> +48 513 842 111
            </p>
            <p>
              <MailOutlineIcon />
              yerbnij-se@gmail.com
            </p>
          </ContactWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Footer;
