import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const ImageSwiper = ({
  images,
  currentImage,
  setShowSwiper,
  setCurrentImage,
}) => {
  return (
    <div>
      <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/70"></div>
      <div className="fixed top-1/2 left-1/2 -translate-1/2 flex justify-between items-center w-full px-2.5 md:px-[10%]">
        <div
          className={`w-10 h-10 md:w-15 md:h-15 rounded-full ${currentImage == 0 ? "bg-white/50" : "bg-white hover:bg-white/80"} text-2xl flex justify-center items-center cursor-pointer `}
          onClick={() =>
            setCurrentImage((prev) => {
              if (prev == 0) {
                return 0;
              } else {
                return prev - 1;
              }
            })
          }
        >
          <IoIosArrowBack />
        </div>
        <img
          src={images[currentImage]}
          className="select-none w-1/2 h-[20vh] sm:h-[30vh] md:w-6/10 md:h-[60vh] object-cover rounded-2xl"
        />
        <div
          className={`w-10 h-10 md:w-15 md:h-15 rounded-full ${currentImage == images.length - 1 ? "bg-white/50" : "bg-white hover:bg-white/80"} bg-white text-2xl flex justify-center items-center cursor-pointer`}
          onClick={() =>
            setCurrentImage((prev) => {
              if (prev == images.length - 1) {
                return prev;
              } else {
                return prev + 1;
              }
            })
          }
        >
          <IoIosArrowForward />
        </div>
      </div>
      <div
        className="w-10 h-10 rounded-full cursor-pointer fixed top-10 right-10 text-2xl text-white hover:bg-white hover:text-black flex justify-center items-center"
        onClick={() => setShowSwiper(false)}
      >
        <IoMdClose />
      </div>
    </div>
  );
};

export default ImageSwiper;
