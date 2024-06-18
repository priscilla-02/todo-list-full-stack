import { useRouter } from "next/router";
import { useProfile } from "@/hooks/useProfile";
import { Routes } from "@/constants/routes";
import { TbLogout } from "react-icons/tb";
import StyledButton from "./styledButton";

const Logout = () => {
  const router = useRouter()
  const { setProfileAndStore } = useProfile()

  const handleLogout = () => {
    setProfileAndStore(undefined)
    router.push(Routes.LANDINGPAGE)
  }

  return (
    <div>
      <StyledButton onClick={() => handleLogout()} customStyle={"absolute top-4 right-10 bg-sky-500 hover:bg-sky-700 max-w-[45px] flex justify-center items-center"}>
        <TbLogout size={20} />
      </StyledButton>
    </div>
  )
};
export default Logout;