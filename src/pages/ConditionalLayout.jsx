import React from "react";
import { useLocation } from "react-router-dom";
import { Footer, Navbar } from "../components";

const ConditionalLayout = ({ children }) => {
  const location = useLocation();

  const hideNavbarPaths = ["/apartments/:id", "/wishlist"];
  const hideFooterPaths = ["/wishlist"];

  const pathMatches = (pathsArray) => {
    return pathsArray.some((path) => {
      const regex = new RegExp("^" + path.replace(":id", "\\d+") + "$");
      return regex.test(location.pathname);
    });
  };

  const shouldHideNavbar = pathMatches(hideNavbarPaths);
  const shouldHideFooter = pathMatches(hideFooterPaths);

  return (
    <div className="[&_*]:font-montserrat">
      {!shouldHideNavbar && <Navbar />}
      {children}
      {/* {!shouldHideFooter && <Footer />} */}
    </div>
  );
};

export default ConditionalLayout;
