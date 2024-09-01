import Link from 'next/link';
import styles from '../styles/Navegador.module.css';

export default function Navegador({ destino, texto, icone }) {
  return (
    <Link href={destino} legacyBehavior>
      <a className={styles.navegador}>
        <i className={icone}></i> {texto}
      </a>
    </Link>
  );
}
