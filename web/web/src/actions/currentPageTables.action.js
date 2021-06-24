import tableResults from 'actions/tableResults.action';
import { toast } from 'react-toastify';

export const SET_CURRENT_PAGE_TABLES = 'SET_CURRENT_PAGE_TABLES';

const setCurrentPageTables = item => ({
  type: SET_CURRENT_PAGE_TABLES,
  item,
});

const tableGetAction = (
  type,
  newValue,
  category,
  suffix = ''
) => async dispatch => {
  try {
    const { content } = await dispatch(
      tableResults.getTableResultsAction(type, newValue, category, suffix)
    );

    dispatch(setCurrentPageTables({ content, type }));
  } catch (e) {
    toast.error(
      'Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z dostawcą oprogramowania'
    );
  }
};

export default {
  tableGetAction,
  setCurrentPageTables,
};
