const form = document.querySelector("#calc_form");
const output = document.querySelector("#output");
const operandBtns = document.querySelectorAll("button[data-type=operand]");

// Stop the form from submitting whenever we click a button
form.addEventListener("submit", e => {
    e.preventDefault();
});

let isOperator = false;
operandBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        if (output.value == "0")
            output.value = e.target.value;
        else if (isOperator) { // If we previously clicked on an operator button we now use this one
            isOperator = false;
            output.value = e.target.value;
        }
        else if (output.value.includes(".")) // If we already have a dot we don't want more
            output.value = output.value + "" + e.target.value.replace(".", "");
        else {
            output.value = output.value + e.target.value;
        }
    });
});