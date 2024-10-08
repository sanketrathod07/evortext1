import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeroCover from '../../assets/images/homeImages/homeImg4.jpg'
import "./landing.css"
import { ResetLocation } from "../../helpers/ResetLocation";

const Landing = ({ changeCategory }) => {
  useEffect(() => {
    document.title = "Shopping Time";
  }, []);
  return (
    <main className="landing">
      <article className="hero">
        <h2>Where Style Meets <span>Comfort!</span></h2>
        <img src={HeroCover} aria-hidden="true" alt="" />
      </article>
      <article className="grid">
        <section className="grid-one">
          <Link
            to={`/store/men`}
            className="custom-btn grid-button"
            onClick={() => {
              changeCategory("men");
              ResetLocation();
            }}
          >
            <span>Men</span>
          </Link>
        </section>
        <section to="" className="grid-two">
          <Link
            to={`/store/jeans`}
            onClick={() => {
              changeCategory("jeans");
              ResetLocation();
            }}
            className="custom-btn grid-button"
          >
            <span> Jeans</span>
          </Link>
        </section>
        <section to="" className="grid-three">
          <Link
            to={`/store/shoes`}
            onClick={() => {
              changeCategory("shoes");
              ResetLocation();
            }}
            className=" custom-btn grid-button"
          >
            <span> Shoes</span>
          </Link>
        </section>
        <section to="" className="grid-four">
          <Link
            to={`/store/dresses`}
            onClick={() => {
              changeCategory("dresses");
              ResetLocation();
            }}
            className="custom-btn grid-button"
          >
            <span>Dresses</span>
          </Link>
        </section>
        <section className="grid-five">
          <Link
            to={`/store/all`}
            onClick={() => {
              changeCategory("");
              ResetLocation();
            }}
            className="custom-btn grid-button"
          >
            <span>Store</span>
          </Link>
        </section>
      </article>
    </main>
  );
}


export default Landing;