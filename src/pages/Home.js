import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        <div>
          <img
            src="https://www.capecrystalbrands.com/cdn/shop/articles/the-latest-modernist-cooking-techniques-496899.jpg?v=1699238453"
            alt="Image1"
          />
          <a href="#" className="button">
            <Link to="/register">Register</Link>
          </a>
        </div>
        <div>
          <img
            src="https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M="
            alt="Image2"
          />
          <a href="#" className="button">
            <Link to="/register">Register</Link>
          </a>
        </div>
        <div>
          <img
            src="https://www.foodiv.com/wp-content/uploads/2023/06/online-ordering-business.jpg"
            alt="Image3"
          />
          <a href="#" className="button">
            <Link to="/register">Register</Link>
          </a>{" "}
        </div>
      </Carousel>
      <h2>Welcome to the Chef Freelance Platform</h2>
      <p>Discover amazing chefs and personalized culinary experiences.</p>
    </div>
  );
};

export default Home;
