import React from "react";
import "../Styles/AboutUs.css";
import { Link, useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const AboutUs = () => {
  return (
    <>
      <p className="init-para">
        Hi! we are StrawHats. We have created a friend for you who will register
        your complaint, resolve your complaint and update you through a ting
        tong i.e. (Through a message or mail).
      </p>
      <h4 className="text-center heading">
        Here is the brief discription of the team StrawHats!!
      </h4>
      <div className="main-row">
        <div className="row">
          <div className="col-sm card-one">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="..."
                className="card-img-top"
                alt="..."
                height="150px"
              />
              <div className="card-body">
                <h5 className="card-title">Shambhavi Mishra</h5>
                <p className="info-mation">
                  Eslectronics and Communication Engineering
                </p>
                <div className="div-icon">
                  <Link to="https://github.com/AS2409">
                    <GitHubIcon className="icon-col" />
                  </Link>
                  <Link to="https://www.linkedin.com/in/aditi2409/">
                    <LinkedInIcon className="icon-col" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm">
            <div className="col-sm">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src="..."
                  className="card-img-top"
                  alt="..."
                  height="150px"
                />
                <div className="card-body">
                  <h5 className="card-title">Aditi Sonkar</h5>
                  <p className="card-text info">
                    Electronics and Communication Engineering
                  </p>
                  <div className="div-icon">
                    <Link to="https://github.com/AS2409">
                      <GitHubIcon className="icon-col" />
                    </Link>
                    <Link to="https://www.linkedin.com/in/aditi2409/">
                      <LinkedInIcon className="icon-col" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm">
            <div className="col-sm">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src="..."
                  className="card-img-top"
                  alt="..."
                  height="150px"
                />
                <div className="card-body">
                  <h5 className="card-title">Shrestha Katiyar</h5>
                  <p className="card-text info">
                    Electronics and Communication Engineering
                  </p>
                  <div className="div-icon">
                    <Link to="https://github.com/AS2409">
                      <GitHubIcon className="icon-col" />
                    </Link>
                    <Link to="https://www.linkedin.com/in/aditi2409/">
                      <LinkedInIcon className="icon-col" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
