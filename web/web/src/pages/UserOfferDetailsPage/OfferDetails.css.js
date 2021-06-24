import styled from 'styled-components';

export const BackgroundWrapper = styled.div`
  padding-top: 1%;
  border: 1px solid ${({theme}) => theme.border};
  background-color: ${({ theme }) => theme.secondaryWrapper};
  min-height: 60vh;
`;

export const MainWrapper = styled.div`
  color: ${({ theme }) => theme.input};
  display: grid;
  padding-left: 5%;
  padding-right: 5%;
  grid-row-gap: 15px;
  grid-column-gap: 20px;
  
  @media (max-width: 350px) {
    padding: 0;
  }
`;

export const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 0.6fr));;
  grid-column-gap: 20px;
  grid-row-gap: 10px;
`;

export const TitleSection = styled.div`
  background-color: ${({ theme }) => theme.thirdWrapper};
  border-radius: 5px;
  border: 1px solid ${({theme}) => theme.border};

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  img {
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 15px;
    padding: 5px;
  }
`;

export const DetailsSection = styled.div`
  display: grid;
  background-color: ${({ theme }) => theme.thirdWrapper};
  border-radius: 5px;
  border: 1px solid ${({theme}) => theme.border};
  padding: 10px;
`;

export const SingleDetails = styled.div`
  display: inline-flex;
  gap: 10px;
`;

export const CommentsWrapper = styled.div`
  padding: 10px;
  margin: -10px;
`;

export const CommentsSection = styled.div`

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 0.6fr));;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

export const ExistingCommentsWrapper = styled.div`
  background-color:  ${({theme}) => theme.thirdWrapper};
  border: 1px solid ${({theme}) => theme.border};
  border-radius: 5px;
  overflow: auto;
  padding: 10px;
  max-height: 300px;
  display: grid;
  grid-row-gap: 10px;
`;

export const ExistingComment = styled.div`
  display: grid;
`;

export const ExistingCommentTextArea = styled.textarea`
  resize: none;
  border: 1px solid ${({theme}) => theme.border};
  border-radius: 5px;
  color: ${({theme}) => theme.input};
  background-color: ${({theme}) => theme.background};;
  width: 100%;
`;

export const ReactionData = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 800px) {
    flex-direction: column;
`;

export const SimpleReactionData = styled.div`
  display: inline-flex;
  gap: 10px;
`;
