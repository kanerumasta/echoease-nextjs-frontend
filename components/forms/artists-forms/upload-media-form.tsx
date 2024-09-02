"use client";

import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { IoMdCloudUpload } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

export default function UploadMediaForm() {
  const { setValue, watch, register } = useFormContext();
  const sampleVideo1InputRef = useRef<HTMLInputElement | null>(null);
  const selectedFiles: File[] | [] = watch("sample_videos") || [];
  const dropZoneRef = useRef<HTMLDivElement | null>(null);

  // Handle drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add("bg-blue-100");
    }
  };

  // Handle drag leave event
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("bg-blue-100");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("bg-blue-100");
    }
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      const filteredFiles = [
        ...selectedFiles,
        ...newFiles.filter((file) => !isDuplicateFile(file, selectedFiles)),
      ];
      setValue("sample_videos", filteredFiles);
    }
  };

  const isDuplicateFile = (file: File, files: File[]) => {
    return files.some(
      (existingFile) =>
        existingFile.name === file.name && existingFile.size === file.size
    );
  };

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
            if (selectedFiles.length < 1) {
              setValue("sample_videos", Array.from(e.target.files));
            } else {
              const newSelectedFiles = [
                ...selectedFiles,
                ...Array.from(e.target.files).filter(
                  (file) => !isDuplicateFile(file, selectedFiles)
                ),
              ];

              setValue("sample_videos", newSelectedFiles);
            }
          }
        }}
      />
      <div>
        <h2 className="mb-4 font-semibold text-gray-600">
          Upload Requirements
        </h2>
        <div className="space-y-2">
          <p className="text-xs text-gray-400">
            <span className="text-gray-700">Upload Limit:</span> You must upload
            at least 2 videos but no more than 3.
          </p>
          <p className="text-xs text-gray-400">
            <span className="text-gray-700">Duration:</span> Each video should
            be less than 3 minutes long.
          </p>
          <p className="text-xs text-gray-400">
            <span className="text-gray-700">File Size:</span> Each video must
            not exceed 50MB.
          </p>
          <p className="text-xs text-gray-400">
            <span className="text-gray-700">Supported Formats:</span> Only video
            files are allowed (e.g., MP4, AVI, MOV).
          </p>
        </div>
      </div>
      <div
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="border-2 border-dashed p-8 border-blue-300 rounded-lg"
      >
        {(!selectedFiles || selectedFiles?.length <= 0) && (
          <div
            onClick={() => {
              if (sampleVideo1InputRef.current) {
                sampleVideo1InputRef.current.click();
              }
            }}
            className="flex flex-col justify-center items-center min-w-[200px] h-[150px]  hover:cursor-pointer  "
          >
            <IoMdCloudUpload color="#2f9fe1" size={50} />
            <p>Click or Drag & Drop File here</p>
          </div>
        )}

        <div>
         
          <ul>
            {selectedFiles?.map((videoFile) => (
              <li
                key={videoFile.name}
                className="flex items-center my-2 bg-blue-200 p-2 rounded-md justify-between"
              >
                <span>{videoFile.name}</span>

                <TiDelete
                  className="hover:cursor-pointer"
                  size={25}
                  onClick={() => {
                    const filteredFiles = selectedFiles?.filter(
                      (file) => file !== videoFile
                    );
                    setValue("sample_videos", filteredFiles);
                  }}
                  color="#f34139"
                />
              </li>
            ))}
          </ul>
          {selectedFiles?.length < 3 && selectedFiles?.length > 0 && (
            <div onClick={() => {
              sampleVideo1InputRef.current?.click();
            }} className="w-[60%] hover:cursor-pointer hover:bg-slate-200  rounded-lg mx-auto  flex flex-col items-center justify-center ">
              <MdAdd
                className=""
                color="#15e871"
                size={50}
                
              />
              <p>Add more</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
