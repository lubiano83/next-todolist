"use client";
import React from "react";
import Image from "next/image";
import MenuList from "./MenuList";
import { useShow } from "../../hooks/useShow";

const Menu = ({ isDarkMode }) => {

  const {show, handleShow} = useShow();

  return (
    <div onClick={ handleShow }>
      <Image
        src={"/menu-svgrepo-com.svg"}
        alt="menu logo"
        height={40}
        width={40}
        className="hover:scale-110 cursor-pointer"
      />
      <MenuList handleShow={ handleShow } show={ show } isDarkMode={isDarkMode} />
    </div>
  );
}; export default Menu;