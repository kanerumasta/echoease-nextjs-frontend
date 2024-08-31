"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IVideoContext {
  selectedVideoFiles: File[];
  setSelectedVideoFiles: Dispatch<SetStateAction<File[]>>;
}

const VideoContext = createContext<IVideoContext>({
  selectedVideoFiles: [],
  setSelectedVideoFiles: () => {},
});

export default function ApplicationFormProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedVideoFiles, setSelectedVideoFiles] = useState<File[] | []>([]);
  return (
    <VideoContext.Provider
      value={{ selectedVideoFiles, setSelectedVideoFiles }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideoContext() {
  return useContext(VideoContext);
}
