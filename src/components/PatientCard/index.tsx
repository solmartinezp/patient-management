import React, { useState } from "react";
import { Patient } from "../../types/patient";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";

type Props = {
  patient: Patient;
  onEdit?: () => void;
  style?: React.CSSProperties;
}

export const PatientCard: React.FC<Props> = ({
  patient,
  onEdit,
  style,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { t } = useTranslation();

  const shortDescription =
    patient.description.split(" ").slice(0, 20).join(" ") + "...";

  return (
    <div className="card" style={style}>
      <div className="content">
       <div className="image">
        {!imageError ? (
          <img
            src={patient.avatar}
            alt={patient.name}
            className="avatar-img"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="avatar-placeholder">
            {patient.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
        )}
       </div>


        <div className="card-info">
          <p className="title">{patient.name}</p>
          <p className="date">{new Date(patient.createdAt).toLocaleDateString()}</p>
          <div className={`description-container ${expanded ? "expanded" : ""}`}>
            <p className="description">{expanded ? patient.description : shortDescription}</p>
          </div>
          <div className="buttons-row">
              <Button title={expanded ? t("collapse") : t("expand")} onPress={() => setExpanded(!expanded)} dark />
            {onEdit && (
              <Button title={t("edit")} onPress={onEdit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
