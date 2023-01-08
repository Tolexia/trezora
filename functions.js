function moveDirection(direction, boat = null, node = null)
{
    document.body.style.pointerEvents = "none";
    let keyX;
    let keyY;
    if(boat == null)
    {
        boat = document.querySelector('#boat');
        keyX = "boatCordX";
        keyY = "boatCordY";
    }
    else
    {
        keyX = "boat2CordX";
        keyY = "boat2CordY";
    }
    let speed = localStorage.getItem('speed');
    boat.classList.remove('boat');
    switch (direction) {
        case "N":
            if(parseInt(localStorage.getItem(keyY)) - 1 >= 1)
            {
                localStorage.setItem(keyY, parseInt(localStorage.getItem(keyY))-1);
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
            if(parseInt(localStorage.getItem(keyY)) + 1 <= 6)
            {
                localStorage.setItem(keyY, parseInt(localStorage.getItem(keyY)) + 1);
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
            if(parseInt(localStorage.getItem(keyX))+1 <= 12)
            {
                localStorage.setItem(keyX, parseInt(localStorage.getItem(keyX))+1);
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
            if(parseInt(localStorage.getItem(keyX)) - 1 >= 1)
            {
                localStorage.setItem(keyX, parseInt(localStorage.getItem(keyX)) - 1);
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
    let cordx = localStorage.getItem(keyX)
    let cordy = localStorage.getItem(keyY)
    let tile = document.querySelector(`.tile[data-cord-x="${cordx}"][data-cord-y="${cordy}"]`);
    if(boat.id == "boat" && speed == "1")
    {
        moveBoatAuto(document.querySelector('#boat2'))
    }
    // window.location.reload();
    setTimeout(() => {
        tile.appendChild(boat)
        boat.classList.add('boat');
        // boat.style = "animation : 3s linear myBoat 0s infinite alternate;"
        boat.style = "";
        checkIfWon(boat);
        if (node != null && node.classList.contains("enlightened"))
        {
            node.classList.remove("enlightened");
        }
        if(speed != "1" && boat.id == "boat")
        {
            localStorage.setItem('speed', "1");
            moveDirection(direction);
        }
        document.body.style.pointerEvents = "";
    }, 2000);
}


function newGame()
{
   for (key in localStorage) 
    {
        if(key != "playerXp" && key != "displayTuto")
        {
            localStorage.removeItem(key);
        }
    }
    let minX = 3;
    let maxX = 9;
    let minY = 2;
    let maxY = 5;
    let randomX = Math.floor(Math.random()*(maxX-minX+1)+minX);
    let randomY = Math.floor(Math.random()*(maxY-minY+1)+minY);
    localStorage.setItem('boatCordX', 1);
    localStorage.setItem('boatCordY', 1);
    localStorage.setItem('boat2CordX', 12);
    localStorage.setItem('boat2CordY', 6);
    localStorage.setItem('trycount', 0);
    localStorage.setItem('treasureCordX', randomX);
    localStorage.setItem('treasureCordY', randomY);
    localStorage.setItem('displayType', "1");
    localStorage.setItem('speed', "1");
    localStorage.setItem('goneThere', JSON.stringify(['1-1','6-12']))
    window.location.reload();
}
function gainXp(hasWon = true)
{
    let xp = 0;
    if(parseInt(localStorage.getItem('trycount')) <= 3 || !hasWon)
    {
        xp = 250;
    }
    else if(parseInt(localStorage.getItem('trycount')) <= 6)
    {
        xp = 500;
    }
    else if(parseInt(localStorage.getItem('trycount')) <= 9)
    {
        xp = 750;
    }
    else if(parseInt(localStorage.getItem('trycount')) > 9)
    {
        xp = 1000;
    }
    return xp;
}
function checkIfWon(boat = null)
{
    if(boat == null || boat.id == "boat2")
    {
        if(localStorage.getItem('boatCordX') == localStorage.getItem('treasureCordX') && localStorage.getItem('boatCordY') == localStorage.getItem('treasureCordY'))
        {
            let xp = gainXp();
            localStorage.setItem('playerXp', parseInt(localStorage.getItem('playerXp')) + xp)
            wonAnimation(xp);
            
        }
        else if(localStorage.getItem('boat2CordX') == localStorage.getItem('treasureCordX') && localStorage.getItem('boat2CordY') == localStorage.getItem('treasureCordY'))
        {
            let xp = gainXp(false);
            localStorage.setItem('playerXp', parseInt(localStorage.getItem('playerXp')) + xp)
            loseAnimation(xp);
        }
        else
        {
            localStorage.setItem('trycount', parseInt(localStorage.getItem('trycount'))+1);
            boatCordX = localStorage.getItem('boatCordX');
            boatCordY = localStorage.getItem('boa2CordY');
            boat2CordX = localStorage.getItem('boat2CordX');
            boat2CordY = localStorage.getItem('boat2CordY');
            let data = JSON.parse(localStorage.getItem('goneThere'));
            if(!data.includes(boatCordY+"-"+boatCordX))
            {
                data.push(boatCordY+"-"+boatCordX)
            }
            if(!data.includes(boat2CordY+"-"+boat2CordX))
            {
                data.push(boat2CordY+"-"+boat2CordX)
            }
            localStorage.setItem('goneThere', JSON.stringify(data))
            if(localStorage.getItem('currentTarget2') != null)
            {
                let currentTarget = JSON.parse(localStorage.getItem('currentTarget2'));
                if(currentTarget.x == boat2CordX && currentTarget.y == boat2CordY)
                {
                    localStorage.removeItem('currentTarget2');
                }
            }
        }
    }
}

function wonAnimation(xp)
{
    Swal.fire({
        title: 'You win!',
        html: 'Congrats !<br>Treasure found in '+ localStorage.getItem('trycount')+" attempts.<br>"+xp+" coins won !",
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
function loseAnimation(xp)
{
    Swal.fire({
        title: 'Defeat',
        html: xp+" coins won anyway, keep going!",
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
    let type = localStorage.getItem(localStorage.getItem('treasureCordY')+"-"+localStorage.getItem('treasureCordX'));
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
        boat = document.querySelector('#boat2');
    }
    if(boat.id.match(/2/))
    {
        boatCordX = parseInt(localStorage.getItem('boat2CordX'));
        boatCordY = parseInt(localStorage.getItem('boat2CordY'));
    }
    else
    {
        boatCordX = parseInt(localStorage.getItem('boatCordX'));
        boatCordY = parseInt(localStorage.getItem('boatCordY'));
    }
    let treasureCordX = parseInt(localStorage.getItem('treasureCordX'));
    let treasureCordY = parseInt(localStorage.getItem('treasureCordY'));
    let type = localStorage.getItem(treasureCordY+'-'+treasureCordX);

    // Find possible treasure places
    let allSameTiles = document.querySelectorAll('.'+type);
    let minX = 13;
    let minY = 7;
    let distanceX = 0;
    let distanceY = 0;
    let nearestTile = null;
    let goneThere = JSON.parse(localStorage.getItem('goneThere'));
    if(localStorage.getItem('currentTarget2') == null)
    {
        allSameTiles.forEach(tile => {
            let tileX = parseInt(tile.dataset.cordX) 
            let tileY = parseInt(tile.dataset.cordY) 
            if(!(tileX == boatCordX && tileY == boatCordY))
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
                    localStorage.setItem('currentTarget2', JSON.stringify({x:tile.dataset.cordX,y:tile.dataset.cordY}));
                }
            }
        })
    }

    // Deduce direction to take
    nearestTile = JSON.parse(localStorage.getItem('currentTarget2'))
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
        if(distanceY == 0 || (distanceX <= distanceY && distanceX != 0))
        {
            if(nearX <  boatCordX)
            {
                direction = "W";
            }
            else
            {
                direction = "E";
            }
        }
        else
        {
            
            if(nearY < boatCordY)
            {
                direction = "N";
            }
            else
            {
                direction = "S";
            }
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
    boatCordX = parseInt(localStorage.getItem('boatCordX'));
    boatCordY = parseInt(localStorage.getItem('boatCordY'));
    let treasureCordX = parseInt(localStorage.getItem('treasureCordX'));
    let treasureCordY = parseInt(localStorage.getItem('treasureCordY'));
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
        console.log(node)
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
    if(e.target.dataset.cordX == localStorage.getItem('treasureCordX') && e.target.dataset.cordY == localStorage.getItem('treasureCordY'))
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
        localStorage.setItem('speed', "2");
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
        localStorage.setItem('boatCordX', e.target.dataset.cordX);
        localStorage.setItem('boatCordY', e.target.dataset.cordY);
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
    html += "Greetings, fellow sailor !<br /><br />";
    html += "Do you hear the call of adventure ?<br /><br />";
    html += "Do you feel yourself the soul of a true pirate ?<br /><br />";
    html += "Go ahead and make your attempt, sail across the sea and find the treasure before your opponent !<br /><br />";
    html += "In this quick tutorial, you will learn how to optimize your chance to win !<br /><br />";
    html += "</p>";
    Swal.fire({
        title: "Find the treasure !",
        html: html,
        confirmButtonText: "Yes",
        cancelButtonText: "Skip tutorial",
        showConfirmButton: true,
        showCancelButton: true
    }).then(result => {
        if(result.isConfirmed)
        {
            html = "<p>";
            html += "At the beggining of the game, an hint will teach you on which type of tiles the treasure is hidden<br />";
            html += "There are 3 types of tile : Sea, Island, and Port<br />";
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
                    html += "If you were to reach out of the map, a nice pop up will tell you and prevent you to fall in a warp zone.<br />";
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
                            html = "<p>";
                            html += "In order to help you finding the treasure before your opponent, powers were given to you<br />";
                            html += "These are :";
                            html += "<ul>";
                            html += "<li>Compass: cardinal letters indicating the direction of the treasure will be green enlightened until you click them.</li><br />";
                            html += "<li>Reveal: click a tile to reveal if the treasure is hidden there or not.</li><br />";
                            html += "<li>Double speed: The next move will make you reach 2 tiles instead of one. Your opponent will move only once.</li><br />";
                            html += "<li>Teleport: Click a tile to magically appear on it, after a sweet animation. Hope you'll like it ;).</li><br />";
                            html += "</ul>";
                            html += "</p>";
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
                                    html = "<p>";
                                    html += "If you find the treasure, you win the game and gain Xp. <br />";
                                    html += "In the future, this xp will be the very ressources that will unlock your powers.<br />";
                                    html += "For now, it's not so useful and you won't be able to see the total amount you've reached.. Yet.<br />";
                                    html += "If your opponent find the treasure, you lose the game but also gain xp.<br />";
                                    html += "When the game is over, a new one starts immediately to keep on having fun !<br />";
                                    html += "<b>You know everything about sailing, so set sail fellow pirate, you've got a treasure to find !</b><br />";
                                    html += "</p>";
                                    Swal.fire({
                                        title: "Ending game",
                                        html: html,
                                        confirmButtonText: "Start",
                                        confirmButtonColor: "green",
                                        showConfirmButton: true,
                                        showCancelButton: false
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    localStorage.setItem('displayTuto',"no")
}