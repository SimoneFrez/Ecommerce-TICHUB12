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