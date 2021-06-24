import styled, { css } from 'styled-components';
import { device } from 'styles/devices';
import { scroll } from 'styles/mixins';
import { Td } from 'react-super-responsive-table';

export const Wrapper = styled.div`
  table {
    background-color: ${({ theme }) => theme.thirdWrapper};
    border-collapse: collapse;
    border: 1px solid ${({ theme }) => theme.border};
  }

  th {
    color: ${({ theme }) => theme.tableHeader};
    text-align: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  td,
  th {
    padding: 10px 30px;
  }

  td {
    color: ${({ theme }) => theme.tableField};
  }

  ${({ tableWrapperStyle }) => ({ ...tableWrapperStyle })}
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 20px;

  @media ${device.desktop} {
    flex-direction: row;
    align-items: center;
  }

  aside {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-end;

    @media ${device.tablet} {
      flex-direction: row;
      align-items: center;
    }
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 260px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 2px;
  box-shadow: 1px 1px 15px rgba(0, 4, 40, 0.03);
  padding: 2px 10px;
  background-color: ${({ theme }) => theme.secondaryWrapper};
  @media ${device.tablet} {
    margin-left: 30px;
    margin-right: 20px;
  }

  svg {
    fill: ${({ theme }) => theme.svg};
  }

  input {
    border: none;
    margin: 0;
    background-color: ${({ theme }) => theme.primaryWrapper};
    color: ${({ theme }) => theme.input};
  }
`;

export const FiltersContainer = styled.div`
  position: relative;
  z-index: 1;
  margin: 14px 0;
`;

export const FiltersButtonToggle = styled.button`
  border: 1.2px solid ${({ theme }) => theme.border};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.secondaryWrapper};
  padding: 3px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.fieldLabel};

  svg {
    margin-right: 10px;
    color: ${({ theme }) => theme.fieldLabel};
  }
`;

export const FiltersStyled = styled.form`
  position: absolute;
  width: 500px;
  padding: 20px;
  border: 2px solid ${({ theme }) => theme.border};
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  background-color: ${({ theme }) => theme.thirdWrapper};

  max-height: ${({ openFilter }) => (openFilter ? 'auto' : 0)};
  transition: 0.2s;
  transform: ${({ openFilter }) => (openFilter ? 'scale(1)' : 'scale(0)')} translate(-400px, 20px);
  opacity: ${({ openFilter }) => (openFilter ? '1' : '0')};

  ${scroll}
`;

export const LabelFilter = styled.p`
  color: ${({ theme }) => theme.fieldLabel};
  text-transform: uppercase;
  font-weight: 700;
  font-size: 11px;
  padding: 5px 0 10px;
`;

export const EmptyTd = styled(Td)`
  display: flex;
  padding: 30px !important;
  text-align: center;
  justify-content: center;
`;
