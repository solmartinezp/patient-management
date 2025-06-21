import { useEffect, useState, useRef } from "react";
import { Patient } from "../types/patient";
import { InfiniteData } from "@tanstack/react-query";

export function usePersistedPatients(data?: InfiniteData<Patient[]>) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem("localPatients");
    const localPatients: Patient[] = stored ? JSON.parse(stored) : [];

    if (localPatients.length > 0) {
      setPatients(localPatients);
    } else if (data) {
      const allPatients = data.pages.flat();
      setPatients(allPatients);
    }

    isInitializedRef.current = true;
  }, [data]);

  useEffect(() => {
    if (isInitializedRef.current) {
      localStorage.setItem("localPatients", JSON.stringify(patients));
    }
  }, [patients]);

  return [patients, setPatients] as const;
}
