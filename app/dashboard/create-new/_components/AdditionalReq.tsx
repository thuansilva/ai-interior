import React from "react";
import { Textarea } from "@/components/ui/textarea";

function AdditionalReq({ additionalTextArea }) {
  return (
    <div className="mt-5">
      <label className="text-gray-500">
        Enter Additional Requirments (Optional){" "}
      </label>
      <Textarea
        className="mt-2"
        onChange={(e) => additionalTextArea(e.target.value)}
      ></Textarea>
    </div>
  );
}

export default AdditionalReq;
