import { create } from "zustand";

const Useconversation = create((set) => ({
  loading: false,
  setloading: (loading) => set({ loading: loading }),
}));

export default Useconversation;
