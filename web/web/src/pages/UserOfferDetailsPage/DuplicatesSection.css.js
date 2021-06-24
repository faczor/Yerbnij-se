import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color:  ${({theme}) => theme.thirdWrapper};
  border: 1px solid ${({theme}) => theme.border};
  border-radius: 5px;
  padding: 10px;
`;

export const Table = styled.div`
  display: grid;
`;

export const Column = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
`;