import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
  const file: File = formData.get("file") as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_NAME,
    Key: "walid",
    Body: buffer,
  });

  try {
    const response = await r2.send(putObjectCommand);
    console.log(response);
    return NextResponse.json({ sucess: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ sucess: false }, { status: 401 });
  }
};
