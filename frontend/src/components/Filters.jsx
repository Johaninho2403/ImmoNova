import { AppContext } from "../context/AppContext";
import { categories, facilities } from "../assets/assets";
import BasicRating from "./BasicRating";
import Range from "./Range";

const Filters = ({showFilters, setShowFilters}) => {

  return (
    <div>
      <div
        className={`bg-black/60 fixed top-0 left-0 bottom-0 ${showFilters ? "right-0" : "right-full"} transition-all duration-300`}
        onClick={() => setShowFilters(false)}
      ></div>
      <div
        className={`fixed top-0 bottom-0 -left-full bg-white ${showFilters ? "w-60 left-0" : "w-0"} transition-all duration-300 py-4 px-4 overflow-x-hidden overflow-y-auto`}
      >
        <h1 className="text-center text-xl font-medium">Filters</h1>
        <h2 className="my-2">Categories</h2>
        <div className="flex flex-col gap-y-2">
          {categories.map((item) => {
            return (
              <div key={item.id} className="flex gap-x-2">
                <input type="checkbox" id={item.name} />
                <label htmlFor="">{item.name}</label>
              </div>
            );
          })}
        </div>
        <h2 className="my-2">Rating</h2>
        <div className="flex flex-col gap-y-2">
          {
            new Array(5).fill(0).map((item, index) => {
              return <div className="flex gap-x-2" key={index}>
                <input type="checkbox" />
                <label>
                  <BasicRating rate={index + 1} />
                </label>
              </div>
            })
          }
        </div>
        <h2 className="my-2">Price Range</h2>
        <div>
          <Range />
        </div>
        <h2 className="my-2">Facilities</h2>
        <div className="flex flex-col gap-y-2">
          {
            facilities.map(item => {
             return <div className="flex gap-2" key={item.id}>
              <input type="checkbox"/>
              <label>{item.name}</label>
             </div>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Filters;
