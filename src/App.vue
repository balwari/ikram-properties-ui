<template>
  <div id="app">
    <Header />
    <PropertyAddForm />
    <PropertyEditForm />
    <PropertiesList />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import PropertyAddForm from './components/PropertyAddForm.vue';
import PropertyEditForm from './components/PropertyEditForm.vue';
import PropertiesList from './components/PropertiesList.vue';


export default {
  name: 'App',
  components: {
    Header,
    PropertyAddForm,
    PropertyEditForm,
    PropertiesList
  }
}
</script>

<style>
#app {
  margin-top: 20px;
}
</style>
