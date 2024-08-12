import React from "react";

const Nav = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-dark" id="abcd">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <span id="pollspan">Poll-</span>
            <span id="easespan">Ease</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto  my-lg-0 navbar-nav-scroll list justify-content-center">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
