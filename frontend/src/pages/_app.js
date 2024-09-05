import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from '../components/layout/Logo';
import Nav from '../components/layout/Nav';
import "../styles/forms.css";
import '../styles/global.css';
import "../styles/tabela.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <Logo />
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}
