import React, { FC } from "react";
import { LatestNews } from "./LatestNews";

import imgHero from "../../../../img/img_hero.jpg";
import iconClock from "../../../../img/sprite.svg";

export const Hero: FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="wrapper-hero">
          <div className="wrapper-content">
            <div className="wrapper-img">
              <img src={imgHero} alt="" className="img-hero" />
            </div>
            <div className="wrapper-info">
              <h1 className="header-hero">Pharmaceuticals</h1>
              <h2 className="subHeader-hero">
                A Sure Way To Get Rid Of Your Back Ache Problem
              </h2>
              <p className="text-hero">
                If you have tried everything, but still seem to suffer from
                snoring, don’t give up. Before turning to surgery, consider
                shopping for anti-snore devices. These products do not typically
                require a prescription, are economically priced and may just be
                the answer that you are looking for. However, as is the case
                when shopping for anything, there are a lot of anti-snore
                devices out there and…
              </p>
              <div>
                <div className="wrapper-data-hero">
                  <p className="date-info-hero">28 Feb 2021</p>
                  <p className="user-info-hero">Jim Sullivan</p>
                </div>
                <div className="wrapper-time-hero">
                  <svg className="icon-time-hero">
                    <use href={`${iconClock}#icon_clock`}></use>
                  </svg>
                  <p className="text-time-hero">6 min read</p>
                </div>
              </div>
            </div>
          </div>

          <LatestNews />
        </div>
      </div>
    </section>
  );
};
