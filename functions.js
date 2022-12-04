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

function newGame()
{
   for (key in localStorage) 
   {
        localStorage.removeItem(key);
   }
   window.location.reload();
}

