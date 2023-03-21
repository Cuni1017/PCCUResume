import MyButton from "../../../../components/MyButton";

interface Props {
  onSave: () => void;
  onCancel: () => void;
  disabled: boolean;
}

const SaveCheck = ({ onSave, onCancel, disabled }: Props) => {
  return (
    <div className="flex gap-24 justify-center">
      <MyButton
        disabled={disabled}
        onClick={onSave}
        classnames="w-[100px] bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-blue-600 text-white"
      >
        儲存
      </MyButton>
      <MyButton onClick={onCancel} classnames="w-[100px] hover:bg-gray-300">
        取消
      </MyButton>
    </div>
  );
};

export default SaveCheck;
