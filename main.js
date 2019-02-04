String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var resources = {
        gold: {
            name: 'gold',
            total: 0,
            default: 50,
            max: 100,
            perClick: 1,
            perClickUpgradeMod: 1,
            perClickUpgradeCost: 10,
            perClickUpgradeCostMod: 2.25,
            perTick: 0,
        },
        food: {
            name: 'food',
            total: 20,
            default: 100,
            max: 100,
            perClick: 1,
            perClickUpgradeMod: 1,
            perClickUpgradeCost: 10,
            perClickUpgradeCostMod: 2.25,
            perTick: 0,
        },
        wood: {
            name: 'wood',
            total: 10,
            default: 100,
            max: 100,
            perClick: 1,
            perClickUpgradeMod: 1,
            perClickUpgradeCost: 10,
            perClickUpgradeCostMod: 2.25,
            perTick: 0,
        },
        stone: {
            name: 'stone',
            total: 10,
            default: 100,
            max: 100,
            perClick: 1,
            perClickUpgradeMod: 1,
            perClickUpgradeCost: 10,
            perClickUpgradeCostMod: 2.25,
            perTick: 0,
        },
        memes: {
            name: 'memes',
            total: 2019,
            default: 9000,
            max: 9000,
            perClick: 0,
            perClickUpgradeMod: 0,
            perClickUpgradeCost: 0,
            perClickUpgradeCostMod: 0,
            perTick: 0,
        }
}

population = {
        total: 0,
        max: 20,
        globalMod: 1,
        happiness: 1,
        happinessStatus: "Normal"
}

units = {
        worker: {
            name: 'worker',
            type: 'unit',
            total: 0,
            reqResources: {
                worker: 0,
                food: 10,
                wood: 0,
                stone: 0,
                gold: 0
            },
            reqResourcesMod: {
                food: 1,
                wood: 1,
                stone: 1,
                gold: 1
            }
        },
        farmer: {
            name: 'farmer',
            type: 'unit',
            total: 0,
            reqResources: {
                worker: 1,
                food: 0,
                wood: 5,
                stone: 0,
                gold: 0
            },
            reqResourcesMod: {
                food: 1,
                wood: 1,
                stone: 1,
                gold: 1
            },
            effect: {
                foodPerTick: 0.2
            }
        },
        hunter: {
            name: 'hunter',
            type: 'unit',
            total: 0,
            reqResources: {
                worker: 1,
                food: 0,
                wood: 10,
                stone: 5,
                gold: 0
            },
            reqUpgrades:
                ['hunting'],
            reqResourcesMod: {
                food: 1,
                wood: 1,
                stone: 1,
                gold: 1
            },
            effect: {
                foodPerTick: 1
            }
        },
        miner: {
            name: 'miner',
            type: 'unit',
            total: 0,
            reqResources: {
                worker: 1,
                food: 0,
                wood: 5,
                stone: 0,
                gold: 0
            },
            reqResourcesMod: {
                food: 1,
                wood: 1,
                stone: 1,
                gold: 1
            },
            effect: {
                stonePerTick: 0.1
            }
        },
        woodcutter: {
            name: 'woodcutter',
            type: 'unit',
            total: 0,
            reqResources: {
                worker: 1,
                food: 0,
                wood: 5,
                stone: 0,
                gold: 0
            },
            reqResourcesMod: {
                food: 1,
                wood: 1,
                stone: 1,
                gold: 1
            },
            effect: {
                woodPerTick: 0.1
            }
        }
    }

structures = {
   /* mine: {
        name: 'mine',
        type: 'structure',
        total: 0,
        reqResources: {
            worker: 1,
            gold: 10
        },
        reqResourcesMod: {
            gold: 1.8
        },
        effect: {
            goldPerTick: 0.1
        }
    },*/
    storage: {
        name: 'storage',
        type: 'structure',
        total: 0,
        reqResources: {
            worker: 5,
            food: 0,
            wood: 50,
            stone: 20,
            gold: 0
        },
        reqUpgrades:['safekeeping'],
        reqResourcesMod: {
            food: 1,
            wood: 1.9,
            stone: 1.8,
            gold: 1
        },
        effect: {
            allMax: 50
        }
    },
    tent: {
        name: 'tent',
        type: 'structure',
        total: 0,
        reqResources: {
            worker: 2,
            food: 0,
            wood: 30,
            stone: 10,
            gold: 0
        },
        reqResourcesMod: {
            food: 1,
            wood: 1.9,
            stone: 1.8,
            gold: 1
        },
        effect: {
            populationMax: 5
        }
    }
}

upgrades = {
    hunting: {
        name: 'hunting',
        level: 0,
        reqResources: {
            food: 50
        }
    },
    safekeeping: {
        name: 'safekeeping',
        level: 0,
        reqResources: {
            wood: 50,
            stone: 50
        }
    },
    masonry: {
        name: 'masonry',
        level: 0,
        reqResources: {
            wood: 200,
            stone: 200
        }
    },
    exploring: {
        name: 'exploring',
        level: 0,
        reqResources: {
            food: 250,
            wood: 250
        },
        reqUpgrades:
            ['hunting']
    }
}

achievements = {
    settlement: 0,
    village: 0,
    town: 0,
    city: 0,
    country: 0,
    nation: 0,
    empire: 0,
    cleanhands: 0,
    animallover: 0,
    exterminator: 0,

}

world = {
    year: 1,
    season: 3,
    seasonName: "Early Spring",
    springForestGrownSpeed: 5,
    summerAnimalGrownSpeed: 1,
    autumnFarmerBonus: 1,
    winterGlobalDecrease: 0.6,
    timePerMonth: 20,
    time: 20,
    resources:{
        lands: 1000,
        forest: 1500,
        rocks: 2000,
        animals: 500,
        corpses: 0
    },
}

info = {
    version:"0.3"
}

var gameData = {
    //gold:gold
}

//RESOURCES
function clickResource(resource) {
    resource.total += resource.perClick
    updateGameData()
}

function resourcePerTick(resource) {
    if (resource.total < resource.max) {
        if (resource == gameData.resources.gold) {
            resource.perTick = 0
        } else if (resource == gameData.resources.food) {
            var farmerMod = 1;
            //Осенний бонус к фермерам
            if (gameData.world.season >= 9 && gameData.world.season <= 11)
                farmerMod += gameData.world.autumnFarmerBonus;
            resource.perTick = ((gameData.units.farmer.effect.foodPerTick/*+gameData.upgrades.hunting.level*0.2*/ * farmerMod) * gameData.units.farmer.total * gameData.population.globalMod) - (gameData.population.total * 0.1)

            if (gameData.world.resources.animals > 0) {
                resource.perTick += gameData.units.hunter.effect.foodPerTick * gameData.units.hunter.total * gameData.population.globalMod
                gameData.world.resources.animals -= (gameData.units.hunter.effect.foodPerTick * gameData.units.hunter.total) / 10;
            }
            if (resource.total == 0 && resource.perTick < 0) {
                var rndUnit = getRandomUnit()
                killUnit(rndUnit)
                addMessage(rndUnit.name + " dead by starving death.")
            }
        } else if (resource == gameData.resources.wood) {
            if (gameData.world.resources.forest > 0) {
                resource.perTick = gameData.units.woodcutter.effect.woodPerTick * gameData.units.woodcutter.total * gameData.population.globalMod
                gameData.world.resources.forest -= resource.perTick / 10;
                gameData.world.resources.lands += resource.perTick / 10;
            }
        } else if (resource == gameData.resources.stone) {
            if (gameData.world.resources.rocks > 0) {
                resource.perTick = gameData.units.miner.effect.stonePerTick * gameData.units.miner.total * gameData.population.globalMod
                gameData.world.resources.rocks -= resource.perTick / 100;
                gameData.world.resources.lands += resource.perTick / 100;
            }
        }
        resource.total += resource.perTick
        updateGameData()
    }
}

function checkResourceBounds() {
    Object.keys(gameData.resources).forEach(function (a) {
        if (gameData.resources[a].total < 0)
            gameData.resources[a].total = 0
        else if (gameData.resources[a].total > gameData.resources[a].max)
            gameData.resources[a].total = gameData.resources[a].max
    })
    Object.keys(gameData.world.resources).forEach(function (a) {
        if (gameData.world.resources[a] < 0)
            gameData.world.resources[a] = 0
    })
}

//UNITS
function createUnit(unit) {
    if (unit == gameData.units.worker && checkAvailabilityOfRes(unit)) {
        unit.total += 1
        gameData.resources.food.total -= unit.reqResources.food

    } else if (unit != gameData.units.worker && checkAvailabilityOfRes(unit)) {
        unit.total += 1
        gameData.resources.gold.total -= unit.reqResources.gold
        gameData.resources.food.total -= unit.reqResources.food
        gameData.resources.wood.total -= unit.reqResources.wood
        gameData.resources.stone.total -= unit.reqResources.stone
        gameData.units.worker.total -= unit.reqResources.worker
        unit.reqResources.gold *= unit.reqResourcesMod.gold
        unit.reqResources.food *= unit.reqResourcesMod.food
        unit.reqResources.wood *= unit.reqResourcesMod.wood
        unit.reqResources.stone *= unit.reqResourcesMod.stone

    }
    updateGameData()
}

function fireUnit(unit) {
    if (unit.total > 0) {
        unit.total -= 1
        gameData.units.worker.total += unit.reqResources.worker
        updateGameData()
    }
}


function killUnit(unit) {
    if (unit.total > 0) {
        unit.total -= 1
        gameData.world.resources.corpses += 1
        updateGameData()
    }
}

//STRUCTURES
function createStructure(structure) {
    if (checkAvailabilityOfRes(structure)) {
        structure.total += 1
        gameData.resources.gold.total -= structure.reqResources.gold
        gameData.resources.food.total -= structure.reqResources.food
        gameData.resources.wood.total -= structure.reqResources.wood
        gameData.resources.stone.total -= structure.reqResources.stone
        structure.reqResources.gold *= structure.reqResourcesMod.gold
        structure.reqResources.food *= structure.reqResourcesMod.food
        structure.reqResources.wood *= structure.reqResourcesMod.wood
        structure.reqResources.stone *= structure.reqResourcesMod.stone
        updateGameData()
    }
}

//UPGRADES
function getUpgrade(upgrade) {
    if(checkAvailabilityOfRes(upgrade)) {
        if (upgrade == gameData.upgrades.hunting) {
            gameData.upgrades.hunting.level = 1;
            gameData.resources.food.total -= gameData.upgrades.hunting.reqResources.food;
            addMessage("Now your people can hunt animals!")
        }
        if (upgrade == gameData.upgrades.safekeeping) {
            gameData.upgrades.safekeeping.level = 1;
            gameData.resources.wood.total -= gameData.upgrades.safekeeping.reqResources.wood;
            gameData.resources.stone.total -= gameData.upgrades.safekeeping.reqResources.stone;
            addMessage("Now your people have more space for materials!")
        }
        if (upgrade ==  gameData.upgrades.masonry) {
            gameData.upgrades.masonry.level = 1;
            gameData.resources.wood.total -= gameData.upgrades.masonry.reqResources.wood;
            gameData.resources.stone.total -= gameData.upgrades.masonry.reqResources.stone;
            addMessage("New structures unlocked!")
        }
        if (upgrade == gameData.upgrades.exploring) {
            gameData.upgrades.exploring.level = 1;
            gameData.resources.wood.total -= gameData.upgrades.exploring.reqResources.wood;
            gameData.resources.stone.food -= gameData.upgrades.exploring.reqResources.food;
            addMessage("Now your people can scout new territories!")
        }
        updateGameData()
    }
}

//DATA
function updateGameData() {
    //CHECK RESOURCES BOUNDS
    checkResourceBounds()
    //WORLD
    document.getElementById("landsTotal").innerHTML = prettify(gameData.world.resources.lands, 0)
    document.getElementById("rocksTotal").innerHTML = prettify(gameData.world.resources.rocks, 5)
    document.getElementById("forestTotal").innerHTML = prettify(gameData.world.resources.forest, 5)
    document.getElementById("animalsTotal").innerHTML = prettify(gameData.world.resources.animals, 5)
    document.getElementById("seasonName").innerHTML = gameData.world.seasonName
    document.getElementById("seasonTime").innerHTML = gameData.world.time
    document.getElementById("year").innerHTML = gameData.world.year
    document.getElementById("corpsesTotal").innerHTML = gameData.world.resources.corpses
    //POPULATION
    updatePopulationData()
    updateHappinessData()
    document.getElementById("populationTotal").innerHTML = gameData.population.total + "/" + gameData.population.max
    document.getElementById("happiness").innerHTML = gameData.population.happinessStatus
    //RESOURCES
    updateResourcesData()
    //GOLD
    document.getElementById("goldTotal").innerHTML = prettify(gameData.resources.gold.total) + "/" + prettify(gameData.resources.gold.max)
    document.getElementById("goldPerTick").innerHTML = prettify(gameData.resources.gold.perTick)
    // document.getElementById("goldPerClick").innerHTML = prettify(gameData.gold.perClick)
    //document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Level " + gameData.gold.perClick + ")"
    //document.getElementById("perClickUpgradeCost").innerHTML = prettify(gameData.gold.perClickUpgradeCost)
    //FOOD
    document.getElementById("foodTotal").innerHTML = prettify(gameData.resources.food.total) + "/" + prettify(gameData.resources.food.max)
    document.getElementById("foodPerTick").innerHTML = prettify(gameData.resources.food.perTick)
    document.getElementById("foodPerClick").innerHTML = prettify(gameData.resources.food.perClick)
    //WOOD
    document.getElementById("woodTotal").innerHTML = prettify(gameData.resources.wood.total) + "/" + prettify(gameData.resources.wood.max)
    document.getElementById("woodPerTick").innerHTML = prettify(gameData.resources.wood.perTick)
    document.getElementById("woodPerClick").innerHTML = prettify(gameData.resources.wood.perClick)
    //STONE
    document.getElementById("stoneTotal").innerHTML = prettify(gameData.resources.stone.total) + "/" + prettify(gameData.resources.stone.max)
    document.getElementById("stonePerTick").innerHTML = prettify(gameData.resources.stone.perTick)
    document.getElementById("stonePerClick").innerHTML = prettify(gameData.resources.stone.perClick)
    //document.getElementById("foodPerClickUpgrade").innerHTML = "Upgrade Pickaxe (Level " + gameData.food.perClick + ")"
    //document.getElementById("foodPerClickUpgradeCost").innerHTML = prettify(gameData.food.perClickUpgradeCost)
    //MEMES
    document.getElementById("memesTotal").innerHTML = prettify(gameData.resources.memes.total) + "/" + prettify(gameData.resources.memes.max)
    //document.getElementById("memesPerTick").innerHTML = prettify(gameData.memes.perTick)
    //document.getElementById("memesPerClick").innerHTML = prettify(gameData.memes.perClick)
    //WORKERS
    document.getElementById("workerTotal").innerHTML =gameData.units.worker.total
    document.getElementById("workerCost").innerHTML = getCost(gameData.units.worker)
    //FARMERS
    document.getElementById("farmerTotal").innerHTML = gameData.units.farmer.total
    document.getElementById("farmerCost").innerHTML = getCost(gameData.units.farmer)
    //HUNTERS
    document.getElementById("hunterTotal").innerHTML = gameData.units.hunter.total
    document.getElementById("hunterCost").innerHTML = getCost(gameData.units.hunter)
    //MINERS
    document.getElementById("minerTotal").innerHTML = gameData.units.miner.total
    document.getElementById("minerCost").innerHTML = getCost(gameData.units.miner)
    //WOODCUTTERS
    document.getElementById("woodcutterTotal").innerHTML = gameData.units.woodcutter.total
    document.getElementById("woodcutterCost").innerHTML = getCost(gameData.units.woodcutter)
    //MINE
    //document.getElementById("mineTotal").innerHTML = gameData.mine.total
    //document.getElementById("mineCostGold").innerHTML = prettify(gameData.mine.reqResources.gold)
    //document.getElementById("mineCostWorker").innerHTML = gameData.mine.reqResources.worker
    // TENT
    document.getElementById("tentTotal").innerHTML = gameData.structures.tent.total
    document.getElementById("tentCost").innerHTML = getCost(gameData.structures.tent)
    document.getElementById("tentCostWorker").innerHTML = "reqResources: " + gameData.structures.tent.reqResources.worker + " Workers"
    // STORAGE
    document.getElementById("storageTotal").innerHTML = gameData.structures.storage.total
    document.getElementById("storageCost").innerHTML = getCost(gameData.structures.storage)
    document.getElementById("storageCostWorker").innerHTML = " reqResources: " + gameData.structures.storage.reqResources.worker + " Workers"

    //UPGRADES
    document.getElementById("huntingCost").innerHTML = getCost(gameData.upgrades.hunting)
    document.getElementById("safekeepingCost").innerHTML = getCost(gameData.upgrades.safekeeping)
    document.getElementById("masonryCost").innerHTML = getCost(gameData.upgrades.masonry)
    document.getElementById("exploringCost").innerHTML = getCost(gameData.upgrades.exploring)
    //
    updateAccessData()
}

function resetGameData() {
    gameData.resources = clone(resources)
    gameData.units = clone(units)
    gameData.structures = clone(structures)
    gameData.population = clone(population)
    gameData.upgrades = clone(upgrades)
    gameData.world = clone(world)
    gameData.achievements = clone(achievements)
    gameData.info = clone(info)
    updateGameData()
    localStorage.removeItem('goldMinerSave')
}

function updatePopulationData() {

    gameData.population.total = gameData.units.worker.total +  gameData.units.farmer.total +  gameData.units.woodcutter.total +  gameData.units.miner.total +  gameData.units.hunter.total
    gameData.population.max = 20 + gameData.structures.tent.total * gameData.structures.tent.effect.populationMax
    gameData.units.worker.reqResources.food = units.worker.reqResources.food + gameData.population.total
    gameData.population.globalMod = gameData.population.happiness * gameData.world.winterGlobalDecrease
}

function updateResourcesData() {
    gameData.resources.food.max = gameData.resources.food.default + gameData.structures.storage.total * gameData.structures.storage.effect.allMax
    gameData.resources.wood.max = gameData.resources.wood.default + gameData.structures.storage.total * gameData.structures.storage.effect.allMax
    gameData.resources.stone.max = gameData.resources.stone.default + gameData.structures.storage.total * gameData.structures.storage.effect.allMax
    gameData.resources.gold.max = gameData.resources.gold.default
    gameData.resources.memes.max = gameData.resources.memes.default
}



function updateAccessData() {

    //WORKER
   if (checkAvailabilityOfRes(gameData.units.worker) && gameData.population.total < gameData.population.max) {
        document.getElementById('create'+gameData.units.worker.name.capitalize()).disabled = false;
    } else {
        document.getElementById('create'+gameData.units.worker.name.capitalize()).disabled = true;
    }

     //OTHER UNITS
    Object.keys(gameData.units).forEach(function (a) {
        if(gameData.units[a].name!="worker") {
            if (!checkAvailabilityOfTech(gameData.units[a])) {
                document.getElementById(gameData.units[a].name + 'Line').style.display = 'none';
            } else {
                document.getElementById(gameData.units[a].name + 'Line').style.display = 'block';
                if (checkAvailabilityOfRes(gameData.units[a])) {
                    document.getElementById("create" + gameData.units[a].name.capitalize()).disabled = false;
                } else {
                    document.getElementById("create" + gameData.units[a].name.capitalize()).disabled = true;
                }
                if (gameData.units[a].total > 0) {
                    document.getElementById("fire" + gameData.units[a].name.capitalize()).disabled = false;
                } else {
                    document.getElementById("fire" + gameData.units[a].name.capitalize()).disabled = true;
                }
            }
        }
    })

    //STRUCTURES
    Object.keys(gameData.structures).forEach(function (a) {
        if (!checkAvailabilityOfTech(gameData.structures[a])) {
            document.getElementById(gameData.structures[a].name+'Line').style.display = 'none';
        } else {
            document.getElementById(gameData.structures[a].name+'Line').style.display = 'block';
            if (checkAvailabilityOfRes(gameData.structures[a])) {
                document.getElementById(gameData.structures[a].name+'But').disabled = false;
            } else {
                document.getElementById(gameData.structures[a].name+'But').disabled = true;
            }
        }
    })

    //UPGRADES
    Object.keys(gameData.upgrades).forEach(function (a) {
        if (gameData.upgrades[a].level == 1 || !checkAvailabilityOfTech(gameData.upgrades[a])) {
            document.getElementById(gameData.upgrades[a].name+'Line').style.display = 'none';
        } else {
            document.getElementById(gameData.upgrades[a].name+'Line').style.display = 'block';
            if (checkAvailabilityOfRes(gameData.upgrades[a])) {
                document.getElementById(gameData.upgrades[a].name+'But').disabled = false;
            } else {
                document.getElementById(gameData.upgrades[a].name+'But').disabled = true;
            }
        }
    })

    //SCOUTING
    if (gameData.upgrades.exploring.level == 0) {
        document.getElementById('ordersBlock').style.display = 'none';
    } else {
        document.getElementById('ordersBlock').style.display = 'block';
    }

}

function updateHappinessData() {
    if (gameData.population.happiness == 1)
        gameData.population.happinessStatus = "Normal"
}

//WORLD CIRCLE
function worldTimeTick() {
    if (gameData.world.time > 0)
        gameData.world.time -= 1
    else {
        gameData.world.time = gameData.world.timePerMonth
        if (gameData.world.season < 12) {
            gameData.world.season += 1
        } else {
            gameData.world.year += 1
            gameData.world.season = 1
            addMessage("Happy New Year!")
        }
        seasonChange()
    }


    if (gameData.world.season >= 11 || gameData.world.season <= 1) {
        gameData.world.winterGlobalDecrease = world.winterGlobalDecrease
    } else {
        gameData.world.winterGlobalDecrease = 1
    }
    if (gameData.world.season >= 3 && gameData.world.season <= 5) {
        gameData.world.forest += gameData.world.springForestGrownSpeed
    }
    if (gameData.world.season >= 6 && gameData.world.season <= 8) {
        gameData.world.animals += gameData.world.summerAnimalGrownSpeed
    }
}

function seasonChange() {

    switch (gameData.world.season) {
        case 1:
            gameData.world.seasonName = "Midwinter";
            break;
        case 2:
            gameData.world.seasonName = "End of Winter";
            break;
        case 3:
            gameData.world.seasonName = "Early Spring";
            addMessage("Spring has come! Forest begins to grow.")
            break;
        case 4:
            gameData.world.seasonName = "Mid Spring";
            break;
        case 5:
            gameData.world.seasonName = "End of Spring";
            break;
        case 6:
            gameData.world.seasonName = "Early Summer";
            addMessage("Summer has come! Animals begin to grow.")
            break;
        case 7:
            gameData.world.seasonName = "Mid Summer";
            break;
        case 8:
            gameData.world.seasonName = "End of Summer";
            break;
        case 9:
            gameData.world.seasonName = "Early Autumn";
            addMessage("Autumn has come! Farmers work twice efficiently.")
            break;
        case 10:
            gameData.world.seasonName = "Mid Autumn";
            break;
        case 11:
            gameData.world.seasonName = "End of Autumn";
            break;
        case 12:
            gameData.world.seasonName = "Early Winter";
            addMessage("Winter is coming! Your people work less efficiently.")
            break;
    }
}


//MAIN LOOP
var mainGameLoop = window.setInterval(function () {
    resourcePerTick(gameData.resources.gold)
    resourcePerTick(gameData.resources.food)
    resourcePerTick(gameData.resources.wood)
    resourcePerTick(gameData.resources.stone)
    worldTimeTick()
}, 1000)

//SAVE AND LOAD
var saveGameLoop = window.setInterval(function () {
    localStorage.setItem('goldMinerSave', JSON.stringify(gameData))
}, 5000)

saveData = JSON.parse(localStorage.getItem("goldMinerSave"))
if (saveData !== null) {
    gameData = saveData
    updateGameData()
} else {
    resetGameData()
}
addMessage("WELCOME TO FEELSCLICKERMAN!")

//UTILS
function prettify(input, digits=1) {
    if (digits > 0)
        return input.toFixed(digits).toString()
    else
        return Math.ceil(input).toString()
}

function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomUnit() {
    var array = [gameData.units.worker, gameData.units.farmer, gameData.units.woodcutter, gameData.units.miner]
    while (true) {
        var unit = getRandomFromArray(array)
        if (unit.total > 0)
            return unit
    }
}

function getCost(obj){
    var costString="Cost: "
    Object.keys(obj.reqResources).forEach(function (a) {
        if (obj.reqResources[a] > 0 && a!="worker")
            costString+=obj.reqResources[a]+ " "+a.capitalize()+" "
    })
    return costString
}

function checkAvailabilityOfRes(obj) {
    var isAvailable=true;
    Object.keys(obj.reqResources).forEach(function (a) {
        if (obj.reqResources[a] > 0 && obj.reqResources[a] > getResourceTotal(a)) {
            isAvailable = false;
            return;
        }
    })
    return isAvailable
}

function checkAvailabilityOfTech(obj) {
    var isAvailable=true;
    if (obj.reqUpgrades){
        Object.keys(gameData.upgrades).forEach(function (b) {
            Object.keys(obj.reqUpgrades).forEach(function (a) {
                if (gameData.upgrades[b].name==obj.reqUpgrades[a] && gameData.upgrades[b].level==0) {
                    isAvailable = false;
                    return;
                }
            })
        })
    }
    if (obj.reqUnits){
        Object.keys(gameData.units).forEach(function (b) {
            Object.keys(obj.reqUnits).forEach(function (a) {
                if (gameData.units[b].name==obj.reqUnits[a] && gameData.units[b].total==0) {
                    isAvailable = false;
                    return;
                }
            })
        })
    }
    if (obj.reqStructures){
        Object.keys(gameData.structures).forEach(function (b) {
            Object.keys(obj.reqStructures).forEach(function (a) {
                if (gameData.structures[b].name==obj.reqStructures[a] && gameData.structures[b].total==0) {
                    isAvailable = false;
                    return;
                }
            })
        })
    }
    return isAvailable
}

function getResourceTotal(resName) {
    var res
    if (resName=="worker"){
        res=gameData.units.worker.total
    }else {
        Object.keys(gameData.resources).forEach(function (a) {
            if (gameData.resources[a].name == resName)
                res = gameData.resources[a].total
        })
    }
    return res
}


function addMessage(msg) {
    var d = new Date();
    document.getElementById("journal").innerHTML = "(" + d.toLocaleTimeString("ru-ru") + "): " + msg + "<br>" + document.getElementById("journal").innerHTML
}

function clone(obj) {
    if (obj == null || typeof (obj) != 'object')
        return obj;

    var temp = new obj.constructor();
    for (var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}

