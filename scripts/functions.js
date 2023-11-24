window.fightDistances = {x:2,y:1}
window.levels = {
    1: 0,
    2: 500,
    3: 2000,
    4: 5000,
    5: 10000
}
window.powerReaches = {
    2:"compass",
    3:"reveal",
    4:"doublespeed",
    5:"teleport"
}

function moveDirection(direction, boat = null, node = null)
{
    document.body.style.pointerEvents = "none";
    let keyX;
    let keyY;
    if(boat == null)
    {
        boat = window.boat;
        keyX = "boatCordX";
        keyY = "boatCordY";
    }
    else
    {
        keyX = "boat2CordX";
        keyY = "boat2CordY";
    }
    let speed = getItem('speed');
    boat.classList.remove('boat');
    switch (direction) {
        case "N":
            if(parseInt(getItem(keyY)) - 1 >= 1)
            {
                setItem(keyY, parseInt(getItem(keyY))-1);
                if(boat.id == "boat2")
                {
                    boat.style = "animation-name:movingNorth2;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
                }
                else
                {
                    boat.style = "animation-name:movingNorth;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
                }
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "S":
            if(parseInt(getItem(keyY)) + 1 <= 6)
            {
                setItem(keyY, parseInt(getItem(keyY)) + 1);
                if(boat.id == "boat2")
                {
                    boat.style = "animation-name:movingSouth2;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
                }
                else
                {
                    boat.style = "animation-name:movingSouth;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
                }
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "E":
            if(parseInt(getItem(keyX))+1 <= 12)
            {
                setItem(keyX, parseInt(getItem(keyX))+1);
                if(boat.id == "boat2")
                {
                    boat.style = "animation-name:movingEast2;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
                }
                else
                {
                    boat.style = "animation-name:movingEast;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
                }
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "W":
            if(parseInt(getItem(keyX)) - 1 >= 1)
            {
                setItem(keyX, parseInt(getItem(keyX)) - 1);
                if(boat.id == "boat2")
                {
                    boat.style = "animation-name:movingWest2;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
                }
                else
                {
                    boat.style = "animation-name:movingWest;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
                }
            }
            else
            {
                alert('Out of bound');
            }
        break;
    
        default:
            break;
    }
    let cordx = getItem(keyX)
    let cordy = getItem(keyY)
    let tile = document.querySelector(`.tile[data-cord-x="${cordx}"][data-cord-y="${cordy}"]`);
    // Heal boat on ports
    if(tile.classList.contains('port'))
    {
        let complement = (boat.id.includes("2") ? "2" : "");
        const propLife = "currentLifeAmountBoat"+complement;
        const propMaxLife = "maxLifeAmountBoat"+complement;
        let currentLife = getItem(propLife);
        let maxLife = getItem(propMaxLife);
        if(currentLife < maxLife)
        {
            const heal = (20/100);
            let newLife = Math.ceil(currentLife + (currentLife*heal));
            if(newLife >= maxLife)
                setItem(propLife, maxLife);
            else
                setItem(propLife, newLife);

            updateLifeBar(boat)
        }
    }
    if(boat.id == "boat" && speed == "1")
    {
        moveBoatAuto(window.boat2)
    }
    setTimeout(() => {
        tile.appendChild(boat)
        boat.classList.add('boat');
        boat.style = "";

       
        checkIfWon(boat)
        if(speed != "1" && boat.id == "boat")
        {
            setItem('speed', "1");
            moveDirection(direction);
        }

        if(boat.id == "boat")
        {
            if (node != null && node.classList.contains("enlightened"))
            {
                node.classList.remove("enlightened");
            }
            randLoot()
        }
        else{
            callBackAfterTurn(node)
        }

        document.body.style.pointerEvents = "";
    }, 1500);
}
function callBackAfterTurn()
{
    handleVisibilityFightButton()
}
function handleVisibilityFightButton()
{
    const fightButton = document.getElementById('fightButton')
    if(
        Math.abs(parseInt(getItem('boatCordX'))-parseInt(getItem('boat2CordX'))) <= window.fightDistances.x && 
        Math.abs(parseInt(getItem('boatCordY'))-parseInt(getItem('boat2CordY'))) <= window.fightDistances.y
    )
    {
        fightButton.classList.remove('disabled')
    }
    else 
    {
        fightButton.classList.add('disabled')
    }
}

function newGame()
{
//    for (key in  
//     {
//         if(key != "playerXp" && key != "displayTuto")
//         {
//             removeItem(key);
//         }
//     }
    let minX = 3;
    let maxX = 9;
    let minY = 2;
    let maxY = 5;
    let randomX = Math.floor(Math.random()*(maxX-minX+1)+minX);
    let randomY = Math.floor(Math.random()*(maxY-minY+1)+minY);
    setItem('boatCordX', 1);
    setItem('boatCordY', 1);
    setItem('boat2CordX', 12);
    setItem('boat2CordY', 6);
    setItem('trycount', 0);
    setItem('treasureCordX', randomX);
    setItem('treasureCordY', randomY);
    setItem('displayType', "1");
    setItem('speed', "1");
    setItem('goneThere', JSON.stringify(['1-1','6-12']))
    setItem('currentLifeAmountBoat', getItem('maxLifeAmountBoat'));
    setItem('currentLifeAmountBoat2', getItem('maxLifeAmountBoat2'));

    const possibleValues = ['sea', 'island', 'sea', 'port', 'sea', 'sea', 'sea'];
    for (let i = 1; i <= 6; i++) 
    {
        for (let j = 1; j <= 12; j++) 
        {
            let type = possibleValues[Math.floor(Math.random() * possibleValues.length)]
            if(type == "sea")
            {
                const randForMonster = Math.random()
                if(randForMonster <= 0.15)
                {
                    const monster = (randForMonster <= 0.05 ? "kraken" : "shark")
                    type = monster
                }
            }
            setItem(i+'-'+j, type);
        }
    }

    window.location.reload();
}
function gainXp(hasWon = true)
{
    let xp = 0;
    if(parseInt(getItem('trycount')) <= 3 || !hasWon)
    {
        xp = 50;
    }
    else if(parseInt(getItem('trycount')) <= 6)
    {
        xp = 100;
    }
    else if(parseInt(getItem('trycount')) <= 9)
    {
        xp = 250;
    }
    else if(parseInt(getItem('trycount')) > 9)
    {
        xp = 500;
    }
    return xp;
}

function reachLvl()
{
    const xp = parseInt(getItem('playerXp'))
    const lvl = parseInt(getItem('playerLvl'))
    const nxtLvlXpReach = window.levels[lvl+1]
    if(xp >= nxtLvlXpReach)
    {
        const newLvl = lvl+1
        setItem("playerLvl", newLvl)
        gainPower(newLvl)
    }
    else{
        newGame()
    }
}
function gainPower(lvl)
{
    const newPower = window.powerReaches[lvl]
    const powersUnlocked = JSON.parse(getItem('powersUnlocked'))
    if(!powersUnlocked.find(el => el == newPower))
    {
        powersUnlocked.push(newPower)
        setItem("powersUnlocked", JSON.stringify(powersUnlocked))
        gainPowerAnimation(newPower)
    }else{
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
            window.location.href = "../shop.html"
        }
        else{
            newGame()
        }
      })
}
function gainCoins(hasWon = true)
{
    let multiplier = getItem('difficulty');
    multiplier = (multiplier != null ? parseInt(multiplier) : 1);
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
    console.log("trycount", getItem('trycount'))
    if(boat == null || boat.id == "boat2")
    {
        if(getItem('boatCordX') == getItem('treasureCordX') && getItem('boatCordY') == getItem('treasureCordY'))
        {
            let xp = gainXp();
            let coins = gainCoins();
            setItem('playerXp', parseInt(getItem('playerXp')) + xp)
            setItem('playerCoins', parseInt(getItem('playerCoins')) + coins)
            wonAnimation(xp, coins);
        }
        else if(getItem('boat2CordX') == getItem('treasureCordX') && getItem('boat2CordY') == getItem('treasureCordY'))
        {
            loseAnimation();
        }
        else
        {
            setItem('trycount', parseInt(getItem('trycount'))+1);
            boatCordX = getItem('boatCordX');
            boatCordY = getItem('boa2CordY');
            boat2CordX = getItem('boat2CordX');
            boat2CordY = getItem('boat2CordY');
            let data = JSON.parse(getItem('goneThere'));
            if(!data.includes(boatCordY+"-"+boatCordX))
            {
                data.push(boatCordY+"-"+boatCordX)
            }
            if(!data.includes(boat2CordY+"-"+boat2CordX))
            {
                data.push(boat2CordY+"-"+boat2CordX)
            }
            setItem('goneThere', JSON.stringify(data))
            if(getItem('currentTarget2') != null)
            {
                let currentTarget = JSON.parse(getItem('currentTarget2'));
                if(currentTarget.x == boat2CordX && currentTarget.y == boat2CordY)
                {
                    removeItem('currentTarget2');
                }
            }
        }
    }
}

function wonAnimation(xp, coins)
{
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

function hint() {
    let type = getItem(getItem('treasureCordY')+"-"+getItem('treasureCordX'));
    Swal.fire({
        icon:'info',
        html: 'Rumors say that you should search on the '+type+"s",
        confirmButtonText: 'Understood',
        showConfirmButton: true,
    })
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
    let boatCordX = "";
    let boatCordY = "";
    if(boat == null)
    {
        boat = window.boat2;
    }
    if(typeof boat == "undefined" || boat == null || document.getElementById(boat.id) == null || document.querySelector(`#${boat.id}:not(.notinit)`) == null)
    {
        return;
    }
    if(boat.id.match(/2/))
    {
        boatCordX = parseInt(getItem('boat2CordX'));
        boatCordY = parseInt(getItem('boat2CordY'));
        if(Math.abs(boatCordX-parseInt(getItem('boatCordX'))) <=window.fightDistances.x && Math.abs(boatCordY-parseInt(getItem('boatCordY'))) <= window.fightDistances.y)
        {
            let goFight = Math.random() > 0.5;
            if(goFight == true)
                return fight(boat, window.boat);
        }
    }
    else
    {
        boatCordX = parseInt(getItem('boatCordX'));
        boatCordY = parseInt(getItem('boatCordY'));
    }
    

    // Find possible treasure places
    
    let distanceX = 0;
    let distanceY = 0;
    let nearestTile = null;
    
    if(getItem('currentTarget2') == null)
    {
        setCurrentTileTarget(boatCordX, boatCordY)
    }
    else
    {
        nearestTile = JSON.parse(getItem('currentTarget2'))
        if(nearestTile.x == getItem('boatCordX') && nearestTile.y == getItem('boatCordY'))
            setCurrentTileTarget(boatCordX, boatCordY)
    }

    // Deduce direction to take
    nearestTile = JSON.parse(getItem('currentTarget2'))
    direction = "";
    if(nearestTile != null)
    {
        let nearX = parseInt(nearestTile.x)
        let nearY = parseInt(nearestTile.y)
        if((nearX) < (boatCordX))
        {
            distanceX = (boatCordX) -  (nearX);
        }
        else
        {
            distanceX = (nearX) - (boatCordX);
        }
        if((nearY) < (boatCordY))
        {
            distanceY =  (boatCordY) - (nearY);
        }
        else
        {
            distanceY = (nearY) - (boatCordY);
        }
        if(distanceY > 0 && distanceX > 0 && distanceX == distanceY)
        {
            const goY = Math.random() > 0.5
            if(goY)
            {
                if(nearY < boatCordY)
                    direction = "N";
                else
                    direction = "S";
            }
            else 
            {
                if(nearX <  boatCordX)
                    direction = "W";
                else
                    direction = "E";
            }
        }
        else if(distanceY == 0 || (distanceX <= distanceY && distanceX != 0))
        {
            if(nearX <  boatCordX)
                direction = "W";
            else
                direction = "E";
        }
        else
        {
            if(nearY < boatCordY)
                direction = "N";
            else
                direction = "S";
        }
    }
    else
    {
        alert('Error closest tile')
    }
    moveDirection(direction, boat)
}
function setCurrentTileTarget(boatCordX, boatCordY)
{
    let treasureCordX = parseInt(getItem('treasureCordX'));
    let treasureCordY = parseInt(getItem('treasureCordY'));
    let type = getItem(treasureCordY+'-'+treasureCordX);
    let allSameTiles = document.querySelectorAll('.'+type);
    let minX = 13;
    let minY = 7;
    let goneThere = JSON.parse(getItem('goneThere'));
    allSameTiles.forEach(tile => {
        let tileX = parseInt(tile.dataset.cordX) 
        let tileY = parseInt(tile.dataset.cordY) 
        if(
            tileX != getItem('boat2CordX') && tileY != getItem('boat2CordY')
            && tileX != getItem('boatCordX') && tileY != getItem('boatCordY')
        )
        {
            if(tileX < (boatCordX))
            {
                distanceX = (boatCordX) -  tileX;
            }
            else
            {
                distanceX = tileX - (boatCordX);
            }
            if(tileY < (boatCordY))
            {
                distanceY =  (boatCordY) - tileY;
            }
            else
            {
                distanceY = tileY - (boatCordY);
            }
            let rand = Math.random();
            // If next tile is as far as the previous one, setting a bit of random behaviour to avoid heading only north or only west
            if( ((distanceX+distanceY == minX + minY && rand <= 0.5) || distanceX+distanceY  < minX + minY) && !goneThere.includes(tile.dataset.cordY+"-"+tile.dataset.cordX))
            {
                minX = distanceX;
                minY = distanceY;
                nearestTile = tile;
                setItem('currentTarget2', JSON.stringify({x:tile.dataset.cordX,y:tile.dataset.cordY}));
            }
        }
    })
}
function compass()
{
    boatCordX = parseInt(getItem('boatCordX'));
    boatCordY = parseInt(getItem('boatCordY'));
    let treasureCordX = parseInt(getItem('treasureCordX'));
    let treasureCordY = parseInt(getItem('treasureCordY'));
    let directions = [];

    if(treasureCordY < (boatCordY))
    {
        directions.push("north");
    }
    else if(treasureCordY > (boatCordY))
    {
        directions.push("south");
    }
    if(treasureCordX < (boatCordX))
    {
        directions.push("west");
    }
    else if(treasureCordX > (boatCordX))
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
}
function usePower(domPower)
{
    const power = domPower.dataset.power 
    window[power]()
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
function reveal()
{
    Swal.fire({
            text: 'Touch a tile to reveal if the treasure is hidden on it or not',
            icon: 'info',
            confirmButtonText: 'Cool',
            showConfirmButton: true
    }).then(result => {
        if(result.isConfirmed)
        {
            const tiles = document.querySelectorAll('.tile');
            tiles.forEach(tile => {
                tile.addEventListener('click', handleReveal)
            })
        }
    })
}

function handleReveal(e)
{
    if(e.target.dataset.cordX == getItem('treasureCordX') && e.target.dataset.cordY == getItem('treasureCordY'))
    {
        Swal.fire({
            title: "Congrats!", 
            text: 'You have found the treasure, now claim it !',
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
    Swal.fire({
        text: 'Speed doubled !',
        icon: 'success',
        confirmButtonText: 'GO',
        showConfirmButton: true
    })
    .then(res => {
        setItem('speed', "2");
    })
}

function teleport()
{
    Swal.fire({
            text: "Touch a tile to instantly get to it, it's magic !",
            icon: 'info',
            confirmButtonText: "Let's go",
            showConfirmButton: true
    }).then(result => {
        if(result.isConfirmed)
        {
            const tiles = document.querySelectorAll('.tile');
            tiles.forEach(tile => {
                tile.addEventListener('click', handleTeleport)
            })
        }
    })
}

function handleTeleport(e)
{
    document.body.style.pointerEvents = "none";
    boat.classList.remove('boat');
    boat.style = "animation-name:teleport;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
    setTimeout(() => {
        e.target.appendChild(boat)
        setItem('boatCordX', e.target.dataset.cordX);
        setItem('boatCordY', e.target.dataset.cordY);
        boat.style = "animation-name:teleport;animation-direction: reverse;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
        setTimeout(() => {
            boat.classList.add('boat');
            boat.style = "";
            checkIfWon();
            document.body.style.pointerEvents = "";
        }, 2000);
    }, 2000);
    document.querySelectorAll('.tile').forEach(tile => tile.removeEventListener('click', handleTeleport))
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

function tutorial()
{
    let html = "<p>";
    html += "Greetings, fellow sailor !<br />";
    html += "Do you hear the call of adventure ?<br />";
    html += "Do you feel yourself the soul of a true pirate ?<br />";
    html += "Go ahead and sail across the sea to find the treasure before your opponent !<br />";
    html += "In this quick tutorial, you will learn how to optimize your chance to win !";
    html += "</p>";
    Swal.fire({
        title: "Find the treasure !",
        html: html,
        confirmButtonText: "Start",
        cancelButtonText: "Skip tutorial",
        showConfirmButton: true,
        showCancelButton: true
    }).then(result => {
        if(result.isConfirmed)
        {
            html = "<p>";
            html += "At the beggining of the game, an hint will appear to tell you which type of tile the treasure is hidden on<br />";
            html += "There are 3 types of tiles : Sea, Island, and Port<br />";
            html += "During the game, if you want to display the hint again, click on the hint logo :<br />";
            html += "<span style = 'font-size:25px;padding:0 10px;border:1px solid black; border-radius:50%;display: inline-block;'>?</span>"
            html += "</p>";
            Swal.fire({
                title: "Hint",
                html: html,
                confirmButtonText: "Continue",
                confirmButtonColor: "green",
                cancelButtonText: "Skip tutorial",
                showConfirmButton: true,
                showCancelButton: true
            })
            .then(result => {
                if(result.isConfirmed)
                {
                    html = "<p>";
                    html += "To navigate across the sea, click on the first letters of cardinal directions:<br />";
                    html += "N for North, S for South, E for East, and W for West<br />";
                    html += "If you were about to reach out of the map, a nice pop up will appear to tell you and prevent you to fall in a warp zone.<br />";
                    html += "Each time you move, your opponent will do the same. It also knows the hint so beware!<br />";
                    html += "</p>";
                    Swal.fire({
                        title: "Moving",
                        html: html,
                        confirmButtonText: "Continue",
                        confirmButtonColor: "green",
                        cancelButtonText: "Skip tutorial",
                        showConfirmButton: true,
                        showCancelButton: true
                    })
                    .then(result => {
                        if(result.isConfirmed)
                        {
                            html = "";
                            html += "<ul>";
                            html += "<li><b>Compass</b>: cardinal letters indicating the direction of the treasure will be green enlightened</li>";
                            html += "<li><b>Reveal</b>: click a tile to reveal if the treasure is hidden there or not.</li>";
                            html += "<li><b>Double speed</b>: The next move will make you reach 2 tiles instead of one.</li>";
                            html += "<li><b>Teleport</b>: Click a tile to magically appear on it, after a sweet animation. Hope you'll like it ;).</li>";
                            html += "</ul>";
                            Swal.fire({
                                title: "Powers",
                                html: html,
                                confirmButtonText: "Continue",
                                confirmButtonColor: "green",
                                cancelButtonText: "Skip tutorial",
                                showConfirmButton: true,
                                showCancelButton: true
                            })
                            .then(result => {
                                if(result.isConfirmed)
                                {
                                    html = "";
                                    html += "If you find the treasure, you win the game and gain Xp and coins. <br />";
                                    html += "If your opponent find the treasure, you lose the game but also gain a bit of xp and coins.<br />";
                                    html += "Xp makes you level up and will unlock the possibility to buy powers in shop.<br />";
                                    html += "With coins you'll be able to buy upgrades and powers in shop.<br />";
                                    html += "When the game is over, a new one starts immediately to keep on having fun !<br />";
                                    html += "<b>You're now ready for adventure, so set sail fellow pirate, you've got a treasure to find !</b>";
                                    Swal.fire({
                                        title: "Ending game",
                                        html: html,
                                        confirmButtonText: "Start",
                                        confirmButtonColor: "green",
                                        showConfirmButton: true,
                                        showCancelButton: false
                                    })
                                    .then(res => {
                                        newGame();
                                    })
                                }
                                else
                                {
                                    newGame();
                                }
                            })
                        }
                        else
                        {
                            newGame();
                        }
                    })
                }
                else
                {
                    newGame();
                }
            })
        }
        else
        {
            newGame();
        }
    })
    setItem('displayTuto',"no");
}

function fight(attacker, defender)
{
    let complement1 = (attacker.id.includes("2") ? "2" : "");
    let complement2 = (defender.id.includes("2") ? "2" : "");
    const propAttack = "attackPower"+complement1;
    const propLife = "currentLifeAmountBoat"+complement2;
    const propShield = "shieldArmor"+complement2;
    const attackPower = parseInt(getItem(propAttack));
    const shieldArmor = parseInt(getItem(propShield));
    const currentLifeAmount = parseInt(getItem(propLife));
    let newLifeDefender;
    if(attackPower > shieldArmor)
        newLifeDefender = currentLifeAmount - attackPower + shieldArmor;
    else 
        newLifeDefender = currentLifeAmount;
    attacker.classList.add("attack")
    setTimeout(() => {
        attacker.classList.remove("attack")
        defender.classList.add("defend")
        setTimeout(() => {
            defender.classList.remove("defend")
            setItem(propLife, newLifeDefender);
            updateLifeBar(defender)
            if(newLifeDefender <= 0)
            {
                defender.style.animation = `1s linear death${complement2} 0s normal forwards`
                setTimeout(() => {
                    defender.remove()
                    removeItem(`boat${complement2}CordX`)
                    removeItem(`boat${complement2}CordY`)
                    if(attacker.id == "boat2")
                    {
                        loseAnimation()
                    }
                }, 1000);
            }
            else if(attacker.id == "boat")
            {
                moveBoatAuto();
            }
        }, 1000);
    }, 1000);
}

function updateLifeBar(boat)
{
    let complement = (boat.id.includes("2") ? "2" : "");
    let propCurrentLife = "currentLifeAmountBoat"+complement;
    let propMaxLife = "maxLifeAmountBoat"+complement;
    let percentLifeAmount = Math.round(parseInt(getItem(propCurrentLife))*100/parseInt(getItem(propMaxLife)));
    window["lifebar"+complement].style.background =  `linear-gradient(90deg, rgb(41, 255, 41) 0%, rgb(41, 255, 41) ${percentLifeAmount}%, #ff0000 ${percentLifeAmount}%)`; 
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
        if(!isPowerUnlocked || !isPowerBought)
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
function displayLevel()
{
    window.level.innerText = getItem('playerLvl');
}

function updateDropRate(dropRate)
{
    setItem("dropRate", parseInt(dropRate)+0.15)
}
function randLoot()
{
    const dropRate = getItem('dropRate')
    const rand = Math.random()
    if(rand <= dropRate)
    {
        const itemsToLoot = [
            {
                name: "Bauble",
                cost: 130,
                image: "./images/loot/babiole.png"
            },
            {
                name: "Barrel",
                cost: 80,
                image: "./images/loot/baril.png"
            },
            {
                name: "Navigation bar",
                cost: 100,
                image: "./images/loot/barre.png"
            },
            {
                name: "Goblet",
                cost: 120,
                image: "./images/loot/calice.png"
            },
            {
                name: "Knife",
                cost: 60,
                image: "./images/loot/couteau.png"
            },
            {
                name: "Saber",
                cost: 90,
                image: "./images/loot/epee.png"
            },
            {
                name: "Pestle",
                cost: 40,
                image: "./images/loot/pilon.png"
            },
            {
                name: "Dirk",
                cost: 50,
                image: "./images/loot/poignard.png"
            },
            {
                name: "Potion",
                cost: 70,
                image: "./images/loot/potion.png"
            },
        ]
        const itemLooted = itemsToLoot[Math.round(rand * (itemsToLoot.length-1))]
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