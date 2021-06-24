import styled from 'styled-components';

const Title = styled.h1`
  font-size: 35px;
  font-weight: 600;
  padding: 0;
  margin: 10px 0 0 20px !important;
  color: ${({ theme }) => theme.headers};
`;

export default Title;
