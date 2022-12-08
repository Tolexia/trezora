function moveDirection(direction)
{
    const boat = document.querySelector('.boat');
    switch (direction) {
        case "N":
            if(parseInt(localStorage.getItem('boatCordY')) - 1 > 1)
            {
                localStorage.setItem('trycount', parseInt(localStorage.getItem('trycount'))+1);
                localStorage.setItem('boatCordY', parseInt(localStorage.getItem('boatCordY'))-1);
                boat.style = "animation-name:movingNorth;animation-duration: 3s;animation-fill-mode: forwards;";
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "S":
            if(parseInt(localStorage.getItem('boatCordY')) + 1 <= 12)
            {
                localStorage.setItem('trycount', parseInt(localStorage.getItem('trycount'))+1);
                localStorage.setItem('boatCordY', parseInt(localStorage.getItem('boatCordY')) + 1);
                boat.style = "animation-name:movingSouth;animation-duration: 3s;animation-fill-mode: forwards;";
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "E":
            if(parseInt(localStorage.getItem('boatCordX'))+1 > 1)
            {
                localStorage.setItem('trycount', parseInt(localStorage.getItem('trycount'))+1);
                localStorage.setItem('boatCordX', parseInt(localStorage.getItem('boatCordX'))+1);
                boat.style = "animation-name:movingEast;animation-duration: 3s;animation-fill-mode: forwards;";
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "W":
            if(parseInt(localStorage.getItem('boatCordX')) - 1 <= 12)
            {
                localStorage.setItem('trycount', parseInt(localStorage.getItem('trycount'))+1);
                localStorage.setItem('boatCordX', parseInt(localStorage.getItem('boatCordX')) - 1);
                boat.style = "animation-name:movingWest;animation-duration: 3s;animation-fill-mode: forwards;";
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
        // boat.style = "animation : 3s linear myBoat 0s infinite alternate;"
        boat.style = "";
    }, 3000);
}


function newGame()
{
   for (key in localStorage) 
    {
        localStorage.removeItem(key);
    }
    localStorage.setItem('boatCordX', 1);
    localStorage.setItem('boatCordY', 1);
    localStorage.setItem('treasureCordX', Math.floor(Math.random() * 5)+1);
    localStorage.setItem('treasureCordY', Math.floor(Math.random() * 5)+1);
    window.location.reload();
}

