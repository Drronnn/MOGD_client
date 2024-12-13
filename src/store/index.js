import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#FFFFFF",
  logoX: 0,
  logoY: 0,
  logoRotation: 0,
  logoSize: 0.5,
  logoDecal: "./threejs.png",
});

export default state;
