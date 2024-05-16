import { ImageList, ImageListItem } from "@mui/material";
import { useAppSelector } from "../../../store/hooks.ts";
import { useNavigate } from "react-router-dom";

const SightSeeing = () => {
  const navigate = useNavigate();
  const sightseeings = useAppSelector((state) => state.aviata.sightseeings);

  return (
    <div className="mt-[50px] rounded-[10px] bg-white p-[20px]">
      <h2 className="font-['Sen'] text-xl font-bold text-gray-900">
        Откройте для себя эти достопримечательности
      </h2>

      <p className="mb-5 font-['Inter'] text-base font-normal leading-7 text-gray-400">
        В этих популярных местах вы точно найдете что-то для себя.
      </p>

      <ImageList sx={{ overflowX: "auto" }}>
        <ImageListItem sx={{ display: "flex", flexDirection: "row" }}>
          {sightseeings.map((sightseeing) => {
            return (
              <div key={sightseeing.sightseeing_id}>
                <div
                  onClick={() => {
                    navigate(`/sightseeing/${sightseeing.sightseeing_id}`);
                  }}
                  style={{ backgroundImage: `url(${sightseeing.image_url})` }}
                  className="mr-5 h-[150px] w-[150px] bg-transparent bg-cover bg-center shadow-image"
                />
                <p>{sightseeing.name}</p>
              </div>
            );
          })}
        </ImageListItem>
      </ImageList>
    </div>
  );
};

export default SightSeeing;
