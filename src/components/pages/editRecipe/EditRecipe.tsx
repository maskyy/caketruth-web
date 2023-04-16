import { useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";

export const EditRecipe = () => {
  const { id } = useParams();
  return (
    <PageLayout title="Редактирование рецепта" footer={false}>
      {id}
    </PageLayout>
  );
}
