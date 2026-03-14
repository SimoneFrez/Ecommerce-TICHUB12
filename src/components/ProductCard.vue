<template>
  <Card class="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <template #title> {{ product.name }} </template>
    <template #subtitle> {{ product.category.name }} </template>
    <template #content>
      <p class="text-2xl font-bold text-green-600">R$ {{ product.price.toFixed(2) }}</p>
    </template>
    <template #footer>
      <Button icon="pi pi-shopping-cart" label="Adicionar" class="w-full" @click="$emit('add', product)" />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { Product } from '../models/types.js';

export default defineComponent({
  components: { Card, Button },
  props: {
    product: { type: Object as PropType<Product>, required: true }
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