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
    }
  },
  {
    img: {
      name: "Witwars Admin",
      src: "img/witwars_admin.png"
    }
  },
  {
    img: {
      name: "Ottawa Recreation",
      src: "img/ottawa_rec.png"
    }
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
      <div class="img2ndHalf" style="background: url(` + pI[i].img.src + `) -125px 0">
    `
    p.appendChild(div);
  }
}

//Portfolio box open animation

const openPortfolioBox = (i) => {
  let c = portfolioBoxes[i].children;
  for (let i = 0; i < c.length; i++) {
    c.classList.add("reveal");
  }
}

setTimeout(() => {
  var portfolioBoxes = document.getElementsByClassName("portfolioBox");

  console.log(portfolioBoxes.length)

  for (var i=0; i < portfolioBoxes.length; i++) {
    console.log(portfolioBoxes[i])
    portfolioBoxes[i].addEventListener('mouseover', openPortfolioBox(i));
  }
}, 1000)
