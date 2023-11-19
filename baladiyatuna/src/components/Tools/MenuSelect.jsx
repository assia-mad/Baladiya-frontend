import React from "react";
import { Select, MenuItem, FormControl,InputLabel } from "@mui/material";

const MenuSelect = ({ items, label, selectedCode, onChange }) => {
  return (
    <FormControl  fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={selectedCode}
        onChange={onChange}
      >
        {Object.entries(items).map(([code, label], index) => (
          <MenuItem key={index} value={code}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MenuSelect;
