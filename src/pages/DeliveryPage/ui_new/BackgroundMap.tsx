import { Map, YMaps } from "@pbe/react-yandex-maps";

const BackgroundMap = () => {
  const handleClick = (props: any) => {
    console.log("coords:", props.get("coords"));
  };

  return (
    <YMaps>
      <Map
        width="100%"
        height="100vh"
        defaultState={{ center: [43.244077, 76.916799], zoom: 11 }}
        onClick={handleClick}
      >
      </Map>
    </YMaps>
  );
};

export default BackgroundMap;