import Image from "next/image";
import React, { useState } from "react";

function DesignType({ selectedDesingType }) {
  const [selectdOption, setSelectdOption] = useState();
  const Designs = [
    {
      name: "Modern",
      image: "/modern.png",
    },

    {
      name: "Industrial",
      image: "/industrial.png",
    },
    {
      name: "Bohemia",
      image: "/bohemia.png",
    },
  ];
  return (
    <div className=" mt-5">
      <label className="text-gray-500">Interior Design Type</label>
      <div
        className="grid grid-cols-2 md:grid-cols-3 
      lg:grid-cols-4 gap-5 mt-3"
      >
        {Designs.map((designType, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectdOption(designType.name);
              selectedDesingType(designType.name);
            }}
          >
            <Image
              src={designType.image}
              height={100}
              width={100}
              alt="design-image"
              className={`h-[70px] rounded-md hover:scale-105 
              transition-all cursor-pointer ${
                designType.name == selectdOption &&
                "border-2 border-primary rounded-md p-1"
              }`}
            />
            {designType.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignType;
