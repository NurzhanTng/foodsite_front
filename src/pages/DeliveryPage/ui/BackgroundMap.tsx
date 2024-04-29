import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import fetchAddressByCoordinates from "../fetch/fetchAddressByCoordinates.ts";
import { CompanyState } from "../../../store/slices/companySlice.ts";
import { OrderState } from "../../../store/slices/orderSlice.ts";

type BackgroundMapProps = {
  isDelivery: boolean;
  companyState: CompanyState;
  orderState: OrderState;
  setErrorText: (text: string) => void;
};

const BackgroundMap = ({
  setErrorText,
  isDelivery,
  companyState,
  orderState,
}: BackgroundMapProps) => {
  const handleClick = (props: any) => {
    const [lat, long]: [number, number] = props.get("coords");
    fetchAddressByCoordinates(long, lat)
      .then((data) => console.log("My fetched data:", data))
      .catch((error) => console.log("map error:", error));
    setErrorText("");
  };

  return (
    <YMaps>
      <Map
        width="100%"
        height="100vh"
        defaultState={{ center: [43.204077, 76.906799], zoom: 12 }}
        onClick={handleClick}
      >
        {!isDelivery &&
          companyState.companies.map((companySpot, index) => {
            return (
              <Placemark
                options={{
                  iconColor:
                    orderState.company_id === companySpot.id
                      ? "#5288C1"
                      : "#6A7D91",
                }}
                key={index}
                geometry={[companySpot.address.lat, companySpot.address.long]}
              />
            );
          })}

        {isDelivery && (
          <Placemark
            options={{
              iconColor: "#5288C1",
            }}
            geometry={[orderState.address.lat, orderState.address.long]}
          />
        )}
      </Map>
    </YMaps>
  );
};

export default BackgroundMap;
