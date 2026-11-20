let mainClick = document.querySelector('.mainClick');
let scoreAmount = document.querySelector('.scoreAmount');
let clicksAmount = document.querySelector('.clicksAmount');
let scoreInSecond = document.querySelector('.scoreInSecond');
let upgradeClickPower = document.querySelector('.upgradeClickPower');
let upgradeClickAutoPower = document.querySelector('.upgradeClickAutoPower');
let resetClick = document.querySelector('.resetClick');

let score = 0;
let clicks = 1;
let upgradeClick = 1;
let upgradeAutoClick = 1;
let currentPriceClick = 20;
let currentPriceAutoClick = 20;
let autoPower = 1;
let clicksPower = 0;
let step = 50;
let nextGoal = 50;

setInterval(() => {
    score += autoPower;
    scoreAmount.innerText = `Количество очков: ${score}`;
    checkAvailable();
}, 1000);

function checkAvailable() {
    if (score >= currentPriceClick)
        upgradeClickPower.disabled = false;
    else
        upgradeClickPower.disabled = true;
    if (score >= currentPriceAutoClick)
        upgradeClickAutoPower.disabled = false;
    else
        upgradeClickAutoPower.disabled = true;
}

function checkAchievement() {
    if (score >= nextGoal) {
        const msg = document.createElement('div');
        msg.textContent = `Ты в деле! Достигнут рубеж: ${nextGoal}`;
        msg.classList.add('achievement');
        document.body.appendChild(msg);
        step *= 2;
        nextGoal += step;
        setTimeout(() => msg.remove(), 3000);
    }
}

function clickerButton() {
    clicks += clicksPower;
    score += upgradeClick;
    scoreAmount.innerText = `Количество очков: ${score}`;
    clicksAmount.innerText = `Количество кликов: ${clicks}`;
    scoreInSecond.innerText = `Очков в секунду: ${autoPower}`;
    checkAvailable();
    checkAchievement();
}

function upgradeButtonClick() {
    if (score >= currentPriceClick) {
        score -= currentPriceClick;
        upgradeClick += 2;
        currentPriceClick *= 2;
        clicksPower += 2;
        upgradeClickPower.innerHTML = `+2 к силе клика (Уже +${clicksPower})<br>(Стоимость: ${currentPriceClick} очков)`;
        scoreAmount.innerText = `Количество очков: ${score}`;
        checkAvailable();
        checkAchievement();
    }
}

function upgradeButtonAutoClick() {
    if (score >= currentPriceAutoClick) {
        score -= currentPriceClick;
        upgradeAutoClick += 2;
        currentPriceAutoClick *= 2;
        autoPower += 2;
        upgradeClickAutoPower.innerHTML = `+2 к силе автоклика (Уже +${autoPower - 1})<br> (Стоимость: ${currentPriceAutoClick} очков)`;
        scoreAmount.innerText = `Количество очков: ${score}`;
        scoreInSecond.innerText = `Очков в секунду: ${autoPower}`;
        checkAvailable();
        checkAchievement();
    }
}

function resetButton() {
    location.reload();
}

mainClick.onclick = clickerButton;
upgradeClickPower.onclick = upgradeButtonClick;
upgradeClickAutoPower.onclick = upgradeButtonAutoClick;
resetClick.onclick = resetButton;