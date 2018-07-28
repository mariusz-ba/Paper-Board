import styled from 'styled-components';
import { media } from 'utils/style-utils';

const CardsList = styled.ul`
  padding: 1rem;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  ${ media.mobile`
    grid-template-columns: 1fr;
  `}
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
`

export default CardsList;