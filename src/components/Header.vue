<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark" role="navigation">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
            <a @click="reload" class="navbar-brand ml-auto" style="cursor: pointer">Shopping</a>

      <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTop"
          aria-controls="navbarTop"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse " id="navbarTop" :class="{show: isNavOpen}">
        <ul class="navbar-nav ml-auto mr-1" v-for="(category,index) in categories" :key="category">
          <li v-if="index<5" style="margin: 9px" @click="getCat(category)">
            <div><a class="text-uppercase text-white" style="font-size: 14px;cursor: pointer">{{ category }}</a></div>
          </li>
        </ul>
        <ul class="nav navbar-nav">
          <router-link to="/login" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
            <a class="nav-link">Login</a>
          </router-link>
          <li v-if="isLoggedIn" class="li-pointer nav-item">
            <a @click="logout" class="nav-link">Logout {{ userEmail }}</a>
          </li>
          <router-link to="/register" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
            <a class="nav-link">Register</a>
          </router-link>
          <li>
            <router-link to="/cart" class="btn btn-success navbar-btn" tag="button">
              Checkout <span class="badge badge-light">{{ numItems }} ($ {{ cartValue }})</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- /.container -->
  </nav>
</template>

<script>
import {
  mapActions, mapGetters
} from 'vuex';
import ApiService from "../services/ApiService";

export default {
  data() {
    return {
      isNavOpen: false,
      categories: [],
      pagination: {page: 1, limit: 20, title: ''}
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'cartValue', 'currentUser', 'cartItemList']),
    numItems() {
      return this.cartItemList.reduce((total, item) => {
        total += item.quantity;
        return total
      }, 0);
    },
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : ''
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    ...mapActions(['logout']),
    ...mapActions(['getByCategory','listenToProductList']),

    toggleNavbar() {
      this.isNavOpen = !this.isNavOpen
    },
    reload(){
      this.listenToProductList(this.pagination);
      this.$router.push('/')
    },
    getCat(category) {
      this.getByCategory(category)
    },
    getCategories() {
      ApiService.getCategories().then(response => {
        if (response) {
          this.categories = response.data
        }
      })
    }
  }
}
</script>


<style scoped lange="sass">
.navbar-btn a {
  color: white;
}

.li-pointer {
  cursor: pointer;
}

.li-pointer:hover {
  cursor: pointer;
}
</style>
