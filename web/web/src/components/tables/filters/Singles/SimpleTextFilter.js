import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import allActions from '../../../../actions';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 20px;
  display: grid;
  
  label {
    color: ${({ theme }) => theme.fieldLabel};
  }

  input {
    color: ${({ theme }) => theme.input};
  }
`;

const SimpleTextFilter = ({
                            label,
                            currentValue,
                            nameFilter,
                            nameTable,
                          }) => {
  const dispatch = useDispatch();

  const handleValueChange = e => {
    const newValue = e.target.value;
    dispatch(
      allActions.filtersTableActions.setFilterTable({
        nameFilter,
        value: newValue,
        nameTable,
      }),
    );
  };

  return (
    <>
      <Wrapper>
        <TextField
          id='outlined-search'
          label={label}
          type='search'
          onChange={handleValueChange}
          variant='filled'
          value={currentValue}
        />
      </Wrapper>
    </>
  );
};

export default SimpleTextFilter;