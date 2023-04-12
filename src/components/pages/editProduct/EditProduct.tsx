import { useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";

export const EditProduct = () => {
  const { productId } = useParams();
  return (
    <PageLayout title="Редактирование продукта" footer={false}>
      <p>{productId}</p>
    </PageLayout>
  );
}
