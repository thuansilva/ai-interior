"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    user && verifyUser();
  }, [user]);

  const verifyUser = async () => {
    try {
      const dataResult = await axios.post("/api/verify-user", {
        user: user,
      });
      return dataResult.data;
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
