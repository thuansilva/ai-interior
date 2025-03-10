"use client";
import React, { useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalReq";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { useUser } from "@clerk/nextjs";

function CreateNew(props) {
  const { user } = useUser();
  const [formData, setFomData] = useState([]);
  const onHandleInputChange = (value: any, fieldName: string) => {
    setFomData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const generateImageWithAi = async () => {
    const rawURLImage = await saveRawImageToFirebase();
    const result = await axios.post("/api/redesign-room", {
      imageURL: rawURLImage,
      RoomType: formData?.roomType,
      DesignType: formData?.designtype,
      additionalReq: formData?.addtionalReq,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(result.data);
  };

  // TODO: Criar a conta no firebase para storage
  const saveRawImageToFirebase = async () => {
    const fileName = Date.now() + "_raw.png";
    const imageRef = ref(storage, "room-redesign/" + fileName);

    await uploadBytes(imageRef, formData.image).then((res) => {
      console.log("FileUploaded... ");
    });

    //carregar aquivo da imagem da url do firebase
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };
  return (
    <div>
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-center text-gray-500">
        Transform any room with a click. Select a space, choose a style, and
        watch as AI instantly reimagines your environment.
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-2 
      mt-10 gap-10"
      >
        <ImageSelection
          selectedImage={(value) => onHandleInputChange(value, "image")}
        />
        <div>
          <RoomType
            selectedRoomType={(value) => onHandleInputChange(value, "room")}
          />
          <DesignType
            selectedDesingType={(value) => {
              onHandleInputChange(value, "designType");
            }}
          />
          <AdditionalReq
            additionalTextArea={(value) => {
              onHandleInputChange(value, "additionalReq");
            }}
          />

          <Button className="w-full mt-5" onClick={generateImageWithAi}>
            Generate
          </Button>
          <p className="tex-sm text-gray-400 mb-5">
            Note: 1 Credit will use to redesig your room
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateNew;
