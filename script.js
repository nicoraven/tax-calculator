let calculatedResult = 0;
const input = document.querySelector("#input");
const output = document.querySelector("#output");
const brackets = [
    {
        "name": "first",
        "maxOfPrevBracket": 0,
        "max": 50000000,
        "rate": 0.05
    },
    {
        "name": "second",
        "maxOfPrevBracket": 50000000,
        "max": 250000000,
        "rate": 0.15
    },
    {
        "name": "third",
        "maxOfPrevBracket": 250000000,
        "max": 500000000,
        "rate": 0.25
    },
    {
        "name": "last",
        "maxOfPrevBracket": 500000000,
        "max": Infinity,
        "rate": 0.30
    }
];

function taxCalculator (input) {
    input = convertIDR(input);

    let monthlyIncome = parseFloat(input);
    if (isNaN(monthlyIncome)) {
        calculatedResult = false;
    }
    else {
        let annualIncome = monthlyIncome * 12;
        let foundMax = false;
        brackets.map(bracket => {
            if (annualIncome > bracket.max && foundMax === false) {
                calculatedResult += (bracket.max - bracket.maxOfPrevBracket) * bracket.rate;
            }
            else if (annualIncome <= bracket.max && foundMax === false) {
                console.log(bracket.name);
                calculatedResult += (annualIncome - bracket.maxOfPrevBracket) * bracket.rate;
                foundMax = true;
            };
        });
    };
    console.log(calculatedResult);
    return calculatedResult;
};

// converts period and commas if user inputs income in ID currency style
function convertIDR (input) {
    // input = input.replace(/\./g,"").replace(/,/g, ".");
    input = input.replace(/\./g,"").replace(/,/g, ".");
    return input;
};

function displayResult (tax) {
    if (calculatedResult === false){
        output.innerHTML = "Please type in your monthly income without commas. \n eg. 123,456,789.98 => 123456789.98";
    }
    else {
        tax = tax.toLocaleString('id-ID', {currency: 'IDR', style: 'currency'});
        output.innerHTML = `Your Personal Income Tax: ${tax}`;
    };
}

function inputHandler (event) {
    calculatedResult = 0;
    console.log(event.target.value);
    let tax  = taxCalculator(event.target.value);
    displayResult(tax);

    // clear input
    event.target.value = "";
};

window.onload = function(){
    console.log("window onload");
    input.addEventListener("change", inputHandler);
};