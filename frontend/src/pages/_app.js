import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Nav from '../components/Nav';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <Logo />
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
