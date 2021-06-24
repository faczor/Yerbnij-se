import React from 'react';

import SelectComponent from 'react-select';
import theme from '../../styles/theme';

const styles = {
  control: provided => ({
    ...provided,
    border: '1px solid rgb(152, 198, 216)',
    minHeight: '53.5px',
    borderRadius: '1px',
    backgroundColor: theme.selectBackground,
  }),

  option: (provided, state) => ({
    ...provided,
    color: theme.tableField,
    backgroundColor: state.isSelected ? theme.selectActive : theme.selectNotActive,
    padding: 5,
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
  menu: provided => ({
    ...provided,
    marginTop: '0px',
  }),
};
const Select = ({
  options,
  onChange,
  placeholder,
  defaultValue,
  ...rest
}) => (
  <SelectComponent
    options={options}
    onChange={onChange}
    placeholder={placeholder}
    styles={styles}
    defaultValue={defaultValue}
    {...rest}
  />
);

export default Select;