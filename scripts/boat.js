class Boat
{
    constructor(domId)
    {
        this.domElement = document.getElementById(domId)
        this.lifebar = this.domElement.querySelector('.lifebar')
        this.comp = domId.match("2") ? "2" : ""

        this.dbLink = {
            "coordX" : `boat${this.comp}CoordX`,
            "coordY" : `boat${this.comp}CoordY`
        }

        this.coordX = parseInt(this.get(`boat${this.comp}CoordX`))
        this.coordY = parseInt(this.get(`boat${this.comp}CoordY`))
        this.maxLifeAmountBoat = parseInt(this.get(`maxLifeAmountBoat${this.comp}`));
        this.currentLifeAmountBoat = parseInt(this.get(`currentLifeAmountBoat${this.comp}`));
        this.attackPower = parseInt(this.get(`attackPower${this.comp}`));
        this.shieldArmor = parseInt(this.get(`shieldArmor${this.comp}`));

        this.updateLifeBar()
    }

     updateLifeBar()
    {
        let percentLifeAmount = Math.round(this.currentLifeAmountBoat*100/this.maxLifeAmountBoat);
        this.lifebar.style.background =  `linear-gradient(90deg, rgb(41, 255, 41) 0%, rgb(41, 255, 41) ${percentLifeAmount}%, #ff0000 ${percentLifeAmount}%)`; 
    }

    get(property)
    {
        return localStorage.getItem(property)
    }

    set(property, value)
    {
        this[property] = value
        localStorage.setItem(property, value)
    }

    goNorth()
    {
        this.set()
        setItem(keyY, boat.coordY-1);
        if(boat.domElement.id == "boat2")
        {
            boat.domElement.style = "animation-name:movingNorth2;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
        }
        else
        {
            boat.domElement.style = "animation-name:movingNorth;animation-duration: 2s;animation-fill-mode: forwards;filter: drop-shadow(3px 3px 5px var(--dark));";
        }
    }
}