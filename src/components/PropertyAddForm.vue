<template>
  <div class="container-fluid">    
      <button v-on:click="showModal = !showModal" class="btn btn-outline-primary text-left mb-3">Add Property</button>
    <div v-bind:class="modalClass" class="modal-container">
      <div class="property-modal">
        <h3 class="text-primary">Add Property</h3>
        <form @submit.prevent="onSubmit" class="form-horizontal">

          <div class="form-group">
                <input type="text" v-model="form.county" name="county" placeholder="County" class="form-control" required>
          </div>

          <div class="form-group">
                <input type="text" v-model="form.country" name="country" placeholder="Country" class="form-control" required>
          </div>

          <div class="form-group">
                <input type="text" v-model="form.town" name="town" placeholder="Town" class="form-control" required>
          </div>

          <div class="form-group">
                <textarea v-model="form.description" name="description" placeholder="Description" class="form-control" required></textarea>
          </div>

          <div class="form-group">
                <input type="text" v-model="form.address" name="address" placeholder="Address" class="form-control" required>
          </div>

          <div class="form-group">
                <input type="text" v-model="form.latitude" name="latitude" placeholder="Latitude" class="form-control" required>
          </div>

          <div class="form-group">
                <input type="text" v-model="form.longitude" name="longitude" placeholder="longitude" class="form-control" required>
          </div>

          <div class="form-group">
            <select v-model="form.num_bedrooms" name="num_bedrooms" class="form-control" required>
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
            <select v-model="form.num_bathrooms" name="num_bathrooms" class="form-control" required>
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
                <input type="integer" v-model="form.price" name="price" placeholder="Price" class="form-control" required>
          </div>

          <div class="form-group">
              <input type="radio" id="sale" v-model="form.type" name="type" value="sale" class="mr-2">
              <label for="type">SALE</label><br>
              <input type="radio" id="rent" name="type" v-model="form.type" value="rent" class="mr-2">
              <label for="type">RENT</label><br>
          </div>

          <div class="form-group">
                <input type="integer" v-model="form.property_type_id" name="property_type_id" placeholder="Property Type Id" class="form-control" required>
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
import axios from 'axios';

export default {
  name: 'PropertyAddForm',
  data() {
    return {
      properties: [],
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
    };
  },
  methods: {

    onFileUpload (event) {
      this.form.image = event.target.files[0];
    },
    onSubmit() {
      // upload file
      const formData = this.form

      axios.post('http://localhost:8009/api/v1/properties/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(
          this.showModal = false,
          this.$swal('Successfully added Property'),
          window.location.reload()
      )
      .catch((err) => {
        this.$swal(err);
      });
    }
  },
  computed: {
    modalClass() {
      return this.showModal ? 'show' : '';
    }
  }
};
</script>

<style>
.modal-container {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index : 99999;
 
   display:flex;
  justify-content : center;
  align-items:center;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
}

.modal-container.show {
  opacity: 1;
  pointer-events: auto;
}

.property-modal {
  color: #535353;
  background-color: #fff;
  background-image: url("../assets/background.jpg");
  width: 600px;
  padding: 20px 30px;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.property-modal h1 {
  margin: 0;
}

.property-modal p {
  opacity: 0.9;
}
</style>
