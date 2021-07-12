import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'm-web-components';
import allActions from 'actions';
import { api } from 'API';
import SingleFilter from './SingleFilter';
import { FiltersButtonToggle } from '../Table.css';
import FilterLoader from './FilterLoader';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import theme from '../../../styles/theme';

const Header = styled.h3`
  color: ${({ theme }) => theme.headers};
`;

const FilterButtonsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const FiltersList = ({
  type,
  filtersTable = [],
  category,
  getValues,
  savedFilters,
  onFilterAction,
}) => {
  const dispatch = useDispatch();
  const nameTable = filtersTable[0]?.nameTable;

  const filtersValues = useSelector(state => state.filtersTable[nameTable]);

  const clearFilters = () => {
    dispatch(allActions.filtersTableActions.clearFiltersTable(nameTable));
    getValues(type, 'clear', category);
  };

  const onSubmit = () => {
    getValues(type, filtersValues, category);
  };

  const onSave = () => {
    try {
      api.addFilter(filtersValues).then(() => {
        toast.success('Poprawnie zapisano filtr.');
      });
      onFilterAction(true);
    } catch (e) {
      toast.error(
        'Wystąpił błąd, spróbuj później bądź skontaktuj się z administratorem.'
      );
    }
  };

  return (
    <>
      <Header>Filtry</Header>
      {nameTable === 'offer' && (
        <FilterLoader
          savedFilters={savedFilters}
          nameTable={nameTable}
          onFilterAction={onFilterAction}
        />
      )}
      {filtersTable.map(el => (
        <SingleFilter key={el.nameFilter} {...el} />
      ))}

      <FilterButtonsWrapper>
        <FiltersButtonToggle type='button' onClick={clearFilters}>
          Wyczyść filtry
        </FiltersButtonToggle>
        {nameTable === 'offer' && (
          <Button
            type='button'
            colorType='secondary'
            onClick={onSave}
            padding='5px 10px'
            margin='0 20px 0 20px'
            style={{ border: 'none', backgroundColor: '#2C5F72' }}
          >
            Zapisz filtr
          </Button>
        )}
        <FiltersButtonToggle type='button' onClick={onSubmit}>
          Filtruj
        </FiltersButtonToggle>
      </FilterButtonsWrapper>
    </>
  );
};

export default FiltersList;
