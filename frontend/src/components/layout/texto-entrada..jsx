  import styles from '../../styles/texto-entrada.module.css';


export default function TextoEntrada() {
  return (
    <div>
        <div className={styles.container}>
          <div className={styles.mainContent}>
            <div className={styles.section}>
              <h2>Para Produtores</h2>
              <p>Cadastre sua fazenda e cargas de café para conectar-se com compradores interessados. Gerencie vendas e transações de forma fácil e eficiente.</p>
            </div>
            <div className={styles.section}>
              <h2>Para Compradores</h2>
              <p>Encontre e invista nas melhores safras de café. Explore fazendas, analise lotes e faça transações com total transparência.</p> 
            </div>
            <div className={styles.section}>
              <h2>Junte-se a Nós</h2>
              <p>Conectamos produtores e compradores de forma justa, promovendo o crescimento sustentável do mercado de café.</p>
            </div>
          </div>
        </div>
      </div>
  );
}


