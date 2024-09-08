import CompraForm from "../components/forms/CompraForm";
import Main from "../components/Main";

export async function getServerSideProps(context) {
    const { nomeFazenda } = context.query;
    return {
      props: { nomeFazenda }, 
    };
  }

export default function Compra({nomeFazenda}) {
    
  return (
    <Main
      icone="fa fa-shopping-cart"
      title="Compras de saca de café"
      subtitle="Compre aqui sua saca de café! Selecione o comprador e a quantidade desejada para concluir sua compra."
    >
      <CompraForm nomeFazenda={nomeFazenda} />
    </Main>
  );
}
