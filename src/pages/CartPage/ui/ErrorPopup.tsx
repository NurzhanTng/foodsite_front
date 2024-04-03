import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { setErrorText } from "../../../store/slices/mainSlice.ts";
import { useEffect } from "react";

const ErrorPopup = () => {
  const errorText = useAppSelector(state => state.main.errorText)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(setErrorText(null))
  };

  useEffect(() => {
    if (errorText === "")
      dispatch(setErrorText(null))
  }, [errorText]);

  return (
    <div
      className={`z-[1000] w-[calc(100%-40px)] fixed top-0 left-1/2 transform -translate-x-1/2 transition-transform duration-500 ${
        errorText !== null ? 'translate-y-4' : '-translate-y-full'
      }`}
    >
      <div className="bg-buttonSecondary2 flex flex-row justify-between rounded-full px-5 py-3 shadow-lg">
        {errorText}
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          &#10005;
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;