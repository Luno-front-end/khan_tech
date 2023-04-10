import React, { FC } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

interface RatingFCProps {
  value: number;
}

export const RatingFC: FC<RatingFCProps> = ({ value }) => {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        defaultValue={value}
        precision={0.1}
        readOnly
      />
    </Box>
  );
};
