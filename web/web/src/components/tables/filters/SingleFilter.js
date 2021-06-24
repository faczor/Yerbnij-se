import React from 'react';
import { useSelector } from 'react-redux';

import SelectFilter from './Singles/SelectFilter';
import NumberFromToInputFilter from './Singles/NumberFromToInputFilter';
import SimpleTextFilter from './Singles/SimpleTextFilter';

const SingleFilter = ({
                        filterType,
                        nameFilter,
                        nameTable,
                        label,
                        placeholder,
                        options = [],
                      }) => {
  const allFilters = useSelector(state => state.filtersTable[nameTable]);
  switch (filterType) {
    case 'select':
      return (
        <SelectFilter
          options={options}
          label={label}
          currentValue={allFilters[nameFilter]}
          nameFilter={nameFilter}
          nameTable={nameTable}
          placeholder={placeholder}
        />
      );

    case 'fromToNumber':
      const from = nameFilter + 'From';
      const to = nameFilter + 'To';
      return (
        <NumberFromToInputFilter
          label={label}
          currentValueTo={allFilters[to]}
          nameFilter={nameFilter}
          nameTable={nameTable}
          placeholder={placeholder}
          currentValueFrom={allFilters[from]}
        />
      );

    case 'text':
      return (
        <SimpleTextFilter
          label={label}
          currentValue={allFilters[nameFilter]}
          nameTable={nameTable}
          placeholder={placeholder}
          nameFilter={nameFilter}
        />
      );

    default:
      break;
  }
};

export default SingleFilter;
