import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { HiOutlinePencilAlt } from "react-icons/hi";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { adminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import axios from "../lib/axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateDestinationModel({
  open,
  setOpen,
  selectedDestination,
  setSelectedDestination,
  setDestinationsArray,
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  const { backendUrl } = React.useContext(adminContext);

  const update = async (e) => {
    if (isLoading) {
      return;
    }
    e.preventDefault();
    try {
      setIsLoading(true);
      const body = {};
      if (city.trim()) {
        body.city = city;
      }
      if (image !== null) {
        body.image = image;
      }
      const { data } = await axios.patch(
        `${backendUrl}/destination/${selectedDestination.id}`,
        body,
      );
      if (data.success) {
        toast.success(data.message);
        setDestinationsArray((prev) =>
          prev.map((item) => {
            if (item.id === selectedDestination.id) {
              item.city = city.trim() !== "" ? city : selectedDestination.name;
              item.image = image
                ? URL.createObjectURL(image)
                : selectedDestination.image;
            }
            return item;
          }),
        );
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const [image, setImage] = React.useState(null);
  const [city, setCity] = React.useState(selectedDestination.city);

  const handleClose = () => {
    setSelectedDestination(null);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Update Category"}</DialogTitle>
      <DialogContent sx={{ maxWidth: "500px" }}>
        <form className="px-10" onSubmit={update}>
          <h2 className="text-xl font-medium my-2">Image</h2>
          <label
            htmlFor="image"
            className="relative w-1/2 aspect-square block cursor-pointer rounded-md overflow-hidden"
          >
            <img
              src={
                image ? URL.createObjectURL(image) : selectedDestination.image
              }
              alt="image"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              id="image"
              className="hidden"
              accept="jpg jpeg"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className="absolute bg-black/40 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
              <div className="text-white text-2xl">
                <HiOutlinePencilAlt />
              </div>
            </div>
          </label>
          <div className="flex flex-col gap-y-1 my-2">
            <label htmlFor="name">City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-100 px-2 py-2 rounded-md border border-slate-300"
            />
          </div>
          <button className="bg-[#4880FF] text-white px-6 py-2 rounded-md flex gap-2 justify-center items-center w-40 mx-auto">
            <span>Update</span>
            {isLoading && (
              <div className="w-5 h-5 rounded-full border-x border-b border-white animate-spin"></div>
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
