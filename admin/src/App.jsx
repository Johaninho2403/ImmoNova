import { Outlet, Await } from "react-router-dom";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Outlet />
    </div>
  );
};

export default App;
