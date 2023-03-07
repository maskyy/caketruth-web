import { FC } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";
interface IEditRecipeProps { };

export const EditRecipe: FC<IEditRecipeProps> = (props) => {
  const { recipeId } = useParams();
  return (
    <PageLayout title="Редактирование рецепта" footer={false}>
      {recipeId}
    </PageLayout>
  );
}
