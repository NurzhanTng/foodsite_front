import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { OrderState, setAddress } from "../../../store/slices/orderSlice.ts";
import { CompanyState } from "../../../store/slices/companySlice.ts";
import { useAppDispatch } from "../../../store/hooks.ts";

type MainMapProps = {
  isDelivery: boolean;
  companyState: CompanyState;
  orderState: OrderState;
  setErrorText: (text: string) => void;
}

const MainMap = ({setErrorText, isDelivery, companyState, orderState}: MainMapProps) => {
  const dispatch = useAppDispatch();

  const onMapClick = (props: any) => {
    const [lat, long] = props.get("coords");
    dispatch(setAddress({ lat: lat, long: long, parsed: "" }));
    setErrorText("");
  };

  return (
    <YMaps>
      <Map
        width="100%"
        height="340px"
        defaultState={{ center: [43.244077, 76.916799], zoom: 11 }}
        onClick={onMapClick}
      >

        {!isDelivery &&
          companyState.companies.map((companySpot, index) => {
            return (
              <Placemark
                options={{
                  iconColor:
                    orderState.company_id === companySpot.id
                      ? "#5288C1"
                      : "#6A7D91"
                }}
                key={index}
                geometry={[
                  companySpot.address.lat,
                  companySpot.address.long
                ]}
              />
            );
          })}

        {isDelivery && (
          <Placemark
            options={{
              iconColor: "#5288C1"
            }}
            geometry={[orderState.address.lat, orderState.address.long]}
          />
        )}
      </Map>
    </YMaps>
  );
};

export default MainMap;