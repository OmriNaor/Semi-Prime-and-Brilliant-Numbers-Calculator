// Constants used in the script
const COLUMN_SIZE = 10;

// When the DOM is fully loaded, initialize the application
document.addEventListener('DOMContentLoaded', init);

// Defines a global object to hold the calculation results for semi-prime and brilliant numbers
let results = {
    semi: [],
    brilliant: []
};

// Initializes event listeners for user interactions
function init() 
{
    // When the calculate button is clicked, invoke the calculateNumbers function
    document.getElementById('cmdCalculate').addEventListener('click', calculateNumbers);

    // When the OK button in the error message is clicked, invoke the hideError function
    document.getElementById('errorOkButton').addEventListener('click', hideError);
}

// Function to get all prime factors of a given number
function getNumPrimes(num) 
{
    let primes = [];

    // Check for prime factors up to the square root of the number
    for (let i = 2 ; i <= Math.sqrt(num) ; i++) 
        // While 'i' is a factor of 'num', divide 'num' by 'i' and add 'i' to the list of prime factors
        while (num % i === 0) 
        {
            primes.push(i);
            num /= i;
        }
    

    // If there is any number left after the factorization, add it to the list (it's also a prime factor)
    if (num > 1) 
        primes.push(num);

    return primes;
}

// Checks if the number is a semi-prime (a product of exactly two prime numbers)
function isSemiPrime(num) 
{
    let primes = getNumPrimes(num);

    // A number is semi-prime if it has exactly two prime factors, or it is a square of a prime number
    return primes.length === 2 || (primes.length === 1 && Math.pow(primes[0], 2) === num);
}

// Checks if the number is brilliant (a semi-prime where both prime factors have the same length)
function isBrilliant(num) 
{
    let primes = getNumPrimes(num);

    // A number is brilliant if it has exactly two prime factors with the same digit count
    return primes.length === 2 && primes[0].toString().length === primes[1].toString().length;
}

// Main function to calculate and display semi-prime and brilliant numbers
function calculateNumbers() 
{
    // Retrieve the user input and convert it to a number
    const input = document.getElementById('txtInput').value;
    const num = Number(input);

    // Check if the input is a valid positive integer
    if (!Number.isInteger(num) || num <= 0 || input.includes('.'))  
    {
        // If not, display an error message
        displayError('Only positive integer numbers are supported!');
        return;
    }

    // Reset the results object
    results.semi = [];
    results.brilliant = [];
    // Clear the result display area
    document.getElementById('result').innerHTML = '';

    // Iterate through all numbers up to the input number to find and store semi-prime and brilliant numbers
    for (let i = 2 ; i <= num ; i++) 
        if (isSemiPrime(i)) 
        {
            results.semi.push({ s: i.toString() });

            if (isBrilliant(i)) 
                results.brilliant.push({ b: i.toString() });
        }

    // Display the results in the result section
    displayResults(num);
}

// Function to dynamically create a table and insert the calculation results into the webpage
function displayResults(n) 
{
    const outputResult = document.getElementById('result');
    outputResult.innerHTML = ''; // Clear previous results
    const table = document.createElement('table');

    // Create the table cells and fill them with numbers, applying styles to semi-prime and brilliant numbers
    for (let i = 1 ; i <= n ; i++) 
    {
        if (i % COLUMN_SIZE === 1) 
            row = table.insertRow();

        cell = row.insertCell();
        cell.textContent = i;

        cell.style.backgroundColor = 'white';

        // Apply a blue background for semi-prime numbers
        if (results.semi.some(item => item.s === i.toString())) 
            cell.style.backgroundColor = 'lightblue';
        
        // Apply a yellow background for brilliant numbers
        if (results.brilliant.some(item => item.b === i.toString())) 
            cell.style.backgroundColor = 'yellow';
    }

    // Add the completed table to the result section
    outputResult.appendChild(table);
}

// Function to display an error message in a modal-like overlay
function displayError(message) 
{
    // Access the overlay and error container elements
    const overlay = document.getElementById('overlay');
    const errorContainer = document.getElementById('errorContainer');
    const errorMessage = document.getElementById('errorMessage');


    errorMessage.textContent = message;
    // Make the overlay and error container visible
    overlay.style.display = 'flex';
    errorContainer.style.display = 'flex';
}

// Function to hide the error message overlay
function hideError() 
{
    // Access the overlay and error container elements
    const overlay = document.getElementById('overlay');
    const errorContainer = document.getElementById('errorContainer');

    // Hide the overlay and error container, effectively dismissing the error message
    overlay.style.display = 'none';
    errorContainer.style.display = 'none';
}

// Function to return the results object as a JSON string for external use or display
function getResults() 
{
    // Use JSON.stringify to convert the results object into a JSON-formatted string
    return JSON.stringify(results);
}