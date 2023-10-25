function init()
{
    if(localStorage.getItem('itemsInShop') == null)
    {
        const itemsInShop = [
            {
                name : "update Weapon 1",
                cost : 1000,
                bought: false
            },
            {
                name : "update Armor 1",
                cost : 1000,
                bought: false
            },
            {
                name : "update Weapon 2",
                cost : 5000,
                bought: false
            },
            {
                name : "update Armor 2",
                cost : 5000,
                bought: false
            },
            {
                name : "update Weapon 3",
                cost : 20000,
                bought: false
            },
            {
                name : "update Armor 3",
                cost : 20000,
                bought: false
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
}
init()