import create from "zustand";
import { devtools, persist } from "zustand/middleware";

// const allUsers = (set) => ({
//   allUsers: [],
//   generateUsers: (userAccounts) => {
//     // debugger
//     allUsers: userAccounts
//   },
//   clearUsers: () => {
//     set((state) => ({ allUsers: [] }))
//   },
// });

// const allUsersStore = create();

// export default allUsersStore;

const allUsersStore = create((set) => ({
  allAvailableUser: [],
  generateUsers: (userAccounts) => {
    set((state) => ({
      allAvailableUser: [userAccounts, ...state.allAvailableUser],
    }))
  },
  clearUsers: () => set({}, true), // clears the entire store, actions included
}))

export default allUsersStore;

