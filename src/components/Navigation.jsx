import React from "react";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GetPage from "./GetPage";
import CalculatePage from "./CalculatePage";

// const Navigation = () => {
//   return (
//     <>
//       <div>
//         <h1>CS361 - Cypto Tracker</h1>
//         <br />
//         <ul>
//           <li>
//             {/* Endpoint to route to Home component */}
//             <Link to="src/components/GetPage.jsx">
//               Home
//             </Link>
//           </li>
//           <li>
//             {/* Endpoint to route to About component */}
//             <Link to="/getPage">
//               About
//             </Link>
//           </li>
//           <li>
//             {/* Endpoint to route to Contact Us component */}
//             <Link to="/calculatePage">
//               Contact Us
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

const Navigation = () => {
  return (
    <>
      <div>
        <h1>CS361 - Crypto Tracker</h1>
      </div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Crypto Tracker</Navbar.Brand>
          <br />
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Users/gabrielvalenzuela/Desktop/cs361-app/src/components/GetPage.jsx">
                {" "}
                Get Cypto Price{GetPage}
              </Nav.Link>
              <br />
              <Nav.Link href="/Users/gabrielvalenzuela/Desktop/cs361-app/src/components/CalculatePage.jsx">
                {" "}
                Calculator{CalculatePage}
              </Nav.Link>
              <br />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );

};


export default Navigation;
