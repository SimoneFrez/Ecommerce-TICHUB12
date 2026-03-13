import { Category, Product } from "./types";
import { User } from "./User";
import { Cart } from "./Cart";

const catEletronicos: Category = { id: 1, name: "Tecnologia" };
const produto1: Product = { id: 10, name: "Mouse", price: 50, category: catEletronicos };
const produto2: Product = { id: 11, name: "Teclado", price: 150, category: catEletronicos };

const admin = new User(1, "instrutor_simone", "simone@teste.com", "ADMIN");
console.log(`Usuário: ${admin.username} é um ${admin.role}`);

const meuCarrinho = new Cart();

meuCarrinho.addItem(produto1, 2);
meuCarrinho.addItem(produto2, 3);
meuCarrinho.addItem(produto2, 1);

console.log("Itens no Carrinho:", meuCarrinho.getSummary());
console.log("Total de Unidades:", meuCarrinho.getTotalItems());
console.log("Preço Final: R$", meuCarrinho.getFinalPrice());

const appDiv = document.getElementById('carrinho-info');

if (appDiv) {
    appDiv.innerHTML = `
        <p><strong>Usuário:</strong> ${admin.username} (${admin.role})</p>
        <p><strong>Total de itens:</strong> ${meuCarrinho.getTotalItems()}</p>
        <p><strong>Preço Final:</strong> R$ ${meuCarrinho.getFinalPrice()}</p>
    `;
}