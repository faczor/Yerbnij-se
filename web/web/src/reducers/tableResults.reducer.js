import { SET_SEARCH_PARAMETERS } from 'actions/tableResults.action';

const INITIAL_STATE = {
  defaultParameters: {
    size: 10,
    totalPages: 1,
    page: 1,
    sortBy: '',
    sortDirection: 'DESC',
  },
};

const paginationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_PARAMETERS: {
      const parametersName = `${action.item?.name}Parameters`;
      return { ...state, [parametersName]: action.item };
    }

    default:
      return state;
  }
};

export default paginationReducer;
