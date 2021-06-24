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

const FiltersList = ({ type, filtersTable = [], category, getValues, savedFilters, onFilterAction }) => {
  const dispatch = useDispatch();
  const nameTable = filtersTable[0]?.nameTable;

  const primaryButtonBg = theme.primaryButtonBackground;
  const filtersValues = useSelector(state => state.filtersTable[nameTable]);

  const clearFilters = () => {
    //clear filterTable reducer
    dispatch(allActions.filtersTableActions.clearFiltersTable(nameTable));
    //clear pagination reducer
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
      toast.error('Wystąpił błąd, spróbuj później bądź skontaktuj się z administratorem.');
    }
  };

  return (
    <>
      <Header>Filtry</Header>
      {nameTable === 'offer' && (
        <FilterLoader savedFilters={savedFilters} nameTable={nameTable} onFilterAction={onFilterAction}/>
      )}
      {filtersTable.map(el => (
        <SingleFilter key={el.nameFilter} {...el} />
      ))}

      <div
        style={{ display: 'flex', marginTop: '50px', justifyContent: 'center' }}
      >
        <FiltersButtonToggle type='button' onClick={clearFilters}>
          Wyczyść filtry
        </FiltersButtonToggle>
        {nameTable === 'offer' && (
          <Button
            type='button'
            colorType='secondary'
            onClick={onSave}
            padding='5px 10px'
            margin='0 0 0 20px'
            style={{ border: 'none', backgroundColor: '#2C5F72' }}
          >
            Zapisz filtr
          </Button>
        )}
        <Button
          type='button'
          colorType='secondary'
          onClick={onSubmit}
          padding='5px 10px'
          margin='0 0 0 20px'
          style={{ border: 'none', backgroundColor: { primaryButtonBg } }}
        >
          Filtruj
        </Button>
      </div>
    </>
  );
};

export default FiltersList;