function gotoGithub() {
  window.open("https://github.com/dan-011");
}
function gotoLinkedIn() {
  window.open("https://www.linkedin.com/in/daniel-paliulis-152620251/");
}

function qs(selector, all = false) {
  return all ? document.querySelectorAll(selector) : document.querySelector(selector);
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
  const {
      scrollY
  } = window;
  up = scrollY < prevScrollY;
  down = !up;
  const timelineRect = timeline.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect(); // const lineHeight = lineRect.bottom - lineRect.top;
  
  const dist = targetY - timelineRect.top;
  console.log(dist);
  
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
  target.setAttribute('style', 'color:' + color);
  window.setInterval(function(){
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
    }
    else if(waiting == false){
      target.innerHTML = word.substring(0, letterCount);
      letterCount += x;
    }
  }, 120);
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

