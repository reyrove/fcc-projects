document.getElementById('check-btn').addEventListener('click', function() {
    const input = document.getElementById('text-input').value;
    const resultElement = document.getElementById('result');
    
  
    if (!input) {
        alert("Please input a value");
        return;
    }
    

    const normalizedInput = input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    
    if (normalizedInput === normalizedInput.split('').reverse().join('')) {
        resultElement.textContent = `${input} is a palindrome`;
    } else {
        resultElement.textContent = `${input} is not a palindrome`;
    }
});