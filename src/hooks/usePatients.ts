import { useInfiniteQuery, QueryFunctionContext, InfiniteData } from "@tanstack/react-query";
import { Patient } from "../types/patient";

const API_URL = process.env.REACT_APP_API_URL;

export function usePatients() {
  const fetchPatients = async ({ pageParam = 0 }: QueryFunctionContext<readonly unknown[], number>): Promise<Patient[]> => {
    const limit = 10;
    const res = await fetch(`${API_URL}?limit=${limit}&page=${pageParam + 1}`);
    if (!res.ok) throw new Error("Failed to fetch patients");
    return res.json();
  };

 
  return useInfiniteQuery<Patient[], Error, InfiniteData<Patient[]>, readonly ["patients"], number>({
    queryKey: ["patients"] as const,
    queryFn: fetchPatients,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length;
    },
  });
}
