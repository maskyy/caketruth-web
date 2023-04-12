import { useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";

export const EditRecord = () => {
  const { recordId } = useParams();
  return (
    <PageLayout title="Редактирование записи" footer={false}>
      <p>{recordId}</p>
    </PageLayout>
  );
}
