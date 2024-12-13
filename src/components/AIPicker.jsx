import React from "react";
import CustomButton from "./CustomButton";
import { Circles } from "react-loader-spinner";
const AIPicker = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
  color,
}) => {
  return (
    <div className="aipicker-container">
      <textarea
        placeholder="Напишите свой запрос для ИИ..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea text-black"
      />
      <div className="flex flex-wrap gap-3 justify-center">
        {generatingImg ? (
          <Circles
            height="50"
            width="full"
            color={color}
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass="w-full m-auto justify-center"
            visible={true}
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="ИИ Лого"
              handleClick={() => handleSubmit("logo")}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
