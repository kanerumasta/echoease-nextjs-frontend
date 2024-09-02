import { ArtistApplicationSchema } from "@/schemas";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export default function ReviewApplicationForm() {
  const { watch } = useFormContext<z.infer<typeof ArtistApplicationSchema>>();
  const genres = watch("genres");
  const selectedVideos = watch("sample_videos");
  const fb_link = watch("fb_link");
  const instagram = watch("instagram");
  const twitter = watch("twitter");

  return (
    <div>
        <h1>THIS IS REVIEW</h1>
      <div>
        <label>Genres</label>
        <ul>
          {genres.map((genre) => (
            <li>{genre.label}</li>
          ))}
        </ul>
      </div>
      <div>
        <label>Sample Videos</label>
        {selectedVideos.map((videoFile) => {
          const url = URL.createObjectURL(videoFile);
          return url ? (
            <video width="300">
              <source src={url} type="video/mp4" />
            </video>
          ) : null;
        })}
      </div>
      <div>
        <h1>Social Links</h1>
        <div>
          <span>Facebook</span>
          <p>{fb_link}</p>
        </div>
        <div>
          <span>Instagram</span>
          <p>{instagram}</p>
        </div>
        <div>
          <span>Twitter</span>
          <p>{twitter}</p>
        </div>
      </div>
    </div>
  );
}
