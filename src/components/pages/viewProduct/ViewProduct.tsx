import { FC } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";
interface IViewProductProps { };

export const ViewProduct: FC<IViewProductProps> = (props) => {
  const { productId } = useParams();
  return (
    <PageLayout title="Продукт" footer={false}>
      {productId}
    </PageLayout>
  );
}
