import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const userContacts = (set) => ({
  contacts: [],
  addContact: (contact) => {
    set((state) => ({
      contacts: [contact, ...state.contacts],
    })) 
  },
  removeContact: (contact_id) => {
    set((state) => ({
      contacts: state.contact.filter((c) => c.id !== contact_id)
    }))
  },
})

const useContactsStore = create(
  devtools(
    persist(userContacts, {
      name: "contacts",
    })
  )
);

export default useContactsStore;
