function getItem(item)
{
    return localStorage.getItem(item);
}

function setItem(item, value)
{
    return localStorage.setItem(item, value);
}
function removeItem(item)
{
    return localStorage.removeItem(item);
}
function init()
{
    if(getItem('itemsInShop') == null)
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
        setItem("itemsInShop", JSON.stringify(itemsInShop))
    }
    if(getItem('updatesPossed') == null)
    {
        setItem("updatesPossed", JSON.stringify([]))
    }
    if(getItem('itemsToSell') == null)
    {
        setItem("itemsToSell", JSON.stringify([]))
    }
    if(getItem('maxLifeAmountBoat') == null)
    {
        setItem('maxLifeAmountBoat', 10);
    }
    if(getItem('maxLifeAmountBoat2') == null)
    {
        setItem('maxLifeAmountBoat2', 10);
    }
    if(getItem('currentLifeAmountBoat') == null)
    {
        setItem('currentLifeAmountBoat', 10);
    }
    if(getItem('currentLifeAmountBoat2') == null)
    {
        setItem('currentLifeAmountBoat2', 10);
    }
    if(getItem('attackPower') == null)
    {
        setItem('attackPower', 3);
    }
    if(getItem('attackPower2') == null)
    {
        setItem('attackPower2', 3);
    }
    if(getItem('shieldArmor') == null)
    {
        setItem('shieldArmor', 0);
    }
    if(getItem('shieldArmor2') == null)
    {
        setItem('shieldArmor2', 0);
    }
    if(getItem('playerCoins') == null)
    {
        setItem('playerCoins', 0);
    }
    if(getItem('playerXp') == null)
    {
        setItem('playerXp', 0);
    }
}
init()