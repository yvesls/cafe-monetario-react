import Main from '../components/Main';

export default function Home() {
  return (
    <Main icone="fa fa-home" title="Início" subtitle="Bem-vindo ao projeto Next.js">
      <div className="display-4">Bem-vindo</div>
      <hr />
      <p className="mb-0">
        Sistema para exemplificar a construção de um cadastro desenvolvido em Next.js
      </p>
    </Main>
  );
}
