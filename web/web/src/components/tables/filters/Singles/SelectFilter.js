import React from 'react';
import { useDispatch } from 'react-redux';

import allActions from 'actions';

import * as S from '../../Table.css';
import Select from '../../../atoms/Select';

const SelectFilter = ({
  label,
  options = [],
  nameFilter,
  nameTable,
  placeholder,
  currentValue,
}) => {
  const dispatch = useDispatch();

  const handleChangeIdsInList = values => {
    dispatch(
      allActions.filtersTableActions.setFilterTable({
        nameFilter,
        value: values.value,
        nameTable,
      })
    );
  };

  return (
    <>
      <S.LabelFilter style={{ margin: '20px 0 0 0' }}>{label}</S.LabelFilter>
      <Select
        value={options.filter(el => el.value === currentValue)[0] || null}
        onChange={handleChangeIdsInList}
        placeholder={placeholder}
        options={[{ value: '', label: 'Wszystkie' }, ...options]}
      />
    </>
  );
};

export default SelectFilter;
