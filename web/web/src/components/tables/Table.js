import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Pagination from './pagination/Pagination';
import * as S from './Table.css';
import SearchTable from './SearchTable';
import FiltersTable from './filters/FiltersContainer';
import TableMenu from 'components/tables/TableMenu';
import SortIcon from 'components/tables/SortIcon';
import UsersTableRow from '../../pages/AdminAdministration/UsersTable/UsersTableRow';
import ScraperTableRow from 'pages/AdminAdministration/ScraperTable/ScraperTableRow';
import OffersTableRow from 'pages/UserOffersListPage/OffersTableRow';
import TableTitle from 'components/tables/HorizontalTitle';

const options = [
  { label: '5 wyników', value: 5 },
  { label: '10 wyników', value: 10 },
  { label: '15 wyników', value: 15 },
  { label: '20 wyników', value: 20 },
  { label: '50 wyników', value: 50 },
];

const useSortResults = (type, category, getValues) => {
  const [lastSortBy, setLastSortBy] = useState('');
  const [lastSortType, setLastSortType] = useState(false);

  const changeSort = value => {
    const newSortType = lastSortBy === value ? !lastSortType : false;

    const data = {
      sortBy: value,
      sortDirection: newSortType ? 'DESC' : 'ASC',
    };

    setLastSortType(newSortType);
    setLastSortBy(value);
    getValues(type, data, category);
  };

  return { changeSort };
};

const TableComponent = ({
                          columns,
                          data: rows,
                          type,
                          getValues,
                          searchPlaceholder,
                          simple,
                          filtersTable,
                          horizontalMenu,
                          category,
                          selectedRows,
                          setMenuFunctions,
                          tableStyle,
                          noFilters,
                          handleOpenModal,
                          horizontalTitle,
                        }) => {
  const { changeSort } = useSortResults(type, category, getValues);
  const pagination = useSelector(state => state.tableResults);
  const parametersName = `${type}Parameters`;
  const { size, totalPages } =
  pagination[parametersName] || pagination.defaultParameters;

  const [cols, setCols] = useState(columns);

  useEffect(() => {
    setCols(columns);
  }, [columns]);

  useEffect(() => {
    if (getValues) getValues(type, { page: 1 }, category);

    //clear filters
    return () => {
      if (getValues) {
        getValues(type, 'clear', category);
      }
    };
  }, []);

  const changeSize = value =>
    getValues(type, { size: value.value, page: 1 }, category);
  const changePage = (event, value) =>
    getValues(type, { page: value }, category);

  //todo change if workign properly
  const header = cols.map(col => (
    <Th
      key={col.fieldName}
      id={col.fieldName}
      onClick={col.sorting ? () => changeSort(col.fieldName) : null}
    >
      {col.title} {col.sorting && !simple && <SortIcon />}
    </Th>
  ));

  const rowsRender = rows?.map(row => {
    const props = {
      row,
      cols,
      selectedRows,
      getValues,
      type,
      category,
      setMenuFunctions,
    };

    // eslint-disable-next-line default-case
    switch (type) {
      case 'users':
        return (
          <UsersTableRow
            key={row.id}
            handleOpenModal={handleOpenModal}
            {...props}
          />
        );
      case 'scrapers':
        return <ScraperTableRow key={row.id} {...props} />;
      case 'offer':
        return <OffersTableRow key={row.id} {...props} />;
    }
  });

  return (
    <S.Wrapper>
      <S.Header>
        <div />
        {!simple && !noFilters && (
          <aside style={{ margin: '20px 0' }}>
            {searchPlaceholder && (
              <SearchTable
                searchPlaceholder={searchPlaceholder}
                type={type}
                category={category}
                getValues={getValues}
              />
            )}
            {filtersTable && (
              <FiltersTable
                getValues={getValues}
                type={type}
                filtersTable={filtersTable}
                category={category}
              />
            )}
          </aside>
        )}
        {horizontalMenu && (
          <TableMenu buttons={horizontalMenu.horizontalMenuButtons} />
        )}
        {horizontalTitle && <TableTitle title={horizontalTitle} />}
      </S.Header>
      <Table style={tableStyle}>
        <Thead>
          <Tr>{header}</Tr>
        </Thead>
        <Tbody>
          {rows?.length > 0 ? (
            rowsRender
          ) : (
            <Tr>
              <S.EmptyTd>Brak wyników wyszukiwania.</S.EmptyTd>
            </Tr>
          )}
        </Tbody>
      </Table>
      {!simple && (
        <Pagination
          changePage={changePage}
          changeSize={changeSize}
          countPages={totalPages}
          size={+size}
          optionsPagination={options}
        />
      )}
    </S.Wrapper>
  );
};

export default TableComponent;
