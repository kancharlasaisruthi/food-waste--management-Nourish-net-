
import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';


function Map() {
  // Sample data: Replace with backend fetch
  const [foodHubLocations, setFoodHubLocations] = useState([
    { id: 1, lat: 17.493919, lng: 78.402121, dontions: 35 }, 
    { id: 2, lat: 17.501655, lng:78.384655 , donations: 8 },
    { id: 3, lat:17.498790 , lng: 78.338917, donations: 5},
    { id: 4, lat:17.454391 , lng: 78.428948 , donations: 9},
    { id: 5, lat: 17.433757, lng: 78.527138, donations: 20 },
    { id: 6, lat: 17.479634, lng:  78.345816, donations: 6 },
    { id: 7, lat: 17.421309, lng: 78.566277, donations: 10 },
    { id: 8, lat:17.359387 , lng:78.460533 , donations: 16 },
    { id: 9, lat:17.365613 , lng:78.484566 , donations: 8 },
   
  ]);

  return (
    <div>
      
      <h2 className="text-center my-3">FoodHub Locations</h2>
      <MapContainer
       center={[17.385044, 78.486671]} // Set center to Hyderabad
       zoom={12} // Adjust zoom level
       style={{ height: '85vh', width: '100%' }}
      >
        {/* Tile Layer: OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />

        {/* Markers for Unsafe Areas */}
        {foodHubLocations.map((area) => (
          <CircleMarker
            key={area.id}
            center={[area.lat, area.lng]}
            radius={Math.min(area.donations , 50)} // Scale radius with number of reports
            fillOpacity={0.5}
            color={area.donations > 5 ? '#006400' : '#008000'} // Red for high reports, orange for low
          >
            <Popup>
              <h6>{`donations: ${area.donations}`}</h6>
             
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
     
    </div>
  );
}



export default Map