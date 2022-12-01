import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const receiverProfile = (set) => ({
  receiver: null,
  overwriteReceiver: (newReceiver) => {
    set((state) => ({receiver: newReceiver}))
  },
  clearReceiver: () => {  
    set((state) => ({ receiver: null}))     
  },
})

const useReceiverStore = create(
  devtools(
    persist(receiverProfile, {
      name: "receiver",
    })
  )
);

export default useReceiverStore;
