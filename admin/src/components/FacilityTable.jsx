import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";

const paginationModel = { page: 0, pageSize: 5 };

export default function FacilityTable({
  facilities,
  facilitiesSelectionModel,
  setFacilitiesSelectionModel,
  setSelectedFacility,
  setOpen,
}) {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <div className="flex justify-center items-center w-full h-full">
          <img src={params.value} alt="" className="w-8 h-8 object-cover" />
        </div>
      ),
    },
    {
      field: "isPopular",
      headerName: "Popular",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center">
            <Switch {...label} checked={params.value} />
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <div className="flex gap-x-4 justify-center items-center w-full h-full">
          <div
            className="text-2xl hover:bg-slate-200/50 p-2 cursor-pointer rounded-md"
            onClick={() => {
              setOpen(true);
              setSelectedFacility(params.row);
            }}
          >
            <HiOutlinePencilAlt />
          </div>
          <div className="text-2xl hover:bg-slate-200/50 p-2 text-red-500 cursor-pointer rounded-md">
            <FaRegTrashAlt />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={facilities}
        columns={columns}
        getRowSpacing={() => ({ bottom: 10 })}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        rowSelectionModel={facilitiesSelectionModel}
        onRowSelectionModelChange={(newModel) => {
          setFacilitiesSelectionModel(newModel);
        }}
        disableRowSelectionOnClick
        disableColumnResize
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
