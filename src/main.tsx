import { Suspense, lazy, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Loader } from "./Loader";

const App = lazy(() => import("./App"));

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Unable to find the application root element.");

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <Loader isGo />
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
);
