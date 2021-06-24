import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Grid } from '@material-ui/core';
import PaginationComponent from '@material-ui/lab/Pagination';

import {
  styles,
} from './Pagination.css';
import Select from '../../atoms/Select';

const WrapperPagination = styled(Grid)`
  padding: 1vh 0;
  margin: 5vh 0;

  .MuiPagination-ul {
    justify-content: flex-end;
  }

  @media (max-width: 768px) {
    .MuiGrid-item {
      margin-left: auto;
    }
  }

  ${({ customstyle }) => customstyle};
`;

const Pagination = ({
  optionsPagination,
  size,
  changeSize,
  countPages,
  changePage,
  defaultPage,
  page,
}) => (
  <WrapperPagination
    container
    spacing={5}
    justify='space-between'
    alignItems='center'
    customstyle={styles}
  >
    <Grid item xs={12} sm={4}>
      <Select
        options={optionsPagination}
        defaultValue={optionsPagination.filter(el => el.value === size)[0]}
        onChange={changeSize}
        styles={styles}
        isSearchable={false}
      />
    </Grid>
    <Grid item xs={12} sm={8}>
      <PaginationComponent
        count={countPages}
        onChange={changePage}
        variant='outlined'
        shape='rounded'
        defaultPage={defaultPage}
        page={page}
      />
    </Grid>
  </WrapperPagination>
);

export default Pagination;
