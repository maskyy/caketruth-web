import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { FormEvent, useEffect } from "react";
import { addProduct, fetchProduct, updateProduct } from "../../../store/action";
import { Spinner } from "../../spinner/Spinner";
import { NotFound } from "../not-found/NotFound";
import { Header } from "../../header/Header";
import { CgArrowLeft } from "react-icons/cg";
import { ProductUpdate } from "../../../types/Product";
import { ErrorField } from "../../error_field/ErrorField";

export const EditProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = Number(useParams().id);
  const user = useAppSelector((state) => state.user);
  const product = useAppSelector((state) => state.product);
  const isLoading = useAppSelector((state) => state.isLoading);
  const productCategories = useAppSelector((state) => state.productCategories);
  const productBrands = useAppSelector((state) => state.productBrands);
  const succeeded = useAppSelector((state) => state.succeeded);
  const isNew = location.pathname === "/products/new";

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (succeeded) {
      navigate("/products");
    }
  }, [succeeded, navigate]);

  if (isLoading) {
    return <Spinner />;
  }
  if (!product && !isNew) {
    return <NotFound />;
  }

  const renderedCategories = productCategories.map((c) => (
    <option key={c.id} value={c.id}>{c.title}</option>
  ));

  const renderedBrands = productBrands.map((b) => (
    <option key={b.id} value={b.id}>{b.title}</option>
  ));

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form) as Iterable<[ProductUpdate]>;
    const data: ProductUpdate = Object.fromEntries(formData);

    if (data?.id && !+data.id) {
      delete data.id;
    }

    console.log(data);
    if (isNew) {
      dispatch(addProduct(data));
    } else {
      dispatch(updateProduct(data));
    }
  };

  return (
    <PageLayout
      title={product ? "Редактирование продукта" : "Новый продукт"}
      header={
        <Header icon={false}>
          <Link to="/products"><CgArrowLeft size={24} /></Link>
          <h1>{product?.name ?? "Новый продукт"}</h1>
        </Header>
      }
      footer={false}>
      <form className="flex justify-center flex-col gap-2" action="#" method="post" onSubmit={handleFormSubmit}>
        <input type="hidden" name="id" value={Number.isNaN(id) ? 0 : id} />
        <input type="hidden" name="user" value={user?.id ?? 0} />
        <div className="flex justify-between mx-2">
          <label>Название</label>
          <input type="text" name="name" className="w-32 border-gray-300 border-2" defaultValue={product?.name} />
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="name" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Калорийность на 100 г</label>
          <input type="number" name="calories" step={0.1} className="w-32 border-gray-300 border-2" defaultValue={product?.calories} />
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="calories" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Белки</label>
          <input type="number" name="proteins" step={0.1} className="w-32 border-gray-300 border-2" defaultValue={product?.proteins} />
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="proteins" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Жиры</label>
          <input type="number" name="fats" step={0.1} className="w-32 border-gray-300 border-2" defaultValue={product?.fats} />
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="fats" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Углеводы</label>
          <input type="number" name="carbs" step={0.1} className="w-32 border-gray-300 border-2" defaultValue={product?.carbs} />
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="carbs" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Этанол</label>
          <input type="number" name="ethanol" step={0.1} className="w-32 border-gray-300 border-2" defaultValue={product?.ethanol ?? 0} />
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="ethanol" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Категория</label>
          <select name="product_category" defaultValue={product?.product_category}>
            <option value=""></option>
            {renderedCategories}
          </select>
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="product_category" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Производитель</label>
          <select name="product_brand" defaultValue={product?.product_brand}>
            <option value=""></option>
            {renderedBrands}
          </select>
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="product_brand" />
        </div>
        <div className="flex justify-center">
          <button type="submit">{product ? "Обновить" : "Добавить"}</button>
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="detail" />
        </div>
      </form>
    </PageLayout>
  );
}
