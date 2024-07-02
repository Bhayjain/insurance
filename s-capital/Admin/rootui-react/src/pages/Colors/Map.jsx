// import React, { useState } from 'react'
//
// import MapPicker from 'react-google-map-picker'
//
// const DefaultLocation = { lat: 21.1583754, lng: 79.0952083};
// const DefaultZoom = 10;
//
// const Mapcall = () => {
//
//   const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
//
//   const [location, setLocation] = useState(defaultLocation);
//   const [zoom, setZoom] = useState(DefaultZoom);
//
//   function handleChangeLocation (lat, lng){
//     console.log("lat long",lat, lng)
//     setLocation({lat:lat, lng:lng});
//     // console.log("lat long",lat, lng)
//   }
//
//   function handleChangeZoom (newZoom){
//     setZoom(newZoom);
//   }
//
//   function handleResetLocation(){
//     setDefaultLocation({ ... DefaultLocation});
//     setZoom(DefaultZoom);
//   }
//
//   return (
//     <>
// <h1>dhfhf</h1>
// <MapPicker
//   style={{height:'500px', width:"500px"}}
//    defaultLocation={defaultLocation} id="mapDiv"
//     zoom={zoom}
//     mapTypeId="roadmap"
//
//     onChangeLocation={handleChangeLocation}
//     onChangeZoom={handleChangeZoom}
//     apiKey='AIzaSyATII5zdpnizNf6zQZDy3PA9hIkNKBuk1Y'/>
// </>
//   );
// }
//
// export default Mapcall
