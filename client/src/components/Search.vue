<template>
  <form @submit.prevent="$emit('inspect', url)">
    <label>Search</label>
    <input v-model="url" />
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
