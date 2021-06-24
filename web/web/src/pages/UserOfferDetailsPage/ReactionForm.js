import React, { useState } from 'react';
import * as S from './ReactionForm.css';
import Rating from '@material-ui/lab/Rating';
import { Button } from 'm-web-components';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import { IconButton } from '@material-ui/core';
import { api } from '../../API';
import { toast } from 'react-toastify';

const ReactionForm = ({ id, onReaction }) => {

  const [rate, setRate] = useState();
  const [comment, setComment] = useState();
  const [isFavourite, setIsFavourite] = useState(false);

  const handleRating = e => {
    console.log(e.target.value);
    setRate(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const body = {
        isFavourite: isFavourite,
        comment: comment,
        points: rate,
      };
      await api.addReaction(id, body);
      onReaction(true);
      toast.success('Poprawnie dodano reakcje do produktu');
    } catch (e) {
      toast.error('Wystąpił błąd spróbuj później');
    }
  };

  const handleCommentChange = e => {
    console.log(e.target.value);
    setComment(e.target.value);
  };

  const onClickIcon = () => {
    console.log(isFavourite);
    setIsFavourite(!isFavourite);
  };

  return (
    <>
      <S.Wrapper>
        <S.Header>
          <h2>Dodaj reakcje:</h2>
          <Button
            onClick={handleSubmit}
            colorType='primary'
            padding='5px 10px'
            margin='0 0 0 20px'
            fontWeight='600'
            style={{ border: 'none' }}
          >
            Zatwierdź
          </Button>
        </S.Header>
        <S.UpperPart>
          <S.SimpleUpper>
            <span>Oceń produkt</span>
            <Rating name='half-rating' defaultValue={0.0} precision={0.5} onChange={handleRating} />
          </S.SimpleUpper>
          <S.SimpleUpper>
            <span>Ulubiony</span>
            {isFavourite ? (
              <S.Icon>
                <IconButton>
                  <FavoriteRoundedIcon
                    onClick={onClickIcon}
                    fontSize='large'
                    titleAccess='Usuń z ulubionych'
                    color='secondary'
                  />
                </IconButton>
              </S.Icon>
            ) : (
              <S.Icon>
                <IconButton>
                  <FavoriteBorderRoundedIcon
                    onClick={onClickIcon}
                    fontSize='large'
                    titleAccess='Dodaj do ulubionych'
                    color='secondary'
                  />
                </IconButton>
              </S.Icon>
            )}
          </S.SimpleUpper>
        </S.UpperPart>
        <S.LowerPart>
          <S.StyledTextArea onChange={handleCommentChange} />
        </S.LowerPart>
      </S.Wrapper>
    </>
  );
};

export default ReactionForm;