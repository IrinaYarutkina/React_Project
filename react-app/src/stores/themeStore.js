import { makeAutoObservable, reaction } from "mobx";

class ThemeStore {
    theme = "light";

    constructor() {
    makeAutoObservable(this);
    reaction(
        () => this.theme,
        (theme) => {
            document.documentElement.setAttribute("data-theme", theme);
        },
        { fireImmediately: true }
    );
    }
    toggleTheme() {
        this.theme = this.theme === "light" ? "dark" : "light";
    }
}

export const themeStore = new ThemeStore();


