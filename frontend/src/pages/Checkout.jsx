import { useContext } from "react";
import { properties } from "../assets/assets";
import BasicRating from "../components/BasicRating";
import { AppContext } from "../context/AppContext";

const Checkout = () => {
  const { checkIn, checkOut, guests, nights } = useContext(AppContext);

  return (
    <div className="overflow-hidden py-4">
      <div className="bg-slate-100/50 w-screen px-5 md:px-[5%] lg:px-[10%] flex flex-col justify-center items-center gap-y-3">
        <div className="bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.1)] p-4 rounded-lg flex flex-col gap-y-4 w-full sm:max-w-100">
          <div className="flex gap-4">
            <img
              src={properties[0].images[0]}
              alt="property"
              className="w-30 h-30 rounded-md aspect-square"
            />
            <div className="flex flex-col justify-between flex-1">
              <div className="text-primary">
                {properties[0].category} • {properties[0].city}
              </div>
              <p className="text-xl line-clamp-1">{properties[0].title}</p>
              <div className="flex gap-4">
                <BasicRating rate={4.5} />
                <p>4.75 (1)</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">
              <h2 className="text-xl font-medium text-slate-500">Dates</h2>
              <p className="">
                {new Date(checkIn).toLocaleDateString()} -{" "}
                {new Date(checkOut).toLocaleDateString()}
              </p>
            </div>
            <div className="">
              <h2 className="text-xl font-medium text-slate-500">Guests</h2>
              <p>{guests}</p>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-medium w-full sm:max-w-100">
          Price Details
        </h2>
        <div className="bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.1)] p-4 w-full sm:max-w-100 flex flex-col gap-y-4">
          <div className="flex justify-between">
            <p className="text-slate-500">
              {nights} night{nights > 1 && "s"} x {properties[0].price} XAF
            </p>
            <p className="font-medium">{nights * properties[0].price} XAF</p>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-500">Service Fees</p>
            <p className="font-medium">
              {Math.round(nights * properties[0].price * 0.1)} XAF
            </p>
          </div>
          <hr className="text-slate-400" />
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Total</p>
            <p className="font-medium text-primary text-xl">
              {Math.round(nights * properties[0].price * 1.1)} XAF
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-medium w-full sm:max-w-100">
          Enter your number for payment
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.1)] w-full sm:max-w-100 flex gap-4">
          <div className="flex gap-2 items-center">
            <img src="/flag.webp" alt="" className="w-5 h-5 object-cover" />
            <div className="">+237</div>
          </div>
          <input
            type="text"
            name="telephone"
            id="telephone"
            placeholder="6XXXXXXXX"
            className="w-full px-2 py-2 bg-slate-200 rounded-lg"
          />
        </div>
        <div className="flex justify-between items-center w-full sm:max-w-100">
          <div className="flex flex-col gap-y-2">
            <img src="/OM.webp" alt="" className="w-20 h-20 object-cover self-center" />
            <p className="text-xl font-medium">Orange Money</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <img src="/MOMO.jpg" alt="" className="w-20 h-20 object-cover self-center" />
            <p className="text-xl font-medium">MTN Mobile Money</p>
          </div>
        </div>
        <button className="bg-primary text-white py-2 rounded-md px-10">Book Now</button>
      </div>
    </div>
  );
};

export default Checkout;
