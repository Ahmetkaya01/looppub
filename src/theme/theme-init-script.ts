/** Runs before paint to avoid wrong-theme flash. Keep in sync with ThemeProvider STORAGE_KEY. */
export const THEME_STORAGE_KEY = "loop-pub-theme";

export const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var t=localStorage.getItem(k);var d=document.documentElement;d.classList.remove("light","dark");if(t==="light"||t==="dark"){d.classList.add(t);}else{d.classList.add("dark");}}catch(e){document.documentElement.classList.add("dark");}})();`;
