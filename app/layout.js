

import "@styles/globals.css";
import "font-awesome/css/font-awesome.min.css";
import Nav from "@components/nav/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";

export const metadata = {
  title: "rp-portfolio",
  description: "Roman Potachenski photo portfolio",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/assets/icons/favicon.ico" />
      </head>
      <body>
        <Nav />
        <Provider>{children}</Provider>
        <Footer />
      </body>
    </html>
  );
}
