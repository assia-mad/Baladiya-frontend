import React from 'react';
import { useTranslation } from 'react-i18next';
import MenuSelect from './MenuSelect';
import algeriaCities from '../../../dzData.json';

const Wilayas = ({ handleSelectWilaya, selectedCode }) => {
  const { t } = useTranslation();
  const wilayaData = algeriaCities.reduce((acc, city) => {
    const { wilaya_code: code, wilaya_name_ascii: name } = city;
    if (!acc[code]) {
      acc[code] = name;
    }
    return acc;
  }, {});

  return (
    <MenuSelect
      label={t('Selectionner Wilaya')}
      items={wilayaData}
      selectedCode={selectedCode}
      onChange={(e) => handleSelectWilaya(e.target.value)}
    />
  );
};

export default Wilayas;
