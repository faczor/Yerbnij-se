import React, { useState, useEffect } from 'react';

import { ClickAwayListener } from '@material-ui/core';

import FilterListIcon from '@material-ui/icons/FilterList';
import FiltersList from './FiltersList';
import * as S from '../Table.css';
import { api } from '../../../API';
import { toast } from 'react-toastify';

const FiltersContainer = ({
                            type,
                            filtersTable,
                            category,
                            getValues,
                          }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [savedFilters, setSavedFilters] = useState(null);
  const [isFilterActionRun, setIsFilterActionRun] = useState(true);

  const onOpenFilters = () => {
    if (!isFilterOpen) {
      if (savedFilters === null) {
        console.log('IF: ' + savedFilters);
        setIsFilterActionRun(true);
      }
    }
    setIsFilterOpen(prev => !prev);
  };

  useEffect(() => {
    getSavedFilters();
    setIsFilterActionRun(false);
  }, [isFilterActionRun]);

  const getSavedFilters = async () => {
    try {
      const { data } = await api.getFilterList();
      setSavedFilters(data);
    } catch (e) {
      toast.error('Coś poszło nie tak. Spróbuj ponownie lub skontakuj się z dostawcą oprogramowania');
    }
  };


  return (
    <ClickAwayListener onClickAway={() => setIsFilterOpen(false)}>
      <S.FiltersContainer>
        <S.FiltersButtonToggle
          type='button'
          onClick={onOpenFilters}
        >
          <FilterListIcon />
          Filtry
        </S.FiltersButtonToggle>
        <S.FiltersStyled openFilter={isFilterOpen} title='Filtry'>
          <FiltersList
            type={type}
            filtersTable={filtersTable}
            category={category}
            getValues={getValues}
            savedFilters={savedFilters}
            onFilterAction={setIsFilterActionRun}
          />
        </S.FiltersStyled>
      </S.FiltersContainer>
    </ClickAwayListener>
  );
};

export default FiltersContainer;
