<template>
  <div class="container">
    <div class="col-md-12">
      <div v-if="isProductLoading" class="text-center">
        <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize" class="d-inline-block"/>
      </div>
      <div v-else class="card">
        <div class="row">
          <div class="col-12 col-md-4 offset-md-4">
            <div class="intrinsic">
              <img class="img-fluid intrinsic-item" :src="product.thumbnail" alt="">
            </div>
          </div>
        </div>

        <div class="caption-full">
          <h4 class="pull-right">$ {{ product.price }}</h4>
          <h4> {{ product.title }}</h4>
          <p> {{ product.description }} </p>
        </div>
        <div class="ratings">
          <span>{{ product.quantity }} left in stock</span>
          <p class="pull-right">
            <button @click="addItem" :disabled="product.quantity === 0" class="btn btn-success">
              Add to cart
            </button>
          </p>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import ApiService from "../services/ApiService";

export default {
  components: {
    GridLoader
  },
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
      product:null,
    }
  },
  computed: {
    ...mapGetters(['isProductLoading', 'products']),
    // item() {
    //   let id = this.$route.params.id;
    //   let product = null
    //   // eslint-disable-next-line vue/no-async-in-computed-properties
    //   ApiService.getProductById(id).then(response => {
    //     product = response.data
    //   })
    //   this.$store.commit('setIsLoading',false)
    //   return product
    //   // if (this.products.length >= id) {
    //   //   let filterArr = this.products.filter((item) => {
    //   //     return item.id == id
    //   //   });
    //   //   if (filterArr.length > 0) {
    //   //     return filterArr[0];
    //   //   }
    //   // }
    //   // return {};
    // }
  },
  mounted() {
    this.item()
  },
  methods: {
    ...mapActions(['updateCart']),
    item() {
      let id = this.$route.params.id;
      // eslint-disable-next-line vue/no-async-in-computed-properties
      ApiService.getProductById(id).then(response => {
        this.product = response.data
      })
      this.$store.commit('setIsLoading',false)
      // if (this.products.length >= id) {
      //   let filterArr = this.products.filter((item) => {
      //     return item.id == id
      //   });
      //   if (filterArr.length > 0) {
      //     return filterArr[0];
      //   }
      // }
      // return {};
    },
    addItem() {
      const order = {
        item: Object.assign({}, this.product),
        quantity: 1,
        isAdd: true
      };
      // console.log(order);
      this.updateCart(order);
    }
  }
}
</script>

<style scoped>
.caption-full {
  padding-right: 10px;
  padding-left: 10px;
}

.ratings {
  padding-right: 10px;
  padding-left: 10px;
  color: #d17581;
}
</style>
