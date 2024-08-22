import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 } from "uuid";
const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_API ?? "",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY ?? "",
    secretAccessKey: process.env.CLOUDFLARE_ACCESS_SECRET ?? "",
  },
});

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const file: File = formData?.get("file") as File;

  // check oldFile to delete it if it exists
  const oldFile: string = formData?.get("oldFile") as string;
  const isValidOldFile =
    oldFile && oldFile.includes(process.env.CLOUDFLARE_NAME ?? "");
  
    // create file buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const key = v4();
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_NAME,
    Key: key,
    Body: buffer,
  });

  let deleteObjectCommand;
  if (isValidOldFile)
    deleteObjectCommand = new DeleteObjectCommand({
      Key: oldFile.split("/")[4],
      Bucket: process.env.CLOUDFLARE_NAME,
    });

  try {
    await r2.send(putObjectCommand);
    if (isValidOldFile) await r2.send(deleteObjectCommand!);
    return NextResponse.json(
      { sucess: true, url: process.env.CLOUDFLARE_URL + key },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ sucess: false }, { status: 401 });
  }
};
