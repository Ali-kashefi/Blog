import React, { useState } from "react";
import FileInput from "./FileInput";

import Image from "next/image";
import ShowImageModal from "./ShowImageModal";

function CustomFileController({ name = "coverImage", onFileChange }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected File:", file); // بررسی فایل انتخاب‌شده
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setOpenModal(true);
      if (onFileChange) {
        onFileChange(file); // ارسال فایل به تابع والد
      }
    } else {
      console.error("No file selected.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div>
      <FileInput onChange={handleFileChange} name={name} />

      {openModal && previewUrl && (
        <ShowImageModal open={openModal} onClose={handleCloseModal} save={() => setOpenModal(false)}>
          <Image className="object-cover object-center" fill alt="cover-image" src={previewUrl} />
        </ShowImageModal>
      )}

      {selectedFile && <p>فایل انتخاب‌شده: {selectedFile.name}</p>}
    </div>
  );
}

export default CustomFileController;
