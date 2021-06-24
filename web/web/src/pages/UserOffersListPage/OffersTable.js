import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'components/tables/Table';
import allActions from 'actions';
import { offersFilters, columns } from './constrantsOffer';
import { styledTable } from 'components/tables/helpers/changeStylesBrakpoints';
import styled from 'styled-components';
import Modal from 'components/shared/RowMenuModal/Modal';
import AddCommentModal from './AddCommentModal';
import { api } from 'API';
import { toast } from 'react-toastify';
import RateModal from './RateModal';

const TYPE = 'offer';
const CATEGORY = 'user/';

const Wrapper = styled.div`
  @media screen and (max-width: 900px) {
    ${styledTable}
  }
`;

const OffersTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();
  const { offer: dataTable } = useSelector(state => state.currentPageTables);
  const [comment, setComment] = useState();
  const [rate, setRate] = useState();
  const [savedFilters, setSavedFilters] = useState();
  const [menuFunctions, setMenuFunctions] = useState({
    addComment: false,
    rate: false,
    currentRow: null,
  });

  const cancelFunction = () => {
    setMenuFunctions({
      addComment: false,
      rate: false,
      currentRow: null,
    });
    setSelectedRows([]);
  };

  const addComment = async (e, selectedRows, comment) => {
    e.preventDefault();
    try {
      await api.addReaction(selectedRows, { comment });
      if (menuFunctions.addComment) {
        setMenuFunctions(prev => ({ ...prev, addComment: false }));
      }
      getValues(TYPE, null);
      setSelectedRows([]);
      toast.success('Pomyślnie dodano komentarz.');
    } catch (e) {
      toast.error('Wystąpił błąd przy dodawaniu komentarza, spróbuj później');
    }
  };


  const rateFunction = async (e, selectedRows, points) => {
    e.preventDefault();
    try {
      await api.addReaction(selectedRows, { points });
      if (menuFunctions.rate) {
        setMenuFunctions(prev => ({ ...prev, rate: false}));
      }
      getValues(TYPE, null);
      setSelectedRows([]);
      toast.success('Pomyślnie oceniono produkt.');
    } catch (e) {
      toast.error('Wystąpił błąd przy ocenie produktu, spróbuj później')
    }
  };

  const getValues = (type = TYPE, newValue, category = CATEGORY) => {
    dispatch(
      allActions.currentPageTableAction.tableGetAction(type, newValue, category)
    );
  };

  useEffect(() => {
    getValues(TYPE, null);
  }, []);

  return (
    <Wrapper>
      <Table
        type={TYPE}
        category={CATEGORY}
        columns={columns}
        horizontalTitle='Produkty'
        data={dataTable}
        getValues={getValues}
        filtersTable={offersFilters}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        setMenuFunctions={setMenuFunctions}
      />

      {menuFunctions.addComment && (
        <Modal
          open={menuFunctions.addComment}
          cancelFunc={() => cancelFunction()}
        >
          <AddCommentModal
            confirmFunc={(e, content) =>
              addComment(e, menuFunctions.currentRow, content)
            }
            cancelFunc={() => cancelFunction()}
            setCommentContent={setComment}
          />
        </Modal>
      )}
      {menuFunctions.rate && (
        <Modal
          open={menuFunctions.rate}
          cancelFunc={() =>cancelFunction()}
        >
          <RateModal 
            confirmFunc={(e, content)=> rateFunction(e, menuFunctions.currentRow, content)}
            cancelFunc={() => cancelFunction()}
            setRate={setRate}
          />
        </Modal>
      )}
    </Wrapper>
  );
};

export default OffersTable;
