document.addEventListener('DOMContentLoaded', () => {
    const tempInput = document.getElementById('temperature');
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    const convertBtn = document.getElementById('convert-btn');
    const resultContainer = document.getElementById('result-container');
    const resultValue = document.getElementById('result-value');
    const errorMessage = document.getElementById('error-message');
    const swapBtn = document.getElementById('swap-btn');

    // Swap units
    swapBtn.addEventListener('click', () => {
        const temp = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = temp;
        
        // Trigger conversion if input is not empty
        if (tempInput.value.trim() !== '') {
            convertTemperature();
        }
    });

    // Handle Enter key
    tempInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            convertTemperature();
        }
    });

    // Clear error on input
    tempInput.addEventListener('input', () => {
        errorMessage.classList.remove('show');
        resultContainer.classList.remove('show');
    });

    convertBtn.addEventListener('click', convertTemperature);

    function convertTemperature() {
        const inputVal = tempInput.value.trim();
        
        // Validation
        if (inputVal === '' || isNaN(inputVal)) {
            errorMessage.classList.add('show');
            resultContainer.classList.remove('show');
            return;
        }

        errorMessage.classList.remove('show');
        
        const temp = parseFloat(inputVal);
        const from = fromUnit.value;
        const to = toUnit.value;
        
        let result = 0;
        let unitSymbol = '';

        if (from === to) {
            result = temp;
            unitSymbol = getSymbol(to);
        } else if (from === 'celsius' && to === 'fahrenheit') {
            result = (temp * 9/5) + 32;
            unitSymbol = '°F';
        } else if (from === 'celsius' && to === 'kelvin') {
            result = temp + 273.15;
            unitSymbol = 'K';
        } else if (from === 'fahrenheit' && to === 'celsius') {
            result = (temp - 32) * 5/9;
            unitSymbol = '°C';
        } else if (from === 'fahrenheit' && to === 'kelvin') {
            result = (temp - 32) * 5/9 + 273.15;
            unitSymbol = 'K';
        } else if (from === 'kelvin' && to === 'celsius') {
            result = temp - 273.15;
            unitSymbol = '°C';
        } else if (from === 'kelvin' && to === 'fahrenheit') {
            result = (temp - 273.15) * 9/5 + 32;
            unitSymbol = '°F';
        }

        // Format result nicely
        const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(2));
        
        resultValue.innerHTML = `${formattedResult}<span class="result-unit">${unitSymbol}</span>`;
        resultContainer.classList.add('show');
    }

    function getSymbol(unit) {
        if (unit === 'celsius') return '°C';
        if (unit === 'fahrenheit') return '°F';
        if (unit === 'kelvin') return 'K';
        return '';
    }
});