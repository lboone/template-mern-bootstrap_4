import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Dev Connector
    </footer>
  );
};

export default Footer;
