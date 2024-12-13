import { AnimatePresence, motion } from "framer-motion";
// const dotenv = require("dotenv");
import { useSnapshot } from "valtio";
import state from "../store";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { EditorTabs, FilterTabs } from "../config/constants";
import { reader } from "../config/helpers";
import {
  ColorPicker,
  CustomButton,
  Tab,
  AIPicker,
  FilePicker,
  ModalInfo,
} from "../components/index";
import { info } from "../assets";
import React, { useState } from "react";

const Customizer = ({ modelType, setModelType }) => {
  const snap = useSnapshot(state);
  // useStates
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
            color={snap.color}
          />
        );
      default:
        return null;
    }
  };

  // handle submit for ai prompt
  const handleSubmit = async (type) => {
    console.log("type", type);
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);
      const url = "https://mogd-server.onrender.com/" + "api/v1/dalle"; // import.meta.env.VITE_BACKEND_URL
      console.log("url", url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      const data = await response.json();
      console.log("data CLIENT", data);

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      console.log("err");
      alert(error);
    } finally {
      setGeneratingImg(false);
    }
  };

  const handleDecals = (type, result) => {
    console.log("type", type);
    // decalType.stateProperty -> fullDecal || logoDecal
    state.logoDecal = result;
  };

  // hadnle filter tab content depending on the activeTab
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "up":
        state.logoY += 0.04;
        break;
      case "down":
        state.logoY -= 0.04;
        break;
      case "right":
        state.logoX += 0.04;
        break;
      case "left":
        state.logoX -= 0.04;
        break;
      case "rotationLeft":
        state.logoRotation += Math.PI / 8;
        break;
      case "rotationRight":
        state.logoRotation -= Math.PI / 8;
        break;
      case "plus":
        state.logoSize += 0.1;
        break;
      case "minus":
        state.logoSize -= 0.1;
        if (state.logoSize <= 0.3) state.logoSize = 0.3;
        break;
      default:
        break;
    }
    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
    console.log("filterTab", activeFilterTab);
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <>
      <AnimatePresence>
        {!snap.intro && (
          <>
            {/* 3  Editor tabs icon */}
            <motion.div
              key="custom"
              className="absolute top-0 left-20 z-10"
              {...slideAnimation("left")}
            >
              <div className="flex items-center min-h-screen">
                <div className="editortabs-container tabs">
                  {EditorTabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      handleClick={() => {
                        setActiveEditorTab((prevTab) =>
                          prevTab === tab.name ? null : tab.name
                        );
                      }}
                      isActive={activeEditorTab === tab.name} // Active сheck
                    />
                  ))}
                  {generateTabContent()}
                </div>
              </div>
            </motion.div>

            {/* НАЗАД */}
            <motion.div
              className="absolute z-10 top-10 right-10 "
              {...fadeAnimation}
            >
              <div className="flex flex-row justify-center align-middle h-full w-full ">
                <button onClick={() => setShowModal(true)} className="pr-2">
                  <img src={info} width={40} height={40} />
                </button>
                <CustomButton
                  title="Назад"
                  handleClick={() => {
                    state.intro = true;
                  }}
                  customStyles="w-fit px-20 py-3.5 font-bold text-sm custom-button"
                />
              </div>
            </motion.div>

            {/* Buttonnn Отправить на производство */}
            <motion.div
              className="absolute bottom-20 right-10 z-10 "
              {...fadeAnimation}
            >
              <CustomButton
                title="Отправить на производство"
                handleClick={() => (state.intro = true)}
                customStyles="w-fit px-10 py-3 font-bold text-sm custom-button"
              />
            </motion.div>

            {/* 2 filter icon at bottom */}
            <motion.div
              className="filtertabs-container"
              {...slideAnimation("up")}
            >
              {FilterTabs.map((tab) => (
                <Tab
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  handleClick={() => handleActiveFilterTab(tab.name)}
                />
              ))}
            </motion.div>

            {/* Toggle switch between "Футболка" and "Кружка" */}
            <motion.div
              className="absolute top-10 left-10 z-10 flex gap-0"
              {...slideAnimation("up")}
            >
              <button
                onClick={() => setModelType("Футболка")}
                className={`px-3 py-3 rounded-l-full font-bold transition-colors duration-300 ${
                  modelType === "Футболка"
                    ? "bg-black text-white"
                    : "bg-gray-300 text-black"
                } hover:bg-black hover:text-white`}
              >
                Футболка
              </button>
              <button
                onClick={() => setModelType("Кружка")}
                className={`px-7 py-3 rounded-r-full font-bold transition-colors duration-300 ${
                  modelType === "Кружка"
                    ? "bg-black text-white"
                    : "bg-gray-300 text-black"
                } hover:bg-black hover:text-white`}
              >
                Кружка
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {showModal && (
        <motion.div className="modal-popup " {...slideAnimation("up")}>
          <ModalInfo setShowModal={setShowModal} />
        </motion.div>
      )}
    </>
  );
};

export default Customizer;
