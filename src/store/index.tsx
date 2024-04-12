import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Store {
  isThemeDark: boolean;
  toggleTheme: () => void;
  backgroundUrl: string;
  setBackgroundUrl: (url: string) => void;
}
interface movieStore {
  idList: number[];
  addIdList: (id: number) => void;
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

export const useMovieRandomeStore = create<movieStore>()((set) => ({
  idList: [],
  addIdList: (id) =>
    set((state) => ({
      idList: [...state.idList, id],
    })),
}));
