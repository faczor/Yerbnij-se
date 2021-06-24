import React from 'react';
import { Td, Tr } from 'react-super-responsive-table';
import GetAppIcon from '@material-ui/icons/GetApp';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { api } from 'API';

const DownloadButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  font-weight: 600;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.background};

  svg {
    margin: auto 10px auto 0px;
    color: ${({ theme }) => theme.background};
  }
`;

const ImgWrapper = styled.div`
  width: 50%;
  display: contents;
  justify-content: center;
  align-items: center;
  position: relative;
  
  img {
    margin: auto;
    width: 40%;
  }
`;
const ScraperTableRow = ({ row, cols }) => {

  const requestSrap = async code => {
    try {
      const {data} = await api.requestScrap(code);
      toast.success(`Poprawnie wymuszono proces scrapowania`);
    } catch(err) {
      toast.error(
        <div>
          <p>Wystąpił błąd podczas próby scrapowania</p>
        </div>
      );
    }
  };
  
  const cells = Object.entries(cols).map(([, v], idx) => (
    <Td key={v}>
      {cols[idx].fieldName === 'request' && (
        <DownloadButton onClick={() => requestSrap(row.code)}>
          <GetAppIcon /> SCRAPUJ
        </DownloadButton>
      )}
      {cols[idx].fieldName !== 'request' && cols[idx].fieldName !== 'image' && row[cols[idx].fieldName]}
      {cols[idx].fieldName === 'image' && (
        <ImgWrapper>
          <a href={row.link}><img src={row.image} alt='logo'/></a>
        </ImgWrapper>
      )}
    </Td>
  ));

  return <Tr>{cells}</Tr>;
};

export default ScraperTableRow;