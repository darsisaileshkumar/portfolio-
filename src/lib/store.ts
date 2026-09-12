import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AppState {
  introFinished: boolean;
  setIntroFinished: (finished: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      introFinished: false,
      setIntroFinished: (finished) => set({ introFinished: finished }),
    }),
    {
      name: "portfolio-intro-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
