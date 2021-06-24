import React from 'react';
import styled from 'styled-components';
export const Title = styled.h1`
  color: ${({ theme }) => theme.headers};
  padding: 12px 15px;
  font-size: 30px;
  font-weight: 600;
  margin: 0;
  padding-bottom: 30px;
  position: absolute;
  bottom: 0;
  left: 20px;
`;
const HorizontalTitle = ({ title, mobile }) => {
  return (
    <Title mobile={mobile}>
      {title}
    </Title>
  );
};

export default HorizontalTitle;