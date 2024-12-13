import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import { useState } from "react";

function App() {
  const [modelType, setModelType] = useState("Футболка");
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Customizer modelType={modelType} setModelType={setModelType} />
      <Canvas modelType={modelType} />
    </main>
  );
}

export default App;
