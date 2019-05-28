'use strict;'

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



//declaration of array of dodgeball players and teams
const listOfPlayers = [];
const blueTeam = [];
const redTeam = [];


const makePerson = () => {
  var d = new Date();
  let age;
  let id = arrOfPeople[arrOfPeople.length-1].id + 1;
  let name = document.getElementById("firstName").value + " " + document.getElementById("lastName").value;
  let bday = document.getElementById("bday").value;
  let skillSet = document.getElementById("skillSet").value;
  let placeBorn = document.getElementById("city").value + ", " + document.getElementById("state").value;
  let month = parseInt(bday.substr(0, 2));
  let day = parseInt(bday.substr(3, 2));
  let year = parseInt(bday.substr(6, 4));
  let currMonth = d.getMonth() + 1;
  let currYear = d.getFullYear();
  let currDay = d.getDate();
  if(currMonth > month){
    age = currYear - year;
  }
  else if(currMonth < month){
    age = (curryear - year) - 1;
  }
  else{
    if(currDay >= day){
      age = currYear - year;
    }
    else{
      age = (currYear - year) - 1;
    }
  }
  let plr = new Player(id, name, age, skillSet, placeBorn, null);
  arrOfPeople.push(plr);
  listPeopleChoices();
}

//constructor for a new player
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

//constructor for Dodgeball Players
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

//Function that lists all people
const listPeopleChoices = () => {
  const listElement = document.getElementById('people');
  let playerIDArr = [];
  //maps through people array to create new possible players list
  //if no current players, print all possible players
  if(listOfPlayers.length < 1){
    listElement.innerHTML = "";
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
  } 
  else{
    listElement.innerHTML = "";
    listOfPlayers.map(player => {
      //create array of player IDs
      for(x in player){
        if(x === "id"){
          playerIDArr.push(parseInt(player.id));
        }
      }
    });
    arrOfPeople.map(person => {
      //if person in arrOfPeople array has an ID that has already
      //been added to the players list, do not print to browser
      if (!playerIDArr.includes(person.id)){
        const li = document.createElement("li")
        li.id = person.id;
        const button = document.createElement("button")
        button.innerHTML = "Make Player"
        button.addEventListener('click', function() {makePlayer(person.id)} )
        li.appendChild(button)
        li.appendChild(document.createTextNode(person.name + " - " + person.skillSet))
        listElement.append(li);
      }
    });
  }
}

//function called when "make player" button is clicked
const makePlayer = (id) => {
  //maps through array of people to create new Players
  arrOfPeople.map(person =>{
    //if the id of the person in arrOfPeople matches the id of person clicked
    if (person.id === id){
      //create new player using player class
      const plr = new Player(`${person.id}`, `${person.name}`, `${person.age}`, `${person.skillSet}`, `${person.placeBorn}`, null);
      //push new player to listOfPlayers array
      listOfPlayers.push(plr);
      //grab list element and set display to none
      let element = document.getElementById(person.id);
      element.style.display = 'none';
    }
  });

  const listElement = document.getElementById('players');
  //clear list
  listElement.innerHTML = '';
  //maps through list of Players array
  listOfPlayers.map(player => {
    //if the player is NOT assigned to a team print in Dodgeball Players list
    if(!player.team){
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(player.name + " - " + player.skillSet));
      //sets list item ID to "player#"
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


//function to add a blue team member when button is clicked
const addBlueTeamMem = (id) => {
  //maps through list of players array
  listOfPlayers.map(player =>{
    //if player id matches the id of player clicked
    if(player.id === id){
      //accesses element with unique id "player#"
      let element = document.getElementById("player" + player.id);
      //does not display item in Dodgeball player list
      element.style.display = 'none';
      //creates new Dodgeball Player using DodgeballPlayer class
      let btm = new DodgeballPlayer(null, null, null, null, null, `${player.id}`, `${player.name}`, `${player.age}`, `${player.skillSet}`, `${player.placeBorn}`, 'blue');
      //new blue team memeber pushed to array
      blueTeam.push(btm);
      //assigns player a team
      player.team = "blue";
    }
  })
  //access blue team list
  const listElement = document.getElementById('blue');
  //clears list
  listElement.innerHTML = '';
  //maps through blue team array to print in list
  blueTeam.map(blueMem => {
    const li = document.createElement("li");
    //creates inputs for boolean inputs and years experience
    const ctbCheckBox = document.createElement("input");
    const cdbCheckBox = document.createElement("input");
    const hpCheckBox = document.createElement("input");
    const ihCheckBox = document.createElement("input");
    const yeInput = document.createElement("input");
    const linebreak = document.createElement("br");
    //inputs to alter array data
    ctbCheckBox.setAttribute("type", "checkbox");
    if (blueMem.canThrowBall){ctbCheckBox.checked = true};
    ctbCheckBox.addEventListener("change", function(){this.checked ? blueMem.canThrowBall = true : blueMem.canThrowBall = false});
    cdbCheckBox.setAttribute("type", "checkbox");
    if (blueMem.canDodgeBall){cdbCheckBox.checked = true};
    cdbCheckBox.addEventListener("change", function(){this.checked ? blueMem.canDodgeBall = true : blueMem.canDodgeBall = false});
    hpCheckBox.setAttribute("type", "checkbox");
    if (blueMem.hasPaid){hpCheckBox.checked = true};
    hpCheckBox.addEventListener("change", function(){this.checked ? blueMem.hasPaid = true : blueMem.hasPaid = false});
    ihCheckBox.setAttribute("type", "checkbox");
    if (blueMem.isHealthy){ihCheckBox.checked = true};
    ihCheckBox.addEventListener("change", function(){this.checked ? blueMem.isHealthy = true : blueMem.isHealthy = false});
    yeInput.setAttribute("type", "text");
    if(blueMem.yearsExperience){yeInput.value = blueMem.yearsExperience}
    yeInput.addEventListener("change", function(){blueMem.yearsExperience = this.value});
    li.appendChild(document.createTextNode(blueMem.name + " - " + blueMem.skillSet));
    li.appendChild(linebreak);
    li.appendChild(document.createTextNode("  Can Throw: "));
    li.appendChild(ctbCheckBox); 
    li.appendChild(document.createTextNode("| Can Dodge: "));
    li.appendChild(cdbCheckBox);
    li.appendChild(document.createTextNode("| Has Paid: "));
    li.appendChild(hpCheckBox);
    li.appendChild(document.createTextNode("| Is Healthy: "));
    li.appendChild(ihCheckBox);
    li.appendChild(document.createTextNode("| Years Experience: "));
    li.appendChild(yeInput);
    li.className = "btm";
    listElement.append(li);
  })
}

//function to add a red team member when button is clicked
const addRedTeamMem = (id) => {
  //maps through list of players array
  listOfPlayers.map(player =>{
    //if player id matches the id of player clicked
    if(player.id === id){
      //accesses element with unique id "player#"
      let element = document.getElementById("player" + player.id);
      //does not display item in Dodgeball player list
      element.style.display = 'none';
      //creates new Dodgeball Player using DodgeballPlayer class
      let rtm = new DodgeballPlayer(null, null, null, null, null, `${player.id}`, `${player.name}`, `${player.age}`, `${player.skillSet}`, `${player.placeBorn}`, 'red');
      //new red team memeber pushed to array
      redTeam.push(rtm);
      //assigns player a team
      player.team = "red";
    }
  })
  //access red team list
  const listElement = document.getElementById('red');
  //clears list
  listElement.innerHTML = '';
  //maps through red team array to print in list
  redTeam.map(redMem => {
    const li = document.createElement("li");
    //creates inputs for boolean inputs and years experience
    const ctbCheckBox = document.createElement("input");
    const cdbCheckBox = document.createElement("input");
    const hpCheckBox = document.createElement("input");
    const ihCheckBox = document.createElement("input");
    const yeInput = document.createElement("input");
    const linebreak = document.createElement("br");
    //inputs to alter array data
    ctbCheckBox.setAttribute("type", "checkbox");
    if (redMem.canThrowBall){ctbCheckBox.checked = true};
    ctbCheckBox.addEventListener("change", function(){this.checked ? redMem.canThrowBall = true : redMem.canThrowBall = false});
    cdbCheckBox.setAttribute("type", "checkbox");
    if (redMem.canDodgeBall){cdbCheckBox.checked = true};
    cdbCheckBox.addEventListener("change", function(){this.checked ? redMem.canDodgeBall = true : redMem.canDodgeBall = false});
    hpCheckBox.setAttribute("type", "checkbox");
    if (redMem.hasPaid){hpCheckBox.checked = true};
    hpCheckBox.addEventListener("change", function(){this.checked ? redMem.hasPaid = true : redMem.hasPaid = false});
    ihCheckBox.setAttribute("type", "checkbox");
    if (redMem.isHealthy){ihCheckBox.checked = true};
    ihCheckBox.addEventListener("change", function(){this.checked ? redMem.isHealthy = true : redMem.isHealthy = false});
    yeInput.setAttribute("type", "text");
    yeInput.addEventListener("change", function(){redMem.yearsExperience = this.value});
    if(redMem.yearsExperience){yeInput.value = redMem.yearsExperience}
    li.appendChild(document.createTextNode(redMem.name + " - " + redMem.skillSet));
    li.appendChild(linebreak);
    li.appendChild(document.createTextNode("  Can Throw: "));
    li.appendChild(ctbCheckBox); 
    li.appendChild(document.createTextNode("| Can Dodge: "));
    li.appendChild(cdbCheckBox);
    li.appendChild(document.createTextNode("| Has Paid: "));
    li.appendChild(hpCheckBox);
    li.appendChild(document.createTextNode("| Is Healthy: "));
    li.appendChild(ihCheckBox);
    li.appendChild(document.createTextNode("| Years Experience: "));
    li.appendChild(yeInput);
    li.className = "rtm";
    listElement.append(li);
  })
}