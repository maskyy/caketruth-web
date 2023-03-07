import { FC } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";
interface IViewRecipeProps { };

export const ViewRecipe: FC<IViewRecipeProps> = (props) => {
  const { recipeId } = useParams();
  return (
    <PageLayout title="Рецепт" footer={false}>
      {recipeId}
    </PageLayout>
  );
}
