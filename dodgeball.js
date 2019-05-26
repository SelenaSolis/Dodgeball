'use strict;'
// const assert = require('assert');

const arrOfPeople = [{
    id: 2,
    name: "Charles Young",
    age: 55,
    skillSet: "welding",
    placeBorn: "Omaha, Nebraska"
  },
  {
    id: 3,
    name: "Judy Twilight",
    age: 35,
    skillSet: "fishing",
    placeBorn: "Louisville, Kentucky"
  },
  {
    id: 4,
    name: "Cynthia Doolittle",
    age: 20,
    skillSet: "tic tac toe",
    placeBorn: "Pawnee, Texas"
  },
  {
    id: 5,
    name: "John Willouby",
    age: 28,
    skillSet: "pipe fitting",
    placeBorn: "New York, New York"
  },
  {
    id: 6,
    name: "Stan Honest",
    age: 20,
    skillSet: "boom-a-rang throwing",
    placeBorn: "Perth, Australia"
  },
  {
    id: 7,
    name: "Mia Watu",
    age: 17,
    skillSet: "acrobatics",
    placeBorn: "Los Angeles, California"
  },
  {
    id: 8,
    name: "Walter Cole",
    age: 32,
    skillSet: "jump rope",
    placeBorn: "New Orleans, Louisiana"
  },
]


const listOfPlayers = [];
const blueTeam = [];
const redTeam = [];

class Player{
  constructor(id, name, age, skillSet, placeBorn, team) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.skillSet = skillSet;
      this.placeBorn = placeBorn;
      this.team = null;
  }
  enterTeam(team){
    this.team = team;
  }
}

class DodgeballPlayer extends Player{
    constructor(canThrowBall, canDodgeBall, hasPaid, isHealthy, yearsExperience, id, name, age, skillSet, placeBorn, team) {
        super(id, name, age, skillSet, placeBorn);
        this.canThrowBall = canThrowBall;
        this.canDodgeBall = canDodgeBall;
        this.hasPaid = hasPaid;
        this.isHealthy = isHealthy;
        this.yearsExperience = yearsExperience;
        this.team = team;
    }
}

// class BlueTeam extends DodgeballPlayer{
//     constructor(canThrowBall, canDodgeBall, hasPaid, isHealthy, yearsExperience, id, name, age, skillSet, placeBorn, team){
//         super(canThrowBall, canDodgeBall, hasPaid, isHealthy, yearsExperience, id, name, age, skillSet, placeBorn);
//     }
// }

// class RedTeam extends DodgeballPlayer{
//     constructor(canThrowBall, canDodgeBall, hasPaid, isHealthy, yearsExperience, id, name, age, skillSet, placeBorn, team){
//         super(canThrowBall, canDodgeBall, hasPaid, isHealthy, yearsExperience, id, name, age, skillSet, placeBorn);
//     }

// }

// const signUpList = (element) => {
// // your code here
// }

// const makePlayer = (id, element) => {
// // your code here
// }


const listPeopleChoices = () => {
    
    const listElement = document.getElementById('people')
    arrOfPeople.map(person => {
        const li = document.createElement("li")
        li.id = person.id;
        const button = document.createElement("button")
        button.innerHTML = "Make Player"
        button.addEventListener('click', function() {makePlayer(person.id)} )
        li.appendChild(button)
        li.appendChild(document.createTextNode(person.name + " - " + person.skillSet))
        listElement.append(li);
    });
    document.getElementById('listButton').style.display = 'none';
}
  
  const makePlayer = (id) => {
    console.log(`li ${id} was clicked!`);
    arrOfPeople.map(person =>{
      if (person.id === id){
        const plr = new Player(`${person.id}`, `${person.name}`, `${person.age}`, `${person.skillSet}`, `${person.placeBorn}`, null)
        listOfPlayers.push(plr);
        console.log(listOfPlayers);
        let element = document.getElementById(person.id);
        element.style.display = 'none';
      }
    });
    console.log(listOfPlayers[0].team);
    const listElement = document.getElementById('players');
    listElement.innerHTML = '';
    listOfPlayers.map(player => {
      console.log("player " + player);
      if(!player.team){
        console.log(player.team);
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(player.name + " - " + player.skillSet));
        li.id = "player" + player.id;
        const button1 = document.createElement("button");
        const button2 = document.createElement("button");
        button1.innerHTML = "Add to Blue Team";
        button2.innerHTML = "Add to Red Team";
        button1.addEventListener('click', function() {addBlueTeamMem(player.id)});
        button2.addEventListener('click', function() {addRedTeamMem(player.id)});
        listElement.append(li);
        li.appendChild(button1);
        li.appendChild(button2);
      }
    });
  }

  const addBlueTeamMem = (id) => {
    listOfPlayers.map(player =>{
      if(player.id === id){
        let element = document.getElementById("player" + player.id);
        element.style.display = 'none';
        let btm = new DodgeballPlayer(null, null, null, null, null, `${player.id}`, `${player.name}`, `${player.age}`, `${player.skillSet}`, `${player.placeBorn}`, 'blue');
        blueTeam.push(btm);
        console.log("blue team " + blueTeam);
        player.team = "blue";
      }
    })
    const listElement = document.getElementById('blue');
    listElement.innerHTML = '';
    blueTeam.map(blueMem => {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(blueMem.name + " - " + blueMem.skillSet));
      li.id = "blueTeamMem" + blueMem.id;
      listElement.append(li);
    })

    
    console.log(blueTeam);
  }

  const addRedTeamMem = (id) => {
    console.log("added to red team");
  }