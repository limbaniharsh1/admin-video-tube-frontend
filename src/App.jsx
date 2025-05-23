import { Provider } from "react-redux";
import "./App.css";
import AllRoutes from "./route/AllRoutes";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <AllRoutes />
    </Provider>
  );
}

export default App;
