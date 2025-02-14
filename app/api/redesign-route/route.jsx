import axios from "axios";
import "dotenv/config";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";
import { useUser } from "@clerk/nextjs";

//TODO: Insierir a Api key do replicate
const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_KEY,
});

export async function POST(req) {
  const { user } = useUser();
  const { imageUrl, roomType, desingType, additionalReq } = await req.json();

  try {
    const input = {
      image: imageUrl,
      prompt:
        "A" +
        roomType +
        "with a " +
        desingType +
        "style interior" +
        additionalReq,
    };

    const output = await replicate.run(process.env.NEXT_PULBIC_MODEL_URL, {
      input,
    });
    const base64ImgURL = await convertImageToBase64(output);
    const fileName = Data.now() + ".png";
    const storageRef = ref(storage, "room-redesign/" + fileName);
    await uploadString(storageRef, base64ImgURL, "data_url");
    const downloadURL = await getDownloadURL(storageRef);

    const dbResult = await db
      .insert(AiGeneratedImage)
      .values({
        roomType,
        designType: desingType,
        orgImage: imageUrl,
        aiImage: downloadURL,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ id: AiGeneratedImage.id });
    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

async function convertImageToBase64(imageUrl) {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(response.data).toString("base64");
  return "data:image/png;base64," + base64ImageRaw;
}
