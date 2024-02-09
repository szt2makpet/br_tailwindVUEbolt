
<script setup>
import { onMounted, ref } from 'vue';

const names = ref([]);

onMounted(() => {
  lekerdezes();
})

const del = (id) => {
  fetch("http://localhost:3000/cart/" + id, {
    method: "delete",
  })
    .then(() => lekerdezes())
}

const novekves = (id) => {
  const productIndex = names.value.findIndex(item => item.id === id);
  if (productIndex !== -1) {
    names.value[productIndex].quantity++;
    updateQuantity(id, names.value[productIndex].quantity);
  }
}

const lekerdezes = () => {
  fetch('http://localhost:3000/cart')
    .then(resp => resp.json())
    .then(json => {
      names.value = json;
    })
}

const csokkent = (id) => {
  const productIndex = names.value.findIndex(item => item.id === id);
  if (productIndex !== -1) {
    names.value[productIndex].quantity = Math.max(names.value[productIndex].quantity - 1, 0);
    updateQuantity(id, names.value[productIndex].quantity);
  }
}

const updateQuantity = (id, quantity) => {
  fetch(`http://localhost:3000/cart/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ quantity })
  }).then(() => {
    console.log('A termék mennyisége frissítve lett a kosárban.');
  }).catch(error => {
    console.error('Hiba történt a mennyiség frissítése közben:', error);
  });
}

const rendeles = () => {
  alert("Sikeres rendelés!");
  fetch("http://localhost:3000/cart", {
    method: "DELETE",
  }).then(() => {
    window.location.href = "http://localhost:5173/"; 
  }).catch(error => {
    console.error("Hiba történt a rendelés törlése során:", error);
  });
}
</script>

<template>
  <div class="margins">
    <h1 class="text-3xl font-fantasy text-center py-4">Kosárban lévő termékek</h1>
    <div class="container">
      <table class="w-full">
        <tr v-for="n in names" :key="n.id" class="border-b">
          <td class="py-2">Terméknév: {{ n.name }}</td>
          <td class="py-2">Ár: {{ n.price }}</td>
          <td class="py-2 flex items-center">
            <button class="quantity-button" @click="csokkent(n.id)">-</button>
            <span class="mx-2">Mennyiség: {{ n.quantity }}</span>
            <button class="quantity-button" @click="novekves(n.id)">+</button>
          </td>
          <td class="py-2"><span class="btn_add_minus cursor-pointer" @click="del(n.id)"><i class="fa-solid fa-trash"></i></span></td>
        </tr>
      </table>
      <button class="Neumorphism mt-4" @click="rendeles()">Rendelés</button>
    </div>
  </div>
</template>

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

.quantity-button {
  background-color: black;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.btn_add_minus {
  color: #ff0000;
  font-size: 1.2rem;
}
</style>