<template>
  <div class="container" :class="{loadingItem: isProductLoading}">
    <div class="d-flex justify-content-between align-items-center mb-1">
      <div><input type="text" placeholder="Search..." class="form-control" v-model="pagination.title"
                  @input="changeFilter"></div>

      <div class="row text-center" v-if="isProductLoading">
        <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize"></grid-loader>
      </div>
      <div v-else class="row action-panel">
        <div class="col-12">
          <div class="btn-group btn-group-sm pull-right">
            <button id="list" class="btn btn-outline-dark" @click.prevent="changeDisplay(true)">
              <i class="fa fa-list" aria-hidden="true"></i> List
            </button>
            <button id="grid" class="btn btn-outline-dark" @click.prevent="changeDisplay(false)">
              <i class="fa fa-th" aria-hidden="true"></i> Grid
            </button>
          </div>
        </div>
      </div>
    </div>


    <div class="row" v-if="!isProductLoading">
      <app-product-item v-for="prod in products" :item="prod" :key="prod.id"
                        :displayList="displayList"></app-product-item>

    </div>
    <div class="overflow-auto text-center" v-if="!isProductLoading">

      <b-pagination align="center"
          @change="changePage"
          v-model="pagination.page"
          :total-rows="total"
          :per-page="pagination.limit"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import ProductItem from './product/ProductItem.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue';

export default {
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
      displayList: false,
      pagination: {page: 1, limit: 20, title: ''}

    }
  },
  computed: {
    ...mapGetters(['products', 'isProductLoading', 'total']),
  },
  components: {
    appProductItem: ProductItem,
    GridLoader
  },
  mounted() {
    // let uid = this.$store.getters.currentUser.uid;
    this.listenToProductList(this.pagination);
    // this.getShoppingCart({uid, currentCart: this.$store.getters.cartItemList});
  },
  methods: {
    ...mapActions(['getShoppingCart', 'listenToProductList']),

    changeDisplay(isList) {
      this.displayList = isList;
    },
    changeFilter() {
      this.listenToProductList(this.pagination)

    },
    changePage(page) {
      this.pagination.page = page
      // eslint-disable-next-line no-debugger
      debugger
      this.listenToProductList(this.pagination)
    }
  }
}
</script>

<style>
.loadingItem {
  align-items: center;
  justify-content: center;
  display: flex;
}

.action-panel {
  margin-bottom: 10px;
  margin-right: 5px;
}
</style>
