import React from 'react';
import { Search } from 'm-web-components';

import SearchIcon from '@material-ui/icons/Search';
import * as S from './Table.css';

const SearchTable = ({ searchPlaceholder, type, category, getValues }) => {
  const onSubmitSearch = ({ search }) => {
    const data = { chIn: search };

    getValues(type, data, category);
  };

  return (
    <S.SearchWrapper>
      <Search
        searchSubmit={onSubmitSearch}
        paddingInput='5px 10px'
        buttonComponent={null}
        placeholder={searchPlaceholder}
      />
      <SearchIcon />
    </S.SearchWrapper>
  );
};

export default SearchTable;
