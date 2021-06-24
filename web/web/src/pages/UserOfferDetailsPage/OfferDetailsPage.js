import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import OfferDetails from 'pages/UserOfferDetailsPage/OfferDetails';
import { api } from 'API';
import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Header = styled.h1`
  padding-left: 5%;
  display: flex;
  align-items: center;
  color: ${({ theme}) => theme.headers};
  
  :hover {
    cursor: pointer;
  }
`;

const OfferDetailsPage = () => {
  const header = "Wróć do listy produktów";
  const history = useHistory();
  const { id } = useParams();
  const [offerData, setOfferData] = useState();
  const [isReactionEdited, setIsReactionEdited] = useState(false);

  const getOffer = async () => {
    const { data } = await api.offerDetails(id);
    setOfferData(data);
  };

  useEffect(() => {
    getOffer();
  }, [id]);

  useEffect(() => {
    getOffer();
    setIsReactionEdited(false);
  }, [isReactionEdited])

  return (
    <>
      <Header onClick={() => history.goBack()}><ArrowBackIcon fontSize='large'/>{header}</Header>
      <OfferDetails
        id={id}
        offerData={offerData}
        onReaction={setIsReactionEdited}
      />
    </>
  );
};

export default OfferDetailsPage;
