<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-4xl font-bold text-center mb-8">Ecommerce Tech Store</h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProductCard 
          v-for="p in products" 
          :key="p.id" 
          :product="p" 
          @add="addToCart" 
        />
      </div>

      <aside class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <i class="pi pi-shopping-bag text-green-500"></i> Carrinho
        </h2>
        
        <div v-if="cartItems.length === 0" class="text-center py-8">
          <i class="pi pi-box text-4xl text-gray-300"></i>
          <p class="mt-2 text-gray-500 italic">Seu carrinho está vazio</p>
        </div>

        <ul class="space-y-4">
          <li v-for="item in cartItems" :key="item.product.id" class="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <span class="font-semibold text-gray-700">{{ item.product.name }}</span>
              <span class="text-sm font-bold text-green-600">
                R$ {{ (item.product.price * item.quantity).toFixed(2) }}
              </span>
            </div>
            
            <div class="flex items-center justify-between">
              <InputNumber 
                v-model="item.quantity" 
                showButtons 
                buttonLayout="horizontal" 
                :min="1" 
                class="w-32"
                incrementButtonIcon="pi pi-plus" 
                decrementButtonIcon="pi pi-minus" 
              />
              <Button 
                icon="pi pi-trash" 
                severity="danger" 
                rounded 
                outlined 
                class="ml-2"
                @click="removeItemCompletely(item.product.id)" 
                aria-label="Excluir produto"
              />
            </div>
          </li>
        </ul>

        <div v-if="cartItems.length > 0" class="mt-6 pt-4 border-t border-gray-200">
          <div class="flex justify-between items-center mb-2 text-gray-600">
            <span>Total de Itens:</span>
            <span class="font-bold">{{ totalItems }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold">Preço Final:</span>
            <span class="text-xl font-black text-green-700">R$ {{ finalPrice.toFixed(2) }}</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from './components/ProductCard.vue';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Card from 'primevue/card'; 
import { Product, CartItem } from './models/types.js';

export default defineComponent({
  name: 'App',
  components: { 
    ProductCard, 
    Button, 
    InputNumber,
    Card 
  },
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
    },
    removeFromCart(productId: number) {
      const item = this.cartItems.find(i => i.product.id === productId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          this.removeItemCompletely(productId);
        }
      }
    },
    removeItemCompletely(productId: number) {
      this.cartItems = this.cartItems.filter(i => i.product.id !== productId);
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