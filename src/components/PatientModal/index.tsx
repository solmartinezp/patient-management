import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Patient } from "../../types/patient";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { Input } from "../../enums/input";
import { Button } from "../Button";


type PatientFormValues = Omit<Patient, "id" | "createdAt">;

type Props = {
  patient?: Patient;
  onClose: () => void;
  onSubmit: (data: PatientFormValues, id?: string) => void;
}

export const PatientModal: React.FC<Props> = ({ patient, onClose, onSubmit }) => {
  const { t } = useTranslation();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientFormValues>();

  useEffect(() => {
    if (patient) {
      reset({
        name: patient.name,
        description: patient.description,
        website: patient.website,
        avatar: patient.avatar,
      });
    }
  }, [patient, reset]);

  const submitHandler = (data: PatientFormValues) => {
    onSubmit(data, patient?.id);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal"  onClick={e => e.stopPropagation()}>
        <div className="modalTitleContainer">
          <img
            src={patient ? "/assets/edit.svg" : "/assets/add.svg"}
            alt="patientModal"
            className="modalImg"
          />
          <h2>{patient ? t("editPatient") : t("addPatient")}</h2>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <label>{t("name")}</label>
          <input
            {...register(Input.NAME, {
              required: t("required"),
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: t("nameValidation"),
              },
            })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}


          <label>{t("description")}</label>
          <textarea
            {...register(Input.DESCRIPTION, {
              required: t("required"),
              minLength: {
                value: 10,
                message: t("descriptionValidation"),
              },
            })}
          />
          {errors.description && <span className="error">{errors.description.message}</span>}

          <label>{t("website")}</label>
          <input
              {...register(Input.WEBSITE, {
                required: t("required"),
                pattern: {
                  value: /^(https?:\/\/)?([\w.-]+)+\.[a-z]{2,}(\/\S*)?$/i,
                  message: t("websiteValidation"),
                },
              })}
            />
            {errors.website && <span className="error">{errors.website.message}</span>}

          <label>{t("avatar")}</label>
          <input
            {...register(Input.AVATAR, {
              required: t("required"),
            })}
          />
          {errors.avatar && <span className="error">{errors.avatar.message}</span>}

          <div className="modal-buttons">
            <Button onPress={() => handleSubmit(submitHandler)()} title={t("save")} dark />
            <Button onPress={onClose} title={t("cancel")}/>
          </div>
        </form>
      </div>
    </div>
  );
};
