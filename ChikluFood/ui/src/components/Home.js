import React, { Fragment, useEffect, useState, useRef } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";



const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

  let myRef = useRef(null)
  var owlcategory = [];


  // const executeScroll = () => scrollToRef(myRef)
  const executeScroll = () => {
    console.log("Clicked");
    // let xyz = document.getElementsByClassName('catname').innerHTML;
    var x = document.getElementsByClassName("catname1")[0].innerText;
    // document.getElementsByClassName("demo").innerHTML = x;  
    console.log(x);
    scrollToRef(myRef);
    console.log(myRef);
  };


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
    // let category = [];


    Object.keys(menus).forEach(function (key) {
      // category.push(key);
      // console.log(category);
    
      // for(var i=0; i<category.length; i++){
      //   if (category[i] === "Burger"){
      //     console.log("Hii");
      //   }
      // }
      console.log(key)

      final.push(
        <div class="categorytitle" ref={myRef} id={key}>
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
                <p class="title">{menu.item}</p>
                <p class="desc">{menu.item_desc}</p>
                <div class="price">
                  <p class="rs">Rs. 90</p>
                  <div
                    class="addtodish checkout"
                    onClick={() => localStorage.setItem("hehje", "dwhjdhwj")}
                  >
                    <p class="">ADD TO DISH</p>
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

                <div class="cat" onClick = {executeScroll}>
                <div class="catimg">
                  <img src="/static/images/hamburger.svg" alt="hamburger" />
                </div>
                <p class="catname1">Burger</p>
              </div>
              <div class="cat" onClick = {executeScroll}>
                <div class="catimg">
                  <img src="/static/images/pizza.svg" alt="hamburger" />
                </div>
                <p class="catname">Kathiyawadi</p>
              </div>
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
              2 Items{" "}
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
