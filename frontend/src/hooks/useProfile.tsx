import React, { useContext, useEffect, useState } from "react";

interface IContext {
  profile: Profile | undefined;
  setProfileAndStore: (newProfile: Profile | undefined) => void;
}

export interface Profile {
  user_id: number;
  email: string;
}

export function useProfile(): IContext {
  return useContext(ProfileContext);
}

export const ProfileContext = React.createContext<IContext>({} as IContext);

export const ProfileContextProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const setProfileAndStore = (newProfile: Profile | undefined) => {
    if (newProfile) {
      localStorage.setItem("profile", JSON.stringify(newProfile));
    } else {
      localStorage.removeItem("profile");
    }
    setProfile(newProfile);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfileAndStore,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
