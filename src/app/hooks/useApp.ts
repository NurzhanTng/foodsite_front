import { useAppDispatch } from "../../store/hooks.ts";
import { useEffect } from "react";
import { fetchCategories } from "../../store/slices/mainSlice.ts";
import { fetchCompanies } from "../../store/slices/companySlice.ts";

const useApp = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCompanies());
  }, [dispatch]);
}

export default useApp;
