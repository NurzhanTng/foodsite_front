import BackgroundMap from "./BackgroundMap.tsx";
import SlideMenu from "./SlideMenu.tsx";
import useMainHook from "../hooks/useMainHook.ts";

const DeliveryPage = () => {
  const state = useMainHook();

  return (
    <div className="h-[100vw]">
      <BackgroundMap {...state} />
      <SlideMenu {...state} />
    </div>
  );
};

export default DeliveryPage;
