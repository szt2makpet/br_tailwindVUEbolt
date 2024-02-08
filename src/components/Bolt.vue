<template>
  <div class="margins">
    <div class="flex flex-wrap gap-4 justify-center md:justify-between">
      <div class="card Neumorphism w-full md:w-[calc(50%-20px)] lg:w-[calc(25%-20px)]" v-for="product in products" :key="product.id">
        <img src="../assets/no-image.png" class="w-full h-auto rounded-t-2xl">
        <div class="card-content p-4">
          <h3 class="text-2xl font-bold text-gray-900">{{ product.name }}</h3>
          <p class="mt-2 text-xl font-bold text-gray-900">Ár: {{ product.price }}</p>
          <div class="mt-4 space-x-4">
            <button class="button Neumorphism font-bold text-gray-900" @click="viewDetails(product)">Részletek</button>
            <button class="Neumorphism font-bold text-gray-900" @click="addToCart(product)">Kosárba</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const products = ref([]);

onMounted(() => {
  axios.get('http://localhost:3000/products')
    .then(resp => products.value = resp.data);
});

const addToCart = async (product) => {
  const cartResponse = await fetch('http://localhost:3000/cart');
  const cartData = await cartResponse.json();
  const existingProduct = cartData.find(item => item.id === product.id);
  if (existingProduct) {
    alert('Figyelem! Ezt a terméket korábban már hozzáadtad.');
    return;
  }
  const newProduct = { id: product.id, name: product.name, price: product.price, quantity: "1"};
  fetch('http://localhost:3000/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct)
  }).then(() => {
    alert('Kosárba helyezve!');
  }).catch(error => {
    console.error('Hiba történt:', error);
  });
}
</script>

<style scoped>
.margins{
  margin: 5%;
}

.Neumorphism{
  padding: 8px 16px;
  border-radius: 10px;
  background: linear-gradient(145deg, #ffffff, #e1dcdc);
  box-shadow:  20px 20px 60px #d5cfcf,
   -20px -20px 60px #ffffff;
  color:black;
}

@media (max-width: 575px) {
  .card {
    flex-basis: 100%;
    max-width: 100%;
  }
}
@media (min-width: 576px) and (max-width: 767px) {
  .card {
    flex-basis: 100%;
    max-width: 100%;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .card {
    flex-basis: 50%;
    max-width: 50%;
  }
}
@media (min-width: 992px) {
  .card {
    flex-basis: 25%;
    max-width: 25%;
  }
}
</style>
