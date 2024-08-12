import React, { useEffect, useRef, useState } from "react";
import Tesseract, { createWorker } from "tesseract.js";

const test = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    previewFile(file);
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
  };

  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("idle");
  const [ocrResult, setOcrResult] = useState<string>("");

  const workerRef = useRef<Tesseract.Worker | null>(null);
  useEffect(() => {
    const initializeWorker = async () => {
      const worker = await createWorker("eng");
      const ret = await worker.recognize(imagePreview!);

      console.log(ret.data.text);
      setOcrResult(ret.data.text);
      await worker.terminate();
    };

    initializeWorker();
  }, [imagePreview]);

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {ocrResult}
    </div>
  );
};

export default test;
