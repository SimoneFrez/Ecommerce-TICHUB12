<template>
  <div class="product-card">
    <h3>{{ product.name }}</h3>
    <p>Categoria: {{ product.category.name }}</p>
    <p>Preço: R$ {{ product.price.toFixed(2) }}</p>
    <button @click="$emit('add', product)">Adicionar ao Carrinho</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Product } from '../types'; 

export default defineComponent({
  name: 'ProductCard',
  props: {    
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  }
});
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  text-align: center;
}
</style>