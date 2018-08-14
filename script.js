var menuBall = document.getElementById('menuBall');
var menuDrawer = document.getElementById('menuDrawer');
var menuItems = document.getElementsByClassName('menuItemConatiner');
var lastScrollTop = 0;

window.onload = () => {
  setTimeout( () => {
    menuBall.classList.remove("offScreen");
  }, 700)

  createPortfolioBoxes();
}

var createSpans = num => {
  var spans = "";
  for(i=0; i<num; i++) {
    spans += "<span></span>"
  }
  return spans;
}

menuBall.innerHTML = createSpans(6);

menuBall.addEventListener("click", () => {
  menuBall.classList.toggle("open");
  menuDrawer.classList.toggle("open");
  for(var i=0; i < menuItems.length; i++) {
    menuItems[i].classList.toggle("open");
  }
});


//Create portfolio boxes
var portfolioItems = [
  {
    img: {
      name: "Witwars",
      src: "img/witwars.png"
    },
    tech: ["React-Native"],
    desc: "Mobile application for iOS and Android offering you the chance to compete at hilarity."
  },
  {
    img: {
      name: "Voyager",
      src: "img/voyager.png"
    },
    tech: ["React-Native"],
    desc: "Mobile application for iOS and Android offering you the chance to compete at hilarity."
  },
  {
    img: {
      name: "Witwars Admin",
      src: "img/witwars_admin.png"
    },
    tech: ["React-Native"],
    desc: "Mobile application for iOS and Android offering you the chance to compete at hilarity."
  },
  {
    img: {
      name: "Ottawa Recreation",
      src: "img/ottawa_rec.png"
    },
    tech: ["React-Native"],
    desc: "Mobile application for iOS and Android offering you the chance to compete at hilarity."
  }
]

createPortfolioBoxes = () => {
  const p = document.getElementById("portfolio");
  const pI = portfolioItems;
  for (let i = 0; i < pI.length; i++) {
    let div = document.createElement('div');
    div.className = 'portfolioBox';
    div.innerHTML = `
      <div class="img1stHalf" style="background: url(` + pI[i].img.src + `) 0 0"></div>
      <div class="img2ndHalf" style="background: url(` + pI[i].img.src + `) -125px 0"></div>
      <div class="portfolioInfo">
        <p class="portfolioDesc">` + pI[i].desc + `</p>
        <div class="portfolioTech"></div>
        <button class="portfolioBtn">View More</button>
      </div>
    `
    console.log(div)
    p.appendChild(div);
  }
}

//Portfolio box open animation
let portfolioBoxes;

const openPortfolioBox = (event) => {
  var e = event.target || event.srcElement;

  if (e.classList.contains("portfolioInfo") || e.classList.contains("portfolioDesc") ||
      e.classList.contains("portfolioTech") || e.classList.contains("portfolioBtn")) {
        return null;
  } else {

    if (e.classList.contains("img1stHalf") || e.classList.contains("img2ndHalf")) {
      e = e.parentElement;
    }

    e.children[0].classList.add("open-left");
    e.children[1].classList.add("open-right");
  }
}

const closePortfolioBox = (event) => {
  var e = event.target || event.srcElement;

  if (e.classList.contains("portfolioInfo") || e.classList.contains("portfolioDesc") ||
      e.classList.contains("portfolioTech") || e.classList.contains("portfolioBtn")) {
        return null;
  } else {

    if (e.classList.contains("img1stHalf") || e.classList.contains("img2ndHalf")) {
      e = e.parentElement;
    }

    e.children[0].classList.remove("open-left");
    e.children[1].classList.remove("open-right");
  }
}

setTimeout(() => {
  portfolioBoxes = document.querySelectorAll(".portfolioBox");
  for (var i=0; i < portfolioBoxes.length; i++) {
    portfolioBoxes[i].addEventListener('mouseover', openPortfolioBox)
    portfolioBoxes[i].addEventListener('mouseout', closePortfolioBox)
  }
}, 1000)
