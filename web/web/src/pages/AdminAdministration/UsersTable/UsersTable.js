import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import allActions from 'actions';

import Table from 'components/tables/Table';
import Indicator from 'components/atoms/Indicator';
import { styledTable } from 'components/tables/helpers/changeStylesBrakpoints';
import { usersFilters } from './UsersTableFilters';
import { Select } from 'm-web-components';
import { userRolesSelect } from '../constantsAdministrations';

import ModalContent from './ModalContent';
import Modal from 'components/shared/RowMenuModal/Modal';
import * as S from '../Administration.css';
import { toast } from 'react-toastify';
import { api } from 'API';

const Wrapper = styled.div`
  //change breakpoint for mobile view
  @media screen and (max-width: 1000px) {
    ${styledTable}
  }
`;

const changeEmailFiels = [
  {
    as: (
      <S.UserInput
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          autoComplete: 'off',
        }}
      />
    ),
    name: 'email',
    label: 'Email*',
    rules: { required: 'To pole jest wymagane' },
  },
];

const changePasswordFiels = [
  {
    as: (
      <S.UserInput
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          type: 'password',
          autocomplete: 'new-password',
        }}
      />
    ),
    name: 'password',
    label: 'Hasło*',
    rules: { required: 'To pole jest wymagane' },
  },
  {
    as: (
      <S.UserInput
        type=''
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          type: 'password',
          autocomplete: 'new-password',
        }}
      />
    ),
    name: 'repeatPassword',
    label: 'Powtórz hasło*',
    rules: { required: 'To pole jest wymagane' },
  },
];

const roleFields = [
  {
    as: (
      <Select
        options={userRolesSelect}
        placeholder='Rola użytkownika'
        styles={{ control: base => ({ ...base, height: '50px' }) }}
      />
    ),
    type: 'select',
    name: 'role',
    label: 'Rola*',
    rules: { required: 'To pole jest wymagane' },
  },
];

const CATEGORY = 'admin/';
const TYPE = 'users';

const UsersTable = () => {
  const dispatch = useDispatch();
  const { users: dataTable } = useSelector(state => state.currentPageTables);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submit, setSubmit] = useState('');
  const [modalData, setModalData] = useState({});

  const [menuFunctions, setMenuFunctions] = useState({
    changeStatus: false,
    delete: false,
    invite: false,
    thanks: false,
    currentRow: null,
  });

  const getValues = (type = TYPE, newValue = null, category = CATEGORY) => {
    dispatch(
      allActions.currentPageTableAction.tableGetAction(type, newValue, category)
    );
  };

  const activateUser = async id => {
    try {
      await api.putActivate(id);
      toast.success('Nastąpiła udana aktywacja konta');
    } catch (e) {
      toast.error('Wystąpił problem podczas aktywowania konta');
    }

    getValues();
    setIsModalOpen(false);
  };

  const emailChange = async (id, data) => {
    try {
      await api.putChangeEmail(id, data);
      toast.success('Nastąpiła udana zmiana adresu email');
    } catch (e) {
      toast.error('Wystąpił problem podczas zmiany adresu email');
    }

    getValues();
    setIsModalOpen(false);
  };

  const resetPassword = async id => {
    try {
      await api.putResetPassword(id);
      toast.success('Hasło zostało zresetowane');
    } catch (e) {
      toast.error('Wystąpił problem podczas resetowania hasła');
    }
    getValues();
    setIsModalOpen(false);
  };

  const deleteUser = async id => {
    try {
      await api.deleteUser(id);
      toast.success('Konto zostało usunięte');
    } catch (e) {
      toast.error('Wystąpił problem podczas usuwania konta');
    }
    getValues();
    setIsModalOpen(false);
  };

  const passwordChange = async (id, data) => {
    try {
      await api.putChangePassword(id, data);
      toast.success('Nastąpiła udana zmiana hasła');
    } catch (e) {
      toast.error('Wystąpił problem podczas zmiany hasła');
    }
    getValues();
    setIsModalOpen(false);
  };

  const roleChange = async (id, data) => {
    try {
      await api.putChangeRole(id, { role: data?.role?.value });
      toast.success('Nastąpiła udana zmiana roli');
    } catch (e) {
      toast.error('Wystąpił problem podczas zmiany roli');
    }
    getValues();
    setIsModalOpen(false);
  };

  const handleOpenModal = (row, fName) => {
    let info;
    let fields;
    switch (fName) {
      case 'activateUser':
        info = 'Czy na pewno chcesz aktywować poniższego użytkownika?';
        setSubmit('activateUser');
        break;
      case 'emailChange':
        info = 'Wprowadź nowy adres email dla poniższego użytkownika.';
        fields = changeEmailFiels;
        setSubmit('emailChange');
        break;
      case 'passwordChange':
        info = 'Wprowadź nowe hasło dla poniższego użytkownika.';
        fields = changePasswordFiels;
        setSubmit('passwordChange');
        break;
      case 'resetPassword':
        info = 'Czy na pewno chcesz zresetować hasło poniższego użytkownika?';
        setSubmit('resetPassword');
        break;
      case 'deleteUser':
        info = 'Czy na pewno chcesz usunąć poniższego użytkownika?';
        setSubmit('deleteUser');
        break;
      case 'roleChange':
        info = 'Czy na pewno chcesz zmienić rolę poniższego użytkownika?';
        fields = roleFields;
        setSubmit('roleChange');
        break;
      default:
        setSubmit('');
    }

    setModalData({
      row,
      info,
      fields,
    });

    setIsModalOpen(true);
  };

  const submitMethod = () => {
    switch (submit) {
      case 'activateUser':
        return activateUser;
      case 'emailChange':
        return emailChange;
      case 'passwordChange':
        return passwordChange;
      case 'resetPassword':
        return resetPassword;
      case 'deleteUser':
        return deleteUser;
      case 'roleChange':
        return roleChange;
      default:
        return console.log;
    }
  };

  useEffect(() => {
    getValues();
  }, []);

  const columns = [
    {
      title: 'ID',
      fieldName: 'id',
      draggable: false
    },
    {
      title: 'Imię',
      fieldName: 'name',
      sorting: true,
      draggable: false
    },
    {
      title: 'Nazwisko',
      fieldName: 'surname',
      sorting: true,
      draggable: false
    },
    {
      title: 'Adres E-mail',
      fieldName: 'email',
      sorting: true,
      draggable: false
    },
    { title: 'Rola', fieldName: 'role', sorting: true, draggable: false },

    {
      title: 'Auth provider',
      fieldName: 'provider',
      sorting: false,
      draggable: false
    },
    { title: '', fieldName: 'menu', draggable: false },
  ];

  return (
    <S.BookmarkWrapper style={{ padding: '0px' }}>
      <Wrapper>
        {!dataTable ? (
          <Indicator />
        ) : (
          <Table
            type={TYPE}
            category={CATEGORY}
            columns={columns}
            rows={dataTable}
            getValues={getValues}
            searchPlaceholder='Szukaj'
            filtersTable={usersFilters}
            tableToolData={{}}
            data={dataTable}
            menuFunctions={menuFunctions}
            setMenuFunctions={setMenuFunctions}
            isCandidates={true}
            tableStyle={{ border: 'none' }}
            handleOpenModal={handleOpenModal}
          />
        )}
      </Wrapper>

      {submit && (
        <Modal open={isModalOpen} cancelFunc={() => setIsModalOpen(false)}>
          <ModalContent
            onSubmit={submitMethod()}
            cancel={() => setIsModalOpen(false)}
            {...modalData}
          />
        </Modal>
      )}
    </S.BookmarkWrapper>
  );
};

export default UsersTable;
