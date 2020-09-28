import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./NotFound.module.css"

const NotFound = () => {
  return (
      <div className={style.bg_purple}>
        <div className={style.stars}>
                  <div className={style.central_body}>
                      <Image className={style.image-404} src="http://salehriaz.com/404Page/img/404.svg" width="300px" />
                      <Link to="/" href="http://salehriaz.com/404Page/404.html" className={style.btn_go_home}>Домой</Link>
                  </div>
                  <div className={style.objects}>
                        <Image className={style.object_rocket} src="http://salehriaz.com/404Page/img/rocket.svg" width="40px"/>
                        <div className={style.earth_moon}>
                            <Image className={style.object_earth} src="http://salehriaz.com/404Page/img/earth.svg" width="100px"/>
                            <Image className={style.object_moon} src="http://salehriaz.com/404Page/img/moon.svg" width="80px"/>
                        </div>
                        <div className={style.box_astronaut}>
                            <Image className={style.object_astronaut} src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px"/>
                        </div>
                  </div>
                  <div className={style.glowing_stars}>
                      <div className={style.star}></div>
                      <div className={style.star}></div>
                      <div className={style.star}></div>
                      <div className={style.star}></div>
                      <div className={style.star}></div>
                  </div>
        </div>
      </div>
  );
};

export default NotFound;
