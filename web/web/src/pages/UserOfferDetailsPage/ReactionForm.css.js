import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.thirdWrapper};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 10px;
`;

export const UpperPart = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const SimpleUpper = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.div`
  align-items: center;
`;

export const LowerPart = styled.div`
  display: grid;
`;

export const StyledTextArea = styled.textarea`
  background-color: ${({theme}) => theme.background};
  color: ${({theme}) => theme.input};
  border: 1px solid ${({theme}) => theme.border};
  border-radius: 5px;
  resize: none;
  height: 100px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;