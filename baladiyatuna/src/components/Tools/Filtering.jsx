import React from "react";
import { Select, MenuItem } from "@mui/material";


const Filtering  = ({filter, onFilterChange, filteritems}) => {

    return (
        <Select
            value={filter}
            onChange={e => onFilterChange(e.target.value)}
            variant="outlined"
            sx={{ width: 200, marginRight: 10 }}
            >
            {filteritems.map(option => (
                <MenuItem key={option.value} value={option.value}>
                {option.name}
                </MenuItem>
            ))}
        </Select>

    )

};

export default Filtering;