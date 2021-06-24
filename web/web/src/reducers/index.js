import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import filtersTableReducer from './filtersTable.reducer';
import tableResultsReducer from './tableResults.reducer';
import currentPageTablesReducer from './currentPageTables.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  filtersTable: filtersTableReducer,
  tableResults: tableResultsReducer,
  currentPageTables: currentPageTablesReducer,
});

export default rootReducer;
