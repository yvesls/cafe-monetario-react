import CompraForm from "../components/forms/CompraForm";
import Main from "../components/Main";

export async function getServerSideProps(context) {
    const { codigoProdutor } = context.query;
    return {
      props: { 
        codigoProdutor: codigoProdutor
      },
    };
  }

export default function Compra({ codigoProdutor }) {
    
  return (
    <Main
      icone="fa fa-shopping-cart"
      title="Compras de saca de café"
      subtitle="Compre aqui sua saca de café! Selecione o comprador e a quantidade desejada para concluir sua compra."
    >
      <CompraForm codigoProdutor={codigoProdutor} />
    </Main>
  );
}
