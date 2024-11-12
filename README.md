# Projeto de Portfólio Profissional

Este projeto é uma plataforma de portfólio profissional onde os usuários podem visualizar e editar seus dados de portfólio. Ele permite autenticação via Firebase e GitHub e consome dados públicos do GitHub usando suas APIs, facilitando o compartilhamento e conhecimento entre usuários da plataforma.

## Objetivo

O objetivo do projeto é oferecer uma ferramenta que permita a criação e visualização de portfólios interativos, além de promover o compartilhamento e descoberta de perfis de usuários do GitHub.

## Funcionalidades

- **Visualização de Portfólio**: Usuários podem visualizar portfólios de perfis cadastrados.
- **Autenticação com GitHub**: Autenticação segura utilizando o GitHub para garantir que apenas usuários verificados possam editar seu portfólio.
- **Barra de Pesquisa de Usuários**: Permite a busca de perfis pelo nome de usuário. Se o perfil estiver no banco de dados, o usuário é direcionado para a página de visualização do portfólio.
- **Edição do Portfólio**: Usuários autenticados podem acessar uma página de edição onde podem adicionar informações ao seu portfólio.

> **Nota**: Algumas funcionalidades estão em desenvolvimento, como o botão de edição e a navegação pelo header. Entretanto, os componentes principais estão utilizáveis, proporcionando uma experiência completa do projeto.

## Tecnologias Utilizadas

- **Firebase Authentication**: Para autenticação via GitHub.
- **GitHub API**: Consumo de dados públicos dos perfis do GitHub.
- **React**: Desenvolvimento da interface e dos componentes da aplicação.
- **CSS Modules**: Para estilização modular e organizada dos componentes.
- **Amazon EC2**: Hospedagem da aplicação (em configuração).

## Desafios e Aprendizado

Durante o desenvolvimento do projeto, enfrentamos alguns desafios técnicos, tais como:

- **Configuração de Ferramentas de Teste**: Uso do Jest para garantir a confiabilidade e funcionamento dos componentes.
- **Hospedagem em Nuvem**: Configuração de ambientes no Amazon EC2.
- **Componentização**: Reestruturação dos componentes para melhorar a organização e reutilização no código.









