import React from 'react';
import { useDispatch } from 'react-redux';
import allActions from 'actions';
import styled from 'styled-components';

import { TextField } from '@material-ui/core';

const NumbersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  
  label {
    color: ${({ theme }) => theme.fieldLabel};
  }
  
  input {
    color: ${({ theme }) => theme.input};
  }
`;

const NumberFromToInputFilter = ({
                                   label,
                                   currentValueFrom,
                                   currentValueTo,
                                   nameFilter,
                                   nameTable,
                                 }) => {
  const dispatch = useDispatch();
  const labelFrom = label + " od";
  const labelTo = label + " do";
  const handleValueFromChange = e => {
    const newValue = e.target.value;
    const newName = nameFilter + "From";
    dispatch(
      allActions.filtersTableActions.setFilterTable({
        nameFilter: newName,
        value: newValue,
        nameTable,
      }),
    );
  };

  const handleValueToChange = e => {
    const newValue = e.target.value;
    const newName = nameFilter + "To";
    console.log(newName);
    dispatch(
      allActions.filtersTableActions.setFilterTable({
        nameFilter: newName,
        value: newValue,
        nameTable,
      }),
    );
  };

  return (
    <>
      <NumbersWrapper>
        <TextField
          label={labelFrom}
          id='standard-number'
          type='number'
          value={currentValueFrom}
          placeholder='Od...'
          onChange={handleValueFromChange}
          variant='filled'
        />

        <TextField
          label={labelTo}
          id='standard-number'
          type='number'
          value={currentValueTo}
          placeholder='Do...'
          onChange={handleValueToChange}
          variant='filled'
        />
      </NumbersWrapper>
    </>
  );
};

export default NumberFromToInputFilter;