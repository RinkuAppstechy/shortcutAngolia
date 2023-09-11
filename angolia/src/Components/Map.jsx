import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';


const Map = () => {
  const myArray = [
    {
      userName: "John",
      postTitle: "Drinks",
      location: [51.2211097, 4.3997081]
    },
    {
      userName: "Julia",
      postTitle: "Dinner",
      location: [50.83510246877454, 4.299129343180475]
    },
    {
      userName: "James",
      postTitle: "Lunch",
      location: [60.83510246877454, 4.299129343180475]
    }
  ];

  return (
    <div>
      <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {myArray.map((data, index) => (
          <Marker
            key={index}
            position={data.location}
            icon={createCustomIcon(data.userName, data.postTitle)}
          >
            <Popup>
              <div className="custom-popup">
                <h2>{data.userName}</h2>
                <p>{data.postTitle}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Function to create a custom marker icon
function createCustomIcon(userName, postTitle) {
    const customIcon = divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="bg-white shadow-md rounded-lg p-2 pr-20">
          <h2 class="text-xl font-semibold">${userName}</h2>
          <p class="text-sm">${postTitle}</p>
        </div>
      `,
    });
  return customIcon;
}

export default Map;
