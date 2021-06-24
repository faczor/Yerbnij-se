export const SET_FILTER_TABLE = 'SET_FILTER_TABLE';
export const CLEAR_FILTER_TABLE = 'CLEAR_FILTER_TABLE';

const setFilterTable = item => ({
  type: SET_FILTER_TABLE,
  item,
});

const clearFiltersTable = item => ({
  type: CLEAR_FILTER_TABLE,
  item,
});

export default {
  setFilterTable,
  clearFiltersTable,
};
