import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControlLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const StyledTableCell = styled(TableCell)({
  height: '80px',
});

const StyledImg = styled('img')({
  width: '80px',
  height: '80px',
});

const StateCell = styled(TableCell)(({ state }) => ({
  height: '80px',
  color: state === 'en traitement' ? 'blue' : state === 'validé' ? 'green' : 'red',
}));

const TableComponent = ({ columns, data, onEdit, onDelete, onValidate }) => {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>
                <b>{t(column.label)}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column, index) => (
                <StyledTableCell key={index}>
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
