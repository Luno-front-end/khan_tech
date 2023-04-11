import React, { ChangeEvent, FC, useRef, useState } from "react";
import { Button } from "./Button";
import Api from "../../Api/getEmployees";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

export const Main: FC = () => {
  const [file, setFile] = useState<object>({});
  const [fileLength, setFileLength] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const token = useSelector(
    (state: RootState) => state.adminAuth.adminAuth.token
  );

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileLength(files?.length!);
    setFile(files!);
  };

  const handleClickUploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileLength === 0) return;
    setIsDisabled(true);
    await Api.uploadFile(file, token).then(() => setIsDisabled(false));
  };

  const handleClickDeleteRecords = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    await Api.deleteRecords(token).then(() => setIsDisabled(false));
  };

  return (
    <div className="backdrop-panel">
      <div className="wrapper-admin">
        <h1 className="header-panel">My future fate depends on this :)</h1>

        <form className="form-admin" onSubmit={handleClickUploadFile}>
          <input
            type="file"
            className="input-admin"
            name="file"
            onChange={handleChangeFile}
          />
          <Button className="btn-send-admin" isDisabled={isDisabled}>
            Завантажити файл
          </Button>
        </form>

        <Button
          className="btn-del-admin"
          isDisabled={isDisabled}
          onClick={handleClickDeleteRecords}
        >
          Видалити всі записи!
        </Button>
      </div>
    </div>
  );
};
