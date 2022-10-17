<template>
  <div class="container">
    <div v-bind:class="modalClass" class="modal-container">
      <div class="property-modal">
        <h3 class="text-primary">Edit Property</h3>
        <form @submit.prevent="onSubmit" class="form-horizontal">

          <div class="form-group">
                <input type="text" v-model="property.county" name="county" placeholder="County" class="form-control" required>
          </div>

          <div class="form-group">
                <input type="text" v-model="property.country" name="country" placeholder="Country" class="form-control" required>
          </div>

          <div class="form-group">
                <input type="text" v-model="property.town" name="town" placeholder="Town" class="form-control" required>
          </div>

          <div class="form-group">
                <textarea v-model="property.description" name="description" placeholder="Description" class="form-control" required></textarea>
          </div>

          <div class="form-group">
                <input type="text" v-model="property.address" name="address" placeholder="Address" class="form-control" required>
          </div>

          <div class="form-group">
                <input type="text" v-model="property.latitude" name="latitude" placeholder="Latitude" class="form-control" required>
          </div>

          <div class="form-group">
                <input type="text" v-model="property.longitude" name="longitude" placeholder="longitude" class="form-control" required>
          </div>

          <div class="form-group">
            <select v-model="property.num_bedrooms" name="num_bedrooms" class="form-control" required>
              <option value="">Select Bedrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>

          <div class="form-group">
            <select v-model="property.num_bathrooms" name="num_bathrooms" class="form-control" required>
              <option value="">Select Bathrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>

          <div class="form-group">
                <input type="integer" v-model="property.type" name="price" placeholder="Price" class="form-control" required>
          </div>

          <div class="form-group">
              <input type="radio" id="sale" name="type" value="sale" class="mr-2" v-model="property.type">
              <label for="type">SALE</label><br>
              <input type="radio" id="rent" name="type" value="rent" class="mr-2" v-model="property.type">
              <label for="type">RENT</label><br>
          </div>

          <div class="form-group">
                <input type="integer" v-model="property.property_type_id" name="property_type_id" placeholder="Property Type Id" class="form-control" required>
          </div>

          <div class="form-group">
                <input type="file" @change="onFileUpload($event)" class="form-control" required />
          </div>
          
          <button v-on:click="showModal = !showModal" class="btn btn-secondary mr-1">Cancel</button>
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import { EventBus } from '../main.js';
import axios from 'axios';

export default {
  name: 'PropertyEditForm',
  data() {
    return {
      properties: [],
      property : '',
      showModal: false,
      form: {
                county: '',
                country: '',
                town: '',
                description: '',
                address: '',
                latitude: '',
                longitude: '',
                num_bedrooms: '',
                num_bathrooms: '',
                price: '',
                property_type_id: '',
                type: '',
                image : ''
            }
    }
  },
  methods: {
    onFileUpload (event) {
      this.property.image = event.target.files[0];
    },
    onSubmit() {
      // upload file
      axios.post('http://localhost:8009/api/v1/properties/update',this.property, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(
          this.showModal = false,
          this.$swal('Successfully updated Property'),
          window.location.reload()
      )
      .catch((err) => {
        this.$swal(err);
      });
    }
  },
  created() {
    EventBus.$on('click', (modal, property) => {
      this.showModal = !modal;
      this.property = property;
    })
  },
  computed: {
    modalClass() {
      return this.showModal ? 'show' : '';
    }
  }
  
};
</script>

<style>
</style>
