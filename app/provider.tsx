"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDetailContext } from "./_context/UserDetailContext";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    user && verifyUser();
  }, [user]);

  const verifyUser = async () => {
    try {
      const dataResult = await axios.post("/api/verify-user", {
        user: user,
      });

      setUserDetail(dataResult.data.result);

      console.log("re", dataResult.data.result);
      return dataResult.data;
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
    }
  };

  return (
    <UserDetailContext value={{ userDetail, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext>
  );
}

export default Provider;
