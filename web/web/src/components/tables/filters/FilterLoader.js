import React, { useState } from 'react';
import styled from 'styled-components';

import { TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';
import { api } from '../../../API';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import allActions from '../../../actions';
import Select from '../../atoms/Select';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1.9fr 0.2fr 1.9fr 0.2fr;
  grid-column-gap: 5px;
  margin-bottom: 20px;

  label {
    color: ${({ theme }) => theme.fieldLabel};
  }

  input {
    color: ${({ theme }) => theme.input};
  }
  
  p {
    color: ${({ theme }) => theme.fieldLabel};
  }
`;

const SingleSelectWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.9fr 0.2fr;
  grid-column-gap: 5px;
  margin-bottom: 20px;

  label {
    color: ${({ theme }) => theme.fieldLabel};
  }

  input {
    color: ${({ theme }) => theme.input};
  }
`;

const OrText = styled.p`
  font-weight: bold;
  font-size: 17px;
  display: flex;
  align-items: flex-end;
  justify-items: flex-end;
`;

const FilterLoader = ({ savedFilters, nameTable, onFilterAction }) => {
    const [filterName, setFilterName] = useState('');
    const [filterId, setFilterId] = useState(0);
    const [isExisting, setIsExisting] = useState(true);
    const options = savedFilters?.map(el => ({ label: el.name, value: el.id }));
    options?.push({ value: 0, label: 'Nowy filtr' });
    const dispatch = useDispatch();

    const onClickIcon = () => {
      if (filterId !== 0) {
        try {
          api.deleteFilter(filterId).then(r => {
            toast.success('Poprawnie usunięto wybrany filtr.');
            onFilterAction(true);
            dispatch(allActions.filtersTableActions.clearFiltersTable(nameTable));
            setFilterName('');
            setIsExisting(true);
            setFilterId(0);
          });
        } catch (e) {
          toast.error('Coś poszło nie tak. Spróbuj ponownie lub skontakuj się z dostawcą oprogramowania.');
        }
      }
    };

    const onChangeText = e => {
      dispatch(
        allActions.filtersTableActions.setFilterTable({
          nameFilter: 'name',
          value: e.target.value,
          nameTable: 'offer',
        }),
      );
    };

    const onChangeList = async e => {
      if (e.value === 0) {
        dispatch(allActions.filtersTableActions.clearFiltersTable(nameTable));
        setFilterName('');
        setIsExisting(true);
        setFilterId(0);
      } else {
        try {
          setIsExisting(false);
          setFilterId(e.value);
          const { data } = await api.getFilterDetails(e.value);
          const filters = [
            {
              name: 'priceFrom',
              value: data.priceFrom === null ? '' : data.priceFrom,
            },
            {
              name: 'priceTo',
              value: data.priceTo === null ? '' : data.priceTo,
            },
            {
              name: 'amountFrom',
              value: data.amountFrom === null ? '' : data.amountFrom,
            },
            {
              name: 'amountTo',
              value: data.amountTo === null ? '' : data.amountTo,
            },
            {
              name: 'productName',
              value: data.productName === null ? '' : data.productName,
            },
            {
              name: 'portal',
              value: data.portal === null ? '' : data.portal,
            },
          ];
          for (const filtersKey in filters) {
            dispatch(
              allActions.filtersTableActions.setFilterTable({
                nameFilter: filters[filtersKey].name,
                value: filters[filtersKey].value,
                nameTable: 'offer',
              }),
            );
          }
          dispatch(
            allActions.filtersTableActions.setFilterTable({
              nameFilter: 'name',
              value: e.label,
              nameTable: 'offer',
            }),
          );
          setFilterName(e.label);
        } catch (e) {
          toast.error('Coś poszło nie tak. Spróbuj ponownie lub skontakuj się z dostawcą oprogramowania');
        }
      }
    };

    return (
      <>
      {isExisting ? (
        <Wrapper>
          <TextField
            id='outlined-search'
            label='Nazwa filtru'
            placeholder='Nazwa...'
            variant='filled'
            defaultValue={filterName}
            onChange={onChangeText}
          />
          <OrText>lub</OrText>
          <Select
            options={options}
            placeholder='Wybierz zapisany filtr'
            onChange={onChangeList}
            defaultValue={filterName}
          />

          <IconButton>
            <DeleteForeverIcon
              onClick={onClickIcon}
              fontSize='large'
              titleAccess='Usuń wybrany filtr'
            />
          </IconButton>
        </Wrapper>
      ) : (
        <SingleSelectWrapper>
          <Select
            options={options}
            placeholder='Wybierz zapisany filtr'
            onChange={onChangeList}
            defaultValue={filterName}
          />

          <IconButton>
            <DeleteForeverIcon
              onClick={onClickIcon}
              fontSize='large'
              titleAccess='Usuń wybrany filtr'
            />
          </IconButton>
        </SingleSelectWrapper>
      )}
      </>
    );
  }
;

export default FilterLoader;