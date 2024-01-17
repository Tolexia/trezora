
class Gamesystem 
{
    constructor()
    {
        this.columnCount = localStorage.getItem("columnCount") ? parseInt(localStorage.getItem("columnCount")) : 12
        this.rowCount = localStorage.getItem("rowCount") ? parseInt(localStorage.getItem("rowCount")) : 6
        this.fightDistances = {x:2,y:1}
        this.movementAnimationDuration = 2
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
        this.shopItems = [
            {
                name : "compass",
                title : "Compass",
                cost : 500,
                quantity : 0,
                type : "power",
                image: "./images/powers/compass.svg",
            },
            {
                name : "reveal",
                title : "Reveal",
                cost : 500,
                quantity : 0,
                type : "power",
                image: "./images/powers/reveal.svg",
            },
            {
                name : "doublespeed",
                title : "Double speed",
                cost : 1000,
                quantity : 0,
                type : "power",
                image: "./images/powers/x2.png",
            },
            {
                name : "teleport",
                title : "Teleport",
                cost : 1000,
                quantity : 0,
                type : "power",
                image: "./images/powers/teleport.svg",
            },
            {
                name : "Upgrade Artillery n°1",
                cost : 1000,
                type : "upgrade",
                image: "./images/upgrades/lance-pierres.png",
                bought: false,
                stat : "attackPower",
                buffValue : 1
            },
            {
                name : "Upgrade Ship n°1",
                cost : 1000,
                type : "upgrade",
                image: "./images/upgrades/wood_shield.png",
                bought: false,
                stat : "attackPower",
                buffValue : 1
            },
            {
                name : "Upgrade Artillery n°2",
                cost : 5000,
                type : "upgrade",
                image: "./images/upgrades/canon_balls.png",
                bought: false,
                stat : "attackPower",
                buffValue : 2
            },
            {
                name : "Upgrade Ship n°2",
                cost : 5000,
                type : "upgrade",
                image: "./images/upgrades/bouclier.png",
                bought: false,
                stat : "attackPower",
                buffValue : 2
            },
            {
                name : "Upgrade Artillery n°3",
                cost : 20000,
                type : "upgrade",
                image: "./images/upgrades/evil_skull.png",
                bought: false,
                stat : "attackPower",
                buffValue : 3
            }, 
            {
                name : "Upgrade Ship n°3",
                cost : 20000,
                type : "upgrade",
                image: "./images/upgrades/ancre_blindage.png",
                bought: false,
                stat : "attackPower",
                buffValue : 3
            }
        ]
        this.skins = [
            {
                title: "Default",
                file: "boat.png"
            },
            {
                title: "Minimalist",
                file: "mini-boat.png"
            },
            {
                title: "AC Black Flag",
                file: "black_flag.png"
            },
            {
                title: "Thousand Sunny",
                file: "thousand_sunny.png"
            }
        ]
        this.ennemyStrengths = [
            {
                title: "Default",
                legend: "Basic stats, no upgrade",
                goldMultiplier: 1,
                stats: {
                    attackPower2: 3,
                    shieldArmor2: 0,
                    maxLifeAmountBoat2: 10,
                    currentLifeAmountBoat2: 10,
                }
            },
            {
                title: "Strong",
                legend: "Just a bit buffed",
                goldMultiplier: 1.25,
                stats: {
                    attackPower2: 4,
                    shieldArmor2: 1,
                    maxLifeAmountBoat2: 10,
                    currentLifeAmountBoat2: 10,
                }
            },
            {
                title: "Badass",
                legend: "You should think twice before attack it",
                goldMultiplier: 1.5,
                stats: {
                    attackPower2: 5,
                    shieldArmor2: 2,
                    maxLifeAmountBoat2: 11,
                    currentLifeAmountBoat2: 11,
                }
            }
        ]
        this.mapSizes = [
            {
                title: "12 x 6",
                columns:12,
                rows:6
            },
            {
                title: "14 x 7",
                columns:14,
                rows:7
            },
            {
                title: "16 x 8",
                columns:16,
                rows:8
            }
        ]
        this.pointer = document.createElement('div')
        this.pointer.className = "pointer"
    }
}

var gamesystem = new Gamesystem()