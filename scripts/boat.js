class Boat
{
    constructor(domId)
    {
        this.domElement = document.getElementById(domId)
        this.comp = domId.match("2") ? "2" : ""
        this.coordX = this.get(`boat${comp}CoordX`)
        this.coordY = this.get(`boat${comp}CoordY`)
        this.maxLifeAmountBoat = this.get(`maxLifeAmountBoat${comp}`);
        this.currentLifeAmountBoat = this.get(`currentLifeAmountBoat${comp}`);
        this.attackPower = this.get(`attackPower${comp}`);
        this.shieldArmor = this.get(`shieldArmor${comp}`);
    }

     updateLifeBar()
    {
        let percentLifeAmount = Math.round(this.currentLifeAmountBoat*100/this.maxLifeAmountBoat);
        window["lifebar"+this.comp].style.background =  `linear-gradient(90deg, rgb(41, 255, 41) 0%, rgb(41, 255, 41) ${percentLifeAmount}%, #ff0000 ${percentLifeAmount}%)`; 
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
}