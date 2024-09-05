import Main from "../components/Main";
import TextoEntrada from "../components/layout/texto-entrada.";

export default function Home() {
  return (
    <Main
      icone="fa fa-home"
      title="Início"
      subtitle="Café Monetário"
    >
      <div className="display-4">Bem-vindo ao Café Monetário</div>
      <hr />
      <TextoEntrada></TextoEntrada>
    </Main>
  );
}
