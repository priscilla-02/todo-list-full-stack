interface IButton {
  onClick: () => void;
  text?: string;
  customStyle?: string;
  type?: "submit";
  children?: React.ReactNode;
}

const StyledButton: React.FC<IButton> = (props: IButton): JSX.Element => {
  return (
    <button
      className={`w-full text-white p-2 rounded ${props.customStyle}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.text}
      {props.children && <span className="inline-block ml-2">{props.children}</span>}

    </button>
  )
}

export default StyledButton