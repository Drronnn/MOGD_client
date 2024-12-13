import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Shirt from "./Shirt";
import Mug from "./Mug";
import CameraRig from "./CameraRig";
import BackDrop from "./BackDrop";

const CanvasModel = ({ modelType }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.1} />
      <Environment preset="city" />

      <CameraRig>
        <BackDrop />
        <Shirt modelType={modelType} />
        <Mug modelType={modelType} />
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
