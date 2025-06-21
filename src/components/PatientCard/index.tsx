import React, { useState } from "react";
import { Patient } from "../../types/patient";
import "./styles.css";
import { useTranslation } from "react-i18next";

interface Props {
  patient: Patient;
  onEdit?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const PatientCard: React.FC<Props> = ({ patient, onEdit,  className = "", style, }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <div
      className={`patient-card-root ${className}`}
      style={style}
    >
      <img src={patient.avatar} alt={patient.name} className="avatar" />
      <div className="info">
        <h2>{patient.name}</h2>
        <p>{new Date(patient.createdAt).toLocaleDateString()}</p>
        <div className={`description-wrapper ${expanded ? "expanded" : ""}`}>
          <p>{patient.description}</p>
        </div>
        <div className="buttons-row">
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? t("collapse") : t("expand")}
        </button>
          {onEdit && (
            <button className="edit-btn" onClick={onEdit}>
              {t("edit")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
