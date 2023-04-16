import { useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";

export const EditProduct = () => {
  const { id } = useParams();
  return (
    <PageLayout title="Редактирование продукта" footer={false}>
      <p>{id}</p>
    </PageLayout>
  );
}
