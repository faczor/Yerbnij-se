import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from 'actions';
import Table from 'components/tables/Table';

const TYPE = 'scrapers'
const CATEGORY = 'admin/';

const ScraperTable = () => {
  const dispatch = useDispatch();
  const { scrapers: dataTable } = useSelector(state => state.currentPageTables);

  const getValues = (type = TYPE, newValue, category = CATEGORY) => {
    dispatch(
      allActions.currentPageTableAction.tableGetAction(type, newValue, category)
    );
  };

  useEffect(() => {
      getValues(TYPE, null);
  }, []);

  const columns = [
      {
          title: '',
          fieldName: 'image',
          sorting:false,
      },
      {
          title: "Portal",
          fieldName: 'portal',
          sorting: true,
      },
      {
          title: "Data ostatniego scrapowania",
          fieldName: "scrapDate",
          sorting: true,
      },
      {
          title: "Kod odpowiedzi",
          fieldName: "response",
          sorting: false,
      },
      {
          title: '',
          fieldName: 'request',
          sorting: false
      }
  ];

  return (
      <>
        {!dataTable ? (
            <div>Wystąpił błąd przy pobieraniu portali</div>
        ) : (
            <Table 
            type={TYPE}
            category={CATEGORY}
            columns={columns}
            data={dataTable}
            getValues={getValues}
            searchPlaceholder='Szukaj'
            filtersTable={[]}
            tableToolData={{}}
            tableStyle={{ border: 'none' }}
            noFilters
            />
        )}
      </>
  );
}

export default ScraperTable;