import { Link } from "react-router-dom";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";

export const NotFound = () => (
  <PageLayout title="Страница не найдена" header={<Header />} footer>
    <p>404 Страница не найдена</p>
    <Link to="/">На главную</Link>
  </PageLayout>
)
