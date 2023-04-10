import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { purple } from "@mui/material/colors";
import Api from "../../../Api/getEmployees";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

const pageSize = 15;

interface PaginationFCProps {
  allPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  setData: Dispatch<SetStateAction<any>>;
}

export const PaginationFC: FC<PaginationFCProps> = ({
  allPage,
  setPage,
  setData,
}) => {
  const handleChangeRowsPerPage = async (e: any, page: any) => {
    console.log("first");
    await Api.getEmployees(page).then(({ data }) => {
      setData(data.data);
    });
  };

  return (
    // <ThemeProvider theme={theme}>
    <Pagination
      count={allPage}
      variant="outlined"
      siblingCount={1}
      boundaryCount={2}
      onChange={async (e, page) => await handleChangeRowsPerPage(e, page)}
      // rowsPerPage={rowsPerPage}
      // onRowsPerPageChange={handleChangeRowsPerPage}
    />
    // </ThemeProvider>
  );
};
