import React from "react";
import Navbar from "./Navbar/index";
import HeroSection from "./HeroSection/index";
import InfoSection from "./InfoSection/index";
import Services from "./Services/index";
import { homeObjOne, homeObjTwo, homeObjThree } from "./InfoSection/Data";
function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <Services />
      <InfoSection {...homeObjThree} />
    </div>
  );
}

export default Layout;
