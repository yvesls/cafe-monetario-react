import CompraForm from "../components/forms/CompraForm";
import Main from "../components/Main";

export async function getServerSideProps(context) {
    const { nomeProdutor, precoUnitario, codigo } = context.query;
    return {
      props: { 
        nomeProdutor: nomeProdutor || "",
        precoUnitario: precoUnitario || 0,
        codigo: codigo || "",
      },
    };
  }

export default function Compra({ nomeProdutor, precoUnitario, codigo }) {
    
  return (
    <Main
      icone="fa fa-shopping-cart"
      title="Compras de saca de café"
      subtitle="Compre aqui sua saca de café! Selecione o comprador e a quantidade desejada para concluir sua compra."
    >
      <CompraForm nomeProdutor={nomeProdutor} precoUnitario={precoUnitario} codigo={codigo} />
    </Main>
  );
}
