<template>
  <div id="app">
    <Search v-on:inspect="inspectLink" />
    <div v-for="(link, index) in links" :key="index">
      <ResultLink v-bind:name="link" />
    </div>    
    <ResultSVG :source="source" v-bind:links="links" />
  </div>  
</template>

<script>
import Search from './components/Search';
import ResultLink from './components/ResultLink';
import ResultSVG from './components/ResultSVG';

export default {
  name: 'app',  
  components: {
    Search,
    ResultLink,
    ResultSVG
  },
  data: function () {
    return {
      links: [],
      vertex: {},
      source: '',
    }
  },
  methods: {
    inspectLink: async function(url) {      
      const queryUrl = `http://localhost:3000?u=${url}`;
      try {
        let response = await fetch(queryUrl);
        let result = await response.json();
        this.links = result.matches; 
        this.source = url;
        this.buildGraph(url, this.links);
      } catch (err) {
        console.error(err);
      }      
    },
    buildGraph: function(source, links) {
      this.vertex = { source: links };
      console.log(this.vertex);
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
