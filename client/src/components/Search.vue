<template>
  <form @submit.prevent="$emit('inspect', url)">
    <label>Search: </label>
    <input v-model="url" />
    <button type="submit">Search...</button>
  </form>
</template>
<script>
export default {
  data: function() {
    return {
      url: ''
    }
  }
}
</script>
