'use strict;'
const assert = require('assert');

//array of data
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

let listOfPlayers = [];
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




const makePlayer = (id) => {
    arrOfPeople.map(person =>{
      if (person.id === id){
        const plr = new Player(`${person.id}`, `${person.name}`, `${person.age}`, `${person.skillSet}`, `${person.placeBorn}`, null);
        listOfPlayers.push(plr);
      }
    });
  }

const addRedTeamMem = (id) => {
listOfPlayers.map(player =>{
    if(player.id === id){
    let rtm = new DodgeballPlayer(null, null, null, null, null, `${player.id}`, `${player.name}`, `${player.age}`, `${player.skillSet}`, `${player.placeBorn}`, 'red');
    redTeam.push(rtm);
    player.team = "red";
    }
});
}

const addBlueTeamMem = (id) => {
    listOfPlayers.map(player =>{
        if(player.id === id){
        let btm = new DodgeballPlayer(null, null, null, null, null, `${player.id}`, `${player.name}`, `${player.age}`, `${player.skillSet}`, `${player.placeBorn}`, 'blue');
        blueTeam.push(btm);
        player.team = "blue";
        }
    });
}

if (typeof describe === 'function') {
    describe('list of players array', () => {
        it('should add players to list of players array', () => {
        makePlayer(2);
        assert.equal(listOfPlayers.length, 1);
        });
    });
    describe('Dodgeball Players array', () => {
        it('should alter team color in player array', () => {
        listOfPlayers = [{
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
        }]
        addRedTeamMem(2);  
        assert.equal(redTeam[0].team, "red");
        addBlueTeamMem(3)
        assert.equal(blueTeam[0].team, "blue");
        });

    });
    describe('Dodgeball Players array', () => {
        it('should alter dodgeball players team color', () => {
        listOfPlayers = [{
        id: 2,
        name: "Charles Young",
        age: 55,
        skillSet: "welding",
        placeBorn: "Omaha, Nebraska"
        }]
        addRedTeamMem(2);  
        assert.equal(redTeam[0].team, "red");
        });
    });
};