<template>
  <div id="app">
    <h1>Minha Loja Vue</h1>

    <div class="loja-container">
      <section class="produtos">
        <h2>Produtos</h2>
        <div class="grid">
          <ProductCard 
            v-for="p in products" 
            :key="p.id" 
            :product="p" 
            @add="addToCart" 
          />
        </div>
      </section>

      <section class="carrinho">
        <h2>Seu Carrinho</h2>
        <p>Total de Itens: {{ totalItems }}</p>
        <p>Preço Final: R$ {{ finalPrice.toFixed(2) }}</p>
        
        <ul>
          <li v-for="item in cartItems" :key="item.product.id">
            {{ item.product.name }} x {{ item.quantity }}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from './components/ProductCard.vue';
import { Category, Product, CartItem } from './models/types';

export default defineComponent({
  components: { ProductCard },
  data() {
    return {     
      products: [
        { id: 1, name: 'Mouse Gamer', price: 150, category: { id: 1, name: 'Periféricos' } },
        { id: 2, name: 'Teclado Mecânico', price: 350, category: { id: 1, name: 'Periféricos' } },
        { id: 3, name: 'Monitor 4K', price: 2100, category: { id: 2, name: 'Monitores' } }
      ] as Product[],
      cartItems: [] as CartItem[]
    };
  },
  methods: {
    addToCart(product: Product) {   
      const existing = this.cartItems.find(item => item.product.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.cartItems.push({ product, quantity: 1 });
      }
    }
  },
  computed: {    
    totalItems(): number {
      return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    },
    finalPrice(): number {
      return this.cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    }
  }
});
</script>

<style>
.loja-container { display: flex; justify-content: space-around; }
.grid { display: flex; flex-wrap: wrap; }
</style>