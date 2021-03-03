import React, { Fragment, useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { Link as LinkS } from "react-scroll";

const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [menus, setMenus] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("menu"))
      localStorage.setItem("menu", JSON.stringify({}));
  }, []);

  const called = (id, name, price) => {
    let item = [id, name, price];

    let menu = JSON.parse(localStorage.getItem("menu"));
    if (!menu[id]) {
      item.push(1);
      menu[id] = item;
    } else menu[id] = item;

    localStorage.setItem("menu", JSON.stringify(menu));
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(async () => {
    await fetch(`/api/menu/${props.match.params.Restname}/`)
      .then((res) => res.json())
      .then((data) => setMenus(data));
  }, []);

  const handlePlusMinus = (id, op) => {
    let menu = JSON.parse(localStorage.getItem("menu"));
    let item = menu[id];
    let qty = item.pop();
    if (op === "-" && qty === 1) {
      delete menu[id];
    } else if (op === "-") {
      item.push(qty - 1);
      menu[id] = item;
    } else {
      item.push(qty + 1);
      menu[id] = item;
    }
    localStorage.setItem("menu", JSON.stringify(menu));
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const generateAddDish = (id, name, price) => {
    let menu = JSON.parse(localStorage.getItem("menu"));
    // setRefresh((prevRefresh) => !prevRefresh);

    if (menu[id]) {
      return (
        <>
          <button class="minus" onClick={() => handlePlusMinus(id, "-")}>
            -
          </button>
          <span>{menu[id][3]}</span>
          <button class="plus" onClick={() => handlePlusMinus(id, "+")}>
            +
          </button>
        </>
      );
    }
    return (
      <div id={id} class="addtodish">
        <p id={id} class="checkout" onClick={() => called(id, name, price)}>
          ADD TO DISH
        </p>
      </div>
    );
  };

  const generate = () => {
    let final = [];
    let category = [];

    Object.keys(menus).forEach(function (key) {
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
                  {generateAddDish(menu.id, menu.item, menu.id)}
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
