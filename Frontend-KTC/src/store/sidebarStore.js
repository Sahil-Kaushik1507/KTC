import { create } from "zustand";

const useSidebarStore = create((set) => ({
  sideBarOption: "Docket",

  setSideBarOption: (option) =>
    set({
      sideBarOption: option,
    }),
}));

export default useSidebarStore;