$(".carousel").owlCarousel({
  stagePadding: 20,
  loop: true,
  autoplay: false,
  margin: 0,
  // autoplayTimeout:3000,
  // autoplayHoverPause: true,
  // responsiveClass:true,
  responsive: {
    0: {
      items: 2,
      nav: false,
    },
    480: {
      items: 3,
      nav: false,
    },
    1024: {
      items: 5,
      nav: false,
    },
  },
});

// Save data in Localstorage
if (localStorage.getItem("checkout") == null) {
  var checkout = {};
} else {
  checkout = JSON.parse(localStorage.getItem("checkout"));
  updateChekout(checkout);
}
// When you click on button checkout add chekout cart
$(".divpr").on("click", "button.checkout", function () {
  totalbill = 0;
  var idstr = this.id.toString();
  console.log(idstr);
  if (checkout[idstr] != undefined) {
    qty = checkout[idstr][0] + 1;
    name = document.getElementById("name" + idstr).innerHTML;
    price = document.getElementById("price" + idstr).innerHTML;
    checkout[idstr] = [qty, name, price];
  } else {
    qty = 1;
    name = document.getElementById("name" + idstr).innerHTML;
    price = document.getElementById("price" + idstr).innerHTML;

    checkout[idstr] = [qty, name, price];
  }
  updateChekout(checkout);
  console.log(checkout);
});
// + or - buttons create
function updateChekout(checkout) {
  var sum = 0;
  for (var item in checkout) {
    sum = sum + checkout[item][0];
    if (checkout[item][0] !== 0)
      document.getElementById(
        "div" + item
      ).innerHTML = `<button id='minus${item}' class='btn btn-primary minus'>-</button><span id='val${item}'>${checkout[item][0]}</span><button id='plus${item}' class='btn btn-primary plus'>+</button>`;
  }
  localStorage.setItem("checkout", JSON.stringify(checkout));
  document.getElementById("checkout").innerHTML = sum;
}
// When we click on plus or minus button navigate value
$(".divpr").on("click", "button.minus", function () {
  a = this.id.slice(7);
  checkout["pr" + a][0] = checkout["pr" + a][0] - 1;
  checkout["pr" + a][0] = Math.max(0, checkout["pr" + a][0]);
  document.getElementById("valpr" + a).innerHTML = checkout["pr" + a][0];
  let count = document.getElementById(`valpr${a}`).textContent;
  let price = document.getElementById(`pricepr${a}`);
  updateChekout(checkout);
  if (count === "0") {
    document.getElementById(
      "divpr" + a
    ).innerHTML = `<button id="pr${a}" class="btn btn-primary checkout" >ADD</button>`;
    localStorage.clear();
  }
});
$(".divpr").on("click", "button.plus", function () {
  a = this.id.slice(6);
  checkout["pr" + a][0] = checkout["pr" + a][0] + 1;
  document.getElementById("valpr" + a).innerHTML = checkout["pr" + a][0];
  let price = document.getElementById(`pricepr${a}`);
  updateChekout(checkout);
});
