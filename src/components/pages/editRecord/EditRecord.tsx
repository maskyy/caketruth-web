import { FC } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";

export const EditRecord: FC = () => {
  const { recordId } = useParams();
  return (
    <PageLayout title="Редактирование записи" footer={false}>
      <p>{recordId}</p>
    </PageLayout>
  );
}
