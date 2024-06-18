import StyledButton from "./styledButton"
import { Bars } from 'react-loading-icons'


interface IForm {
  loading?: boolean;
  header: string;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errMsg: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
  buttonText: string;
  onClick: () => Promise<void>;
}

const Form: React.FC<IForm> = (props: IForm): JSX.Element => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-500">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">{props.header}</h1>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
            required
          />
        </div>
        {props.errMsg && <p className="text-red-500 mt-6">*{props.errMsg}</p>}
        <div className="flex items-center justify-between mt-8">
          <StyledButton loading={props.loading} text={props.buttonText} onClick={() => props.onClick()} customStyle={`h-[55px] bg-green-500 hover:bg-green-700 ${!props.email || !props.password ? 'opacity-50' : ''}`} type={"submit"}>
            {props.loading && <Bars height={30} width={30} />}
          </StyledButton>
        </div>
      </form>
    </div>
  )
}

export default Form;