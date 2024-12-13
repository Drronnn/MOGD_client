import React, { useContext, useEffect, useState } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";

const Mug = ({ modelType }) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/mug_baked1.glb");
  const logoTexture = useTexture(snap.logoDecal);

  const mat = materials["Material.001"];
  const geom = nodes.Object_2.geometry;

  const rotationMugDecal = [Math.PI / 2, -Math.PI / 2, 0];

  useFrame((state, delta) => easing.dampC(mat.color, snap.color, 0.25, delta));
  const stateString = JSON.stringify(snap);
  return (
    <group key={stateString} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={geom}
        material={mat}
        material-roughness={1}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        dispose={null}
        position={modelType == "Футболка" ? [2, 0, 0] : [0, 0, 0]}
      >
        <Decal
          position={[0.1, snap.logoX, snap.logoY]}
          rotation={[Math.PI / 2, Math.PI / 2, snap.logoRotation]}
          scale={snap.logoSize - 0.1}
          map={logoTexture}
        />
      </mesh>
    </group>
  );
};

export default Mug;
