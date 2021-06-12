const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
const lightTheme = window.matchMedia("(prefers-color-scheme: light)");

function setTheme(theme) {
	const rootClassList = document.documentElement.classList;
	const themeSwitcher = document.getElementById("themeSwitcher");

	if (theme === "dark") {
		rootClassList.remove("light-theme", "purple-theme");
		rootClassList.add("dark-theme");
		if (themeSwitcher) themeSwitcher.value = 1;
		return;
	}

	if (theme === "light") {
		rootClassList.remove("dark-theme", "purple-theme");
		rootClassList.add("light-theme");
		if (themeSwitcher) themeSwitcher.value = 2;
		return;
	}

	rootClassList.remove("dark-theme", "light-theme");
	rootClassList.add("purple-theme");
}

document.addEventListener("DOMContentLoaded", () => {
	if (lightTheme.matches) {
		themeSwitcher.value = 2;
	}

	themeSwitcher.addEventListener("change", ({ target }) => {
		if (target.value === "1") setTheme("dark");
		else if (target.value === "2") setTheme("light");
		else setTheme("purple");
	});
});

setTheme(darkTheme.matches ? "dark" : "light");

darkTheme.addEventListener("change", (evt) => {
	if (evt.matches) setTheme("dark");
});

lightTheme.addEventListener("change", (evt) => {
	if (evt.matches) setTheme("light");
});
