<template>
  <div id="app">
    <Search v-on:inspect="inspectLink" />
    <div v-for="(link, index) in links" :key="index">
      <ResultLink v-bind:name="link" />
    </div>    
  </div>
</template>

<script>
import Search from './components/Search';
import ResultLink from './components/ResultLink';

export default {
  name: 'app',  
  components: {
    Search,
    ResultLink
  },
  data: function () {
    return {
      links: []
    }
  },
  methods: {
    inspectLink: async function(url) {
      console.log('listening...');
      const queryUrl = `http://localhost:3000?u=${url}`;
      try {
        let response = await fetch(queryUrl);
        let result = await response.json();
        this.links = result.matches; 
      } catch (err) {
        console.error(err);
      }      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
