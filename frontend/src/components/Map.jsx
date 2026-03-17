import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import BasicRating from "./BasicRating";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = ({ properties }) => {
  return (
    <MapContainer
      center={[properties[0].latitude, properties[0].longitude]}
      zoom={7}
      scrollWheelZoom={false}
      className="w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => {
        return (
          <Marker
            position={[property.latitude, property.longitude]}
            key={property.id}
          >
            <Popup>
              <div className="w-60 h-full flex justify-between gap-2">
                <img
                  src={property.images[0].url}
                  alt=""
                  className="w-20 aspect-square object-cover rounded-md"
                />
                <div className="overflow-hidden text-ellipsis flex flex-col items-start justify-between">
                  <h2
                    className="text-[10px] whitespace-nowrap overflow-hidden text-ellipsis"
                    title={property.title}
                  >
                    {property.title}
                  </h2>
                  <div className="text-slate-400">{property.category.name}</div>
                  <div className="flex justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="whitespace-nowrap text-[10px]">
                        {property.bedroom} bedroom{property.bedroom > 1 && "s"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="whitespace-nowrap text-[10px]">
                        {property.bathroom} bathroom
                        {property.bathroom > 1 && "s"}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between gap-2">
                    <div className="">
                      <BasicRating rate={property.rate} />
                    </div>
                    <div>
                      {property.rate.toFixed(1)} (
                      {property?.reviews?.length || property?._count?.reviews})
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
