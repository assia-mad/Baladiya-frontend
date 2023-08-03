import React from "react";
import { TextField, IconButton,  } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";

const Search = ({searchText, setSearchText , fetchData}) => {
    const { t } = useTranslation();
    return(     
               <TextField
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder={t('Rechercher')}
                    variant="outlined"
                    size="small"
                    InputProps={{
                    endAdornment: (
                        <IconButton onClick={fetchData}>
                        <SearchIcon />
                        </IconButton>
                    ),
                    }}
                />);
};

export default Search;