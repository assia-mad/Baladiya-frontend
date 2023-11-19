import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MenuSelect from "./MenuSelect";
import algeriaCities from "../../../dzData.json";

const Wilayas = ({handleSelectWilaya, selectedCode}) => {
  const { t } = useTranslation();
  const wilayaData = algeriaCities.map((city) => ({
    code: city.wilaya_code,
    name: city.wilaya_name_ascii,
  }));

  return (
    <div>
      <MenuSelect
        label= {t('Selectionner Wilaya')}
        items={wilayaData.reduce((acc, wilaya) => {
          acc[wilaya.code] = wilaya.name;
          return acc;
        }, {})}
        selectedCode={selectedCode}
        onChange={(e) => handleSelectWilaya(e.target.value)}
      />
    </div>
  );
};
export default Wilayas;