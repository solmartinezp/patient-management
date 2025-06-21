import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePatients } from "../hooks/usePatients";
import { PatientCard } from "../components/PatientCard";
import { PatientModal } from "../components/PatientModal";
import { Patient } from "../types/patient";
import { Spinner } from "../components/Spinner";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export const PatientsPage = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePatients();
  

  const [patients, setPatients] = useState<Patient[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "createdAt" | null>(null);

  useEffect(() => {
    if (data) {
      const allPatients: Patient[] = data?.pages.flat() ?? [];

      setPatients(allPatients);
    }
  }, [data]);

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

  if (isLoading) return <p>Loading patients...</p>;
  if (isError) return <p className="error-message">Failed to load patients.</p>;

  const toggleModal = (patient?: Patient | null) => {
    if (modalOpen) {
      setModalOpen(false);
      setEditingPatient(undefined);
    } else if (patient) {
      setEditingPatient(patient);
      setModalOpen(true);
    } else {
      // open add modal
      setEditingPatient(undefined);
      setModalOpen(true);
    }
  };
  

  const handleSubmit = (formData: Omit<Patient, "id" | "createdAt">, id?: string) => {
    if (id) {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, ...formData } : p
        )
      );
    } else {
      const newPatient: Patient = {
        id: (Math.random() * 1000000).toFixed(0),
        createdAt: new Date().toISOString(),
        ...formData,
      };
      setPatients((prev) => [newPatient, ...prev]);
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
      <button className="add-button" onClick={() => toggleModal()}>
        Add Patient
      </button>

      <div className="search-sort-container">
      <input
        type="text"
        placeholder="Search by name or date (YYYY-MM-DD)"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <button
        onClick={() => setSortBy("name")}
        className={sortBy === "name" ? "active" : ""}
      >
        Sort by Name
      </button>

      <button
        onClick={() => setSortBy("createdAt")}
        className={sortBy === "createdAt" ? "active" : ""}
      >
        Sort by Date
      </button>
  </div>


      <div className="card-grid">
      <div className="card-grid">
      {filteredPatients.map((patient, i) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onEdit={() => toggleModal(patient)}
          style={{ "--delay": `${i * 100}ms` } as React.CSSProperties}
          className="patient-card"
        />
      ))}
</div>
      </div>

    {/* div to detect scroll near bottom */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {isFetchingNextPage && (
        <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
          <Spinner />
        </div>
      )}

      {modalOpen && (
        <PatientModal
          patient={editingPatient}
          onClose={toggleModal}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};
