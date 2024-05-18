import BackgroundMap from "./BackgroundMap.tsx";
import SlideMenu from "./SlideMenu.tsx";
import useMainHook from "../hooks/useMainHook.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const DeliveryPage = () => {
  const state = useMainHook();

  return (
    <div className="h-[100vh]">
      <div
        onClick={state.onClose}
        className="fixed left-[20px] top-[15px] z-20 rounded-full px-[16px] py-[11px] text-xl backdrop-blur backdrop-filter"
      >
        <FontAwesomeIcon icon={faArrowLeft} color="#5288C1" />
      </div>
      <BackgroundMap {...state} />
      <SlideMenu {...state} />
    </div>
  );
};

export default DeliveryPage;
