import "../styles/globals.css";
import 'tailwindcss/tailwind.css'

import Head from "next/head";
import "../styles/globals.css"; 



//INTERNAL IMPORT
import { TrackingProvider } from "../Conetxt/Tracking";
import {NavBar, Footer} from "../Components"

export default function App({ Component, pageProps }) {
  return (
    <>
    <TrackingProvider>
    <NavBar/>
    <Component {...pageProps} />
    <Footer/>
    </TrackingProvider>
    </>
  );
  
}
