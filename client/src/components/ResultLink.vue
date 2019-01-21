<template>
  <a @click="$emit('inspect', name)">{{ name }}</a>
</template>
<script>
export default {
  props: {
    name: String
  }
}
</script>
