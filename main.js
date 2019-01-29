var gold = {
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
    food = {
        name: 'food',
        total: 10,
        default: 100,
        max: 100,
        perClick: 1,
        perClickUpgradeMod: 1,
        perClickUpgradeCost: 10,
        perClickUpgradeCostMod: 2.25,
        perTick: 0,
    },
    wood = {
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
    stone = {
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
    memes = {
        name: 'memes',
        total: 2019,
        default: 9000,
        max: 9000,
        perClick: 0,
        perClickUpgradeMod: 0,
        perClickUpgradeCost: 0,
        perClickUpgradeCostMod: 0,
        perTick: 0,
    },

    population = {
        total: 0,
        max: 20,
        workers: 0,
        farmers: 0,
        miners: 0,
        woodcutters: 0,
        globalMod: 1
    }

worker = {
    name: 'worker',
    type: 'unit',
    total: 0,
    require: {
        worker: 0,
        food: 10,
        wood: 0,
        stone: 0,
        gold: 0
    },
    requireMod: {
        food: 1,
        wood: 1,
        stone: 1,
        gold: 1
    }
},
    farmer = {
        name: 'farmer',
        type: 'unit',
        total: 0,
        require: {
            worker: 1,
            food: 0,
            wood: 5,
            stone: 0,
            gold: 0
        },
        requireMod: {
            food: 1,
            wood: 1,
            stone: 1,
            gold: 1
        },
        effect: {
            foodPerTick: 0.2
        }
    },
    hunter = {
        name: 'hunter',
        type: 'unit',
        total: 0,
        require: {
            worker: 1,
            food: 0,
            wood: 10,
            stone: 5,
            gold: 0
        },
        requireMod: {
            food: 1,
            wood: 1,
            stone: 1,
            gold: 1
        },
        effect: {
            foodPerTick: 1
        }
    },
    miner = {
        name: 'miner',
        type: 'unit',
        total: 0,
        require: {
            worker: 1,
            food: 0,
            wood: 5,
            stone: 0,
            gold: 0
        },
        requireMod: {
            food: 1,
            wood: 1,
            stone: 1,
            gold: 1
        },
        effect: {
            stonePerTick: 0.1
        }
    },
    woodcutter = {
        name: 'woodcutter',
        type: 'unit',
        total: 0,
        require: {
            worker: 1,
            food: 0,
            wood: 5,
            stone: 0,
            gold: 0
        },
        requireMod: {
            food: 1,
            wood: 1,
            stone: 1,
            gold: 1
        },
        effect: {
            woodPerTick: 0.1
        }
    },

    mine = {
        name: 'mine',
        type: 'structure',
        total: 0,
        require: {
            worker: 1,
            gold: 10
        },
        requireMod: {
            gold: 1.8
        },
        effect: {
            goldPerTick: 0.1
        }
    },
    storage = {
        name: 'storage',
        type: 'structure',
        total: 0,
        require: {
            worker: 5,
            food: 0,
            wood: 50,
            stone: 20,
            gold: 0
        },
        requireMod: {
            food: 1,
            wood: 1.9,
            stone: 1.8,
            gold: 1
        },
        effect: {
            allMax: 50
        }
    },
    tent = {
        name: 'tent',
        type: 'structure',
        total: 0,
        require: {
            worker: 2,
            food: 0,
            wood: 30,
            stone: 10,
            gold: 0
        },
        requireMod: {
            food: 1,
            wood: 1.9,
            stone: 1.8,
            gold: 1
        },
        effect: {
            populationMax: 5
        }
    },

    upgrades = {
        hunting: {
            level: 0,
            require: {
                food: 50
            }
        },
        safekeeping: {
            level: 0,
            require: {
                wood: 50,
                stone: 50
            }
        },
        masonry: {
            level: 0,
            require: {
                wood: 200,
                stone: 200
            }
        },
        exploring: {
            level: 0,
            require: {
                food: 250,
                wood: 250
            }
        }
    }

achievements = {}

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
    lands: 1000,
    forest: 1500,
    rocks: 2000,
    animals: 500,
    corpses: 0
}

var gameData = {
    //gold:gold
}

//RESOURCES
function clickResource(resource) {
    resource.total += resource.perClick
    checkResourceBounds(resource)
    updateGameData()
}

function resourcePerTick(resource) {
    if (resource.total < resource.max) {
        if (resource == gameData.gold)
            resource.perTick = gameData.mine.effect.goldPerTick * gameData.mine.total
        else if (resource == gameData.food) {
            var farmerMod = 1;
            //Осенний бонус к фермерам
            if (gameData.world.season >= 9 && gameData.world.season <= 11)
                farmerMod += gameData.world.autumnFarmerBonus;
            resource.perTick = ((gameData.farmer.effect.foodPerTick/*+gameData.upgrades.hunting.level*0.2*/ * farmerMod) * gameData.farmer.total * gameData.population.globalMod) - (gameData.population.total * 0.1)

            if (gameData.world.animals > 0) {
                resource.perTick += gameData.hunter.effect.foodPerTick * gameData.hunter.total * gameData.population.globalMod
                gameData.world.animals -= (gameData.hunter.effect.foodPerTick * gameData.hunter.total) / 10;
            }
            if (resource.total == 0 && resource.perTick < 0) {
                var rndUnit = getRandomUnit()
                killUnit(rndUnit)
                addMessage(rndUnit.name + " dead by starving death.")
            }
        } else if (resource == gameData.wood)
            if (gameData.world.forest > 0) {
                resource.perTick = gameData.woodcutter.effect.woodPerTick * gameData.woodcutter.total * gameData.population.globalMod
                gameData.world.forest -= resource.perTick / 10;
                gameData.world.lands += resource.perTick / 10;
            } else if (resource == gameData.stone)
                if (gameData.world.rocks > 0) {
                    resource.perTick = gameData.miner.effect.stonePerTick * gameData.miner.total * gameData.population.globalMod
                    gameData.world.rocks -= resource.perTick / 100;
                    gameData.world.lands += resource.perTick / 100;
                } else
                    resource.perTick = 0
        resource.total += resource.perTick
        checkResourceBounds(resource)
        updateGameData()
    }
}

function buyGoldPerClick() {
    if (gameData.gold.total >= gameData.gold.perClickUpgradeCost) {
        gameData.gold.total -= gameData.gold.perClickUpgradeCost
        gameData.gold.perClick += gameData.gold.perClickUpgradeMod
        gameData.gold.perClickUpgradeCost *= gameData.gold.perClickUpgradeCostMod
        updateGameData()
    }
}

function checkResourceBounds(resource) {
    if (resource.total < 0)
        resource.total = 0
    else if (resource.total > resource.max)
        resource.total = resource.max
    if (gameData.world.forest < 0)
        gameData.world.forest = 0
    if (gameData.world.rocks < 0)
        gameData.world.rocks = 0
    if (gameData.world.animals < 0)
        gameData.world.animals = 0

}

//UNITS
function createUnit(unit) {
    if (unit == gameData.worker && gameData.population.total < gameData.population.max && gameData.food.total >= unit.require.food) {
        unit.total += 1
        gameData.food.total -= unit.require.food

    } else if (unit != gameData.worker && gameData.gold.total >= unit.require.gold && gameData.food.total >= unit.require.food && gameData.wood.total >= unit.require.wood && gameData.stone.total >= unit.require.stone && gameData.worker.total >= unit.require.worker) {
        unit.total += 1
        gameData.gold.total -= unit.require.gold
        gameData.food.total -= unit.require.food
        gameData.wood.total -= unit.require.wood
        gameData.stone.total -= unit.require.stone
        gameData.worker.total -= unit.require.worker
        unit.require.gold *= unit.requireMod.gold
        unit.require.food *= unit.requireMod.food
        unit.require.wood *= unit.requireMod.wood
        unit.require.stone *= unit.requireMod.stone

    }
    updateGameData()
}

function fireUnit(unit) {
    if (unit.total > 0) {
        unit.total -= 1
        gameData.worker.total += unit.require.worker
        updateGameData()
    }
}


function killUnit(unit) {
    if (unit.total > 0) {
        unit.total -= 1
        gameData.world.corpses += unit.require.worker
        updateGameData()
    }
}

//STRUCTURES
function createStructure(structure) {
    if (gameData.gold.total >= structure.require.gold && gameData.food.total >= structure.require.food && gameData.wood.total >= structure.require.wood && gameData.stone.total >= structure.require.stone && gameData.worker.total >= structure.require.worker) {
        structure.total += 1
        gameData.gold.total -= structure.require.gold
        gameData.food.total -= structure.require.food
        gameData.wood.total -= structure.require.wood
        gameData.stone.total -= structure.require.stone
        structure.require.gold *= structure.requireMod.gold
        structure.require.food *= structure.requireMod.food
        structure.require.wood *= structure.requireMod.wood
        structure.require.stone *= structure.requireMod.stone
        updateGameData()
    }
}

//UPGRADES
function getUpgrade(upgrade) {
    if (upgrade == 'hunting' && gameData.food.total >= gameData.upgrades.hunting.require.food) {
        gameData.upgrades.hunting.level = 1;
        gameData.food.total -= gameData.upgrades.hunting.require.food;
        addMessage("Now your people can hunt animals!")
    }
    if (upgrade == 'safekeeping' && gameData.wood.total >= gameData.upgrades.safekeeping.require.wood && gameData.stone.total >= gameData.upgrades.safekeeping.require.stone) {
        gameData.upgrades.safekeeping.level = 1;
        gameData.wood.total -= gameData.upgrades.safekeeping.require.wood;
        gameData.stone.total -= gameData.upgrades.safekeeping.require.stone;
        addMessage("Now your people have more space for materials!")
    }
    if (upgrade == 'masonry' && gameData.wood.total >= gameData.upgrades.masonry.require.wood && gameData.stone.total >= gameData.upgrades.masonry.require.stone) {
        gameData.upgrades.masonry.level = 1;
        gameData.wood.total -= gameData.upgrades.masonry.require.wood;
        gameData.stone.total -= gameData.upgrades.masonry.require.stone;
        addMessage("New structures unlocked!")
    }
    if (upgrade == 'exploring' && gameData.wood.total >= gameData.upgrades.exploring.require.wood && gameData.food.total >= gameData.upgrades.exploring.require.food) {
        gameData.upgrades.safekeeping.level = 1;
        gameData.wood.total -= gameData.upgrades.exploring.require.wood;
        gameData.stone.food -= gameData.upgrades.exploring.require.food;
        addMessage("Now your people can scout new territories!")
    }
    updateGameData()
}

//DATA
function updateGameData() {
    //WORLD
    document.getElementById("landsTotal").innerHTML = prettify(gameData.world.lands, 0)
    document.getElementById("rocksTotal").innerHTML = prettify(gameData.world.rocks, 5)
    document.getElementById("forestTotal").innerHTML = prettify(gameData.world.forest, 5)
    document.getElementById("animalsTotal").innerHTML = prettify(gameData.world.animals, 5)
    document.getElementById("seasonName").innerHTML = gameData.world.seasonName
    document.getElementById("seasonTime").innerHTML = gameData.world.time
    document.getElementById("year").innerHTML = gameData.world.year
    //POPULATION
    updatePopulationData()
    document.getElementById("populationTotal").innerHTML = gameData.population.total + "/" + gameData.population.max
    //RESOURCES
    updateResourcesData()
    //GOLD
    document.getElementById("goldTotal").innerHTML = prettify(gameData.gold.total) + "/" + prettify(gameData.gold.max)
    document.getElementById("goldPerTick").innerHTML = prettify(gameData.gold.perTick)
    // document.getElementById("goldPerClick").innerHTML = prettify(gameData.gold.perClick)
    //document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Level " + gameData.gold.perClick + ")"
    //document.getElementById("perClickUpgradeCost").innerHTML = prettify(gameData.gold.perClickUpgradeCost)
    //FOOD
    document.getElementById("foodTotal").innerHTML = prettify(gameData.food.total) + "/" + prettify(gameData.food.max)
    document.getElementById("foodPerTick").innerHTML = prettify(gameData.food.perTick)
    document.getElementById("foodPerClick").innerHTML = prettify(gameData.food.perClick)
    //WOOD
    document.getElementById("woodTotal").innerHTML = prettify(gameData.wood.total) + "/" + prettify(gameData.wood.max)
    document.getElementById("woodPerTick").innerHTML = prettify(gameData.wood.perTick)
    document.getElementById("woodPerClick").innerHTML = prettify(gameData.wood.perClick)
    //STONE
    document.getElementById("stoneTotal").innerHTML = prettify(gameData.stone.total) + "/" + prettify(gameData.stone.max)
    document.getElementById("stonePerTick").innerHTML = prettify(gameData.stone.perTick)
    document.getElementById("stonePerClick").innerHTML = prettify(gameData.stone.perClick)
    //document.getElementById("foodPerClickUpgrade").innerHTML = "Upgrade Pickaxe (Level " + gameData.food.perClick + ")"
    //document.getElementById("foodPerClickUpgradeCost").innerHTML = prettify(gameData.food.perClickUpgradeCost)
    //MEMES
    document.getElementById("memesTotal").innerHTML = prettify(gameData.memes.total) + "/" + prettify(gameData.memes.max)
    //document.getElementById("memesPerTick").innerHTML = prettify(gameData.memes.perTick)
    //document.getElementById("memesPerClick").innerHTML = prettify(gameData.memes.perClick)
    //WORKERS
    document.getElementById("workerTotal").innerHTML = prettify(gameData.worker.total, 0)
    //document.getElementById("workerCostGold").innerHTML = prettify(gameData.worker.require.gold)
    document.getElementById("workerCost").innerHTML = " Cost: " + prettify(gameData.worker.require.food, 0) + " Food"
    //FARMERS
    document.getElementById("farmerTotal").innerHTML = gameData.farmer.total
    document.getElementById("farmerCost").innerHTML = " Cost: " + prettify(gameData.farmer.require.wood, 0) + " Wood"
    //HUNTERS
    document.getElementById("hunterTotal").innerHTML = gameData.hunter.total
    document.getElementById("hunterCost").innerHTML = " Cost: " + prettify(gameData.hunter.require.wood, 0) + " Wood, " + prettify(gameData.hunter.require.stone, 0) + " Stone"
    //MINERS
    document.getElementById("minerTotal").innerHTML = gameData.miner.total
    document.getElementById("minerCost").innerHTML = " Cost: " + prettify(gameData.miner.require.wood, 0) + " Wood"
    //WOODCUTTERS
    document.getElementById("woodcutterTotal").innerHTML = gameData.woodcutter.total
    document.getElementById("woodcutterCost").innerHTML = " Cost: " + prettify(gameData.woodcutter.require.wood, 0) + " Wood"
    //MINE
    //document.getElementById("mineTotal").innerHTML = gameData.mine.total
    //document.getElementById("mineCostGold").innerHTML = prettify(gameData.mine.require.gold)
    //document.getElementById("mineCostWorker").innerHTML = gameData.mine.require.worker
    // TENT
    document.getElementById("tentTotal").innerHTML = gameData.tent.total
    document.getElementById("tentCost").innerHTML = " Cost: " + prettify(gameData.tent.require.wood, 0) + " Wood, " + prettify(gameData.tent.require.stone, 0) + " Stone"
    document.getElementById("tentCostWorker").innerHTML = "Require: " + gameData.tent.require.worker + " Workers"
    // STORAGE
    document.getElementById("storageTotal").innerHTML = gameData.storage.total
    document.getElementById("storageCost").innerHTML = " Cost: " + prettify(gameData.storage.require.wood, 0) + " Wood, " + prettify(gameData.storage.require.stone, 0) + " Stone"
    document.getElementById("storageCostWorker").innerHTML = " Require: " + gameData.storage.require.worker + " Workers"

    //UPGRADES
    updateUpgradesData()
    document.getElementById("huntingCost").innerHTML = " Cost: " + prettify(gameData.upgrades.hunting.require.food, 0) + " Food"
    document.getElementById("safekeepingCost").innerHTML = " Cost: " + prettify(gameData.upgrades.safekeeping.require.wood, 0) + " Wood, " + prettify(gameData.upgrades.safekeeping.require.stone, 0) + " Stone"
    document.getElementById("masonryCost").innerHTML = " Cost: " + prettify(gameData.upgrades.masonry.require.wood, 0) + " Wood, " + prettify(gameData.upgrades.masonry.require.stone, 0) + " Stone"
    document.getElementById("exploringCost").innerHTML = " Cost: " + prettify(gameData.upgrades.exploring.require.wood, 0) + " Wood, " + prettify(gameData.upgrades.exploring.require.food, 0) + " Food"
    //
    updateAccessData()
}

function resetGameData() {
    gameData.gold = clone(gold)
    gameData.food = clone(food)
    gameData.wood = clone(wood)
    gameData.stone = clone(stone)
    gameData.memes = clone(memes)
    gameData.population = clone(population)
    gameData.worker = clone(worker)
    gameData.farmer = clone(farmer)
    gameData.hunter = clone(hunter)
    gameData.miner = clone(miner)
    gameData.woodcutter = clone(woodcutter)
    gameData.mine = clone(mine)
    gameData.storage = clone(storage)
    gameData.tent = clone(tent)
    gameData.upgrades = clone(upgrades)
    gameData.world = clone(world)
    gameData.achievements = clone(achievements)
    updateGameData()
    localStorage.removeItem('goldMinerSave')
}

function updatePopulationData() {

    gameData.population.workers = gameData.worker.total
    gameData.population.farmers = gameData.farmer.total
    gameData.population.woodcutters = gameData.woodcutter.total
    gameData.population.miners = gameData.miner.total
    gameData.population.hunters = gameData.hunter.total
    gameData.population.total = gameData.population.workers + gameData.population.farmers + gameData.population.woodcutters + gameData.population.miners + gameData.population.hunters
    gameData.population.max = 20 + gameData.tent.total * gameData.tent.effect.populationMax
    gameData.worker.require.food = worker.require.food + gameData.population.total
}

function updateResourcesData() {
    gameData.food.max = gameData.food.default + gameData.storage.total * gameData.storage.effect.allMax
    gameData.wood.max = gameData.wood.default + gameData.storage.total * gameData.storage.effect.allMax
    gameData.stone.max = gameData.stone.default + gameData.storage.total * gameData.storage.effect.allMax
    gameData.gold.max = gameData.gold.default
    gameData.memes.max = gameData.memes.default
}

function updateUpgradesData() {
    //HUNTING
    if (gameData.upgrades.hunting.level == 1) {
        document.getElementById('huntingLine').style.display = 'none';
    } else {
        document.getElementById('huntingLine').style.display = 'block';
        if (gameData.food.total >= gameData.upgrades.hunting.require.food) {
            document.getElementById('huntingBut').disabled = false;
        } else {
            document.getElementById('huntingBut').disabled = true;
        }
    }
    //SAFEKEEPING
    if (gameData.upgrades.safekeeping.level == 1) {
        document.getElementById('safekeepingLine').style.display = 'none';
    } else {
        document.getElementById('safekeepingLine').style.display = 'block';
        if (gameData.wood.total >= gameData.upgrades.safekeeping.require.wood && gameData.stone.total >= gameData.upgrades.safekeeping.require.stone) {
            document.getElementById('safekeepingBut').disabled = false;
        } else {
            document.getElementById('safekeepingBut').disabled = true;
        }
    }
    //MASONRY
    if (gameData.upgrades.masonry.level == 1) {
        document.getElementById('masonryLine').style.display = 'none';
    } else {
        document.getElementById('masonryLine').style.display = 'block';
        if (gameData.wood.total >= gameData.upgrades.masonry.require.wood && gameData.stone.total >= gameData.upgrades.masonry.require.stone) {
            document.getElementById('masonryBut').disabled = false;
        } else {
            document.getElementById('masonryBut').disabled = true;
        }
    }
    //EXPLORING
    if (gameData.upgrades.exploring.level == 1 || gameData.upgrades.hunting.level == 0) {
        document.getElementById('exploringLine').style.display = 'none';
    } else {
        document.getElementById('exploringLine').style.display = 'block';
        if (gameData.wood.total >= gameData.upgrades.exploring.require.wood && gameData.food.total >= gameData.upgrades.exploring.require.food) {
            document.getElementById('exploringBut').disabled = false;
        } else {
            document.getElementById('exploringBut').disabled = true;
        }
    }

}

function updateAccessData() {

    //WORKER
    if (gameData.food.total >= gameData.worker.require.food && gameData.population.total < gameData.population.max) {
        document.getElementById('createWorker').disabled = false;
    } else {
        document.getElementById('createWorker').disabled = true;
    }
    //FARMER
    if (gameData.wood.total >= gameData.farmer.require.wood && gameData.worker.total >= gameData.farmer.require.worker) {
        document.getElementById('createFarmer').disabled = false;
    } else {
        document.getElementById('createFarmer').disabled = true;
    }
    if (gameData.farmer.total > 0) {
        document.getElementById('fireFarmer').disabled = false;
    } else {
        document.getElementById('fireFarmer').disabled = true;
    }
    //HUNTER
    if (gameData.upgrades.hunting.level == 0) {
        document.getElementById('hunterLine').style.display = 'none';
    } else {
        document.getElementById('hunterLine').style.display = 'block';
        if (gameData.wood.total >= gameData.hunter.require.wood && gameData.stone.total >= gameData.hunter.require.stone && gameData.worker.total >= gameData.hunter.require.worker) {
            document.getElementById('createHunter').disabled = false;
        } else {
            document.getElementById('createHunter').disabled = true;
        }
        if (gameData.hunter.total > 0) {
            document.getElementById('fireHunter').disabled = false;
        } else {
            document.getElementById('fireHunter').disabled = true;
        }
    }

    //MINER
    if (gameData.wood.total >= gameData.miner.require.wood && gameData.worker.total >= gameData.miner.require.worker) {
        document.getElementById('createMiner').disabled = false;
    } else {
        document.getElementById('createMiner').disabled = true;
    }
    if (gameData.miner.total > 0) {
        document.getElementById('fireMiner').disabled = false;
    } else {
        document.getElementById('fireMiner').disabled = true;
    }
    //WOODCUTTER
    if (gameData.wood.total >= gameData.woodcutter.require.wood && gameData.worker.total >= gameData.woodcutter.require.worker) {
        document.getElementById('createWoodcutter').disabled = false;
    } else {
        document.getElementById('createWoodcutter').disabled = true;
    }
    if (gameData.woodcutter.total > 0) {
        document.getElementById('fireWoodcutter').disabled = false;
    } else {
        document.getElementById('fireWoodcutter').disabled = true;
    }
    //TENT
    if (gameData.wood.total >= gameData.tent.require.wood && gameData.stone.total >= gameData.tent.require.stone && gameData.worker.total >= gameData.tent.require.worker) {
        document.getElementById('tentBut').disabled = false;
    } else {
        document.getElementById('tentBut').disabled = true;
    }
    //STORAGE
    if (gameData.upgrades.safekeeping.level == 0) {
        document.getElementById('storageLine').style.display = 'none';
        // document.getElementById('Pdomestication').style.display = 'block';
    } else {
        document.getElementById('storageLine').style.display = 'block';
        // document.getElementById('Pdomestication').style.display = 'none';
        if (gameData.wood.total >= gameData.storage.require.wood & gameData.stone.total >= gameData.storage.require.stone && gameData.worker.total >= gameData.storage.require.worker) {
            document.getElementById('storageBut').disabled = false;
        } else {
            document.getElementById('storageBut').disabled = true;
        }
    }
    //SCOUTING
    if (gameData.upgrades.exploring.level == 0) {
        document.getElementById('ordersBlock').style.display = 'none';
        // document.getElementById('Pdomestication').style.display = 'block';
    } else {
        document.getElementById('ordersBlock').style.display = 'block';
        // document.getElementById('Pdomestication').style.display = 'none';
        /*if (gameData.wood.total >= gameData.storage.require.wood & gameData.stone.total >= gameData.storage.require.stone && gameData.worker.total >= gameData.storage.require.worker) {
            document.getElementById('storageBut').disabled = false;
        } else {
            document.getElementById('storageBut').disabled = true;
        }*/
    }

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
        gameData.population.globalMod = gameData.world.winterGlobalDecrease
    } else {
        gameData.population.globalMod = 1
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
    resourcePerTick(gameData.gold)
    resourcePerTick(gameData.food)
    resourcePerTick(gameData.wood)
    resourcePerTick(gameData.stone)
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
    var array = [gameData.worker, gameData.farmer, gameData.woodcutter, gameData.miner]
    while (true) {
        var unit = getRandomFromArray(array)
        if (unit.total > 0)
            return unit
    }
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