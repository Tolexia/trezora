
/*************************
 * Moving across the map *
**************************/
function moveDirection(direction, boat = null, node = null)
{
    document.body.style.pointerEvents = "none";
    if(boat == null)
    {
        boat = window.boat;
    }
  
    let speed = getItem('speed');
    switch (direction) {
        case "N":
            if(boat.coordY - 1 >= 1)
            {
               boat.goNorth()
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "S":
            if(boat.coordY + 1 <= gamesystem.rowCount)
            {
                boat.goSouth()
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "E":
            if(boat.coordX+1 <= gamesystem.columnCount)
            {
                boat.goEast()
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "W":
            if(boat.coordX - 1 >= 1)
            {
               boat.goWest()
            }
            else
            {
                alert('Out of bound');
            }
        break;
    
        default:
            break;
    }
    let tile = document.querySelector(`.tile[data-cord-x="${boat.coordX}"][data-cord-y="${boat.coordY}"]`);
    // Heal boat on ports
    if(tile.classList.contains('port'))
    {
        if(boat.currentLifeAmount < boat.maxLifeAmount)
        {
            const heal = (20/100);
            let newLife = Math.ceil(boat.currentLifeAmount  + (boat.currentLifeAmount *heal));
            if(newLife >= boat.maxLifeAmount)
                boat.set("currentLifeAmount", boat.maxLifeAmount);
            else
                boat.set("currentLifeAmount", newLife);

        }
    }
    if(boat.player == "human" && speed == "1")
    {
        moveBoatAuto(window.boat2)
    }
    setTimeout(() => {
        tile.appendChild(boat.domElement)
        boat.domElement.style = "";

        // Handle going on a creature block
        for(let creature in gamesystem.creatures)
        {
            if(tile.classList.contains(creature))
            {
                creatureAttack(boat, creature, tile)
                break;
            }
        }

        checkIfWon(boat)

        if(speed != "1" && boat.player == "human")
        {
            setItem('speed', "1");
            moveDirection(direction);
        }

        if(boat.player == "human")
        {
            if (node != null && node.classList.contains("enlightened"))
            {
                node.classList.remove("enlightened");
            }
            // Let player attack nearby creatures
            boat.refreshNearbyTargets()
        }
        else
        {
            callBackAfterTurn()
        }
        handleVisibilityFightButton()

        document.body.style.pointerEvents = "";
    }, (gamesystem.movementAnimationDuration) * 1000);
}

/**
 * Steps :
 * - Determine all possible tiles on which the treasure can be
 * - Determine the closest one
 * - Determine the direction to take to get to it
 * - Once on it, if the treasure is not, get to another
 */
function moveBoatAuto(boat = null)
{
    if(boat == null)
    {
        boat = window.boat2;
    }
    if(typeof boat.domElement == "undefined" || boat.domElement == null || document.getElementById(boat.domElement.id) == null || document.querySelector(`#${boat.domElement.id}:not(.notinit)`) == null)
    {
        return;
    }
    if(boat.player == "AI")
    {
        if(Math.abs(boat.coordX-window.boat.coordX) <=gamesystem.fightDistances.x && Math.abs(boat.coordY-window.boat.coordY) <= gamesystem.fightDistances.y)
        {
            let goFight = Math.random() > 0.5;
            if(goFight == true)
                return fight(boat, window.boat);
        }
    }

    // Find possible treasure places
    
    let distanceX = 0;
    let distanceY = 0;
    let nearestTile = null;
    
    if(boat.currentTarget == null)
    {
        setCurrentTileTarget(boat)
    }
    else
    {
        nearestTile = (boat.currentTarget)
        if(nearestTile.x == boat.coordX && nearestTile.y == boat.coordY)
            setCurrentTileTarget(boat)
    }

    // Deduce direction to take
    nearestTile = (boat.currentTarget)
    direction = "";
    if(nearestTile != null)
    {
        let nearX = parseInt(nearestTile.x)
        let nearY = parseInt(nearestTile.y)
        if((nearX) < (boat.coordX))
        {
            distanceX = (boat.coordX) -  (nearX);
        }
        else
        {
            distanceX = (nearX) - (boat.coordX);
        }
        if((nearY) < (boat.coordY))
        {
            distanceY =  (boat.coordY) - (nearY);
        }
        else
        {
            distanceY = (nearY) - (boat.coordY);
        }
        if(distanceY > 0 && distanceX > 0 && distanceX == distanceY)
        {
            const goY = Math.random() > 0.5
            if(goY)
            {
                if(nearY < boat.coordY)
                    direction = "N";
                else
                    direction = "S";
            }
            else 
            {
                if(nearX <  boat.coordX)
                    direction = "W";
                else
                    direction = "E";
            }
        }
        else if(distanceY == 0 || (distanceX <= distanceY && distanceX != 0))
        {
            if(nearX <  boat.coordX)
                direction = "W";
            else
                direction = "E";
        }
        else
        {
            if(nearY < boat.coordY)
                direction = "N";
            else
                direction = "S";
        }
    }
    else
    {
        return alert('Error closest tile')
    }
    // Determine if next tile is an obstacle or can be reachable
    let nextTile = {x:0,y:0}
    switch (direction) {
        case "N":
            nextTile = {x: boat.coordX , y: boat.coordY - 1} 
            break;
        case "S":
            nextTile = {x: boat.coordX , y: boat.coordY + 1} 
            break;
        case "E":
            nextTile = {x: boat.coordX + 1 , y: boat.coordY} 
            break;
        case "W":
            nextTile = {x: boat.coordX - 1, y: boat.coordY} 
            break;
        default:
            break;
    }
    
    const nextTileType = getItem(nextTile.x + "-" + nextTile.y)
    if(nextTileType && Object.keys(gamesystem.creatures).includes(nextTileType))
        fightCreature(boat, nextTile, nextTileType)
    else
        moveDirection(direction, boat)
}

// Determine tile to reach
function setCurrentTileTarget(boat)
{
    let boatCoordX = boat.coordX
    let boatCoordY = boat.coordY
    let treasureCoordX = parseInt(getItem('treasureCoordX'));
    let treasureCoordY = parseInt(getItem('treasureCoordY'));
    let type = getItem(treasureCoordX+'-'+treasureCoordY);
    let allSameTiles = document.querySelectorAll('.'+type);
    let minX = 13;
    let minY = 7;
    let goneThere = JSON.parse(getItem('goneThere'));
    let nearestTile;

    for(let tile of allSameTiles) {
        let tileX = parseInt(tile.dataset.cordX) 
        let tileY = parseInt(tile.dataset.cordY) 
        if(
            !goneThere.includes(tileX+"-"+tileY)
        )
        {
            distanceX = Math.abs(tileX - boatCoordX);
            distanceY = Math.abs(tileY - boatCoordY);
            let rand = Math.random();
            // If next tile is as far as the previous one, setting a bit of random behaviour to avoid heading only north or only west
            if( 
                (distanceX+distanceY == (minX + minY) && (rand <= 0.5))
                || (distanceX+distanceY)  < (minX + minY)
                )
            {
                minX = distanceX;
                minY = distanceY;
                nearestTile = tile;
               
                boat.set("currentTarget", {x:tile.dataset.cordX,y:tile.dataset.cordY})
            }
        }
    }
}

// Keep Memory of visited tiles
function updateDisplayGoneThere(goneThere)
{
    let selector = ""
    for(let tile of goneThere)
    {
        let x = tile.substring(0, tile.indexOf("-"))
        let y = tile.substring(tile.indexOf("-")+1)
        selector += `.tile[data-cord-x="${x}"][data-cord-y="${y}"]:not(.visited)`

        if(tile != goneThere[goneThere.length-1])
            selector += ","
    }
   
    document.querySelectorAll(selector).forEach(newVisited => newVisited.classList.add("visited"))
}

function callBackAfterTurn()
{
    randLoot()
}

function updateDropRate(dropRate)
{
    setItem("dropRate", parseInt(dropRate)+0.15)
}
function randLoot(rareLoot = false)
{
    const dropRate = !rareLoot ? getItem('dropRate') : 1
    const rand = Math.random()
    const itemsList = rareLoot ? gamesystem.rareItemsToLoot : gamesystem.itemsToLoot
    if(rand <= dropRate)
    {
        const itemLooted = itemsList[Math.round(rand * (itemsList.length-1))]
        lootAnimation(itemLooted)
        setItem("dropRate", 0)
        const itemsToSell = JSON.parse(getItem('itemsToSell'))
        const itemInStorage = itemsToSell.find(el => el.name == itemLooted.name)
        if(itemInStorage)
        {
            itemInStorage.quantity += 1
        }
        else{
            itemLooted.quantity = 1
            itemsToSell.push(itemLooted)
        }
        setItem("itemsToSell", JSON.stringify(itemsToSell))
    }
    else
        setItem("dropRate", parseFloat(dropRate)+0.15)
}

function lootAnimation(itemLooted)
{
    Swal.fire({
        html: `
            <img src = "${itemLooted.image}" /><br/>
            <p>
                New item looted: ${itemLooted.name} !<br/>
                Value: ${itemLooted.cost}
            </p>
        `,
        confirmButtonText: 'Nice',
        showConfirmButton: true,
    })
}
// End moving part

/************************
 * Retrying  & Evolving *
************************/

function hint() {
    let type = getItem(getItem('treasureCoordX')+"-"+getItem('treasureCoordY'));
    Swal.fire({
        icon:'info',
        html: 'Rumors say that you should search on the '+type+"s",
        confirmButtonText: 'Understood',
        showConfirmButton: true,
    })
}

function newGame()
{
    let minX = 3;
    let maxX = 9;
    let minY = 2;
    let maxY = 5;
    let randomX = Math.floor(Math.random()*(maxX-minX+1)+minX);
    let randomY = Math.floor(Math.random()*(maxY-minY+1)+minY);
    setItem('boatCoordX', 1);
    setItem('boatCoordY', 1);
    setItem('boat2CoordX', gamesystem.columnCount);
    setItem('boat2CoordY', gamesystem.rowCount);
    setItem('trycount', 0);
    setItem('treasureFound', 0)
    setItem('currentTarget', null);
    setItem('currentTarget2', null);
    setItem('treasureCoordX', randomX);
    setItem('treasureCoordY', randomY);
    setItem('displayType', "1");
    setItem('speed', "1");
    setItem('goneThere', JSON.stringify(['1-1',`${gamesystem.columnCount}-${gamesystem.rowCount}`]))
    setItem('currentLifeAmountBoat', getItem('maxLifeAmountBoat'));
    setItem('currentLifeAmountBoat2', getItem('maxLifeAmountBoat2'));

    const possibleValues = ['sea', 'island', 'sea', 'port', 'sea', 'sea', 'sea'];
    for (let y = 1; y <= gamesystem.rowCount; y++) 
    {
        for (let x = 1; x <= gamesystem.columnCount; x++) 
        {
            let type = possibleValues[Math.floor(Math.random() * possibleValues.length)]
            if(type == "sea" && x > 2 && x < (gamesystem.columnCount-1))
            {
                const randForCreature = Math.random()
                if(randForCreature <= 0.15)
                {
                    const creature = (randForCreature <= 0.05 ? "kraken" : "shark")
                    type = creature
                }
            }
            setItem(x+'-'+y, type);
        }
    }

    window.location.reload();
}

function confirmNewGame()
{
    Swal.fire({
        html: "This will start a new game.<br>Confirm ?",
        icon: 'warning',
        confirmButtonText: "Yes",
        cancelButtonText: "Nope",
        showConfirmButton: true,
        showCancelButton: true
    }).then(result => {
        if(result.isConfirmed)
        {
            newGame();
        }
    })
}

function gainXp(hasWon = true)
{
    let xp = 0;
    if(parseInt(getItem('trycount')) <= 3 )
    {
        xp = (hasWon ? 100 : 70);
    }
    else if(parseInt(getItem('trycount')) <= 6)
    {
        xp = (hasWon ? 250 : 200);
    }
    else if(parseInt(getItem('trycount')) <= 9)
    {
        xp = (hasWon ? 400 : 300);
    }
    else if(parseInt(getItem('trycount')) > 9)
    {
        xp = (hasWon ? 600 : 500);
    }
    const lvl = parseInt(getItem('playerLvl'))
    xp = (xp * lvl);
    return xp;
}

function reachLvl(force = false)
{
    const xp = parseInt(getItem('playerXp'))
    const lvl = parseInt(getItem('playerLvl'))
    const nxtLvlXpReach = gamesystem.levels[lvl+1]
    if(xp >= nxtLvlXpReach || force)
    {
        const newLvl = lvl+1
        setItem("playerLvl", newLvl)
        const node = document.getElementById('level')
        if(node != null)
        {
            node.innerText = newLvl;
        }
        gainPower(newLvl)
    }
    else{
        newGame()
    }
}

function gainPower(lvl)
{
    const newPower = gamesystem.powerReaches[lvl]
    const powersUnlocked = JSON.parse(getItem('powersUnlocked'))
    if(newPower && !powersUnlocked.find(el => el == newPower))
    {
        powersUnlocked.push(newPower)
        setItem("powersUnlocked", JSON.stringify(powersUnlocked))
        gainPowerAnimation(newPower)
    }else{
        if(!params || !params.has("advlevel"))
            newGame()
    }
}

function gainPowerAnimation(power)
{
    Swal.fire({
        title: 'New Power!',
        html: `
        <img src = "./images/powers/livre2.png" /><br/>
        Congrats, You unlocked the power ${power} in the shop!<br/>
        Go quickly discover it!
        `,
        confirmButtonText: "Let's go!",
        denyButtonText: "Play again",
        showConfirmButton: true,
        showDenyButton: true,
        customClass: {
            container: 'swal2-backdrop-show win'
        }  
    })
      .then((result) => {
        if(result.isConfirmed)
        {
            window.location.href =  window.location.href.replace("index", "shop")
        }
        else{
            newGame()
        }
      })
}

function gainCoins(hasWon = true)
{
    const ennemy_strength = getItem('ennemy_strength') ? JSON.parse(getItem('ennemy_strength')) : undefined
    let multiplier = (ennemy_strength && ennemy_strength.goldMultiplier ? ennemy_strength.goldMultiplier : 1);
    let coins = 0;
    if(parseInt(getItem('trycount')) <= 3 || !hasWon)
    {
        coins = multiplier * 250;
    }
    else if(parseInt(getItem('trycount')) <= 6)
    {
        coins = multiplier * 500;
    }
    else if(parseInt(getItem('trycount')) <= 9)
    {
        coins = multiplier * 750;
    }
    else if(parseInt(getItem('trycount')) > 9)
    {
        coins = multiplier * 1000;
    }
    return coins;
}

function checkIfWon(boat = null)
{
    if(boat == null)
        boat = window.boat
    // if(boat == null || boat.player == "AI")
    // {
        if(boat.player == "human" && boat.coordX == getItem('treasureCoordX') && boat.coordY == getItem('treasureCoordY'))
        {
            let xp = gainXp();
            let coins = gainCoins();
            setItem('playerXp', parseInt(getItem('playerXp')) + xp)
            setItem('playerCoins', parseInt(getItem('playerCoins')) + coins)
            wonAnimation(xp, coins);
        }
        else if(boat.player == "AI" && boat.coordX == getItem('treasureCoordX') && boat.coordY == getItem('treasureCoordY'))
        {
            loseAnimation();
        }
        else
        {
            const coordX = boat.coordX;
            const coordY = boat.coordY;
            const goneThere = JSON.parse(getItem('goneThere'));
            if(!goneThere.includes(coordX+"-"+coordY))
            {
                goneThere.push(coordX+"-"+coordY)
            }
            setItem('goneThere', JSON.stringify(goneThere))
            updateDisplayGoneThere(goneThere)
            if(boat.player == "AI")
            {
                setItem('trycount', parseInt(getItem('trycount'))+1);
                if(boat.currentTarget != null)
                {
                    let currentTarget = (boat.currentTarget);
                    if(currentTarget.x == coordX && currentTarget.y == coordY)
                    {
                        boat.currentTarget = null
                        removeItem('currentTarget2');
                    }
                }
            }
        }
    // }
}

function wonAnimation(xp, coins)
{
    if(getItem('firstgame') == 1)
    {
        setItem('firstgame', 0);
    }
    setItem('treasureFound', 1)
    Swal.fire({
        title: 'You win!',
        html: `Congrats !<br>Treasure found in ${getItem('trycount')} attempts.<br>${xp} xp and ${coins} coins won !`,
        confirmButtonText: 'Cool',
        showConfirmButton: true,
        customClass: {
            container: 'swal2-backdrop-show win'
        }  
    })
      .then((result) => {
        reachLvl()
      })
}
function loseAnimation()
{
    if(getItem('firstgame') == 1)
    {
        setItem('firstgame', 0);
    }
    let xp = gainXp(false);
    let coins = gainCoins(false);
    setItem('playerXp', parseInt(getItem('playerXp')) + xp)
    setItem('playerCoins', parseInt(getItem('playerCoins')) + coins)
    Swal.fire({
        title: 'Defeat',
        html: `${xp} xp and ${coins} coins won anyway, keep going!`,
        confirmButtonText: 'Go back',
        showConfirmButton: true,
        customClass: {
            container: 'swal2-backdrop-show lose'
        }  
    })
      .then((result) => {
        reachLvl()
      })
}

// End retrying & evolving part

/*********************
 * Unlimited.. POWER *
*********************/

function usePower(domPower)
{
    const power = domPower.dataset.power 

    if(parseInt(domPower.dataset.quantity) <= 0)
        return;

    const skippedAlerts = JSON.parse(getItem("skippedAlerts"))
    const skip = skippedAlerts.includes(power)
    window[power](skip)
    domPower.dataset.quantity = parseInt(domPower.dataset.quantity)-1
    const itemsInShop = JSON.parse(getItem('itemsInShop'));
    const powerItem = itemsInShop.find(el => el.name == domPower.dataset.power)
    if(powerItem)
    {
        powerItem.quantity = domPower.dataset.quantity
        setItem('itemsInShop', JSON.stringify(itemsInShop))
    }
    hidePowersNotUnlocked()
}

function compass()
{
    boatCoordX = window.boat.coordX;
    boatCoordY = window.boat.coordY;
    let treasureCoordX = parseInt(getItem('treasureCoordX'));
    let treasureCoordY = parseInt(getItem('treasureCoordY'));
    let directions = [];

    if(treasureCoordY < (boatCoordY))
    {
        directions.push("north");
    }
    else if(treasureCoordY > (boatCoordY))
    {
        directions.push("south");
    }
    if(treasureCoordX < (boatCoordX))
    {
        directions.push("west");
    }
    else if(treasureCoordX > (boatCoordX))
    {
        directions.push("east");
    }
    directions.forEach(direction => {
        let node = document.querySelector("a."+direction);
        if (node != null)
        {
            node.classList.add("enlightened");
        }
    })
    usePowerToast("compass")
}

async function reveal(skip = false)
{
    if(!skip)
    {
        const result = await Swal.fire({
                text: 'Touch a tile to reveal if the treasure is hidden on it or not',
                icon: 'info',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Understood',
                cancelButtonText: "Don't show again",
        })
        if(result.isDismissed)
        {
            addSkippedAlert("reveal")
        }
    }
    else
    {
        usePowerToast("reveal")
    }
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', handleReveal)
    })
   
}

function handleReveal(e)
{
    if(e.target.dataset.cordX == getItem('treasureCoordX') && e.target.dataset.cordY == getItem('treasureCoordY'))
    {
        Swal.fire({
            title: "Congrats!", 
            text: 'Here lies the treasure, rush at it !',
            icon: 'success',
            confirmButtonText: 'GO',
            showConfirmButton: true
        })
        .then(res => {
            document.querySelectorAll('.tile').forEach(tile => tile.removeEventListener('click', handleReveal))
        })
    }
    else
    {
        Swal.fire({
            title: "Wrong tile", 
            text: 'The treasure is hidden somewhere else, keep searching !',
            icon: 'error',
            confirmButtonText: 'GO',
            showConfirmButton: true
        })
        .then(res => {
            document.querySelectorAll('.tile').forEach(tile => tile.removeEventListener('click', handleReveal))
        })
    }
}

function doublespeed()
{
    usePowerToast("doublespeed")
    setItem('speed', "2");
}
function addSkippedAlert(alert)
{
    const skippedAlerts = JSON.parse(getItem("skippedAlerts"))
    skippedAlerts.push(alert)
    setItem("skippedAlerts", JSON.stringify(skippedAlerts))
}
async function teleport(skip = false)
{
    if(!skip)
    {
        const result = await Swal.fire({
                text: "Touch a tile to instantly get to it, it's magic !",
                icon: 'info',
                confirmButtonText: "Let's go",
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonText: "Don't show again",
        })
        if(result.isDismissed)
        {
            addSkippedAlert("teleport")
        }
    }
    else
    {
        usePowerToast("teleport")
    }
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', handleTeleport)
    })
}

function handleTeleport(e)
{
    const boat = window.boat
    document.body.style.pointerEvents = "none";
   boat.domElement.classList.remove('boat');
   boat.domElement.classList.add('teleport');
   boat.domElement.style = "animation-name:teleport;animation-duration: 2s;animation-fill-mode: forwards;";
    setTimeout(() => {
        e.target.appendChild(boat.domElement)
        boat.set('coordX', parseInt(e.target.dataset.cordX));
        boat.set('coordY', parseInt(e.target.dataset.cordY));
        boat.domElement.style = "animation-name:teleport;animation-direction: reverse;animation-duration: 2s;animation-fill-mode: forwards;";
        boat.domElement.classList.add('reverseteleport');
        setTimeout(() => {
            boat.domElement.classList.remove('teleport');
            boat.domElement.classList.remove('reverseteleport');
            boat.domElement.classList.add('boat');
            boat.domElement.style = "";
            checkIfWon();
            document.body.style.pointerEvents = "";
        }, 2000);
    }, 2000);
    document.querySelectorAll('.tile').forEach(tile => tile.removeEventListener('click', handleTeleport))
}

function usePowerToast(power)
{
    const icon= document.querySelector(`.navresponsive [data-power="${power}"]`)
    const animated = icon.cloneNode(true)
    window.map.appendChild(animated)
    animated.className = "powerAnimated"
    animated.dataset.quantity = ""
    setTimeout(() => {
        animated.remove()
    }, 2000);
}

function hidePowersNotUnlocked()
{
    const domPowers = document.querySelectorAll('[data-power]')
    const powersUnlocked = JSON.parse(getItem('powersUnlocked'))
    const itemsInShop = JSON.parse(getItem('itemsInShop'));
    for(let domPower of domPowers)
    {
        const isPowerUnlocked = powersUnlocked.find(el => el == domPower.dataset.power)
        const powerItem = itemsInShop.find(el => el.name == domPower.dataset.power)
        const isPowerBought = powerItem && powerItem.quantity && powerItem.quantity > 0
        if(!powerItem)
        {
            console.log("domPower", domPower);
        }
        if( !getItem("firstgame") && (!isPowerUnlocked || !isPowerBought) )
        {
            domPower.dataset.quantity = 0
            domPower.removeAttribute("onclick")
            domPower.classList.add("disabled")
        }
        else
        {
            domPower.dataset.quantity = powerItem.quantity
        }
    }
} 

// End Power Part

/************************************
 * Fight System : Enemy & Creatures *
************************************/

function handleVisibilityFightButton()
{
    if(
        Math.abs(parseInt(getItem('boatCoordX'))-parseInt(getItem('boat2CoordX'))) <= gamesystem.fightDistances.x && 
        Math.abs(parseInt(getItem('boatCoordY'))-parseInt(getItem('boat2CoordY'))) <= gamesystem.fightDistances.y
    )
    {
        window.fightButton.classList.remove('disabled')
        if(!player.tutoStepsPassed.includes("fightBoat"))
        {
            tutoFightBoat()
        }
    }
    else 
    {
        window.fightButton.classList.add('disabled')
    }
}

function fight(attacker, defender)
{
    const attackPower = attacker.attackPower;
    const currentLifeAmount = defender.currentLifeAmount;
    const shieldArmor = defender.shieldArmor;
    let newLifeDefender;
    if(attackPower > shieldArmor)
        newLifeDefender = currentLifeAmount - attackPower + shieldArmor;
    else 
        newLifeDefender = currentLifeAmount;

    attacker.domElement.classList.add("attack")
    screenImpact()
    setTimeout(() => {
        attacker.domElement.classList.remove("attack")
        if(!attacker.player)
            defender.domElement.classList.add("shaken")
        else
            defender.domElement.classList.add("defend")
        
        screenImpact()
        setTimeout(() => {
            defender.domElement.classList.remove("defend")
            defender.set("currentLifeAmount", newLifeDefender);
            if(newLifeDefender <= 0)
            {
                defender.domElement.style.animation = `1s linear death${defender.comp} 0s normal forwards`
                setTimeout(() => {
                    defender.domElement.remove()
                    removeItem(`boat${defender.comp}CoordX`)
                    removeItem(`boat${defender.comp}CoordY`)
                    if(defender.player == "human")
                    {
                        loseAnimation()
                    }
                    handleVisibilityFightButton()
                }, 1000);
            }
            else if(attacker.player == "human")
            {
                moveBoatAuto();
            }
            handleVisibilityFightButton()
        }, 1000);
    }, 1000);
}

function fightCreature(boat, tileObject, creatureType) {
    if(creatureType == "shark")
    {
        // Some action
    }
    else if(creatureType == "kraken")
    {
        // Some other action
    }
    boat.domElement.classList.add("attack")
    screenImpact()
    const tileNode = tileObject.classList ? tileObject : document.querySelector(`.tile[data-cord-x="${tileObject.x}"][data-cord-y="${tileObject.y}"]`);
    setTimeout(() => {
        boat.domElement.classList.remove("attack")
        tileNode.classList.add("defend")
        screenImpact()
        setTimeout(() => {
            tileNode.classList.remove("defend")

            // Handle creature life in future 
    
            // Creature dead
            if(tileNode != null)
            {
                tileNode.classList.remove(creatureType)
                tileNode.classList.remove("clickable")
                tileNode.removeAttribute('onclick')
                tileNode.classList.add("sea")
                setItem(tileNode.dataset.cordX + "-" + tileNode.dataset.cordY, "sea")
                if(boat.player == "human")
                {
                    setItem("dropRate", 0)
                    moveBoatAuto()
                    setTimeout(() => {
                        randLoot(true)
                    }, 200);
                }
            }
        }, 1000)
    }, 1000)
}


function creatureAttack(boat, creature, tile)
{
    let creatureStats = gamesystem.creatures[creature]
    if(!creatureStats)
    {
        console.error("No stat found for creature : "+creature)
        return 
    }
    creatureStats.domElement = tile
    
    fight(creatureStats, boat)
}

function screenImpact()
{
    document.body.classList.add("screenshake")
    setTimeout(() => {
        document.body.classList.remove("screenshake")
    }, 300);
}

// End Fight System Part

/* MISC */
function displayLevel()
{
    window.level.innerText = getItem('playerLvl');
}

/* Cheat (it's bad) */
if(params.has("advlevel"))
{
    reachLvl(true)
}