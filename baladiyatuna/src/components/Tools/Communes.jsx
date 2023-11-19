import React from "react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import MenuSelect from "./MenuSelect";
import algeriaCities from "../../../dzData.json";


const Communes = ({ selectedWilayaCode, selectedCommune, onSelectCommune }) => {
  const { t } = useTranslation();
  const [communes, setCommunes] = useState([]);

  useEffect(() => {
    console.log('commune component is called withhhhhhhhhhhhh',selectedCommune);
    const filteredCommunes = algeriaCities
      .filter((city) => city.wilaya_code === selectedWilayaCode)
      .map((city) => ({ id: city.id, name: city.commune_name_ascii }));

    setCommunes(filteredCommunes);
  }, [selectedWilayaCode]);
  

  return (
    <div>
      <MenuSelect
        label={t('Selectionner Commune')}
        items={communes.reduce((acc, commune) => {
          acc[commune.id] = commune.name;
          return acc;
        }, {})}
        selectedCode={selectedCommune}
        onChange={(e) => onSelectCommune(e.target.value, parseInt(e.target.value, 10))}
      />
    </div>
  );
};


export default Communes;