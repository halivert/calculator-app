const appName = "calculator-app";
const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
const lightTheme = window.matchMedia("(prefers-color-scheme: light)");

function setTheme(theme, writeStorage) {
	const rootClassList = document.documentElement.classList;
	const themeSwitcher = document.getElementById("themeSwitcher");

	if (writeStorage) {
		localStorage.setItem(appName, JSON.stringify({ theme: theme }));
	}

	if (theme === "dark") {
		rootClassList.remove("light-theme", "purple-theme");
		rootClassList.add("dark-theme");
		if (themeSwitcher) themeSwitcher.value = 1;
	}

	if (theme === "light") {
		rootClassList.remove("dark-theme", "purple-theme");
		rootClassList.add("light-theme");
		if (themeSwitcher) themeSwitcher.value = 2;
	}

	if (theme === "purple") {
		rootClassList.remove("dark-theme", "light-theme");
		rootClassList.add("purple-theme");
		if (themeSwitcher) themeSwitcher.value = 3;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const className = document.documentElement.classList[0].split("-")[0];

	if (className === "dark") {
		themeSwitcher.value = "1";
	} else if (className === "light") {
		themeSwitcher.value = "2";
	} else if (className === "purple") {
		themeSwitcher.value = "3";
	}

	themeSwitcher.addEventListener("change", ({ target }) => {
		if (target.value === "1") setTheme("dark", true);
		else if (target.value === "2") setTheme("light", true);
		else setTheme("purple", true);
	});
});

darkTheme.addEventListener("change", (evt) => {
	if (evt.matches) setTheme("dark", false);
});

lightTheme.addEventListener("change", (evt) => {
	if (evt.matches) setTheme("light", false);
});

let storage = JSON.parse(localStorage.getItem(appName));

if (storage) {
	setTheme(storage.theme || "dark", false);
} else {
	setTheme(darkTheme.matches ? "dark" : "light");
}
