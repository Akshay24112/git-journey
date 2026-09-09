const des = document.querySelector("#description");
const amount = document.querySelector("#amount");
const labelsbox = document.querySelector(".labelsbox");
const income = document.querySelector(".mon");
const expense = document.querySelector(".exp");
const balance = document.querySelector(".money");
const submit = document.querySelector(".addtran");


// ---------- INITIALIZE LOCAL STORAGE ----------

if (localStorage.getItem("income") === null) {
    localStorage.setItem("income", 0);
}

if (localStorage.getItem("expense") === null) {
    localStorage.setItem("expense", 0);
}

if (localStorage.getItem("balance") === null) {
    localStorage.setItem("balance", 0);
}

if (localStorage.getItem("labels") === null) {
    localStorage.setItem("labels", JSON.stringify([]));
}


// ---------- GET DATA ----------

let incomeamount = Number(localStorage.getItem("income"));
let expenseamount = Number(localStorage.getItem("expense"));
let balanceamount = Number(localStorage.getItem("balance"));

let labels = JSON.parse(localStorage.getItem("labels")) || [];


// ---------- DISPLAY TOTALS ----------

income.textContent = `$${incomeamount}`;
expense.textContent = `$${expenseamount}`;
balance.textContent = `$${balanceamount}`;


// ---------- DISPLAY OLD TRANSACTIONS ----------

function displayLabels() {

    labelsbox.innerHTML = "";

    labels.forEach((l, index) => {

        labelsbox.innerHTML += `
            <div class="labels ${l.color}" data-index="${index}">
                <div>${l.des}</div>

                <div>
                    $${l.amount}
                    &nbsp;&nbsp;&nbsp;
                    <span class="wrong">&Cross;</span>
                </div>
            </div>
        `;

    });
}

displayLabels();


// ---------- ADD TRANSACTION ----------

submit.addEventListener("click", (e) => {

    const value = Number(amount.value);

    // Don't allow 0 or empty input
    if (!value) {
        return;
    }


    // ---------- INCOME ----------

    if (value > 0) {

        incomeamount += value;
        balanceamount += value;

        labels.push({
            des: des.value,
            amount: value,
            color: "ri"
        });

    }


    // ---------- EXPENSE ----------

    else {

        const expenseValue = value * -1;

        expenseamount += expenseValue;
        balanceamount += value;

        labels.push({
            des: des.value,
            amount: expenseValue,
            color: "wr"
        });

    }


    // ---------- UPDATE SCREEN ----------

    income.textContent = `$${incomeamount}`;
    expense.textContent = `$${expenseamount}`;
    balance.textContent = `$${balanceamount}`;


    // ---------- SAVE ----------

    localStorage.setItem("income", incomeamount);
    localStorage.setItem("expense", expenseamount);
    localStorage.setItem("balance", balanceamount);
    localStorage.setItem("labels", JSON.stringify(labels));


    // Display updated transactions
    displayLabels();


    // Clear inputs
    des.value = "";
    amount.value = "";

});


// ---------- DELETE TRANSACTION ----------

labelsbox.addEventListener("click", (e) => {

    if (e.target.classList.contains("wrong")) {

        // Get the complete transaction div
        const del = e.target.closest(".labels");

        // Get its index
        const index = Number(del.dataset.index);

        // Get the transaction object before deleting
        const transaction = labels[index];


        // ---------- IF IT WAS INCOME ----------

        if (transaction.color === "ri") {

            incomeamount -= Number(transaction.amount);

            balanceamount -= Number(transaction.amount);

        }


        // ---------- IF IT WAS EXPENSE ----------

        else if (transaction.color === "wr") {

            expenseamount -= Number(transaction.amount);

            balanceamount += Number(transaction.amount);

        }


        // Remove from array
        labels.splice(index, 1);


        // Update screen
        income.textContent = `$${incomeamount}`;
        expense.textContent = `$${expenseamount}`;
        balance.textContent = `$${balanceamount}`;


        // Update localStorage
        localStorage.setItem("income", incomeamount);
        localStorage.setItem("expense", expenseamount);
        localStorage.setItem("balance", balanceamount);
        localStorage.setItem("labels", JSON.stringify(labels));


        // Display again so indexes are correct
        displayLabels();
    }

});