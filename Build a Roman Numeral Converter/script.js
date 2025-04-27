const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
];

function convertToRoman(num) {
    if (num <= 0) return "Please enter a number greater than or equal to 1";
    if (num >= 4000) return "Please enter a number less than or equal to 3999";

    let result = '';
    for (const { value, symbol } of romanNumerals) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }
    return result;
}

document.getElementById('convert-btn').addEventListener('click', () => {
    const num = parseInt(document.getElementById('number').value);
    const outputElement = document.getElementById('output');

    if (isNaN(num) || num === '') {
        outputElement.textContent = "Please enter a valid number";
    } else if (num < 1) {
        outputElement.textContent = "Please enter a number greater than or equal to 1";
    } else if (num >= 4000) {
        outputElement.textContent = "Please enter a number less than or equal to 3999";
    } else {
        const roman = convertToRoman(num);
        outputElement.textContent = roman;
    }
});
