window.onclick = function (event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
}
document.getElementById("htp").onclick = function () {
    document.getElementById("myModal").style.display = "block";
}
document.getElementsByClassName("close")[0].onclick = function () {
    document.getElementById("myModal").style.display = "none";
}

let doorWithCar;
let isFirstChoice;
let isSecondChoice;
let firstOpenedDoor;
let firsChosenDoor;
let secondChosenDoor;
let simulating = false

let firstOpenedDoors = [];

class Stats {

    constructor(changeWin, changeLose, notchangeWin, notchangeLose) {
        this.changeWin = changeWin
        this.changeLose = changeLose
        this.notchangeWin = notchangeWin
        this.notchangeLose = notchangeLose
    }
}

createStorage()

function resetStats() {

    var stat = new Stats(0, 0, 0, 0)
    localStorage.setItem("stats", JSON.stringify(stat))
    UpdateStats()
}

function changeStats(changeValue) {

    let stats = getStorage()

    if (changeValue === 'changeWin') {

        stats.changeWin++

    } else if (changeValue === 'changeLose') {

        stats.changeLose++

    } else if (changeValue === 'notchangeWin') {

        stats.notchangeWin++

    } else if (changeValue === 'notchangeLose') {

        stats.notchangeLose++
    }

    setStorage(stats)
}


function createStorage() {

    let stats = getStorage()

    if (stats.length == 0) {

        var stat = new Stats(0, 0, 0, 0)
        localStorage.setItem("stats", JSON.stringify(stat))

    }
}

function setStorage(stats) {

    localStorage.setItem("stats", JSON.stringify(stats))

}

function getStorage() {

    let stats = []

    if (localStorage.getItem("stats") !== null) {

        stats = JSON.parse(localStorage.getItem("stats"))

    }

    return stats

}
let speed
function Simulate() {

    let ischange = document.getElementById("changeornot").value
    console.log(ischange);

    var doors = ["door1", "door2", "door3"];
    let x
    let index
    let c = 0
    setTimeout(function () {
        CreateGame()
        x = Math.floor(Math.random() * 3) + 1;
    }, speed * 1);
    setTimeout(function () {
        firsChosenDoor = FirstChoice("door" + x)
        console.log("firsChosenDoor : ", firsChosenDoor);
        index = doors.indexOf("door" + x)
        doors.splice(index, 1);
        console.log("firstOpenedDoor : ", firstOpenedDoor);
    }, speed * 2);
    setTimeout(function () {
        if (ischange == "CHANGE") {
            index = doors.indexOf(firstOpenedDoor)
            doors.splice(index, 1);
            secondChosenDoor = SeconChoice(doors[0])
            console.log("secondChosenDoor : ", secondChosenDoor);
            CheckWin(secondChosenDoor)
        }
        else {
            secondChosenDoor = SeconChoice(firsChosenDoor)
            console.log("secondChosenDoor : ", secondChosenDoor);
            CheckWin(secondChosenDoor)
        }
    }, speed * 3);

}
let simDelay;

function i() {
    speed = document.getElementById("speed").value

    if (speed == "speed x1") {
        document.getElementById("change_or_not_ask").value = "Wait for 3 seconds to get things ready!";
        speed = 1000
    }
    else if (speed == "speed x2") {
        document.getElementById("change_or_not_ask").value = "Wait for 1 second to get things ready!";
        speed = 500
    }
    else if (speed == "speed x1000") {
        document.getElementById("change_or_not_ask").value = "Wait for 0.001 seconds to get things ready!";
        speed = 1
    }
    let count = parseInt(document.getElementById("repeatCount").value)
    simDelay = setInterval(function () {
        if (count-- == 0) {
            clearInterval(simDelay);
            return;
        }
        Simulate();
    }, speed * 3);
}


function CreateGame() {
    for (var i = 1; i < 4; i++) {
        Show("door" + i)
    }
    var x1 = Math.floor(Math.random() * 3) + 1;
    var x2 = Math.floor(Math.random() * 3) + 1;
    var x3 = Math.floor(Math.random() * 3) + 1;
    var x4 = Math.floor(Math.random() * 3) + 1;
    var x5 = Math.floor(Math.random() * 3) + 1;
    var x = x1 + x2 + x3 + x4 + x5;
    doorWithCar = (x % 3) + 1;
    console.log(doorWithCar)
    isFirstChoice = true;
    isSecondChoice = false;
    document.getElementById("winlosetext").value = "";
    document.getElementById("change_or_not_ask").value = "Behind one of these doors there is a car. Behind each of the other two doors there is a goat. Click on the door that you think the car is behind.";
    UpdateStats()
}

function FirstChoice(door) {
    let a = [1,2,3]
    let x;
    let y;
    let z;
    if (door == "door1") {
        if (doorWithCar == 1) {
            firstOpenedDoor = "door3"
            x = 3
        }
        else {
            if (doorWithCar == 2) {
                firstOpenedDoor = "door3"
                x = 3
            }
            else {
                firstOpenedDoor = "door2"
                x = 2
            }
        }
        y = 1
    }
    if (door == "door2") {
        if (doorWithCar == 2) {
            firstOpenedDoor = "door1"
            x = 1
        }
        else {
            if (doorWithCar == 1) {
                firstOpenedDoor = "door3"
                x =3
            }
            else {
                firstOpenedDoor = "door1"
                x = 1
            }
        }
        y = 2
    }
    if (door == "door3") {
        if (doorWithCar == 3) {
            firstOpenedDoor = "door2"
            x =2
        }
        else {
            if (doorWithCar == 1) {
                firstOpenedDoor = "door2"
                x = 2
            }
            else {
                firstOpenedDoor = "door1"
                x = 1
            }
        }
        y =3
    }
    Hide(firstOpenedDoor);
    a.splice(a.indexOf(x), 1);
    a.splice(a.indexOf(y), 1);
    document.getElementById("change_or_not_ask").value = "Obviously the car is not behind door " + x + ". But before I open door " + y +", the door you selected, I'm going to let you switch to door " + a +" if you like. Again, click on the door which you think the car is behind.";
    return door;
}

function SeconChoice(door) {
    Hide("door1")
    Hide("door2")
    Hide("door3")
    return door;
}

function CheckWin(door) {
    let x = "door" + doorWithCar
    if (door == x) {
        document.getElementById("winlosetext").value = "YOU WIN!";
        if (firsChosenDoor == secondChosenDoor) {
            changeStats("notchangeWin")
            document.getElementById("change_or_not_ask").value = "You did not changed your choice!";
        }
        else if (firsChosenDoor != secondChosenDoor) {
            changeStats("changeWin")
            document.getElementById("change_or_not_ask").value = "You changed your choice!";
        }
    }
    else {
        document.getElementById("winlosetext").value = "YOU LOSE!";
        if (firsChosenDoor == secondChosenDoor) {
            changeStats("notchangeLose")
            document.getElementById("change_or_not_ask").value = "You did not changed your choice!";
        }
        else if (firsChosenDoor != secondChosenDoor) {
            changeStats("changeLose")
            document.getElementById("change_or_not_ask").value = "You changed your choice!";
        }
    }
    UpdateStats()
}

function getMouseClickedPosition(event) {
    console.log(event.clientX)
    console.log(event.clientY)

    if (event.clientX < 155 && event.clientX > 35 && event.clientY < 270 && event.clientY > 70) {
        if (isFirstChoice) {
            firsChosenDoor = FirstChoice("door1")
            isFirstChoice = false
            isSecondChoice = true
            return;
        }
        if (isSecondChoice && firstOpenedDoor != "door1") {
            secondChosenDoor = SeconChoice("door1")
            CheckWin(secondChosenDoor)
            isSecondChoice = false
            return;
        }
    }
    else if (event.clientX < 275 && event.clientX > 155 && event.clientY < 270 && event.clientY > 70) {
        if (isFirstChoice) {
            firsChosenDoor = FirstChoice("door2")
            isFirstChoice = false
            isSecondChoice = true
            return;
        }
        if (isSecondChoice && firstOpenedDoor != "door2") {
            secondChosenDoor = SeconChoice("door2")
            CheckWin(secondChosenDoor)
            isSecondChoice = false
            return;
        }
    }
    else if (event.clientX < 400 && event.clientX > 275 && event.clientY < 270 && event.clientY > 70) {
        if (isFirstChoice) {
            firsChosenDoor = FirstChoice("door3")
            isFirstChoice = false
            isSecondChoice = true
            return;
        }
        if (isSecondChoice && firstOpenedDoor != "door3") {
            secondChosenDoor = SeconChoice("door3")
            CheckWin(secondChosenDoor)
            isSecondChoice = false
            return;
        }
    }
}

function Hide(id) {
    let x = "door" + doorWithCar
    if (id == x) {
        document.getElementById(id).src = "Photos/car.png";
    }
    else {
        document.getElementById(id).src = "Photos/goat.png";
    }
}

function Show(id) {
    document.getElementById(id).src = "Photos/door.png";
}

function Replay() {
    CreateGame()
}

function UpdateStats() {

    let x = getStorage().changeWin * 100 / (getStorage().changeWin + getStorage().changeLose);
    if (!isNaN(x))
        document.getElementById("changeWin").innerText = getStorage().changeWin + "  (" + x.toFixed(2) + " %)"
    else
        document.getElementById("changeWin").innerText = getStorage().changeWin + "  (" + 0 + " %)"
    x = getStorage().changeLose * 100 / (getStorage().changeWin + getStorage().changeLose);
    if (!isNaN(x))
        document.getElementById("changeLose").innerText = getStorage().changeLose + "  (" + x.toFixed(2) + " %)"
    else
        document.getElementById("changeLose").innerText = getStorage().changeLose + "  (" + 0 + " %)"
    x = getStorage().notchangeWin * 100 / (getStorage().notchangeWin + getStorage().notchangeLose);
    if (!isNaN(x))
        document.getElementById("notchangeWin").innerText = getStorage().notchangeWin + "  (" + x.toFixed(2) + " %)"
    else
        document.getElementById("notchangeWin").innerText = getStorage().notchangeWin + "  (" + 0 + " %)"
    x = getStorage().notchangeLose * 100 / (getStorage().notchangeWin + getStorage().notchangeLose);
    if (!isNaN(x))
        document.getElementById("notchangeLose").innerText = getStorage().notchangeLose + "  (" + x.toFixed(2) + " %)"
    else
        document.getElementById("notchangeLose").innerText = getStorage().notchangeLose + "  (" + 0 + " %)"
}

document.addEventListener("click", getMouseClickedPosition);


CreateGame()
