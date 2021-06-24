import React from 'react';
import * as S from './OfferDetails.css';
import Indicator from 'components/atoms/Indicator';
import Rating from '@material-ui/lab/Rating';
import ReactionForm from './ReactionForm';
import DuplicatesSection from './DuplicatesSection';

const OfferDetails = ({ id, offerData, onReaction }) => {
  return (
    <>
      {!offerData ? (
        <Indicator />
      ) : (
        <S.BackgroundWrapper>
          <S.MainWrapper>
            <S.InfoSection>
              <S.TitleSection>
                <h2>{offerData.offerData.name}</h2>
                <img src={offerData.offerData.image} alt='Zdjęcie' />
              </S.TitleSection>
              <S.DetailsSection>
                <h3>Dane oferty</h3>
                <S.SingleDetails>
                  <p>Ocena:</p>
                  <Rating
                    name='half-rating-read'
                    value={offerData.rating.value}
                    precision={0.10}
                    readOnly
                  />
                  <span>{offerData.rating.summary}</span>
                </S.SingleDetails>
                <S.SingleDetails>
                  <p>Waga:</p>
                  <span>{offerData.offerData.amount} g</span>
                </S.SingleDetails>
                <S.SingleDetails>
                  <p>Cena:</p>
                  <span>{offerData.offerData.price} zł</span>
                </S.SingleDetails>
                <S.SingleDetails>
                  <p>Link produktu: </p>
                  <a href={offerData.offerData.link}>link</a>
                </S.SingleDetails>
                <S.SingleDetails>
                  <p>Portal: </p>
                  <a href={offerData.portal.link}>{offerData.portal.name}</a>
                </S.SingleDetails>
              </S.DetailsSection>
              <DuplicatesSection duplicates={offerData.duplicates} />
            </S.InfoSection>
            <S.CommentsWrapper>
              <S.CommentsSection>
                <ReactionForm id={id} onReaction={onReaction} />
                <S.ExistingCommentsWrapper>
                  <h2>Dodane:</h2>
                  {offerData.reactions.length === 0 ? (
                    <h2>Dodaj komentarz jako pierwszy!</h2>
                  ) : Object.entries(offerData.reactions).map(([, v], idx) =>
                    <S.ExistingComment>
                      <S.ReactionData>
                        <S.SimpleReactionData>
                          <p>Użytkownik:</p>
                          <p>{v.email}</p>
                        </S.SimpleReactionData>
                        <S.SimpleReactionData>
                          <p>Ocena: </p>
                          <Rating
                            name='half-rating-read'
                            value={v.points}
                            precision={0.5}
                            readOnly
                          />
                        </S.SimpleReactionData>
                      </S.ReactionData>
                      <S.ExistingCommentTextArea readOnly={true} value={v.content}/>
                    </S.ExistingComment>,
                  )}
                </S.ExistingCommentsWrapper>
              </S.CommentsSection>
            </S.CommentsWrapper>
          </S.MainWrapper>
        </S.BackgroundWrapper>
      )}
    </>
  );
};

export default OfferDetails;