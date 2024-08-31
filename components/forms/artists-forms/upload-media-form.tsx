"use client";

import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoMdCloudUpload } from "react-icons/io";

export default function UploadMediaForm() {
  const { setValue, watch, register } = useFormContext();
  const sampleVideo1InputRef = useRef<HTMLInputElement | null>(null);
  const selectedFiles: File[] | [] = watch("sample_videos");

  useEffect(() => {
    console.log(selectedFiles);
    if (selectedFiles) {
      console.log(selectedFiles.length <= 0);
    }
  }, [selectedFiles]);

  return (
    <>
      <h1 className="my-4 font-bold text-center text-2xl">
        Upload Work Samples
      </h1>
      <input
        {...register("sample_videos")}
        accept="video/*"
        ref={sampleVideo1InputRef}
        multiple
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files) {
            setValue("sample_videos", Array.from(e.target.files));
          }
        }}
      />

      {(!selectedFiles || selectedFiles?.length <= 0) && (
        <div
          onClick={() => {
            if (sampleVideo1InputRef.current) {
              sampleVideo1InputRef.current.click();
            }
          }}
          className="flex items-center justify-center min-w-[200px] h-[150px] border-2 hover:cursor-pointer  border-dashed border-blue-300 rounded-lg"
        >
          <IoMdCloudUpload color="#2f9fe1" size={50} />
        </div>
      )}
      <div>
        <ul>
          {selectedFiles?.map((videoFile) => (
            <li key={videoFile.name}>
              <span>{videoFile.name}</span>
              <button
                className="p-2 bg-blue-400 rounded-lg"
                onClick={() => {
                  const filteredFiles = selectedFiles?.filter(
                    (file) => file !== videoFile
                  );
                  setValue("sample_videos", filteredFiles);
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
