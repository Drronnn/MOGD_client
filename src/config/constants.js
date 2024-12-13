import {
  swatch,
  fileIcon,
  ai,
  up,
  down,
  left,
  right,
  rotationLeft,
  rotationRight,
  plus,
  minus,
} from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "up",
    icon: up,
  },
  {
    name: "down",
    icon: down,
  },
  {
    name: "left",
    icon: left,
  },
  {
    name: "right",
    icon: right,
  },
  {
    name: "rotationLeft",
    icon: rotationLeft,
  },
  {
    name: "rotationRight",
    icon: rotationRight,
  },
  {
    name: "plus",
    icon: plus,
  },
  {
    name: "minus",
    icon: minus,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
