"use client";

import { SchoolExtend } from "@/types/type";
import { useEffect, useState } from "react";

export const useSchools = (): SchoolExtend[] | undefined => {
  const [schools, setSchools] = useState<SchoolExtend[]>();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/schools`, {
        method: "GET",
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setSchools(data);
      }
    }
    fetchData();
  }, []);

  return schools;
};
