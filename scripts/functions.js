window.fightDistances = {x:2,y:1}

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
    // window.location.reload();
    setTimeout(() => {
        tile.appendChild(boat)
        boat.classList.add('boat');
        // boat.style = "animation : 3s linear myBoat 0s infinite alternate;"
        boat.style = "";
        checkIfWon();
        if (node != null && node.classList.contains("enlightened"))
        {
            node.classList.remove("enlightened");
        }
        if(speed != "1" && boat.id == "boat")
        {
            setItem('speed', "1");
            moveDirection(direction);
        }
        const fightButton = document.getElementById('fightButton')
        if( boat.id == "boat" )
        {
            if(
                Math.abs(cordx-parseInt(getItem('boat2CordX'))) <= window.fightDistances.x && 
                Math.abs(cordy-parseInt(getItem('boat2CordY'))) <= window.fightDistances.y
            )
            {
                fightButton.classList.remove('disabled')
            }
            else 
            {
                fightButton.classList.add('disabled')
            }
        }
        document.body.style.pointerEvents = "";
    }, 1500);
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
        newGame();
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
        newGame();
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
    console.log("boat", boat)
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
    let treasureCordX = parseInt(getItem('treasureCordX'));
    let treasureCordY = parseInt(getItem('treasureCordY'));
    let type = getItem(treasureCordY+'-'+treasureCordX);

    // Find possible treasure places
    let allSameTiles = document.querySelectorAll('.'+type);
    let minX = 13;
    let minY = 7;
    let distanceX = 0;
    let distanceY = 0;
    let nearestTile = null;
    let goneThere = JSON.parse(getItem('goneThere'));
    if(getItem('currentTarget2') == null)
    {
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

function doubleSpeedOneTime()
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
    let newLifeDefender = currentLifeAmount - attackPower + shieldArmor;
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
}

function updateLifeBar(boat)
{
    let complement = (boat.id.includes("2") ? "2" : "");
    let propCurrentLife = "currentLifeAmountBoat"+complement;
    let propMaxLife = "maxLifeAmountBoat"+complement;
    let percentLifeAmount = Math.round(parseInt(getItem(propCurrentLife))*100/parseInt(getItem(propMaxLife)));
    console.log("percentLifeAmount",percentLifeAmount)
    window["lifebar"+complement].style.background =  `linear-gradient(90deg, rgb(41, 255, 41) 0%, rgb(41, 255, 41) ${percentLifeAmount}%, #ff0000 ${percentLifeAmount}%)`; 
    console.log('window["lifebar"+complement]', window["lifebar"+complement])
}

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