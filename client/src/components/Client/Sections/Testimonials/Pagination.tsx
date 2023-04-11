import Pagination from "@mui/material/Pagination";
import { Dispatch, FC, SetStateAction } from "react";
import Api from "../../../../Api/getEmployees";
import { useDispatch } from "react-redux";
import { setData } from "../../../../Redux/slices/dataReviews";

interface PaginationFCProps {
  allPage: number;
  setData: Dispatch<SetStateAction<any>>;
}

export const PaginationFC: FC<PaginationFCProps> = ({ allPage }) => {
  const dispatch = useDispatch();

  const handleChangeRowsPerPage = async (e: any, page: any) => {
    await Api.getEmployees(page).then(({ data }) => {
      dispatch(setData(data.data));
    });
  };

  return (
    <Pagination
      count={allPage}
      variant="outlined"
      siblingCount={1}
      boundaryCount={2}
      onChange={async (e, page) => await handleChangeRowsPerPage(e, page)}
    />
  );
};
