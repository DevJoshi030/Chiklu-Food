import React, { Fragment, useEffect, useState, useRef } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { Link as LinkS } from "react-scroll";
import $ from "jquery";


const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  // ******************************************************************************************

  // Save data in Localstorage
  if (localStorage.getItem("checkout") == null) {
    var checkout = {};
  } else {
    checkout = JSON.parse(localStorage.getItem("checkout"));
    // console.log( document.getElementById('checkout').innerHTML);
    if (document.getElementById("checkout")) {
      document.getElementById("checkout").innerHTML = Object.keys(
        checkout
      ).length;
    }
    // updateChekout(checkout);
  }

  function called(id) {
    console.log(id);
    var idstr = id.toString();
    // console.log(idstr);
    if (checkout[idstr] != undefined) {
      checkout[idstr] = checkout[idstr] + 1;
      console.log("hello " + id);
      console.log(document.getElementById(id).innerHTML);
    } else {
      checkout[idstr] = 1;
    }
    console.log(checkout);
    localStorage.setItem("checkout", JSON.stringify(checkout));
    document.getElementById("checkout").innerHTML = Object.keys(
      checkout
    ).length;
    updateChekout(checkout);
  }

  function updateChekout(checkout) {
    var sum = 0;
    for (var item in checkout) {
      console.log(item);
      sum = sum + checkout[item];
      if (checkout[item][0] !== 0)
        if (document.getElementById(item)) {
          document.getElementById(
            item
          ).innerHTML = `<button id='minus${item}' class='minus'>-</button><span id='val${item}'>${checkout[item]}</span><button id='plus${item}' class='plus'>+</button>`;
        }
    }
    localStorage.setItem("checkout", JSON.stringify(checkout));
    document.getElementById("checkout").innerHTML = sum;
  }
  document.addEventListener("DOMContentLoaded", () => {
  // When we click on plus or minus button navigate value
  $(".addtodish").on("click", ".minus", function () {
    console.log("hiiii");
    a = this.id.slice(7);
    console.log(a);
    checkout["pr" + a][0] = checkout["pr" + a][0] - 1;
    checkout["pr" + a][0] = Math.max(0, checkout["pr" + a][0]);
    document.getElementById("valpr" + a).innerHTML = checkout["pr" + a][0];
    let count = document.getElementById(`valpr${a}`).textContent;
    let price = document.getElementById(`pricepr${a}`);
    updateChekout(checkout);
    if (count === "0") {
      document.getElementById(
        "divpr" + a
      ).innerHTML = `<button id="pr${a}" class="checkout" >ADD</button>`;
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
});

  // ****************************************************************************************
  const toggle = () => {
    setIsOpen(!isOpen);
    // console.log("dwadwa");
  };

  const [menus, setMenus] = useState({});

  useEffect(async () => {
    await fetch(`/api/menu/${props.match.params.Restname}/`)
      .then((res) => res.json())
      .then((data) => setMenus(data));
  }, []);

  const generate = () => {
    let final = [];
    let category = [];

    Object.keys(menus).forEach(function (key) {
      category.push(key);
      // console.log(category);

      for (var i = 0; i < category.length; i++) {
        if (category[i] === "Burger") {
          // console.log("Hii");
        }
      }
      // console.log(key);

      final.push(
        <div class="categorytitle" id={key}>
          <p>{key}</p>
        </div>
      );
      menus[key].map((menu) =>
        final.push(
          <Fragment>
            <div class="item">
              <div class="itemimg">
                <img src={menu.item_image} alt="burger" />
              </div>
              <div class="itemdesc">
                <p class="title" id="name">
                  {menu.item}
                </p>
                <p class="desc">{menu.item_desc}</p>
                <div class="price">
                  <p class="rs" id="price">
                    Rs. 90
                  </p>
                  <div id={`divpr${menu.id}`} class="addtodish">
                    <p
                      id={`pr${menu.id}`}
                      class="checkout"
                      onClick={() => called(`divpr${menu.id}`)}
                    >
                      ADD TO DISH
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="horizontal">
              <hr />
            </div>
          </Fragment>
        )
      );
    });

    // menus.map((menu) => {
    //   final.push(
    //     <Fragment>
    //       <div class="categorytitle">
    //         <p id="burger">{menu.category}</p>
    //       </div>
    //       <div class="item">
    //         <div class="itemimg">
    //           <img src={menu.item_image} alt="burger" />
    //         </div>
    //         <div class="itemdesc">
    //           <p class="title">{menu.item}</p>
    //           <p class="desc">{menu.item_desc}</p>
    //           <div class="price">
    //             <p class="rs">Rs. 90</p>
    //             <div class="addtodish checkout">
    //               <p class="">ADD TO DISH</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div class="horizontal">
    //         <hr />
    //       </div>
    //     </Fragment>
    //   );
    // });
    return final;
  };
  return (
    <div>
      {/* Nav-bar Section */}
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />

      {/* main container */}
      <div class="container">
        <div class="container_content">
          {/* Search Section */}
          <div class="searchbar">
            <div class="search">
              <span>
                <input type="text" placeholder="Search here..." />
                <div class="searchicon">
                  <img
                    src="/static/images/loupe.svg"
                    alt="search"
                    class="icon"
                  />
                </div>
              </span>
            </div>
            <div class="tableno">
              <p>Table No 1</p>
            </div>
          </div>
          {/* Carousel Category section */}
          <div class="category">
            <span class="carousel owl-carousel">
              <a href="#Burger">
                <div class="cat">
                  <div class="catimg">
                    <img src="/static/images/hamburger.svg" alt="hamburger" />
                  </div>
                  <p class="catname1" to="Burger">
                    Burger
                  </p>
                </div>
              </a>
              <a href="#Kathiyawadi">
                <div class="cat">
                  <div class="catimg">
                    <img src="/static/images/pizza.svg" alt="hamburger" />
                  </div>
                  <p class="catname">Kathiyawadi</p>
                </div>
              </a>
            </span>
          </div>
          {/* Menu Category with Menu Listing */}
          <div class="menu">
            <div class="productslist">{menus !== {} ? generate() : null}</div>
          </div>
        </div>
      </div>
      {/* Checkout Fixed Footer */}
      <footer class="footer">
        <div class="footer_content">
          <div class="foot_left">
            <p class="total_qty">
              <span id="checkout">0</span> Items{" "}
              <span>
                <small>In Dish</small>
              </span>
            </p>
            <p class="totalrs">Total : 560 Rs.</p>
          </div>
          <div class="foot_right">
            <span class="checkout">
              <p>CHECKOUT</p>
              <div class="check_btn">
                <img src="/static/images/rightarrow.svg" alt="" />
              </div>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
