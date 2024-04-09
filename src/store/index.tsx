import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Store {
  isThemeDark: boolean;
  toggleTheme: () => void;
  backgroundUrl: string;
  setBackgroundUrl: (url: string) => void;
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
        backgroundUrl: "",
        setBackgroundUrl: (backgroundUrl) =>
          set(() => ({
            backgroundUrl: backgroundUrl,
          })),
      }),
      { name: "main", version: 1 },
    ),
  ),
);
