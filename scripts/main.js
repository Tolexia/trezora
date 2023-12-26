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
        setItem("itemsInShop", JSON.stringify(gamesystem.shopItems))
    }
    if(getItem('inventory') == null)
    {
        setItem("inventory", JSON.stringify([]))
    }
    if(getItem('playerLvl') == null)
    {
        setItem("playerLvl", 1)
    }
    if(getItem('opponentLvl') == null)
    {
        setItem("opponentLvl", 1)
    }
    if(getItem('powersUnlocked') == null)
    {
        setItem("powersUnlocked", JSON.stringify([]))
    }
    if(getItem('upgradesPossessed') == null)
    {
        setItem("upgradesPossessed", JSON.stringify([]))
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
    if(getItem('dropRate') == null)
    {
        setItem('dropRate', 0);
    }
    if(getItem('boat-skin') == null)
    {
        setItem('boat-skin', "./images/skins/boat.png");
    }
    if(getItem('ennemy_strength') == null)
    {
        setItem("ennemy_strength", JSON.stringify(gamesystem.ennemyStrengths[0]))
    }
}
init()