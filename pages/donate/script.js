const lineInput = document.querySelector('.picknfeed__money__check');
const amountInput = document.querySelector('.input__amount');
const amountValue = document.getElementsByName('amount-user');
const radioInput = document.querySelectorAll('input[name="money"]');

lineInput.addEventListener('click', (event) => {
    let amount = event.target.value;
    if (amount != undefined) {
        amountValue[0].value = amount;
    }
});

const setRadioChecked = (money) => {
    radioInput.forEach( (elem, index) => {
        if (elem.defaultValue == money) {
            radioInput[index].checked = true;
        } else {
            radioInput[index].checked = false;
        }
    });
};

const moneyStates = [25, 50, 100, 250, 500, 1000, 2000, 5000];

amountInput.addEventListener('input', (event) => {
    let money = event.target.value;
    setRadioChecked(moneyStates.find((el) => {
        if (money == el) {
            return (el);
        }
        
    })); 
});