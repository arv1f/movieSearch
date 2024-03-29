import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Store {
  isThemeDark: boolean;
  toggleTheme: () => void;
}

export const useMainStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        isThemeDark: false,
        toggleTheme: () =>
          set((state) => ({
            isThemeDark: !state.isThemeDark,
          })),
      }),
      { name: "main", version: 1 },
    ),
  ),
);
