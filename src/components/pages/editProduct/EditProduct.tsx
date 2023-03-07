import { FC } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";
interface IEditProductProps { };

export const EditProduct: FC<IEditProductProps> = (props) => {
  const { productId } = useParams();
  return (
    <PageLayout title="Редактирование продукта" footer={false}>
      <p>{productId}</p>
    </PageLayout>
  );
}
