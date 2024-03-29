import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'

const NotFound: React.FC = () => {
  return (
    <div className="bg_purple">
      <div className="stars">
        <div className="central_body">
          <Image
            className="image-404"
            src="http://salehriaz.com/404Page/img/404.svg"
            width="300px"
            alt="404"
          />
          <Link
            className="btn_go_home"
            to="/home"
          >
            Домой
          </Link>
        </div>
        <div className="objects">
          <Image
            className="object_rocket"
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
            alt="Ракета"
          />
          <div className="earth_moon">
            <Image
              className="object_earth"
              src="http://salehriaz.com/404Page/img/earth.svg"
              width="100px"
              alt="Земля"
            />
            <Image
              className="object_moon"
              src="http://salehriaz.com/404Page/img/moon.svg"
              width="80px"
              alt="Луна"
            />
          </div>
          <div className="box_astronaut">
            <Image
              className="object_astronaut"
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              width="140px"
              alt="Космонавт"
            />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
