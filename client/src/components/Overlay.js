import React from "react";
import { connect } from "react-redux";
import { useRef, useEffect } from "react";
import { showSlideMenu } from "../actions";
// eslint-disable-next-line
import css from "../css/overlay.css";

const Overlay = ({ openOrClosed, showSlideMenu }) => {
  const open = () => {
    document.body.classList.toggle("open");
  };

  const ref = useRef(null);

  useEffect(() => {
    ref.current.addEventListener("click", () => {
      showSlideMenu();
      open();
    });
    // eslint-disable-next-line
  }, []);

  const toggleMenu = () => {
    if (openOrClosed) {
      return "overlay";
    } else {
      return "";
    }
  };

  const toggle = toggleMenu();

  return <div ref={ref} className={toggle}></div>;
};

const mapStateToProps = (state) => {
  return {
    openOrClosed: state.openOrClosed,
  };
};

export default connect(mapStateToProps, {
  showSlideMenu,
})(Overlay);
