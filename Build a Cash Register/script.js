let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDueDiv = document.getElementById('change-due');
const priceDisplay = document.getElementById('price');
const drawerDisplay = document.getElementById('drawer-display');

const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

function init() {
    priceDisplay.textContent = price.toFixed(2);
    updateDrawerDisplay();
}

function updateDrawerDisplay() {
    drawerDisplay.innerHTML = '';
    cid.forEach(([unit, amount]) => {
        const item = document.createElement('div');
        item.className = 'drawer-item';
        item.innerHTML = `<strong>${unit}:</strong> $${amount.toFixed(2)}`;
        drawerDisplay.appendChild(item);
    });
}

function getTotalCID() {
    return parseFloat(cid.reduce((total, [unit, amount]) => total + amount, 0).toFixed(2));
}

function checkCashRegister() {
    const cash = parseFloat(cashInput.value);
    
    if (isNaN(cash) || cash < 0) {
        alert("Please enter a valid amount");
        return;
    }

    const changeDue = parseFloat((cash - price).toFixed(2));
    const totalCID = getTotalCID();

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if (cash === price) {
        changeDueDiv.textContent = "No change due - customer paid with exact cash";
        return;
    }

    if (totalCID < changeDue) {
        changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    let change = [];
    let remainingChange = changeDue;
    
    const cidCopy = JSON.parse(JSON.stringify(cid)).reverse();
    
    for (let [unit, amount] of cidCopy) {
        const unitValue = currencyUnit[unit];
        let maxUnits = Math.floor(amount / unitValue);
        let neededUnits = Math.floor(remainingChange / unitValue);
        let usedUnits = Math.min(maxUnits, neededUnits);
        
        if (usedUnits > 0) {
            const usedAmount = parseFloat((usedUnits * unitValue).toFixed(2));
            change.push([unit, usedAmount]);
            remainingChange = parseFloat((remainingChange - usedAmount).toFixed(2));
        }
    }

    if (remainingChange > 0) {
        changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

if (parseFloat(totalCID) === changeDue && remainingChange === 0) {
    const closedChange = change.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(' ');
    changeDueDiv.textContent = `Status: CLOSED ${closedChange}`;
    return;
}

    const changeText = change.map(
        ([unit, amount]) => `${unit}: $${amount.toFixed(2)}`
    ).join(' ');
    changeDueDiv.textContent = `Status: OPEN ${changeText}`;
}

purchaseBtn.addEventListener('click', checkCashRegister);
cashInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkCashRegister();
    }
});

init();