import React from 'react';
import * as S from './DuplicatesSection.css';

const DuplicatesSection = ({ duplicates }) => {
  return (
    <>
      <S.Wrapper>
        <h3>Oferty konkurencyjne</h3>
        {duplicates.length === 0 || !duplicates ? (
          <h2>Brak ofert na innych portalach</h2>
        ) : (

          <S.Table>
            <S.Column>
              <span><b>Cena</b></span>
              <span><b>Portal</b></span>
              <span><b>Link</b></span>
            </S.Column>
            {Object.entries(duplicates).map(([, v], idx) =>
              <S.Column>
                <span>{v.price} zł</span>
                <span>{v.portal.name}</span>
                <a href={v.link}>klik</a>
              </S.Column>,
            )}
          </S.Table>

        )}
      </S.Wrapper>
    </>
  );
};

export default DuplicatesSection;