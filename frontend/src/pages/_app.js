import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from '../components/layout/Logo';
import Nav from '../components/layout/Nav';
import "../styles/forms.css";
import '../styles/global.css';
import "../styles/tabela.css";
import { ModalProvider } from '../core/service/ModalService';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <ModalProvider>
        <Logo />
        <Nav />
        <Component {...pageProps} />
        <div id="modal-root"></div>
      </ModalProvider>
    </div>
  );
}
