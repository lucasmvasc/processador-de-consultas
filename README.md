# SQL Parser

This project translates SQL to relational algebra and works in the following order:

1. Receive a SQL query
2. Validate the query (lexically and syntactically) using the schema below
3. Convert the query to relational algebra

## Schema
```js
// keys = tables && values = attributes
{
  Usuario: ["idUsuario", "Nome", "Logradouro", "Número", "Bairro", "CEP", "UF", "DataNascimento"],
  Contas: ["idConta", "Descricao", "TipoConta_idTipoConta", "Usuario_idUsuario", "SaldoInicial"],
  Movimentacao: ["idMovimentacao", "DataMovimentacao", "Descricao", "TipoMovimento_idTipoMovimento", "Categoria_idCategoria", "Contas_idConta", "Valor"],
  TipoConta: ["idTipoConta", "Descricao"],
  TipoMovimento: ["idTipoMovimento", "DescMovimentacao"],
  Categoria: ["idCategoria", "DescCategoria"]
}
```

## Demonstration
https://user-images.githubusercontent.com/54288190/139445969-1e085f7c-0da1-4252-9c7d-3a76a1b82758.mp4


## How to run?
  1. Clone or download the project
  2. Run `cd database`
  3. Run `npm install`
  4. Run `npm start`
  5. Open http://localhost:3000 in your browser
