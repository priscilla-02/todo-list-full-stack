import { useRouter } from "next/router";
import StyledButton from "./styledButton";
import { useProfile } from "@/hooks/useProfile";
import { Routes } from "@/constants/routes";
import { TbLogout } from "react-icons/tb";

const Logout = () => {
  const router = useRouter()
  const { setProfileAndStore } = useProfile()

  const handleLogout = () => {
    setProfileAndStore(undefined)
    router.push(Routes.LANDINGPAGE)
  }

  return (
    <div>
      <StyledButton onClick={() => handleLogout()} text={"Logout"} customStyle={"absolute top-4 right-10 bg-sky-500 hover:bg-sky-700 max-w-[120px] flex justify-center items-center"}>
        <TbLogout />
      </StyledButton>
    </div>
  )
}
  ;
export default Logout;