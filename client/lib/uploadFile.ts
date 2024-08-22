import toast from "react-hot-toast";

export default async function uploadFile(file: File, oldFile?: string) {
  try {
    const formData = new FormData();

    formData.set("file", file);
    if (oldFile) formData.set("oldFile", oldFile);

    const res = await fetch("/api/fileupload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  } catch (error) {
    toast.error("Error Uploading image, please try again later !");
  }
}
