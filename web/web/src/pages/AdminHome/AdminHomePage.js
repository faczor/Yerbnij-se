import React from 'react';

import SingleHomeTail from 'pages/AdminHome/SingleHomeTail';
import styled from 'styled-components';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

const SecondaryWrapper = styled.div`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.secondaryWrapper};
  min-height: 55vh;
`;

const SingleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.headers};
  font-size: 35px;
  font-weight: 600;
  margin: 10px 0 20px 20px !important;
`;

const AdminHomePage = () => {

  const tailsSettings = [
    {
      id: 1,
      title: 'Personalne',
      to: '/admin/settings',
      icon: <SettingsOutlinedIcon />,
    },
    {
      id: 1,
      title: 'Systemowe',
      to: '/admin/administration',
      icon: <PeopleOutlinedIcon />,
    },
  ];

  return (
    <>
      <Title>Ustawienia</Title>
      <SecondaryWrapper>
        <SingleGrid>
          {tailsSettings.map(el => (
            <SingleHomeTail key={el.id} {...el} />
          ))}
        </SingleGrid>
      </SecondaryWrapper>
    </>
  );
};

export default AdminHomePage;
