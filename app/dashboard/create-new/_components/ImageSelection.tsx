"use client";
import React, { useState } from "react";
import Image from "next/image";

function ImageSelection() {
  const [file, setFile] = useState(null);

  const onFileSelected = (event) => {
    console.log(event.target.file[0]);
    setFile(event.target.file[0]);
  };
  return (
    <div>
      <label> Select Image or your room</label>
      <div className="mt-3">
        <label htmlFor="upload-image">
          <div
            className={`p-28 border 
              rounded-xl border-dotted flex justify-center
              border-primary bg-slate-200 
              cursor-pointer hover:shadow-lg
           ${file && "p-0 bg-white"}
           `}
          >
            {!file ? (
              <Image
                src={"/imageupload.png"}
                width={70}
                height={70}
                alt="imageupload"
              />
            ) : (
              <Image
                src={URL.createObjectURL(file)}
                width={300}
                height={300}
                className="w-[300px] h-[300px] object-cover"
                alt="urlImage"
              />
            )}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
export default ImageSelection;
