import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function BasicRating({rate}) {

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Rating
        name="simple-controlled"
        value={rate}
        readOnly={true}
        sx={{ fontSize: "16px" }}
        precision={0.5}
        className="text-primary! text-sm!"
      />
    </Box>
  );
}
