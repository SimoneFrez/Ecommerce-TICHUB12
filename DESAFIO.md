#  Resumo do Projeto: E-commerce POO & Tipagem

Este documento detalha a implementação da lógica de um sistema de e-commerce, focando em Programação Orientada a Objetos (POO) e Tipagem Avançada com TypeScript.

##  Estrutura Arquitetural

O projeto foi dividido em módulos para garantir a escalabilidade e organização:

- **`types.ts`**: Contém as interfaces base (`Product`, `Category`, `CartItem`) e os tipos literais.
- **`User.ts`**: Classe responsável pelo gerenciamento de usuários e permissões (Roles).
- **`Cart.ts`**: Classe principal que contém a inteligência de cálculo e manipulação de dados do carrinho.
- **`index.ts`**: Ponto de entrada que integra as classes e exibe os resultados no navegador/terminal.

---

##  Implementações Realizadas

### 1. Tipagem e Segurança (Etapa 1 e 2)
- **Interfaces Estritas**: Forçamos a estrutura de objetos para evitar erros de propriedades inexistentes.
- **Literal Types**: O atributo `role` do usuário foi limitado estritamente a `"ADMIN" | "CUSTOMER"`, impedindo valores inválidos em tempo de compilação.

### 2. Lógica de Negócio no Carrinho (Etapa 3)
- **Método `addItem`**: Implementada lógica de verificação. Se o produto já existe, incrementamos a quantidade em vez de duplicar a entrada no array.
- **Encapsulamento**: Os itens do carrinho são mantidos como `private`, garantindo que a lista só seja alterada através dos métodos oficiais da classe.

### 3. Desafio: High-Order Functions (HOF)
Para tornar o código mais declarativo e performático, substituímos laços de repetição (`for/forEach`) por métodos nativos de Array:
- **`.some()` / `.find()`**: Utilizados para localizar produtos existentes de forma eficiente.
- **`.reduce()`**: Utilizado para processar o acúmulo de valores complexos:
  - Cálculo do total de unidades físicas.
  - Cálculo do preço final monetário (Quantidade × Preço Unitário).

---

##  Critérios de Aceite Atingidos
- [x] Ausência total do tipo `any`.
- [x] Integridade de Roles garantida pelo compilador.
- [x] Lógica de acúmulo de produtos funcionando.
- [x] Uso correto de High-Order Functions.


---
##  Integração com Vue.js

### 1. Ponto de Entrada (HTML)
- **Container Raiz**: Configuramos o `index.html` com uma `<div id="app">`. Este é o ponto onde o framework Vue injeta toda a interface dinâmica, substituindo a manipulação direta do DOM por um sistema de reatividade.
- **Módulo Principal**: O script `index.ts` agora atua como inicializador, utilizando a função `createApp` para "montar" o componente principal `App.vue`.

### 2. Organização de Arquivos (Refatoração)
- Movemos as interfaces e classes para `src/models/` para separar a **Lógica de Negócio** da **Interface de Usuário (UI)**.
- Criamos a pasta `src/components/` para armazenar o `ProductCard.vue`, seguindo o princípio de **Responsabilidade Única**.


###  Resolução de Problemas (Troubleshooting)
- **Módulo 'vue' não encontrado**: Identificamos que o framework Vue.js precisa ser instalado explicitamente como dependência de produção (`npm install vue`).
- **Definições de Tipo para .vue**: Criamos o arquivo `env.d.ts` para prover a tipagem global de arquivos `.vue`, permitindo que o compilador TypeScript reconheça componentes Single File Components (SFC) sem erros de importação.


###  Configuração do Build System (Vite)
- **Plugin Vue**: Instalamos o `@vitejs/plugin-vue` e configuramos o `vite.config.ts`. Isso é necessário para que o compilador transforme os arquivos `.vue` (SFC - Single File Components) em código JavaScript que o navegador consegue executar.
- **Análise de Sintaxe**: Aprendemos que sem o plugin adequado, o Vite tenta ler tags HTML como JavaScript, gerando erros de análise (Parsing errors).


---
##  Implementação do Carrinho Reativo

###  Gestão de Estado (Data Management)
- **Reatividade do Vue**: Utilizamos o array `cartItems` dentro do `data()` para armazenar o estado atual do carrinho. Graças ao sistema de reatividade do Vue, qualquer alteração nesse array dispara automaticamente uma atualização na interface do usuário.
- **Lógica de Duplicidade**: Implementamos uma verificação no método `addToCart` usando o método `.find()`. Isso evita que o mesmo produto apareça várias vezes na lista, optando por incrementar a propriedade `quantity`.

###  Performance com Computed Properties
- **Cálculos Automáticos**: Implementamos `totalItems` e `finalPrice` utilizando `computed`. Essa escolha técnica garante que o total do carrinho e o preço final sejam recalculados de forma performática, apenas quando houver mudanças reais nos itens, evitando processamento desnecessário.

###  Comunicação entre Componentes
- **Event Emitting**: O componente `ProductCard` atua como um componente "burro" (apenas exibe dados), enquanto o `App.vue` atua como o componente "inteligente", detendo a lógica de negócio e ouvindo os sinais de interação emitidos pelo filho.


---
##  Conclusão do Exercício 2

###  Resultados Alcançados
- **Interface Dinâmica**: A aplicação agora renderiza produtos a partir de um estado reativo, permitindo interações em tempo real sem recarregar a página.
- **Integração Completa**: Unimos as classes TypeScript (`models`) com a camada visual (`Vue components`), mantendo a tipagem estrita em todo o fluxo de dados.
- **UX Inicial**: O usuário recebe feedback imediato (atualização do total e da lista lateral) ao interagir com os botões de compra.


---
##  Exercício 3: UI Profissional com PrimeVue & Tailwind

###  Estilização Utilitária (Tailwind CSS)
- **Layout Responsivo**: Implementamos um sistema de Grid (`grid-cols-1 md:grid-cols-3`) que se adapta automaticamente de celulares para desktops.
- **Design Tokens**: Substituímos o CSS manual por classes de espaçamento (`p-8`, `gap-6`) e tipografia do Tailwind, garantindo consistência visual.

###  Componentes de Interface (PrimeVue)
- **Componentes Ricos**: Integramos o PrimeVue para utilizar elementos complexos como o `<Card>` e o `<InputNumber>`. 
- **Experiência de Usuário (UX)**: O carrinho agora permite ajuste fino de quantidade através de botões de incremento/decremento nativos, melhorando a interação.

###  Configuração de Build
- **Plugin Integration**: Configuramos o Vite para processar o plugin do PrimeVue e as diretivas de post-processamento do Tailwind.

---
##  Refinamento de Usabilidade (UX)

###  Comunicação Visual
- **Ícones de Ação**: Substituímos o botão de exclusão circular, que causava ambiguidade, por um botão contendo o ícone universal de lixeira (`pi pi-trash`).
- **Nível de Contraste**: Alteramos o estilo do botão para `outlined`, garantindo que a borda e o ícone sejam perfeitamente visíveis contra o fundo branco, resolvendo o problema de transparência anterior.

# Relatório de Entrega - Exercício 3

##  Objetivos Alcançados
- **UI Premium**: Implementação do PrimeVue com tema Aura.
- **Styling**: Configuração completa do Tailwind CSS v4 via PostCSS.
- **Componentes**: Uso de InputNumber para controle de estoque e Cards para exibição de produtos.

##  Desafios Superados
- Resolvido erro de execução do Tailwind no PowerShell usando `npm exec`.
- Corrigido conflito de plugins do PostCSS com a instalação de `@tailwindcss/postcss`.
- Melhorada a visibilidade do botão de exclusão de "transparente" para `outlined danger` com ícone de lixeira.