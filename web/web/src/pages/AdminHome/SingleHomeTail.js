import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { centerFlex } from 'styles/mixins';

const WrapperLink = styled(Link)`
  ${centerFlex}
  position: relative;
  height: 150px;
  box-shadow: 4px 4px 10px 2px rgba(0, 4, 40, 0.4);
  border-radius: 4px;
  transition: 0.3s;
  background-color: ${({ theme }) => theme.thirdWrapper};

  svg {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 100px;
    opacity: 0.2;
    color: ${({ theme }) => theme.fieldLabel};
  }

  p {
    color: ${({ theme }) => theme.fieldLabel};
    font-weight: bold;
    text-transform: uppercase;
    font-size: 18px;
    margin-top: 10px;
  }

  :hover {
    transform: scale(1.05);
    box-shadow: 4px 4px 10px 5px rgba(0, 4, 40, 0.4);
  }
`;

const SingleHomeTail = ({ title, icon, to }) => {
  return (
    <WrapperLink to={to}>
      <p>{title}</p>
      {icon}
    </WrapperLink>
  );
};

export default SingleHomeTail;
