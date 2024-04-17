import Popup from "reactjs-popup";
import { cn } from "./cn";
type Props = {
  message: { message: string; header: string };

  confirmButtonCss?: string;
  confirmButtonText?: string;
  alertOpen: boolean;
  setAlertOpen: (boolean) => void;
  AlertIcon: any;
  alertCss?: string;
  accept: () => void;
  reject: () => void;
};

const AlertBox = ({
  message: { message, header },
  alertOpen,
  setAlertOpen,
  confirmButtonCss,
  confirmButtonText,
  accept,
  reject,

  AlertIcon,
  alertCss,
}: Props) => {
  return (
    <>
      {/* component */}
      <Popup
        modal
        className=""
        open={alertOpen}
        closeOnDocumentClick={false}
        lockScroll={true}
        onClose={() => setAlertOpen(false)}
      >
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-7 space-y-5 rounded-lg">
            <div className="w-[35rem]  border-orange-400 rounded-lg flex">
              <div className="w-1/3 pt-6 flex justify-center">
                <AlertIcon className={cn("text-red-500 size-20", alertCss)} />
              </div>
              <div className="w-full pt-9 pr-4">
                <h3 className="font-bold text-red-500 text-2xl">{header}</h3>
                <p className="py-4 text-base text-gray-500">{message}</p>
              </div>
            </div>
            <div className="p-4 flex space-x-4">
              <button
                onClick={reject}
                className="w-1/2 px-4 py-3 text-center bg-gray-200 text-gray-500 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-base  transition-all duration-150"
              >
                Cancel
              </button>
              <button
                onClick={accept}
                className={cn(
                  "w-1/2 px-4 py-2 text-center text-red-500 outline-1 outline-red-500 outline hover:text-white hover:bg-red-500 rounded-lg transition-all duration-150  font-bold text-base ",
                  confirmButtonCss
                )}
              >
                {confirmButtonText}
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default AlertBox;
