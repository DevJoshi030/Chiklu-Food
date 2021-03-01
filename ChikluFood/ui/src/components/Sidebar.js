import React from "react";
import { FaTimes } from "react-icons/fa";

const Sidebar = () => {
  return (
    <>
      <div id="closeicon">
        <FaTimes />
        <div class="navcat">
          <ul>
            <li>
              <a href="">Pasta</a>
            </li>
            <li>
              <a href="">Pizza</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
