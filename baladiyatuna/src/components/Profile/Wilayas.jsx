import React, { useState, useEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';



const WilayaSelect = () =>{
const [wilayas, setWilayas] = useState([]);
const [selectedWilaya, setSelectedWilaya] = useState(null);


useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      
    try {
      const response = await axios.get(storedApiEndpoint+`wilayas/`);
      setWilayas(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error.response.data);
    }
  };


  return (
    <TextField
      select
      label="Wilaya"
      onChange={e => setSelectedWilaya(e.target.value)}
      fullWidth
    >
      {wilayas.map((option) => (
        <MenuItem key={option.id} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  )};


export default WilayaSelect;
