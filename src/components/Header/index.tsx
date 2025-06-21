import React from "react";
import "./styles.css";
import { useTranslation } from "react-i18next";

export const Header = () => {
   const { t } = useTranslation();

   return (
        <div className="header-container">
        <img src="/assets/doctors.svg" alt="Icon" className="header-img" />
        <h1 className="header-title">
            {t("headerTitle")}
        </h1>
    </div>
);
};
