export const uploadToCloudinary = async (pics) => {
  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "suma-adugai");
    data.append("cloud_name", "duardlt5u");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/duardlt5u/image/upload`,
      {
        method: "post",
        body: data,
      }
    );

    const fileData = await res.json();
    console.log("Cloudinary response: ", fileData);
    // Return secure_url if available; otherwise, fallback to url.
    return fileData.secure_url ? fileData.secure_url : fileData.url;
  } else {
    console.log("No file provided");
  }
};
