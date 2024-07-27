type CookSwitchProps = {
  value: boolean;
  onClick: () => void;
};

const CookSwitch = ({ value, onClick }: CookSwitchProps) => {
  return (
    <div
      onClick={onClick}
      className={`${value ? "border-[#3e703d] bg-[#89c64d]" : "border-[#91100b] bg-[#ea4505]"} h-[30px] w-[30px] rounded-[10px] border border-2 p-2.5`}
    ></div>
  );
};

export default CookSwitch;
