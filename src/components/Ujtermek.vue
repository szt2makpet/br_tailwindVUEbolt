<script setup>
  import { onMounted, ref  } from 'vue';
  const names = ref();
  const name = ref("");
  const ar = ref("");

  
  const lekerdezes = () => {
    fetch('http://localhost:3000/products')
    .then(resp => resp.json())
    .then(json => {
      names.value = json;
    })
  }

  const save = () => {
    console.log(name.value);
    let tombMerete = names.value.length;
    let id = Number(names.value[tombMerete - 1].id);
    let d = {id: id++, name : name.value, price: ar.value};
    console.log(d);    
    fetch("http://localhost:3000/products",
    {
      method : 'post',
      body : JSON.stringify(d),
      headers : {
        "Content-type" : "application/json"
      }
    })
    .then(() => lekerdezes())
    alert("Sikeres mentés!")
  }

  onMounted(() => {
    lekerdezes();
  }) 
</script>

<template>
    <h1 class="text-3xl font-fantasy text-center py-4">Új termék felvétele</h1>
    <div class="form-container">
      <div class="input-container Neumorphism">
        <label for="productName">Terméknév:</label>
        <input type="text" id="productName" v-model="name" placeholder="Új termék neve">
      </div>
      <div class="input-container Neumorphism">
        <label for="productPrice">Ára:</label>
        <input type="text" id="productPrice" v-model="ar" placeholder="Új termék ára">
      </div>
      <button class="Neumorphism" @click="save()">Hozzáad</button>
    </div>
  </template>

<style scoped>
.Neumorphism{
  padding: 8px 16px;
  border-radius: 10px;
  background: linear-gradient(145deg, #ffffff, #e1dcdc);
  box-shadow:  20px 20px 60px #d5cfcf,
   -20px -20px 60px #ffffff;
  color:black;
}
.form-container {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

</style>
