/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaTrash } from "react-icons/fa";
import { categories, facilities } from "../assets/assets";
import TextEditor from "./TextEditor";
import { toast } from "react-toastify";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const steps = [
  "Informations about your property",
  "Localize your property",
  "Add Facilities",
  "Choose a category",
  "Add Pictures",
];

const ChangeMapView = ({ coords }) => {
  const map = useMap();

  React.useEffect(() => {
    if (coords[0] !== 4.6125522 && coords[1] !== 13.1535811) {
      map.setView(coords, 13); // zoom vers l'adresse
    }
  }, [coords, map]);

  return null;
};

function LocationMarker({ setCoords, setAddress, setIsLoading }) {
  const { GEOPIFY_API_KEY } = React.useContext(AppContext);
  const map = useMapEvents({
    async click(e) {
      setCoords(e.latlng);
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json&apiKey=${GEOPIFY_API_KEY}`,
        );
        const results = data.results[0];
        setAddress(results.formatted);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });
}
export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const rteRef = React.useRef(null);
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState(null);
  const [bedrooms, setBedrooms] = React.useState(1);
  const [bathrooms, setBathrooms] = React.useState(1);
  const [superficy, setSuperficy] = React.useState(null);
  const [guests, setGuests] = React.useState(1);
  const [pricePerNight, setPricePerNight] = React.useState(5000);
  const { GEOPIFY_API_KEY, backendUrl, isAuth } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [coords, setCoords] = React.useState([4.6125522, 13.1535811]);
  const [facilitiesList, setFacilitiesList] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [address, setAddress] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [instantBooking, setInstantBooking] = React.useState("no");
  const navigate = useNavigate();

  const addProperty = async () => {
    try {
      if (
        !title ||
        !category ||
        !bedrooms ||
        !bathrooms ||
        !guests ||
        !pricePerNight ||
        !selectedOption ||
        !images.length ||
        !superficy
      ) {
        throw new Error("All fields are required!");
      }
      const body = {
        title,
        categoryId: category,
        bedrooms,
        bathrooms,
        guests,
        price: pricePerNight,
        city: selectedOption.city,
        address: selectedOption.formatted,
        latitude: selectedOption.lat,
        longitude: selectedOption.lon,
        superficy,
        description: rteRef.current.editor.getHTML(),
        facilities: facilitiesList,
        instantBooking: instantBooking === "yes" ? true : false,
      };

      const { data } = await axios.post(
        `${backendUrl}/property/create-property`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep == 0) {
      if (
        !rteRef.current.editor.options.element.textContent.trim() ||
        !title.trim() ||
        !bedrooms ||
        !bathrooms ||
        !superficy ||
        !guests ||
        !pricePerNight
      ) {
        toast.error("All Fields are required!");
        return;
      }
    }

    if (activeStep == 1 && !selectedOption) {
      toast.error("You must localize your property");
      return;
    }

    if (activeStep == 3 && !category) {
      toast.error("You must choose a category");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  let timeoutId;

  const handleInput = (e) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const input = e.target.value;
    setIsLoading(true);
    timeoutId = setTimeout(async () => {
      try {
        const { data } = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURI(input)}&format=json&apiKey=${GEOPIFY_API_KEY}&filter=countrycode:cm`,
        );
        setOptions(data.results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const selectOption = (adress) => {
    const selectedOption = options.find((item) => item.formatted === adress);
    setSelectedOption(selectedOption);
    setAddress(selectedOption.formatted);
    setCoords([selectedOption.lat, selectedOption.lon]);
    setOptions([]);
  };

  const toggleFacilitiesList = (id) => {
    let facilitiesCopy = [...facilitiesList];
    const facility = facilitiesCopy.find((item) => item === id);
    if (facility) {
      facilitiesCopy = facilitiesCopy.filter((item) => item !== id);
    } else {
      facilitiesCopy.push(id);
    }
    setFacilitiesList(facilitiesCopy);
  };

  const removeImage = (url) => {
    setImages((prev) => prev.filter((item) => item !== url));
  };

  const CurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        setCoords([position.coords.latitude, position.coords.longitude]);
        const { data } = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=${GEOPIFY_API_KEY}`,
        );
        const results = data.results[0];
        setSelectedOption(results);
        setAddress(results.formatted);
      } catch (error) {
        console.log(error.message);
      }
    });
  };

  return (
    <Box sx={{ width: "100%" }} className={"px-2.5 md:px-[5%] lg:px-[10%]"}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps} sx={{ marginBlock: "20px" }}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        {activeStep === 0 ? (
          <div className="mt-10 flex flex-col gap-y-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid md:grid-cols-4 gap-2 items-center w-full">
              <div className="flex flex-col gap-y-1 w-full">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="w-full! rounded-md border border-slate-400 py-3 px-2"
                  placeholder="Title of your announce"
                  id="title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-1 w-full">
                <label htmlFor="instantBooking">Instant Booking</label>
                <select
                  name="instantBooking"
                  id="instantBooking"
                  className="w-full! rounded-md border border-slate-400 py-3 px-2"
                  value={instantBooking}
                  onChange={(e) => setInstantBooking(e.target.value)}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="flex flex-col gap-y-1 w-full">
                <label htmlFor="bedroom">Bedrooms</label>
                <input
                  type="number"
                  className="w-full! rounded-md border border-slate-400 py-3 px-2"
                  placeholder="Number of bedrooms of your property"
                  id="bedroom"
                  name="bedroom"
                  min={1}
                  defaultValue={1}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-y-1 w-full">
                <label htmlFor="bathroom">Bathrooms</label>
                <input
                  type="number"
                  className="w-full! rounded-md border border-slate-400 py-3 px-2"
                  placeholder="Number of bathrooms of your property"
                  id="bathroom"
                  name="bathroom"
                  min={1}
                  defaultValue={1}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-y-1 w-full">
                <label htmlFor="superficy">Superficy</label>
                <input
                  type="number"
                  className="w-full! rounded-md border border-slate-400 py-3 px-2"
                  placeholder="Superficy of your property"
                  id="superficy"
                  name="superficy"
                  min={1}
                  onChange={(e) => setSuperficy(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-y-1 w-full">
                <label htmlFor="pricePerNight">Guests</label>
                <input
                  type="number"
                  className="w-full! rounded-md border border-slate-400 py-3 px-2"
                  placeholder="Maximum Number of Guests you accept"
                  id="guests"
                  name="guests"
                  min={1}
                  defaultValue={1}
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-y-1 w-full">
                <label htmlFor="pricePerNight" className="whitespace-nowrap">
                  Price Per Night
                </label>
                <input
                  type="number"
                  className="w-full! rounded-md border border-slate-400 py-3 px-2"
                  placeholder="Number of bathrooms of your property"
                  id="pricePerNight"
                  name="pricePerNight"
                  min={5000}
                  defaultValue={5000}
                  onChange={(e) => setPricePerNight(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="description">Description</label>
              <TextEditor rteRef={rteRef} />
            </div>
          </div>
        ) : activeStep === 1 ? (
          <div className="relative">
            <div className="flex flex-col sm:flex-row justify-between items-start my-5 gap-y-2">
              <div className=" flex flex-col gap-y-1">
                <label htmlFor="address">Address:</label>
                <div className="relative">
                  <input
                    type="text"
                    className="border border-slate-300 px-2 py-4 rounded-md"
                    placeholder="Enter your adress"
                    onInput={handleInput}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {isLoading && (
                    <div className="absolute top-1/2 -translate-y-1/2 right-8 w-5 h-5 rounded-full border border-t-0 border-b-0 animate-spin border-primary"></div>
                  )}
                </div>
                <ul className="absolute z-10000 bg-white shadow-md w-full">
                  {options.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="cursor-pointer px-4 py-2 hover:bg-slate-300/20"
                        onClick={() => selectOption(item.formatted)}
                      >
                        {item.formatted}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <button
                className="bg-primary text-white rounded-md px-4 py-3 hover:bg-primary-dull transition-all duration-300"
                onClick={() => CurrentPosition()}
              >
                Use my current Position
              </button>
            </div>

            <div className="w-full h-100">
              <MapContainer center={coords} zoom={6} scrollWheelZoom={false}>
                <ChangeMapView coords={coords} />
                <LocationMarker
                  setCoords={setCoords}
                  setIsLoading={setIsLoading}
                  setAddress={setAddress}
                />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {selectedOption && <Marker position={coords}></Marker>}
              </MapContainer>
            </div>
          </div>
        ) : activeStep == 2 ? (
          <div>
            <h1 className="text-2xl my-4">
              Select the facilities included in your property
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-8">
              {facilities.map((item) => {
                return (
                  <div
                    className={`flex flex-col border border-slate-300 hover:border-black gap-2 cursor-pointer p-6 rounded-md ${facilitiesList.includes(item.id) && "bg-slate-200/20"}`}
                    key={item.id}
                    onClick={() => toggleFacilitiesList(item.id)}
                  >
                    <img src={item.image} alt="facility" className="w-5" />
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : activeStep == 3 ? (
          <div className="">
            <h1 className="font-medium text-2xl">Choose one category below</h1>
            <div className="my-10 grid grid-cols-3 sm:grid-cols-5 gap-3">
              {categories.map((item) => (
                <div
                  className="rounded-md overflow-hidden group relative w-full aspect-square cursor-pointer"
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                >
                  <img
                    src={item.image}
                    alt="category"
                    className="w-full h-full group-hover:scale-105 transition-all duration-300 object-cover"
                  />
                  {category === item.id && (
                    <div className="bg-black/20 absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
                      <div className="text-white text-2xl">
                        <FaCheck />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-5 left-5 text-white">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="">
            <h1 className="text-xl font-medium my-3">
              Add images of your property
            </h1>
            <label htmlFor="images">
              <img
                src="/add-image.png"
                alt="add-image"
                className="w-20 cursor-pointer"
              />
              <input
                type="file"
                name="images"
                id="images"
                className="hidden"
                multiple
                onChange={(e) => {
                  const filesLength = e.target.files.length;
                  new Array(filesLength).fill(0).forEach((item, index) => {
                    setImages((prev) => [...prev, e.target.files.item(index)]);
                  });
                }}
              />
            </label>
            <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-6">
              {images.map((item, index) => {
                return (
                  <div className="relative group">
                    <img
                      src={URL.createObjectURL(item)}
                      alt=""
                      key={index}
                      className="w-full aspect-square object-cover rounded-md"
                    />
                    <div
                      className="bg-white w-10 h-10 rounded-full absolute top-5 right-5 flex justify-center items-center text-red-500 cursor-pointer z-10"
                      onClick={() => removeImage(item)}
                    >
                      <FaTrash />
                    </div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 "></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
      {/* )} */}
    </Box>
  );
}
