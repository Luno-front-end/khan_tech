import React, { ChangeEvent, FC, useState } from "react";
import { Button } from "./Button";
import Api from "../../Api/getEmployees";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface State {
  upload: boolean;
  delete: boolean;
}

export const Main: FC = () => {
  const [file, setFile] = useState<object>({});
  const [fileLength, setFileLength] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isActiveNotify, setIsActiveNotify] = useState<State>({
    upload: false,
    delete: false,
  });
  const [seccessFile, setSeccessFile] = useState<string>("");

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
    await Api.uploadFile(file, token)
      .then(() => {
        setSeccessFile("Upload finish");
        setIsActiveNotify((prev) => ({
          ...prev,
          upload: true,
        }));
        setIsDisabled(false);
      })
      .catch((err) => {
     console.log(err)
      });
  };

  const handleClickDeleteRecords = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    await Api.deleteRecords(token)
      .then(() => {
        setSeccessFile("Delete finish");
        setIsActiveNotify((prev) => ({
          ...prev,
          delete: true,
        }));
        setIsDisabled(false);
      })
      .catch((err) => {
      
        console.log(err)
      });
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
        {(isActiveNotify.upload || isActiveNotify.delete )&& <p className="seccess-file">{seccessFile}</p>}

      </div>
    </div>
  );
};
