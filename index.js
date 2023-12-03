const form = document.querySelector("#calc_form");
const output = document.querySelector("#output");
const operandBtns = document.querySelectorAll("button[data-type=operand]");
const operatorBtns = document.querySelectorAll("button[data-type=operator]");

// Stop the form from submitting whenever we click a button
form.addEventListener("submit", e => {
    e.preventDefault();
});


// Operand Buttons
let isOperator = false;
operandBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        if (output.value == "0")
            output.value = e.target.value;
        else if (isOperator) { // If we previously clicked on an operator button we now use this one
            isOperator = false;
            output.value = e.target.value;
        }
        else if (output.value.includes(".")) // If we already have a dot we don't want more than one
            output.value = output.value + "" + e.target.value.replace(".", "");
        else {
            output.value = output.value + e.target.value;
        }
    });
});

// Operator Buttons
let equation = [];
operatorBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        removeActive(); // Removing the last active operator button
        e.currentTarget.classList.add("active"); // The current operator button stays active to apply styles on it

        switch (e.target.value) {
            case "invert":
                output.value = parseFloat(output.value) * -1;
                break;
            case "%":
                output.value = parseFloat(output.value) / 100;
                break;
            case "=":
                equation.push(output.value);
                output.value = eval(equation.join("")); // eval() is NOT safe to use when code is passed as input
                equation = [];
                break;
            default:
                let lastItem = equation[equation.length - 1];
                if (["/", "*", "+", "-"].includes(lastItem) && isOperator) {
                    equation.pop();
                    equation.push(e.target.value);
                }
                else {
                    equation.push(output.value);
                    equation.push(e.target.value);
                }
                isOperator = true;
                break;
        }
    });
});

const removeActive = () => {
    operatorBtns.forEach(btn => {
        btn.classList.remove("active");
    });
};