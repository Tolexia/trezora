function init()
{
    if(localStorage.getItem('itemsInShop') == null)
    {
        const itemsInShop = [
            {
                name : "Upgrade Artillery n°1",
                cost : 1000,
                image: "./images/upgrades/lance-pierres.png",
                bought: false,
                stat : "attackPower",
                buffValue : 1
            },
            {
                name : "Upgrade Ship n°1",
                cost : 1000,
                image: "./images/upgrades/wood_shield.png",
                bought: false,
                stat : "attackPower",
                buffValue : 1
            },
            {
                name : "Upgrade Artillery n°2",
                cost : 5000,
                image: "./images/upgrades/canon_balls.png",
                bought: false,
                stat : "attackPower",
                buffValue : 2
            },
            {
                name : "Upgrade Ship n°2",
                cost : 5000,
                image: "./images/upgrades/bouclier.png",
                bought: false,
                stat : "attackPower",
                buffValue : 2
            },
            {
                name : "Upgrade Artillery n°3",
                cost : 20000,
                image: "./images/upgrades/evil_skull.png",
                bought: false,
                stat : "attackPower",
                buffValue : 3
            },
            {
                name : "Upgrade Ship n°3",
                cost : 20000,
                image: "./images/upgrades/ancre_blindage.png",
                bought: false,
                stat : "attackPower",
                buffValue : 3
            }
        ]
        localStorage.setItem("itemsInShop", JSON.stringify(itemsInShop))
    }
    if(localStorage.getItem('updatesPossed') == null)
    {
        localStorage.setItem("updatesPossed", JSON.stringify([]))
    }
    if(localStorage.getItem('itemsToSell') == null)
    {
        localStorage.setItem("itemsToSell", JSON.stringify([]))
    }
    if(localStorage.getItem('maxLifeAmountBoat') == null)
    {
        localStorage.setItem('maxLifeAmountBoat', 10);
    }
    if(localStorage.getItem('maxLifeAmountBoat2') == null)
    {
        localStorage.setItem('maxLifeAmountBoat2', 10);
    }
    if(localStorage.getItem('currentLifeAmountBoat') == null)
    {
        localStorage.setItem('currentLifeAmountBoat', 10);
    }
    if(localStorage.getItem('currentLifeAmountBoat2') == null)
    {
        localStorage.setItem('currentLifeAmountBoat2', 10);
    }
    if(localStorage.getItem('attackPower') == null)
    {
        localStorage.setItem('attackPower', 3);
    }
    if(localStorage.getItem('attackPower2') == null)
    {
        localStorage.setItem('attackPower2', 3);
    }
    if(localStorage.getItem('shieldArmor') == null)
    {
        localStorage.setItem('shieldArmor', 0);
    }
    if(localStorage.getItem('shieldArmor2') == null)
    {
        localStorage.setItem('shieldArmor2', 0);
    }
    if(localStorage.getItem('playerCoins') == null)
    {
        localStorage.setItem('playerCoins', 0);
    }
    if(localStorage.getItem('playerXp') == null)
    {
        localStorage.setItem('playerXp', 0);
    }
}
init()