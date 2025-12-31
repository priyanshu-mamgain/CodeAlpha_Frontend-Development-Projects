let display = document.getElementById('display');
let currentInput = '';

function appendToDisplay(value) {
    if (display.value === 'Error' || display.value === '0') currentInput = '';
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = ''; display.value = '';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput || '';
}

function calculate() {
    try {
        let result = eval(currentInput.replace('÷', '/').replace('×', '*'));
        currentInput = result.toString();
        display.value = Number.isInteger(result) ? result : result.toFixed(8).replace(/\.?0+$/, '');
    } catch {
        display.value = 'Error'; currentInput = '';
    }
}

function toggleSign() {
    if (currentInput && !currentInput.includes('Error')) {
        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
        display.value = currentInput;
    }
}

// Keyboard support //
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') appendToDisplay(e.key);
    if (e.key === '+') appendToDisplay('+');
    if (e.key === '-') appendToDisplay('-');
    if (e.key === '*') appendToDisplay('*');
    if (e.key === '/') appendToDisplay('/');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === 'Backspace') backspace();
});
