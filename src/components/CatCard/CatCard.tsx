import styled from 'styled-components';
import { ICat } from '../../types/cats';

const StyledContainer = styled.div`
  width: 700px;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 12px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

interface ICatCardProps extends ICat {}

export const CatCard = ({ url }: ICatCardProps) => {
  return (
    <StyledContainer>
      <StyledImage src={url} alt="cat" />
    </StyledContainer>
  );
};
