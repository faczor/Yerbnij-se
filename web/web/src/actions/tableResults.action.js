import { api } from 'API';
import { toast } from 'react-toastify';

export const SET_SEARCH_PARAMETERS = 'SET_SEARCH_PARAMETERS';

const setTableResultsParameters = item => ({
  type: SET_SEARCH_PARAMETERS,
  item,
});

const fetchTableResults = async params => {
  try {
    const { data } = await api.getTableResults(params);
    return data;
  } catch (e) {
    toast.error(
      'Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z dostawcą oprogramowania'
    );
  }
};

const getTableResultsAction = (
  name,
  newValue,
  category = '',
  suffix = ''
) => async (dispatch, getState) => {
  const { tableResults } = getState();
  const parametersName = tableResults[`${name}Parameters`]
    ? `${name}Parameters`
    : 'defaultParameters';

  const prevParams = tableResults[parametersName];

  const params =
    newValue === 'clear'
      ? {
          name: `${name}`,
          suffix: `${suffix}`,
          category,
          page: prevParams.page,
          size: prevParams.size,
        }
      : {
          ...prevParams,
          ...newValue,

          //path before params
          category,
          name: `${name}`,
          suffix: `${suffix}`,
        };

  try {
    const { content, data } = await fetchTableResults(params);
    dispatch(
      setTableResultsParameters({
        ...params,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
      })
    );
    return { content };
  } catch (e) {
    toast.error(
      'Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z dostawcą oprogramowania'
    );
  }
};

export default { getTableResultsAction };
