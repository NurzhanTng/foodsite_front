import { useAppSelector } from "../../../store/hooks.ts";
import { ImageList, ImageListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cities = () => {
  const navigate = useNavigate();
  const cities = useAppSelector((state) => state.aviata.cities);

  // <ImageListItem key={index} sx={{ minWidth: "150px" }}>
  //   <img src={city.image_url} alt={`image_${index}`} />
  // </ImageListItem>
  // <img
  //   src={city.image_url}
  //   srcSet={city.image_url}
  //   alt="title"
  //   loading="lazy"
  //   className
  //   />
  return (
    <div className="mt-[50px] rounded-[10px] bg-white p-[20px]">
      <h2 className="font-['Sen'] text-xl font-bold leading-loose text-gray-900">
        Популярные направления
      </h2>

      <p className="mb-5 font-['Inter'] text-base font-normal leading-7 text-gray-400">
        Куда чаще всего отправляются путешественники
      </p>

      <ImageList sx={{ overflowX: "auto" }}>
        <ImageListItem sx={{ display: "flex", flexDirection: "row" }}>
          {cities.map((city) => {
            return (
              <div key={city.city_id}>
                <div
                  onClick={() => {
                    navigate(`/city/${city.city_id}`);
                  }}
                  style={{ backgroundImage: `url(${city.image_url})` }}
                  className="mr-5 h-[150px] w-[150px] bg-transparent bg-cover bg-center shadow-image"
                />
                <p>{city.name}</p>
              </div>
            );
          })}
        </ImageListItem>
      </ImageList>
    </div>
  );
};

export default Cities;
