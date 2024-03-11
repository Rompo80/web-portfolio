"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function UploadImages({ sessionId }) {
  const inputFileRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [blobs, setBlobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setCat] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setPreviews(Array.from(files).map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const files = inputFileRef.current.files;
    


    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("file", file);
    });

    const response = await fetch(`/api/upload?sessionId=${sessionId}&categoryId=${selectedCat}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setBlobs(data.uploadedImages);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <select value={selectedCat} onChange={(e) => setCat(e.target.value)}>
          <option value="">Select session category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.id}>
              {cat.type}
            </option>
          ))}
        </select>
        <button type="submit">Upload</button>
      </form>
      <div>
        {previews.map((preview, index) => (
          <div key={index}>
            <Image
              src={preview}
              alt={`Preview ${index}`}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
      {blobs.length > 0 && (
        <div>
          <h3>Uploaded Images:</h3>
          {blobs.map((blob, index) => (
            <div key={index}>
              <p>Image {index + 1}:</p>
              <div>
                Blob URL: <a href={blob.img_path}>{blob.img_path}</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
