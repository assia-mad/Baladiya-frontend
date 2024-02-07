import React, { useContext } from 'react';
import LanguageContext from './Languages/LanguageContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const StyledTableCell = styled(TableCell)({
  height: '80px',
});

const TableComponent = ({ columns, data }) => {
  const { direction } = useContext(LanguageContext);
  const { t } = useTranslation();

  return (
    <TableContainer style={{ direction: direction }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell key={index}>
                <b>{t(column.label)}</b>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, cellIndex) => (
                <StyledTableCell key={cellIndex}>
                  {column.render ? column.render(item) : item[column.dataKey]}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
