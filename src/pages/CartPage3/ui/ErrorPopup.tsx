import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks.ts";
import { setErrorText } from "../../../store/slices/mainSlice.ts";
import { useEffect } from "react";

const ErrorPopup = () => {
  const errorText = useAppSelector((state) => state.main.errorText);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setErrorText(null));
  };

  useEffect(() => {
    if (errorText === "") dispatch(setErrorText(null));
  }, [errorText, dispatch]);

  return (
    <div
      className={`fixed left-1/2 top-0 z-[1000] w-[calc(100%-40px)] -translate-x-1/2 transform transition-transform duration-500 ${
        errorText ? "translate-y-[20px]" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-row justify-between rounded-[10px] border-[1px] border-error3 bg-buttonSecondary2 px-5 py-3 text-error3 shadow-lg">
        {errorText}
        <button
          className="text-error3 hover:text-gray-800"
          onClick={handleClose}
        >
          &#10005;
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
