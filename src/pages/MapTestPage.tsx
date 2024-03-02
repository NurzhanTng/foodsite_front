// import { YMaps, Map, Polygon,  } from "@pbe/react-yandex-maps";
// import { useEffect, useState } from "react";
//
// const MapTestPage = () => {
//   const [coordinates, setCoordinates] = useState<[number, number][][]>([[]]);
//   // const [placemarks, setPlacemarks] = useState<[number, number][]>([])
//
//   const onClick = (props: any) => {
//     console.log('click')
//     console.log(props.get("coords"));
//     setCoordinates((coords) => {
//       const newCoords = [...coords];
//       newCoords[newCoords.length - 1].push(props.get("coords"));
//       return newCoords;
//     });
//     // setPlacemarks((coords) => {
//     //   const newPlacemark: [number, number] = props.get("coords");
//     //   return [...coords, newPlacemark]
//     // })
//     console.log(coordinates);
//   };
//
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "s") {
//         setCoordinates((coords) => [...coords, []]);
//       }
//     };
//
//     document.addEventListener("keydown", handleKeyDown);
//
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);
//
//   return (
//     <div className='w-full min-h-[100vh]'>
//     <div className='shadow-image w-fit mx-auto mt-6'>
//       <YMaps>
//         <Map
//           defaultState={{ center: [43.244077, 76.916799], zoom: 11 }}
//           onClick={onClick}
//         >
//           {/*{*/}
//           {/*  placemarks.map((placemark, index) => {*/}
//           {/*    return (*/}
//           {/*      <Placemark key={index} geometry={placemark} />*/}
//           {/*    )*/}
//           {/*  })*/}
//           {/*}*/}
//           {coordinates.map((layer, index) => {
//             return (
//               <Polygon
//                 key={index}
//                 geometry={[layer]}
//                 options={{
//                   fillColor: "#00FF00",
//                   strokeColor: "#0000FF",
//                   opacity: 0.2,
//                   strokeWidth: 2,
//                   strokeStyle: "solid",
//                 }}
//                 onClick={onClick}
//               />
//             );
//           })}
//         </Map>
//       </YMaps>
//     </div></div>
//   );
// };
//
// export default MapTestPage;

//
// import { useState } from 'react';
// import { YMaps, Map, Placemark, RoutePanel } from '@pbe/react-yandex-maps';
//
// const MapTestPage = () => {
//   const [routeLength, setRouteLength] = useState(null);
//   const [routeTime, setRouteTime] = useState(null);
//
//   const handleRouteChange = (route: any) => {
//     if (route && route.length) {
//       const length = route.getHumanLength();
//       const time = route.getHumanJamsTime();
//       setRouteLength(length);
//       setRouteTime(time);
//     } else {
//       setRouteLength(null);
//       setRouteTime(null);
//     }
//   };
//
//   return (
//     <YMaps>
//       <div style={{ width: '100%', height: '400px' }}>
//         <Map defaultState={{ center: [55.751574, 37.573856], zoom: 10 }}>
//           <Placemark geometry={[55.751574, 37.573856]} />
//           <Placemark geometry={[55.751574, 37.603856]} />
//           <RoutePanel
//             options={{ allowSwitch: false, reverseGeocoding: true }}
//             onRouteChange={handleRouteChange}
//           />
//         </Map>
//         {routeLength && <p>Длина маршрута: {routeLength}</p>}
//         {routeTime && <p>Время в пути: {routeTime}</p>}
//       </div>
//     </YMaps>
//   );
// };
//
// export default MapTestPage;

import Button from "../shared/Button.tsx";
import Switch from "../shared/Switch.tsx";
import { useState } from "react";

function MapTestPage() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="mx-auto my-5 flex min-h-[100vh] w-full px-5">
      <div className="mx-auto my-auto h-fit w-fit flex flex-col flex-center justify-center align-center gap-5 ">
        <Button
          styleType="outline"
          text="Button"
          // onClick={() => console.log('my button')}
          // showIcon={true}
          // iconType={"arrowRight"}
        />
        <Switch className="mx-auto" checked={checked} onChange={setChecked} />
      </div>
    </div>
  );
}

export default MapTestPage;
