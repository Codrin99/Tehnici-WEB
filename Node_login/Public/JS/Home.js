function countdown(){
    var now = new Date();
    var eventDate = new Date(2020, 2, 15);
    var currentTime = now.getTime();
    var eventTime = eventDate.getTime();
    var remTime = eventTime - currentTime;

    var s = Math.floor( remTime / 1000);
    var m = Math.floor( s / 60);
    var h = Math.floor( m / 60);
    var d = Math.floor( h / 24);

    h %= 24;
    m %= 60;
    s %= 60;
    
    h = (h < 10 ) ? "0" + h : h;
    m = (m < 10 ) ? "0" + m : m;
    s = (s < 10 ) ? "0" + s : s;

    document.getElementById("days").textContent = d;
    document.getElementById("days").innerText = d;

    document.getElementById("hours").textContent = h;
    document.getElementById("minutes").textContent = m;
    document.getElementById("seconds").textContent = s;

    setTimeout(countdown, 1000);
}

countdown();

const backToTopButton = document.querySelector("#back-to-top");

backToTopButton.addEventListener("click", topFunction);

function topFunction() {
    window.scrollTo(0, 0);
}
function gobottom(){
    window.scrollTo(2000,2000);
}

function changeImg(imgNumber)	{
    var myImages = [ "../static/imagini/Leclerc.jpg",  "../static/imagini/Verstapen.jpg", "../static/imagini/Ham.jpg", "../static/imagini/Albon.jpg"]; 
    var newImgNumber1 =Math.floor(Math.random()*myImages.length);
    document.getElementById("limg").src = myImages[newImgNumber1];
    var newImgNumber2 =Math.floor(Math.random()*myImages.length);
    document.getElementById("rimg").src = myImages[newImgNumber2];
}
window.onload=changeImg;

function changeTextSize(event) {
    var input = document.getElementById('input1').value;
    var x = event.key;
      
    if (  x!=0 && x!=1  &&  x!=2 &&  x!=3 &&  x!=4 &&  x!=5 &&  x!=6 &&  x!=7 &&  x!=8 &&  x!=9 && event.which != 13) { 
        alert ("Please introduce a number");
    }
    
    let text = document.querySelectorAll('#text');
    Array.from(text).forEach(Element => {
        Element.style.fontSize = input + 'px';
    })
}

function changefontcolor() {
    var input = document.getElementById('input2').value;
    let text = document.querySelectorAll('#text');
    Array.from(text).forEach(Element => {
        Element.style.color = input;
    })
}

var child1 = document.getElementById("limg");

function removeLi1() {
  child1.parentNode.removeChild(child1);
  document.getElementById("btn1").className = "btnR1";
}

var child2 = document.getElementById("rimg");

function removeLi2() {
  child2.parentNode.removeChild(child2);
  document.getElementById("btn2").className = "btnR2";
  document.getElementById('tbody').className = "tbody1";
}
function clickCounter() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
      } else {
        localStorage.clickcount = 1;
      }
      alert(document.getElementById("result").innerHTML = "You went to top " + localStorage.clickcount + " time(s).");
    } else {
      alert(document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...");
    }
}

function openWin() {
    myWindow = window.open("./Last_Race" , "_blank", "width=1520, height=750");
  }

  function showCoords(event) {
    var x = event.pageX;
    var y = event.clientY;
    var coor = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("coord").innerHTML = coor;
  }
  
  function clearCoor() {
    document.getElementById("coord").innerHTML = "";
  }

  document.getElementById("myCheckbox").addEventListener("click", function(event){
    event.preventDefault()
  });

  function loadDoc() {
      var xhttp = new XMLHttpRequest();
      var now = new Date();
    console.log(now.toLocaleTimeString())
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        
          document.getElementById("timp").innerHTML = 'Time is: ' + now.toLocaleTimeString();
        }
      };
  
    xhttp.open("GET", "/Home_log", true);
    xhttp.send();
}