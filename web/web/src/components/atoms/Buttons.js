import styled from 'styled-components';

export const Button = styled.button`
  padding: 8px 10px;
  margin: 0;
  border: none;
  font-weight: 600;
  @media (max-width: 420px) {
    padding: 4px 5px;
  }
  transition: 0.3s;
  cursor: pointer;

  :hover {
    transform: translate(2%, -2%);
    box-shadow: -3px 5px 3px -3px #aaa;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.primaryButtonBackground};
  color: ${({ theme }) => theme.primaryButtonContent};
  border: none;
`;

export const SaveButton = styled(Button)`
  padding: 8px 10px;
  background-color: ${({ theme }) => theme.primaryButtonBackground};
  border: none;
  color: ${({ theme }) => theme.primaryButtonContent};
`;

export const CancelButton = styled(Button)`
  background-color: transparent;
  border: none;
  font-weight: 450;
  color: ${({ theme }) => theme.secondaryButtonContent};
  border-bottom: 1px solid  ${({ theme }) => theme.secondaryButtonContent};
  :hover {
    transform: none;
    box-shadow: none;
  }
`;
