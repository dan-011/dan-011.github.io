function gotoGithub() {
  window.open("https://github.com/dan-011");
}
function gotoLinkedIn() {
  window.open("https://www.linkedin.com/in/daniel-paliulis-152620251/");
}

function qs(selector, all = false) {
  return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}
let dispTab = 1;
function changeTab(index) {
  dispTab = index;
  console.log(dispTab);
  if(dispTab == 3){
      //window.scrollTo(0,0); 
      console.log("scroll up");
  }
}
const sections = qs('.section', true);
const timeline = qs('.timeline');
const line = qs('.line');
line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * .8;
function scrollHandler(e) {
  //console.log(document.getElementById("activeTab"));

  if(dispTab != 3){
    //console.log("skip");
    //return;
  }
  //console.log("scrolled");

  const {
      scrollY
  } = window;
  up = scrollY < prevScrollY;
  down = !up;
  const timelineRect = timeline.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect(); // const lineHeight = lineRect.bottom - lineRect.top;
  
  const dist = targetY - timelineRect.top;
  //console.log(dist);
  
  if (down && !full) {
      set = Math.max(set, dist);
      line.style.bottom = `calc(100% - ${set}px)`;
  }
   
  if (dist > timeline.offsetHeight + 50 && !full) {
      full = true;
      line.style.bottom = `-50px`;
  }
  
  sections.forEach(item => {
  // console.log(item);
      const rect = item.getBoundingClientRect(); //     console.log(rect);
   
      if (rect.top + item.offsetHeight / 5 < targetY) {
          item.classList.add('show-me');
      }
  }); // console.log(up, down); 
  
  prevScrollY = window.scrollY;
}
   
scrollHandler();
line.style.display = 'block';
window.addEventListener('scroll', scrollHandler);

terminalAnimation('Daniel Paliulis', 'text','white');


function terminalAnimation(word, id, color){
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id);
  var exit = false;
  target.setAttribute('style', 'color:' + color);
  target.setAttribute('style', 'font-size:35px');
  con.setAttribute('style', 'font-size:30px');
  var interval = window.setInterval(function(){
    if(letterCount == 0 && waiting == false){
      waiting = true;
      window.setTimeout(function(){
        x = 1;
        letterCount += x;
        waiting = false;
      }, 1000);
    }
    else if(letterCount == word.length + 1 && waiting == false){
      waiting = true;
      exit = true;
      clearInterval(interval);
    }
    else if(waiting == false){
      target.innerHTML = word.substring(0, letterCount);
      letterCount += x;
    }
  }, 120);
  var underscore_interval = window.setInterval(function() {
    if (visible === true) {
      // con.className = 'console-underscore hidden';
      con.setAttribute('style', 'visibility:hidden');
      //con.innerHTML = " ";
      visible = false;

    } else {
      //con.className = 'console-underscore'
      con.setAttribute('style', 'visibility:visible');

      //con.innerHTML = "_";
      visible = true;
    }
    if(exit){
      document.getElementById('console').remove();      
      clearInterval(underscore_interval);
    }
  }, 400)
}

setTimeout(descriptionAnimation, 1500, "descr");

function descriptionAnimation(id){
  var descriptionTxt = document.getElementById(id);
  var options = "~!@#$%^&*()_+`1234567890-=qwertyuiop[]\asdfghjkl;'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:ZXCVBNM<>?";
  var message = "Student in Computer Science at the University of Connecticut.";
  var len = message.length;
  var substrlen = 1;
  var waitingIter = 0;
  var intervalID = window.setInterval(function(){
    var out = "";
    for(let j = 0; j < substrlen; j++){
      var select = Math.floor(Math.random() * len);
      var selchar = options.charAt(select);
      out += selchar;
    }
    descriptionTxt.innerHTML = out;
    if(!waitingIter){
      if(substrlen < 50){
        substrlen+=3;
      }
      else{
        substrlen++;
      }
    }
    if(substrlen >= len){
      waitingIter++;
      if(waitingIter > 6){
        descriptionTxt.innerHTML = message;
        window.clearInterval(intervalID);
      }
    }
  }, 70);
}