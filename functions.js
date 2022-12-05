function moveDirection(direction)
{
    switch (direction) {
        case "N":
            if(parseInt(localStorage.getItem('boatCordY')) - 1 > 1)
            {
                localStorage.setItem('boatCordY', parseInt(localStorage.getItem('boatCordY'))-1);
                window.location.reload();
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "S":
            if(parseInt(localStorage.getItem('boatCordY')) + 1 <= 12)
            {
                localStorage.setItem('boatCordY', parseInt(localStorage.getItem('boatCordY')) + 1);
                window.location.reload();
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "E":
            if(parseInt(localStorage.getItem('boatCordX'))+1 > 1)
            {
                localStorage.setItem('boatCordX', parseInt(localStorage.getItem('boatCordX'))+1);
                window.location.reload();
            }
            else
            {
                alert('Out of bound');
            }
        break;
        case "W":
            if(parseInt(localStorage.getItem('boatCordX')) - 1 <= 12)
            {
                localStorage.setItem('boatCordX', parseInt(localStorage.getItem('boatCordX')) - 1);
                window.location.reload();
            }
            else
            {
                alert('Out of bound');
            }
        break;
    
        default:
            break;
    }
}

function placeBoatAndTreasure()
{
    if(localStorage.getItem('boatCordX') == null || localStorage.getItem('boatCordX') == undefined)
    {
        localStorage.setItem('boatCordX', 1);
    }
    if(localStorage.getItem('boatCordY') == null || localStorage.getItem('boatCordY') == undefined)
    {
        localStorage.setItem('boatCordY', 1);
    }
    if(localStorage.getItem('treasureCordX') == null || localStorage.getItem('treasureCordX') == undefined)
    {
        localStorage.setItem('treasureCordX', Math.floor(Math.random() * 5)+1);
    }
    if(localStorage.getItem('treasureCordY') == null || localStorage.getItem('treasureCordY') == undefined)
    {
        localStorage.setItem('treasureCordY', Math.floor(Math.random() * 5)+1);
    }
}

function newGame()
{
   for (key in localStorage) 
   {
        localStorage.removeItem(key);
   }
   placeBoatAndTreasure()
   window.location.reload();
}

