
class Gamesystem 
{
    constructor()
    {
        this.columnCount = 12
        this.rowCount = 6
        this.fightDistances = {x:2,y:1}
        this.levels = {
            1: 0,
            2: 500,
            3: 2000,
            4: 5000,
            5: 10000
        }
        this.powerReaches = {
            2:"compass",
            3:"reveal",
            4:"doublespeed",
            5:"teleport"
        }
        this.creatures = {
            "shark": {
                attackPower: 4,
                currentLifeAmount: 2,
                shieldArmor: 0,
                domElement: null
            },
            "kraken":{
                attackPower: 10,
                currentLifeAmount: 8,
                shieldArmor: 0,
                domElement: null
            }
        }
        this.itemsToLoot = [
            {
                name: "Bauble",
                cost: 130,
                image: "./images/loot/babiole.png"
            },
            {
                name: "Barrel",
                cost: 80,
                image: "./images/loot/baril.png"
            },
            {
                name: "Navigation bar",
                cost: 100,
                image: "./images/loot/barre.png"
            },
            {
                name: "Goblet",
                cost: 120,
                image: "./images/loot/calice.png"
            },
            {
                name: "Knife",
                cost: 60,
                image: "./images/loot/couteau.png"
            },
            {
                name: "Saber",
                cost: 90,
                image: "./images/loot/epee.png"
            },
            {
                name: "Pestle",
                cost: 40,
                image: "./images/loot/pilon.png"
            },
            {
                name: "Dirk",
                cost: 50,
                image: "./images/loot/poignard.png"
            },
            {
                name: "Potion",
                cost: 70,
                image: "./images/loot/potion.png"
            },
        ]
        this.rareItemsToLoot = [
            {
                name: "Trident of King of Sea",
                cost: 150,
                image: "./images/loot/trident.png"
            },
            {
                name: "Magic Sword",
                cost: 200,
                image: "./images/loot/epee_rare.png"
            },
            {
                name: "Gems",
                cost: 250,
                image: "./images/loot/diamants.png"
            },
        ]
    }
}

var gamesystem = new Gamesystem()
document.getElementById('map').style = `--columnCount: ${gamesystem.columnCount};--rowCount: ${gamesystem.rowCount};`