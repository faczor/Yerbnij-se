import React from 'react';
import { Td, Tr } from 'react-super-responsive-table';
import MenuCell from './MenuCell';
import { menuItems } from './constrantsOffer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.tableFileds};
  display: block;
  height: 100%;
  transition: 0.4s;

`;

const OffersTableRow = ({ row, cols, setMenuFunctions }) => {
  const remapped = {
    id: row.offer?.id,
    name: row.offer?.name,
    amount: row.offer?.amount,
    price: row.offer?.price,
    portal: {
      name: row.portal?.name,
      link: row.portal?.link,
    },
    rating: row.reaction?.rating,
  };

  return (
    <Tr>
      {
        Object.entries(remapped).map(([, v], idx) => (
          <Td>
            {cols[idx].fieldName === 'portal' && (
              <a href={remapped.portal.link}>{remapped.portal.name}</a>
            )}
            {cols[idx].fieldName !== 'portal' &&
            cols[idx].fieldName !== 'action' &&
            remapped[cols[idx].fieldName]}
            <StyledLink to={`/user/offer/${remapped[cols[idx].fieldName]}`}>
              {cols[idx].fieldName === 'name' && (
                <span style={{ color: theme.headers, fontWeight: '600' }}>
            {row[cols[idx].fieldName]}
          </span>
              )}
            </StyledLink>
          </Td>
        ))
      }
      <Td>
        <MenuCell
          row={row}
          menuItems={menuItems}
          setMenuFunctions={setMenuFunctions}
        />
      </Td>
    </Tr>
  );
};

export default OffersTableRow;
