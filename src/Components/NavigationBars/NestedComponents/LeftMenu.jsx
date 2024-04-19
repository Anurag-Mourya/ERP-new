import React from 'react'
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import { RiNotification3Line } from "react-icons/ri";
import { TfiMore } from "react-icons/tfi";
import { IoHelp } from "react-icons/io5";

const LeftMenu = () => {
  return (
    <>
        <div id="leftfixedbar">
          <ul>
            <li>
              <Link to={"/"}>
                <HiOutlineHome />
              </Link>
              Home
            </li>
            <li>
              <Link to={"/"}>
                <RiNotification3Line />
              </Link>
              Bell
            </li>
            <li>
              <Link to={"/"}>
                <TfiMore />
              </Link>
              More
            </li>
          </ul>
          <ul>
            <li id="helpico">
              <Link to={"/"}>
                <IoHelp />
              </Link>
              Help
            </li>
          </ul>
        </div>
    </>
  )
}

export default LeftMenu
