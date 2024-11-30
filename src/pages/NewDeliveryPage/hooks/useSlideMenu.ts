import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks/hooks.ts";
import React, { useEffect, useState } from "react";
import {
  OrderState,
  setAddress,
  setCompanyId,
  setDeliveryAmount,
  setExactAddress,
} from "../../../store/slices/orderSlice.ts";
import checkIsInPolygon from "../../../utils/checkIsInPolygon.ts";
import { CompanyState } from "../../../store/slices/companySlice.ts";
import geocodeAddressByURI, {
  Component,
  GeoObject,
} from "../fetch/geocodeAddressByURI.ts";
import { setErrors } from "../../../store/slices/mainSlice.ts";
import suggestAddress, { SuggestAddress } from "../fetch/suggestAddress.ts";

type useSlideMenuProps = {
  setErrorText: (text: string) => void;
  isDelivery: boolean;
  companyState: CompanyState;
  orderState: OrderState;
};

export type OrderAddress = {
  long: number;
  lat: number;
  parsed: string;
  exact_address: string;
};

const useSlideMenu = ({
  setErrorText,
  isDelivery,
  companyState,
  orderState,
}: useSlideMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exactAddress = useAppSelector((state) => state.order.exactAddress);
  const company = useAppSelector((state) => state.companies.companies[0]);
  const errors = useAppSelector((state) => state.main.errors);
  const user_id = useAppSelector((state) => state.user.telegram_id);
  const [stage, setStage] = useState<0 | 1 | 2>(1);
  const [height, setHeight] = useState(getHeight(stage));
  const [userLocation, setUserLocation] = useState<null | string>(null);
  const [suggestAddresses, setSuggestAddresses] = useState<SuggestAddress[]>(
    [],
  );

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [address, setAddressText] = useState(orderState.address.parsed);
  const [fetchResult, setFetchResult] = useState<GeoObject[] | null>(null);
  const [oldAddresses, setOldAddresses] = useState<OrderAddress[] | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [startHeight, setStartHeight] = useState(0);
  const [startCoords, setStartCoords] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetch(
      `${import.meta.env.VITE_REACT_APP_API_BASE_URL}service/addresses/${user_id}/`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json().then((data) => {
          console.log("Old addresses", data);
          return data;
        });
      })
      .then((data: { address: OrderAddress }[]) =>
        setOldAddresses(data.map((address) => address.address)),
      )
      .catch((error) => {
        console.error(
          "There was a problem with your fetch operation:",
          error.message,
        );
        throw error;
      });

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  useEffect(() => {
    if (height === window.innerHeight - 300 && isSearchActive) return;
    setHeight(getHeight(stage));
  }, [stage]);

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (!active) return;
      const deltaY = event.touches[0].clientY - startCoords;
      const newHeight = startHeight - deltaY;
      setHeight(Math.min(Math.max(newHeight, getHeight(0)), getHeight(2)));
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [startCoords, startHeight]);

  function getHeight(stage: 0 | 1 | 2) {
    const windowHeight = window.visualViewport?.height
      ? window.visualViewport.height
      : window.innerHeight;
    return [160, windowHeight * 0.5, windowHeight - 100][stage];
  }

  function getTop(stage: 0 | 1 | 2) {
    return [window.innerHeight - 160, window.innerHeight * 0.5, 80][stage];
  }

  const handleSearchAddress = () => {
    setIsSearchActive(true);
    setStage(2);
  };

  const handleExactAddress = () => {
    // setIsSearchActive(true);
    setStage(2);
  };

  const handleSearchBlur = () => {
    setStage(2);
  };

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setIsSearchActive(true);
    const text = event.target.value;
    setAddressText(text);

    if (timerId) clearTimeout(timerId);
    if (text === "") {
      setSuggestAddresses([]);
      return;
    }
    const newTimerId = setTimeout(() => {
      const bbox = company.delivery_layers[0].points
        .map((point) => `${Math.max(...point)},${Math.min(...point)}`)
        .join("~");
      console.log("box", bbox);
      suggestAddress(
        text,
        "76.860775,43.184827~76.996514,43.283191",
        userLocation ? userLocation : undefined,
      ).then((addresses) => {
        addresses.results && setSuggestAddresses(addresses.results);
        setErrorText("");
      });
      // fetchYandexAddressByName(text)
      //   .then((data) => {
      //     data.response.GeoObjectCollection.featureMember =
      //       data.response.GeoObjectCollection.featureMember.filter((object) => {
      //         const components =
      //           object.GeoObject.metaDataProperty.GeocoderMetaData.Address
      //             .Components;
      //         let isCorrect = false;
      //         for (const component of components) {
      //           if (
      //             component.kind === "house" ||
      //             component.kind === "district" ||
      //             component.kind === "street"
      //           )
      //             isCorrect = true;
      //         }
      //         return isCorrect;
      //       });
      //     return data;
      //   })
      //   .then((data) => {
      //     for (const geoObject of data.response.GeoObjectCollection
      //       .featureMember) {
      //       if (
      //         compareTwoStrings(text, getTextFromComponents(geoObject)) > 0.7
      //       ) {
      //         handleChooseAddress(geoObject);
      //         setErrorText("");
      //         return;
      //       }
      //     }
      //
      //     if (
      //       data.response.GeoObjectCollection.featureMember.length === 1 &&
      //       compareTwoStrings(
      //         text,
      //         getTextFromComponents(
      //           data.response.GeoObjectCollection.featureMember[0],
      //         ),
      //       ) > 0.7
      //     ) {
      //       handleChooseAddress(
      //         data.response.GeoObjectCollection.featureMember[0],
      //       );
      //       setErrorText("");
      //     }
      //     // handleChooseAddress(data.response.GeoObjectCollection.featureMember[0]);
      //     setFetchResult(data.response.GeoObjectCollection.featureMember);
      //     setErrorText("");
      //     return;
      //     // setErrorText("");
      //   });
    }, 800);
    setTimerId(newTimerId);
  };

  const handleChooseAddress = (address: GeoObject) => {
    const houseName =
      address.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.find(
        (component) => component.kind === "house",
      )?.name;

    if (houseName === undefined) {
      setAddressText(address.GeoObject.name);
    } else {
      const [lat, long] = address.GeoObject.Point.pos
        .split(" ")
        .slice(0, 2)
        .map((el) => parseFloat(el));
      updateAddress({
        lat: lat,
        long: long,
        parsed: address.GeoObject.name,
        exact_address: exactAddress,
      });
    }
  };

  const getTextFromComponents = (address: GeoObject): string => {
    const MetaData = address.GeoObject.metaDataProperty.GeocoderMetaData;
    const Components: Component[] = MetaData.Address.Components;

    const disctictName = Components.find(
      (component) => component.kind === "district",
    )?.name;

    const streetName = Components.find(
      (component) => component.kind === "street",
    )?.name;

    const houseName = Components.find(
      (component) => component.kind === "house",
    )?.name;

    return [disctictName, streetName, houseName]
      .filter((d) => d !== undefined)
      .join(", ");
  };

  const updateCompanyByAddress = (address: OrderAddress) => {
    let min_range = 9999999;
    let min_company_id = -1;
    for (const company of companyState.companies) {
      const distance =
        ((company.address.long - address.lat) ** 2 +
          (company.address.lat - address.long) ** 2) **
        0.5;
      if (!company.is_delivery || min_range <= distance) continue;
      min_range = distance;
      min_company_id = company.id;
    }
    dispatch(setCompanyId(min_company_id));
  };

  const updateAddress = (address: OrderAddress) => {
    setAddressText(address.parsed);
    setFetchResult(null);
    setIsSearchActive(false);
    dispatch(setAddress(address));
    dispatch(setExactAddress(address.exact_address));
    dispatch(
      setDeliveryAmount(companyState.companies[0].delivery_layers[0].cost),
    );
    updateCompanyByAddress(address);
    setErrorText(
      getErrorText(
        "updateAddress",
        address.parsed,
        address.long,
        address.lat,
        address.exact_address,
      ),
    );
  };

  const handleSaveButton = () => {
    const error = getErrorText("handleSaveButton");
    setErrorText(error);
    if (error === "") {
      navigate("/cart2");
      dispatch(
        setErrors({
          ...errors,
          address: false,
        }),
      );
    }
  };

  const handleExactAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setExactAddress(event.target.value));
    setErrorText(
      getErrorText(
        "handleExactAddressChange",
        null,
        null,
        null,
        event.target.value,
      ),
    );
  };

  const getErrorText = (
    from: string = "",
    parsed: string | null = null,
    long: number | null = null,
    lat: number | null = null,
    exact: string | null = null,
  ) => {
    console.log(from);
    // console.log(`-- getErrorText [${from}]--`, {
    //   addressParsed: parsed === null ? orderState.address.parsed : parsed,
    //   addressLong: long === null ? orderState.address.long : long,
    //   addressLat: lat === null ? orderState.address.lat : lat,
    //   exactAddress: orderState.exactAddress,
    //   company_id: orderState.company_id,
    //   checkInPolygon: checkIsInPolygon(
    //     companyState.companies[0].delivery_layers[0]?.points,
    //     [orderState.address.long, orderState.address.lat],
    //   ),
    //   isSearchActive: isSearchActive,
    // });
    if (
      isDelivery && parsed === null
        ? orderState.address.parsed === ""
        : parsed === ""
    ) {
      return "Необходимо выбрать адрес для доставки";
    }
    if (!isDelivery && orderState.company_id === -1) {
      return "Необходимо выбрать точку для самовывоза";
    }
    if (
      isDelivery &&
      companyState.companies[0].delivery_layers[0] &&
      !checkIsInPolygon(companyState.companies[0].delivery_layers[0].points, [
        long === null ? orderState.address.long : long,
        lat === null ? orderState.address.lat : lat,
      ])
    ) {
      return "Ваш адрес вне зоны доставки";
    }
    if (
      isDelivery && exact === null
        ? orderState.exactAddress === ""
        : exact === ""
    ) {
      return "Необходимо выбрать квартиру/офис";
    }
    if (
      parsed === null &&
      long === null &&
      lat === null &&
      exact === null &&
      isSearchActive
    ) {
      return "Необходимо выбрать новый адрес перед сохранением";
    }
    return "";
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setStartCoords(event.touches[0].clientY);
    setStartHeight(height);
    setActive(true);
  };

  const handleTouchEnd = () => {
    setStartCoords(0);
    setActive(false);
    const windowHeight = window.visualViewport?.height
      ? window.visualViewport.height
      : window.innerHeight;
    const scrollPercent = (height / windowHeight) * 100;
    let newStage: 0 | 1 | 2;
    if (scrollPercent >= 30 && scrollPercent < 70) {
      newStage = 1;
    } else if (scrollPercent >= 60) {
      newStage = 2;
    } else {
      newStage = 0;
    }
    setHeight(getHeight(newStage));
    setStage(newStage);
  };

  const handleSuggestAddressClick = (suggest: SuggestAddress) => {
    geocodeAddressByURI(suggest.uri)
      .then((data) => {
        console.log(`geocodeAddressByURI: ${JSON.stringify(data)}`);
        handleChooseAddress(data.response.GeoObjectCollection.featureMember[0]);
      })
      .catch((error) => console.log(`geocodeAddressByURI ERROR: ${error}`));
    setSuggestAddresses([]);
    setAddressText(suggest.title.text);
  };

  return {
    active,
    height,
    stage,
    isSearchActive,
    address,
    fetchResult,
    oldAddresses,
    suggestAddresses,
    userLocation,

    setUserLocation,
    getTop,
    getTextFromComponents,
    updateAddress,
    setStage,
    handleSearchAddress,
    handleExactAddress,
    handleSearchBlur,
    handleAddressChange,
    handleChooseAddress,
    handleSaveButton,
    handleExactAddressChange,
    handleTouchStart,
    handleTouchEnd,
    handleSuggestAddressClick,
  };
};

export default useSlideMenu;
