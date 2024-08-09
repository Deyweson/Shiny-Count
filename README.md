# Shiny Count

## Descrição

**shiny-count** é um aplicativo desenvolvido com Electron, React e TypeScript, projetado para gerenciar contadores de shiny hunt em Pokémon. O software permite que os usuários criem e gerenciem contadores específicos para Pokémon, facilitando o acompanhamento de shiny hunts.

## Funcionalidades

- **Criação de Contadores:** Usuários podem criar contadores para diferentes Pokémon.
- **Seleção de Pokémon:** É possível selecionar um Pokémon da primeira geração para associar ao contador.
- **Contagem:** Usuários podem iniciar a contagem clicando no Pokémon selecionado.
- **Gerenciamento:** Visualize e gerencie contadores ativos e completos.

## Tecnologias Utilizadas

- **Electron:** Para a construção do aplicativo desktop.
- **React:** Para a interface do usuário.
- **TypeScript:** Para um desenvolvimento mais seguro e robusto.
- **SQLite3:** Para gerenciamento e armazenamento dos dados.

## TODO
---
### Configurar Projeto
- [x] Configurar Electron com React e TypeScript.
### Configurar Banco de Dados
- [x] Escolher um sistema de banco de dados (por exemplo, SQLite, PostgreSQL).
- [ ] Projetar o esquema do banco de dados.
### Criar Banco de Dados
- [ ] Criar a tabela `gen1`.
- [ ] Inserir 151 Pokémon na tabela `gen1`.
- [ ] Criar a tabela `CountActive`.
- [ ] Criar a tabela `CountComplete`.
