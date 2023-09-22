import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MenuSelect from "./MenuSelect";

const Wilayas = ({handleSelectChange, selectedCode}) => {
  const { t } = useTranslation();
  const items = {
    "01": "Adrar",
    "02": "Chlef",
  };


  return (
    <div>
      <MenuSelect
        label= {t('Selectionner Wilaya')}
        items={items}
        selectedCode={selectedCode}
        onChange={(e) => handleSelectChange(e.target.value)}
      />
    </div>
  );
};
export default Wilayas;