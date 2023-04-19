import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";
import { addRecipe, fetchRecipe, resetSucceeded, updateRecipe } from "../../../store/action";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Spinner } from "../../spinner/Spinner";
import { NotFound } from "../not-found/NotFound";
import { RecipeUpdate } from "../../../types/Recipe";
import { Header } from "../../header/Header";
import { CgArrowLeft } from "react-icons/cg";
import { ErrorField } from "../../error_field/ErrorField";
import { UpdateIngredient } from "../../../types/Ingredient";

export const EditRecipe = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = Number(useParams().id);

  const user = useAppSelector((state) => state.user);
  let recipe = useAppSelector((state) => state.recipe);
  const isLoading = useAppSelector((state) => state.isLoading);
  const recipeCategories = useAppSelector((state) => state.recipeCategories);
  const products = useAppSelector((state) => state.products);
  const productBrands = useAppSelector((state) => state.productBrands);
  const succeeded = useAppSelector((state) => state.succeeded);

  const isNew = location.pathname === "/recipes/new";
  const [count, setCount] = useState(recipe?.products.length ?? 3);

  if (isNew) {
    recipe = null;
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipe(id));
    }
    dispatch(resetSucceeded());
  }, [dispatch, id]);

  useEffect(() => {
    if (succeeded) {
      navigate("/recipes");
      dispatch(resetSucceeded());
    }
  }, [succeeded, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  if (!recipe && !isNew) {
    return <NotFound />;
  }

  const renderedCategories = recipeCategories.map((c) => (
    <option key={c.id} value={c.id}>{c.title}</option>
  ));

  const productChoices = [
    <option key={null} value=""></option>,
    ...products.map((p) => {
      const brand = productBrands.find((b) => b.id === p.product_brand)?.title ?? "";
      return <option key={p.id} value={p.id}>{brand} {p.name}</option>;
    })
  ];

  const renderedFields = Array.from({ length: count }).map((_, idx) => {
    const ingredients = recipe?.products ?? [];
    const p = idx < ingredients.length ? ingredients[idx] : null;
    return (
      <div key={idx} className="flex flex-col gap-2 my-2">
        <div className="flex justify-between mx-4">
          <label>Продукт {idx + 1}</label>
          <select className="w-48 border-gray-300" name={`product-${idx}`} required defaultValue={p?.product.id ?? ""}>
            {productChoices}
          </select>
        </div>
        <div className="flex justify-between mx-4">
          <label>Масса</label>
          <input className="w-48 border-gray-300 border-2" type="number" step={0.1} name={`mass-${idx}`} min={0} max={10000} required defaultValue={p?.mass ?? ""} />
        </div>
      </div>
    )
  })

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = +e.target.value;
    if (amount < 2 || amount > 25) {
      return;
    }

    setCount(amount);
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form) as Iterable<[RecipeUpdate]>;
    const data: RecipeUpdate & { [key: string]: string } = Object.fromEntries(formData);

    const products = Object.keys(data).filter((k) => k.startsWith("product-"));
    const masses = Object.keys(data).filter((k) => k.startsWith("mass-"));
    const ingredients: UpdateIngredient[] = products.map((p, idx) => {
      const product = +data[p];
      const mass = +data[masses[idx]];

      delete data[p];
      delete data[masses[idx]];

      return { product, mass };
    });
    data.products = ingredients;

    if (data?.id && !+data.id) {
      delete data.id;
    }

    if (isNew) {
      dispatch(addRecipe(data));
    } else {
      dispatch(updateRecipe(data));
    }
  };

  return (
    <PageLayout
      title="Редактирование рецепта"
      header={
        <Header icon={false}>
          <Link to="/recipes"><CgArrowLeft size={24} /></Link>
          <h1>{recipe?.name ?? "Новый рецепт"}</h1>
        </Header>
      }
      footer={false}>
      <form className="flex justify-center flex-col gap-2" action="#" method="post" onSubmit={handleFormSubmit}>
        <input type="hidden" name="id" value={Number.isNaN(id) ? 0 : id} />
        <input type="hidden" name="user" value={user?.id ?? 0} />
        <div className="flex justify-between mx-2">
          <label>Название</label>
          <input type="text" name="name" className="w-32 border-gray-300 border-2" defaultValue={recipe?.name} />
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="name" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Приготовление</label>
          <textarea className="w-48 border-gray-300 border-2" name="directions" defaultValue={recipe?.directions}/>
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="directions" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Масса</label>
          <input type="number" name="mass" step={0.1} className="w-32 border-gray-300 border-2" defaultValue={recipe?.mass} />
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="mass" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Категория</label>
          <select name="recipe_category" defaultValue={recipe?.recipe_category}>
            <option value=""></option>
            {renderedCategories}
          </select>
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="recipe_category" />
        </div>
        <div className="flex justify-between mx-2">
          <label>Кол-во продуктов</label>
          <input
            type="number"
            className="w-32 border-gray-300 border-2"
            defaultValue={recipe?.products.length ?? 3}
            onChange={handleCountChange}
          />
        </div>
        <div>
          {renderedFields}
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="products" />
        </div>
        <div className="flex justify-center">
          <button type="submit">{recipe ? "Обновить" : "Добавить"}</button>
        </div>
        <div className="flex justify-center text-red-600">
          <ErrorField field="detail" />
        </div>
      </form>
    </PageLayout>
  );
}
