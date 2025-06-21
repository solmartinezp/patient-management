import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Patient } from "../../types/patient";
import "./styles.css";

type PatientFormValues = Omit<Patient, "id" | "createdAt">;

interface Props {
  patient?: Patient;
  onClose: () => void;
  onSubmit: (data: PatientFormValues, id?: string) => void;
}

export const PatientModal: React.FC<Props> = ({ patient, onClose, onSubmit }) => {
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
        <h2>{patient ? "Edit Patient" : "Add Patient"}</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <label>Name</label>
          <input {...register("name", { required: true })} />
          {errors.name && <span className="error">Name is required.</span>}

          <label>Description</label>
          <textarea {...register("description", { required: true })} />
          {errors.description && <span className="error">Description is required.</span>}

          <label>Website</label>
          <input {...register("website", { required: true })} />
          {errors.website && <span className="error">Website is required.</span>}

          <label>Avatar URL</label>
          <input {...register("avatar", { required: true })} />
          {errors.avatar && <span className="error">Avatar URL is required.</span>}

          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} className="cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
