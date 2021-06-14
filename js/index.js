function groupByThree(arr) {
	let result = [];
	for (let i = 0; i < arr.length / 3; i++) {
		result.push(
			arr
				.slice(3 * i, 3 * (i + 1))
				.reverse()
				.join("")
		);
	}
	return result;
}

function formatNumber(num) {
	let [beforePoint, afterPoint] = num.split(".");

	let groups = groupByThree(beforePoint.split("").reverse())
		.reverse()
		.join(",");

	if (afterPoint !== undefined) {
		return [groups, afterPoint].join(".");
	}

	return groups !== "" ? groups : "0";
}

function setButtonEvents(buttons, screen) {
	screen.textContent = "0";

	const operators = {
		x: (a, b) => a * b,
		"/": (a, b) => a / b,
		"+": (a, b) => a + b,
		"-": (a, b) => a - b,
		del: "",
		reset: ["", "", (a, b) => b],
		eq: "",
	};

	let [temp, value, lastOp] = operators["reset"];
	let lastPressedEq = false;

	buttons.forEach((button) => {
		button.addEventListener("click", ({ target }) => {
			if (!Object.keys(operators).includes(target.id)) {
				if (target.id === ".") {
					if (temp.includes(".") || !temp.length) return;
				}

				temp += target.id;
			} else if (target.id === "reset") {
				[temp, value, lastOp] = operators[target.id];
			} else if (target.id === "del") {
				temp = temp.substring(0, temp.length - 1);
			} else if (target.id === "eq") {
				if (temp !== "") {
					value = lastOp(value, parseInt(temp, 10));
				}
				screen.textContent = formatNumber(value.toString());
			} else if (["x", "/", "+", "-"].includes(target.id)) {
				if (temp !== "") {
					if (!lastPressedEq) value = lastOp(value, parseInt(temp, 10));
					temp = "";
					screen.textContent = formatNumber(value.toString());
				}

				lastOp = operators[target.id];
			}

			if (!["x", "/", "+", "-", "eq"].includes(target.id)) {
				screen.textContent = formatNumber(temp.toString());
			}

			lastPressedEq = target.id === "eq";
		});
	});
}

document.addEventListener("DOMContentLoaded", () => {
	setButtonEvents(
		document.querySelectorAll("button.button"),
		document.querySelector(".screen > span")
	);
});
