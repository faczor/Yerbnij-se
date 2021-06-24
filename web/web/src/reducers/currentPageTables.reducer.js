import { SET_CURRENT_PAGE_TABLES } from 'actions/currentPageTables.action';

const INITIAL_STATE = {};

const facturesReduxer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE_TABLES:
      return { ...state, [action.item.type]: action.item.content };

    default:
      return state;
  }
};

export default facturesReduxer;
