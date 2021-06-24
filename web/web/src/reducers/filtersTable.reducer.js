import {
  SET_FILTER_TABLE,
  CLEAR_FILTER_TABLE,
} from 'actions/filtersTable.action';

const INITIAL_STATE = {
  offer: {
    portal: '',
    amountFrom: '',
    amountTo: '',
    priceFrom: '',
    priceTo: '',
    productName: '',
    name: ''
  },

  adminUsers: {
    userRole: ''
  }
};

const filtersTableReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FILTER_TABLE:
      return {
        ...state,
        [action.item.nameTable]: {
          ...state[action.item.nameTable],
          [action.item.nameFilter]: action.item.value,
        },
      };

    case CLEAR_FILTER_TABLE:
      return {
        ...state,
        [action.item]: INITIAL_STATE[action.item],
      };

    default:
      return state;
  }
};

export default filtersTableReducer;
