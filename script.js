var nodes=[["You are in the starting room.  What room would you like to goto next?","room 1",1,"room 2",2,"room 3",3],
           ["You are in room 1.  What room would you like to goto next?","room 5",5,"room 6",6,"room 7",7],
           ["You are in room 2.  What room would you like to goto next?","room 8",8,"room 9",9,"room 10",10],
           ["You are in room 3.  What room would you like to goto next?","room 11",11,"room 12",12,"room 4",4],
           ["You are in room 4.  What room would you like to goto next?","room 13",13,"room 14",14,"room 15",15],
           ["You have arrived at destination 1!","END",0,"END",0,"END",0],
           ["You have arrived at destination 2!","END",0,"END",0,"END",0],
           ["You have arrived at destination 3!","END",0,"END",0,"END",0],
           ["You have arrived at destination 4!","END",0,"END",0,"END",0],
           ["You have arrived at destination 5!","END",0,"END",0,"END",0],
           ["You have arrived at destination 6!","END",0,"END",0,"END",0],
           ["You have arrived at destination 7!","END",0,"END",0,"END",0],
           ["You have arrived at destination 8!","END",0,"END",0,"END",0],
           ["You have arrived at destination 9!","END",0,"END",0,"END",0],
           ["You have arrived at destination 10!","END",0,"END",0,"END",0],
           ["You have arrived at destination 11!","END",0,"END",0,"END",0]]
var curNode, endLink, eog;

function ProcIn(){
  var inputLine = document.getElementById("in");
  WriteOut(document.createTextNode(inputLine.value));
  ParseIn(inputLine.value);
  inputLine.value = "";
}

function WriteOut(outTxt){
  var out = document.getElementById("out");
  var line = document.createElement("p");
  if (typeof outTxt == "string"){ outTxt = StrToObj(outTxt);}
  line.appendChild(outTxt);
  out.appendChild(line);
}

function StartUp(){
    eog = false;
    endLink = "https://www.youtube.com/watch?v=iJ4T9CQA0UM";
    WriteOut("Type HELP for a list of commands.");
    GotoNode(0);
}

function ParseIn(txt){
  txt = txt.replace(/\r?\n|\r/g,"")
  txt = txt.toLowerCase();
  //var test = txt.split(" ");
  switch(txt) {
    case "help": DispHelp(); break;
    case "repeat": GotoNode(curNode); break;
    case "reset" : StartUp(); break;
    case "quit":
    case "exit":
      EndGame(); break;
    case "1":
    case nodes[curNode][1].charAt(0):
    case nodes[curNode][1]:
      if(!eog){GotoNode(nodes[curNode][2]);}
      else {StartUp();}
      break;
    case "2":
    case nodes[curNode][3].charAt(0):
    case nodes[curNode][3]:
      if(!eog){GotoNode(nodes[curNode][4]);}
      else {EndGame();}
      break;
    case "3":
    case nodes[curNode][5].charAt(0):
    case nodes[curNode][5]:
      if(!eog){GotoNode(nodes[curNode][6]);}
      else {WriteOut("Command not recognized.");}
      break;
    case "yes":
    case "y":
      if(eog){StartUp();}
      else {WriteOut("Command not recognized.");}
      break;
    case "no":
    case "n":
      if (eog){EndGame();}
      else {WriteOut("Command not recognized.");}
      break;
    default:
      WriteOut("Command not recognized.");
  }
}

function StrToObj(txt){
  return(document.createTextNode(txt));
}

function DispHelp(){
  WriteOut("Valid commands are:");
  WriteOut("< repeat - Displays your current question and its possible answers.");
  WriteOut("< help   - Displays this help message.");
  WriteOut("< reset  - Restart the game at the first question.");
  WriteOut("< quit or < exit - Quits the game.")
  WriteOut("You can choose to answer the question by either:")
  WriteOut("< #      - Entering the number next to the answer you wish to select.");
  WriteOut("< x      - Entering the first letter of the answer you wish to select.");
  WriteOut("< xxx... - Typing the entire answer you wish to select.");

}

function GotoNode(nodeNumber){
  curNode = nodeNumber;
  if (curNode > 4){eog = true;}
  WriteOut(nodes[curNode][0]);

  if(!eog){
    WriteOut("1) " + nodes[curNode][1]);
    WriteOut("2) " + nodes[curNode][3]);
    WriteOut("3) " + nodes[curNode][5]);
  }
  else {
    endLink=nodes[curNode][4];
    WriteOut("You've reached the end of your adventure.");
    WriteOut("Would you like to play again?");
    WriteOut("1) yes");
    WriteOut("2) no");
  }
}

function EndGame(){
  window.location.assign(endLink);
}
