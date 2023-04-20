import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NotFound } from "../not-found/NotFound";
import { Spinner } from "../../spinner/Spinner";
import { useEffect } from "react";
import { fetchRecord, resetRecord } from "../../../store/action";

export const EditRecord = () => {
  const dispatch = useAppDispatch();
  const id = Number(useParams().id);

  const record = useAppSelector((state) => state.record);
  const isLoading = useAppSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(resetRecord());
    if (id) {
      dispatch(fetchRecord(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Spinner />;
  }
  if (!record) {
    return <NotFound />;
  }

  if (record.product) {
    return <Navigate to={`/products/${record.product.id}`} />;
  } else if (record.recipe) {
    return <Navigate to={`/recipes/${record.recipe.id}`} />;
  }
  return <NotFound />;
}
