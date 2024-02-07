import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MenuSelect from './MenuSelect';
import algeriaCities from '../../../dzData.json';

const Communes = ({ selectedWilayaCode, selectedCommune, onSelectCommune }) => {
  const { t } = useTranslation();
  const [communes, setCommunes] = useState({});

  useEffect(() => {
    const filteredCommunes = algeriaCities
      .filter((city) => city.wilaya_code === selectedWilayaCode)
      .reduce((acc, city) => {
        acc[city.id] = city.commune_name_ascii;
        return acc;
      }, {});

    setCommunes(filteredCommunes);
  }, [selectedWilayaCode]);

  return (
    <MenuSelect
      label={t('Selectionner Commune')}
      items={communes}
      selectedCode={selectedCommune}
      onChange={(e) => onSelectCommune(e.target.value)}
    />
  );
};

export default Communes;
