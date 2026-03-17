import React from "react";

const ImageList = ({ images, setShowSwiper, setCurrentImage }) => {
  return (
    <div className="rounded-lg overflow-hidden flex gap-2">
      <div
        className="relative w-[60%] h-40 sm:h-50 md:h-100 group cursor-pointer"
        onClick={() => {
          setCurrentImage(0);
          setShowSwiper(true);
        }}
      >
        <img
          src={images[0].url}
          alt="property"
          className="w-full h-full object-cover "
        />
        <div className="bg-black/20 absolute top-0 left-0 bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      </div>
      <div className="flex flex-col justify-between w-[40%]">
        <div className="flex gap-2">
          {images.slice(1, 3).map((item, index) => {
            return (
              <div
                className="relative w-1/2! h-19 sm:h-24 md:h-49 cursor-pointer group"
                key={index}
                onClick={() => {
                  setShowSwiper(true);
                  setCurrentImage(index + 1);
                }}
              >
                <img src={item.url} className="w-full h-full object-cover" />
                <div className="bg-black/20 absolute top-0 left-0 bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          {images.slice(3, 5).map((item, index) => {
            if (index == 1 && images.length > 5) {
              return (
                <div
                  className="relative w-1/2 h-19 sm:h-24 md:h-49"
                  key={index}
                  onClick={() => {
                    setShowSwiper(true);
                    setCurrentImage(index + 3);
                  }}
                >
                  <img
                    src={item.url}
                    alt="property"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bg-black/60 text-white top-0 left-0 right-0 bottom-0 text-2xl flex justify-center items-center cursor-pointer">
                    +{images.length - 4}
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="relative w-1/2 h-19 sm:h-24 md:h-49 cursor-pointer group"
                  onClick={() => {
                    setShowSwiper(true);
                    setCurrentImage(index + 3);
                  }}
                  key={index}
                >
                  <img
                    src={item.url}
                    alt="property"
                    className="w-full h-full object-cover"
                  />
                  <div className="z-10 bg-black/20 absolute top-0 left-0 bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageList;
