import React, { useContext, useEffect, useState } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";

const Shirt = ({ modelType }) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  const logoTexture = useTexture(snap.logoDecal);

  const mat = materials.lambert1;
  const geom = nodes.T_Shirt_male.geometry;
  const rotationShirt = [0, 0, 0];

  const rotationShirtDecal = [0, 0, 0];

  useFrame((state, delta) => easing.dampC(mat.color, snap.color, 0.25, delta));
  const stateString = JSON.stringify(snap);
  return (
    <group key={stateString} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={geom}
        material={mat}
        rotation={rotationShirt}
        material-roughness={1}
        dispose={null}
        position={modelType == "Футболка" ? [0, 0, 0] : [-2, 0, 0]}
      >
        <Decal
          position={[snap.logoX, snap.logoY, 0]}
          rotation={[0, 0, snap.logoRotation]}
          scale={snap.logoSize}
          map={logoTexture}
        />
      </mesh>
    </group>
  );
};

export default Shirt;
