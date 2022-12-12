function moveDirection(direction, boat = null)
{
    if(boat == null)
    {
        boat = document.querySelector('#boat');
    }
    boat.classList.remove('boat');
    switch (direction) {
        case "N":
            if(parseInt(localStorage.getItem('boatCordY')) - 1 >= 1)
            {
                localStorage.setItem('trycount', parseInt(localStorage.getItem('trycount'))+1);
                localStorage.setItem('boatCordY', parseInt(localStorage.getItem('boatCordY'))-1);
                boat.style = "animation-name:movingNorth;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "S":
            if(parseInt(localStorage.getItem('boatCordY')) + 1 <= 6)
            {
                localStorage.setItem('trycount', parseInt(localStorage.getItem('trycount'))+1);
                localStorage.setItem('boatCordY', parseInt(localStorage.getItem('boatCordY')) + 1);
                boat.style = "animation-name:movingSouth;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "E":
            if(parseInt(localStorage.getItem('boatCordX'))+1 <= 12)
            {
                localStorage.setItem('trycount', parseInt(localStorage.getItem('trycount'))+1);
                localStorage.setItem('boatCordX', parseInt(localStorage.getItem('boatCordX'))+1);
                boat.style = "animation-name:movingEast;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "W":
            if(parseInt(localStorage.getItem('boatCordX')) - 1 >= 1)
            {
                localStorage.setItem('trycount', parseInt(localStorage.getItem('trycount'))+1);
                localStorage.setItem('boatCordX', parseInt(localStorage.getItem('boatCordX')) - 1);
                boat.style = "animation-name:movingWest;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
            }
            else
            {
                alert('Out of bound');
            }
        break;
    
        default:
            break;
    }
    let cordx = localStorage.getItem('boatCordX')
    let cordy = localStorage.getItem('boatCordY')
    let tile = document.querySelector(`.tile[data-cord-x="${cordx}"][data-cord-y="${cordy}"]`);
    // window.location.reload();
    setTimeout(() => {
        tile.appendChild(boat)
        boat.classList.add('boat');
        // boat.style = "animation : 3s linear myBoat 0s infinite alternate;"
        boat.style = "";
        checkIfWon();
    }, 2000);
}


function newGame()
{
   for (key in localStorage) 
    {
        if(key != "playerXp")
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
    window.location.reload();
}
function gainXp()
{
    let xp = 0;
    if(parseInt(localStorage.getItem('trycount')) <= 3)
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
function checkIfWon()
{
    if(localStorage.getItem('boatCordX') == localStorage.getItem('treasureCordX') && localStorage.getItem('boatCordY') == localStorage.getItem('treasureCordY'))
    {
        let xp = gainXp();
        localStorage.setItem('playerXp', parseInt(localStorage.getItem('playerXp')) + xp)
        alert('Congrats !\nTreasure found in '+ localStorage.getItem('trycount')+" attempts.\n"+xp+" coins won !");
    }
    else
    {
        // Add dataset to tile where the boat is define that it has already gone there and it should not get again for this game
    }
}
/**
 * Steps :
 * - Determine all possible tiles on which the treasure can be
 * - Determine the closest one
 * - Determine the direction to take to get to it
 * - Once on it, if the treasure is not, get to another
 */
function moveBoatAuto(boat)
{
    let boatCordX = "";
    let boatCordY = "";
    if(boat.id.match(/2/))
    {
        boatCordX = localStorage.getItem('boat2CordX');
        boatCordY = localStorage.getItem('boat2CordY');
    }
    else
    {
        boatCordX = localStorage.getItem('boatCordX');
        boatCordY = localStorage.getItem('boatCordY');
    }
    let treasureCordX = localStorage.getItem('treasureCordX');
    let treasureCordY = localStorage.getItem('treasureCordY');
    let type = localStorage.getItem(treasureCordY+'-'+treasureCordX);

    // Find possible treasure places
    let allSameTiles = document.querySelectorAll('.'+type);
    let minX = 13;
    let minY = 7;
    let distanceX = 0;
    let distanceY = 0;
    let nearestTile = null;
    allSameTiles.forEach(tile => {
        distanceX = parseInt(tile.dataset.cordX) - parseInt(boatCordX);
        distanceY = parseInt(tile.dataset.cordY) - parseInt(boatCordY);
        if(distanceX  < 0)
        {
            distanceX = -distanceX;
        }
        if(distanceY  < 0)
        {
            distanceY = -distanceY;
        }
        if(distanceX  <= minX && distanceY <= minY )
        {
            minX = distanceX;
            minY = distanceY;
            nearestTile = tile;
        }
    })

    // Deduce direction to take

    direction = "";
    if(nearestTile != null)
    {
        if(minX <= minY && minX != 0 && minY != 0)
        {
            distanceX = parseInt(nearestTile.dataset.cordX) - parseInt(boatCordX);
            if(distanceX < 0)
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
            distanceY = parseInt(nearestTile.dataset.cordY) - parseInt(boatCordY);
            if(distanceY < 0)
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
