import React from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <div>
        <header class="header">
          <div class="header_content">
            <nav>
              <div class="logo">
                <p class="agency">e menu by Chiklu</p>
                <h4 class="title">Burger Kingdom</h4>
              </div>
              
                <div id="navicon">
                  <FaBars />
                </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
