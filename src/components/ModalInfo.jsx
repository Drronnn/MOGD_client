import React from "react";
import CustomButton from "./CustomButton";

const ModalInfo = ({ setShowModal }) => {
  return (
    <>
      <div className="absolute z-10 w-full h-full bg-black opacity-50"></div>
      <div className="z-20 absolute h-[50vh] my-[25vh] w-[50vw] mx-[25vw] bg-white rounded-3xl border-solid border-4 border-black flex flex-col">
        <img src={"./threejs2.png"} className="w-[30%] pl-20"></img>
        <div className="h-80  px-20 font-bold text-lg">
          We provide a wide range of digital print solutions that help enhance
          the quality of your printing process. The use of digital print
          applications has increased to a great extent in the print market due
          to the amazing quality of printing.
        </div>
        <CustomButton
          title="Закрыть"
          handleClick={() => setShowModal(false)}
          customStyles="ml-auto w-fit px-16 py-3 mb-2 mr-2 font-bold text-sm custom-button"
        />
      </div>
    </>
  );
};

export default ModalInfo;
