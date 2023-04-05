import React from "react";
import { LatestNews } from "./LatestNews";

// import

export const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="wrapper-hero">
          <div className="wrapper-img">
            <img src="" alt="" className="img-hiro" />
          </div>
          <div className="wrapper-info">
            <div>
              <h1>Pharmaceuticals</h1>
              <h2>A Sure Way To Get Rid Of Your Back Ache Problem</h2> <p></p>
              <p>
                If you have tried everything, but still seem to suffer from
                snoring, don’t give up. Before turning to surgery, consider
                shopping for anti-snore devices. These products do not typically
                require a prescription, are economically priced and may just be
                the answer that you are looking for. However, as is the case
                when shopping for anything, there are a lot of anti-snore
                devices out there and…
              </p>
            </div>
            <div>
              <p>28 Feb 2021</p>
              <p>Jim Sullivan</p>
            </div>
            <div>
              <img src="" alt="" />
              <p>6 min read</p>
            </div>
          </div>
        </div>
        <LatestNews />
      </div>
    </section>
  );
};
