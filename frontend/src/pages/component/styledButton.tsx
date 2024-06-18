interface IButton {
  onClick: () => void;
  customStyle?: string;
  type?: "submit";
  loading?: boolean;
  text?: string;
  children?: React.ReactNode;
}

const StyledButton: React.FC<IButton> = (props: IButton): JSX.Element => {
  return (
    <button
      className={`w-full p-2 rounded ${props.customStyle}`}
      onClick={props.onClick}
      type={props.type}
    >
      {/* {props.text && <p>{props.text}</p>}
      {props.children && <span className="inline-block">{props.children}</span>} */}
      {props.loading ? (
        <span className="inline-block">{props.children}</span>
      ) : (
        <p>{props.text}</p>
      )}
    </button>
  )
}

export default StyledButton