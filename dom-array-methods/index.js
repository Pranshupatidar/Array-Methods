const main = document.getElementById("main");
const addBtn = document.getElementById("add");
const double = document.getElementById("double");
const millionaire = document.getElementById("millionaire");
const sortBtn = document.getElementById("sort");
const calc = document.getElementById("calc");

let data = [];

//declare empty array
getUser();
getUser();
getUser();

//Generate Random user

async function getUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    
    var userDet = {
        name: `${user.name["first"]} ${user.name["last"]}`,
        money: Math.floor(Math.random()*1000000)
    }
    //console.log(userDet.name , userDet.money);

    insertUser(userDet);
}

//double Money
function doubleMoney(){
    data = data.map(user => {
        return { ...user , money: user.money * 2 };
    });

    updateDOM();
}

//Sort by richest
function sortByRichest(){
    data.sort((a,b) => {
        return b.money - a.money;
    });

    updateDOM();
}

//Filter by Millionaires
function showMill(){
    data = data.filter((item) => {
        return item.money >= 1000000; 
    });

    updateDOM();
}

//Calculate Wealth
function calculateWealth(){
    const wealth = data.reduce((acc, user) => (acc += user.money),0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

//Insert object to array
function insertUser(d){
    data.push(d);

    updateDOM();
}

//update DOM
function updateDOM(providedData = data){
    //Resetting main div to enable replacing and adding
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });

    
}

//Format Money
function formatMoney(m){
    return '$' + m.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


addBtn.addEventListener('click' , getUser);
double.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
millionaire.addEventListener('click', showMill);
calc.addEventListener('click', calculateWealth);
