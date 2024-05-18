import BackgroundMap from "./BackgroundMap.tsx";
import SlideMenu from "../ui/SlideMenu.tsx";
import useMainHook from "../hooks/useMainHook.ts";
// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const DeliveryPage = () => {
  const state = useMainHook();
  // const [heightValue, setHeightValue] = useState(0);
  //
  // const handleInputChange:
  //   | React.ChangeEventHandler<HTMLInputElement>
  //   | undefined = (event) => {
  //   const value = parseInt(event.target.value);
  //   setHeightValue(value);
  // };

  return (
    // <div className="flex h-screen flex-col items-center justify-center">
    //   <input
    //     type="number"
    //     className="mb-4 border border-gray-300 bg-bgColor2 p-2"
    //     value={heightValue}
    //     onChange={handleInputChange}
    //   />
    //   <div className="flex">
    //     <div
    //       className="transition-height mr-4 bg-blue-500 p-4 text-white duration-500"
    //       style={{ height: `${heightValue}px` }}
    //     >
    //       Left Div
    //     </div>
    //     <div
    //       className="transition-height bg-green-500 p-4 text-white duration-500"
    //       style={{ height: `${heightValue}px` }}
    //     >
    //       Right Div
    //     </div>
    //   </div>
    // </div>

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
