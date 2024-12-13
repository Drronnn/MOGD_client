import React from "react";
import CustomButton from "./CustomButton";

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Загрузить файл
        </label>
        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === "" ? "Файл не выбран" : file.name}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <CustomButton
            type="filled"
            title="Установить лого"
            handleClick={() => readFile("full")}
            customStyles="text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default FilePicker;
