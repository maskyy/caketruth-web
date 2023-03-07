import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}
