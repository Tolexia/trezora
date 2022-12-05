function moveDirection(direction)
{
    switch (direction) {
        case "N":
            if(parseInt(localStorage.getItem('boatCordY')) - 1 > 1)
            {
                localStorage.setItem('trycount', localStorage.getItem('trycount')+1);
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
                localStorage.setItem('trycount', localStorage.getItem('trycount')+1);
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
                localStorage.setItem('trycount', localStorage.getItem('trycount')+1);
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
                localStorage.setItem('trycount', localStorage.getItem('trycount')+1);
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
    localStorage.setItem('boatCordX', 1);
    localStorage.setItem('boatCordY', 1);
    localStorage.setItem('treasureCordX', Math.floor(Math.random() * 5)+1);
    localStorage.setItem('treasureCordY', Math.floor(Math.random() * 5)+1);
    window.location.reload();
}

