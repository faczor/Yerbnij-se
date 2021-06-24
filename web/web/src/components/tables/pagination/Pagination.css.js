import { css } from 'styled-components';

export const styles = css`
  .MuiPaginationItem-root {
    color: ${({ theme }) => theme.fieldLabel};
    border-color: ${({ theme }) => theme.border};
  }

  .MuiPaginationItem-page.Mui-selected {
    background-color: ${({theme}) => theme.primaryWrapper};
  }

  .MuiPaginationItem-page,
  .MuiPaginationItem-page.Mui-selected {
    :hover {
      background-color: ${({ theme }) => theme.secondaryWrapper};
      color: ${({ theme }) => theme.input};
      font-weight: bold;
    }
  }
`;