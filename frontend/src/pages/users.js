import React, {Component} from "react"
import Main from "../components/Main"

export default function Users() {
    return (
      <Main icone="fa fa-users" title="Usuários" subtitle="Gerenciamento de Usuários">
        <div className="display-4">Lista de Usuários</div>
        <hr />
        <p className="mb-0">
          Aqui você pode gerenciar os usuários do sistema.
        </p>
      </Main>
    );
  }