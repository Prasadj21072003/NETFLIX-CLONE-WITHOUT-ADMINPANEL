import React, { useState } from "react";

import "./list.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Listitems from "../listitems/Listitems";
import { useRef } from "react";

export default function List(list) {
  const refelement = useRef();

  const [ismoved, setismoved] = useState(0);
  const [leftbutton, setleftbutton] = useState(false);

  const handleclick = (direction) => {
    const distance = refelement.current.getBoundingClientRect().x - 50;

    if (direction === "left" && ismoved > 0) {
      console.log("left");
      setismoved(ismoved - 1);
      refelement.current.style.transform = `translateX(${distance + 230}px)`;
    } else if (direction === "right" && ismoved < 7) {
      setismoved(ismoved + 1);
      setleftbutton(true);
      console.log("right");
      refelement.current.style.transform = `translateX(${distance - 230}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listtitle">{list.list.title}</span>
      <div className="wrapper">
        <ArrowBackIosIcon
          className="arrows left"
          onClick={() => handleclick("left")}
          style={{ display: !leftbutton && "none" }}
        />
        <div className="container" ref={refelement}>
          {list.list.content.map((item, i) => (
            <Listitems item={item} key={i} />
          ))}
        </div>
        <ArrowForwardIosIcon
          className="arrows right"
          onClick={() => handleclick("right")}
        />
      </div>
    </div>
  );
}
