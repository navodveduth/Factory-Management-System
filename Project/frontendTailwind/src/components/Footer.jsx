import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24">
      <p className="dark:text-gray-200 text-gray-700 text-center m-20 capitalize">
        © {currentYear} All rights reserved by Y2_S2_WD_IT_02-WD_B02_ITP_14.
      </p>
    </footer>
  );
};

export default Footer;
