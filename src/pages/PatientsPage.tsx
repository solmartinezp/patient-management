import React, { useState, useCallback } from "react";
import { usePatients } from "../hooks/usePatients";
import { PatientCard } from "../components/PatientCard";
import { PatientModal } from "../components/PatientModal";
import { Patient } from "../types/patient";
import { Spinner } from "../components/Spinner";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { usePersistedPatients } from "../hooks/usePersistPatient";
import { useTranslation } from "react-i18next";
import { Toast } from "../components/Toast";
import { ToastStatus } from "../enums/toast";
import { Button } from "../components/Button";
import "./styles.css";
import { Input } from "../components/Input";

export const PatientsPage = () => {
  const { t } = useTranslation();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePatients();

  const [patients, setPatients] = usePersistedPatients(data);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "createdAt" | null>(null);
   const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const sentinelRef = useInfiniteScroll(loadMore, {
    rootMargin: "200px",
    threshold: 0,
    disabled: !hasNextPage,
  });

  if (isError) return <p className="error-message">{t("error")}</p>;

  const toggleModal = (patient?: Patient | null) => {
    setModalOpen(prev => !prev);
    setEditingPatient(patient ?? undefined);
  };

  const handleSubmit = (formData: Omit<Patient, "id" | "createdAt">, id?: string) => {
    if (id) {
      setPatients((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...formData } : p))
      );
      setToast({ message: t("successEdit"), type: ToastStatus.SUCCESS });
    } else {
      const newPatient: Patient = {
        id: (Math.random() * 1000000).toFixed(0),
        createdAt: new Date().toISOString(),
        ...formData,
      };
      setPatients((prev) => [newPatient, ...prev]);
      setToast({ message: t("successAdd"), type: ToastStatus.SUCCESS });
    }
  };

  const filteredPatients = patients
    .filter((patient) => {
      if (!searchTerm) return true;
      const lowerSearch = searchTerm.toLowerCase();
      return (
        patient.name.toLowerCase().includes(lowerSearch) ||
        patient.createdAt.includes(searchTerm)
      );
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "createdAt") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return 0;
    });

  return (
    <>
      <div className="search-sort-container">
        <div className="search-sort-input">
          <Input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            handleChange={setSearchTerm}
          />

          <Button title={t("sortByName")} onPress={() => setSortBy("name")} dark/>

          <Button title={t("sortByDate")} onPress={() => setSortBy("createdAt")} dark/>
        </div>

        <Button title={`+${t("addPatient")}`} onPress={() => toggleModal()} />
      </div>

      <div className="card-container">
        {
          isLoading && isFetchingNextPage
          ?
            <Spinner />
          : 
            filteredPatients.length === 0
            ?
              <p className="notFound">{t("patientNotFound")}</p>
            :
              filteredPatients.map((patient, i) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onEdit={() => toggleModal(patient)}
                  style={{ "--delay": `${i * 100}ms` } as React.CSSProperties}
                />
              ))
        }
      </div>

      {/* div to detect scroll near bottom */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {modalOpen && (
        <PatientModal
          patient={editingPatient}
          onClose={toggleModal}
          onSubmit={handleSubmit}
        />
      )}
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};
