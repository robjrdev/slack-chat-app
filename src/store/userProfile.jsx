import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const userProfile = (set) => ({
  profile: null, 
  overwriteProfile: (newProfile) => {  
    set((state) => ({ profile: newProfile}))     
  },
  clearProfile: () => {  
    set((state) => ({ profile: null}))     
  },
});

const userProfileStore = create(
  devtools(
    persist(userProfile, {
      name: "profiles",
    })
  )
);

export default userProfileStore;

