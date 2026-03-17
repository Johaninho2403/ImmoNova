import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const paginationModel = { page: 0, pageSize: 5 };


  function AlertDialog({ open, setOpen, id }) {
    const handleClose = () => {
      setOpen(false);
    };
    console.log(id);
    
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you really want to do this action ?"}
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Yes</Button>
            <Button onClick={handleClose}>No</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

export default function DestinationTable({
  destinations,
  destinationSelectionModel,
  setDestinationSelectionModel,
  setSelectedDestination,
  setOpen,
}) {


  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [id, setID] = React.useState(null)
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "city", headerName: "City", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <div className="flex justify-center items-center w-full h-full">
          <img src={params.value} alt="" className="w-20 h-20 object-cover" />
        </div>
      ),
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
              setSelectedDestination(params.row);
            }}
          >
            <HiOutlinePencilAlt />
          </div>
          <div className="text-2xl hover:bg-slate-200/50 p-2 text-red-500 cursor-pointer rounded-md" onClick={() => {
            setID(params.row.id)
            setShowDeleteDialog(true)
          }}>
            <FaRegTrashAlt />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={destinations}
        columns={columns}
        getRowSpacing={() => ({ bottom: 10 })}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        rowSelectionModel={destinationSelectionModel}
        onRowSelectionModelChange={(newModel) => {
          setDestinationSelectionModel(newModel);
        }}
        disableRowSelectionOnClick
        disableColumnResize
        sx={{ border: 0 }}
      />
      <AlertDialog open={showDeleteDialog} setOpen={setShowDeleteDialog} id={id} set/>
    </Paper>
  );
}
