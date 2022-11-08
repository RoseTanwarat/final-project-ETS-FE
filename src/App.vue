<template>
  <div id="app">
    <div v-if="user" class="logout" @click="deleteCookieNew()"><button>Log out</button></div>
    <router-view id="component"></router-view>
  </div>
</template>

<script>

import User from '@/models/User'
export default {
  name: "App",

  computed: {
    user() {
      return User.query().first();
    }
  },

  methods: {
    deleteCookie(name, path, domain) {
      if (this.getCookie(name)) {
        User.deleteAll()
        document.cookie = name + "=" +
          ((path) ? ";path=" + path : "") +
          ((domain) ? ";domain=" + domain : "");
        this.$router.push({ name: 'LoginPage' })
      }
    },

    deleteCookieNew() {
      this.deleteCookie('email')
      this.deleteCookie('id')
    },

    getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },

    async getCurrentUser() {
      const email = this.getCookie("email");
      await User.api().getUsers({ email: email })
    }
  },

  created() {
    this.getCurrentUser()
  }

};
</script>

<style>
#component {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logout {
  display: flex;
  justify-content: end;
}
</style>
