import BackgroundMap from "./BackgroundMap.tsx";
import SlideMenu from "./SlideMenu.tsx";
import Button from "../../../shared/Button.tsx";

const DeliveryPage = () => {
  return (
    <div className="h-[100vw]">
      <BackgroundMap />
      <Button
        className={" z-20 h-[50px] w-full rounded-none fixed bottom-0"}
        onClick={() => {}}
        text="Сохранить"
      />
      <SlideMenu />
    </div>
  );
};

export default DeliveryPage;