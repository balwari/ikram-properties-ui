<template>
  <div>
  <div class="container">
    <div class="row">
      <form @submit.prevent="onSubmit" class="form-inline">
        <div class="form-group ml-5 mr-5">
          <input type="text" name="search-query" v-model="form.search_query" class="form-control" placeholder="Search here..." style="width:600px;"/>
        </div>
        <div class="form-group ml-2 mr-5">
          <button v-on:click="showModal = !showModal" class="btn btn-outline-info form-control">Search</button>
        </div>
      </form>
    </div>

</div>
    <div class="flex-container">
      <div v-for="(property) in properties.data" :key="property.id" class="card m-4" style="width:300px">
        <img class="card-img-top" :src="property.image_thumbnail.includes('http') ? property.image_thumbnail : BASE_IMAGE_PATH+property.image_thumbnail" alt="Image" style="height:200px;">
        <div class="card-body">
          <h4 class="card-title">{{ property.country }}</h4>
          <p class="card-text">{{ property.type }}</p>
          <p class="card-text">{{ property.address }}, {{ property.town }}, {{ property.county }}</p>
              <form>
                <button v-on:click.prevent="emitShowModal(property)" class="btn btn-sm btn-info mr-1">Edit</button>
                <button v-on:click="deleteProperty(property.id)" type="submit" class="btn btn-sm btn-danger">Delete</button>
              </form>
        </div>
      </div>
    </div>
    <div class="text-center">Total Properties = {{ properties.total }}</div>
    {{form.search_query}}
    <div class="mr-5" style="float:left;">
      <button v-on:click="getResults(properties.current_page-1,form.search_query)" class="btn btn-primary m-5" :disabled='isDisabledPrev'> Prev </button>
    </div>
    <div class="mr-5" style="float:right;">
      <button v-on:click="getResults(properties.current_page+1,form.search_query)" class="btn btn-primary m-5" :disabled='isDisabledNext'> Next </button>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../main.js';
import axios from 'axios';

export default {
  name: 'PropertiesTable',
  data() {
    return {
      properties: [],
      showModal: false,
      keyword : '',
      BASE_IMAGE_PATH : 'http://localhost:8009/',
      form : {
            search_query : null
      },
      page : 1
    }
  },
  computed: {
      isDisabledNext() {
        if(this.properties.current_page < this.properties.last_page){
          return false
        }else {
        return true
        }
      },
      isDisabledPrev() {
        if(this.properties.current_page > 1){
          return false
        }else {
        return true
        }
      },
    },
  mounted() {
        // Fetch initial results
        this.getResults(this.page,this.form.search_query);
    },
  methods: {
    onSubmit() {
      this.getResults(this.page,this.form.search_query)
    },

    getResults(page,search_query) {
    var url
    if(search_query != null){
      url = 'http://localhost:8009/api/v1/properties/get?page='+page+'&search_query='+search_query
    }else {
      url = 'http://localhost:8009/api/v1/properties/get?page='+page
    }
      axios.get(url)
        .then(response => {
          this.properties = response.data.data;
          console.log(this.properties);
        })
        .catch(err => {
          alert(err)
        console.error(err);
        });
    },

    deleteProperty(id) {
      axios.get('http://localhost:8009/api/v1/properties/delete?id='+id)
        .then(
        this.$swal('Successfully deleted Property')
      )
        .catch(err => {
          this.$swal(err);
        });
    },

    emitShowModal(property1) {
      this.property1 = property1;
      EventBus.$emit('click', this.showModal, this.property1);
    }
  }
}
</script>

<style scoped>
th {
  padding-left: 1.2rem;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

}

.flex-container > div {
  margin: 10px;
  text-align: center;
}
.pagination{
        margin-bottom: 0;
    }
</style>
