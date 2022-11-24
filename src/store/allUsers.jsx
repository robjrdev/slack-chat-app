import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const allUsers = (set) => ({
  allUsers: [], 
  generateUsers: (userAccounts) => {  
    allUsers: [userAccounts, ...state.allUsers]
  },
  clearUsers: () => {  
    set((state) => ({ allUsers: []}))     
  },
});

const allUsersStore = create(
  devtools(
    persist(userProfile, {
      name: "profiles",
    })
  )
);

export default allUsersStore;

