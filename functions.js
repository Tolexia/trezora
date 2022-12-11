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
}

