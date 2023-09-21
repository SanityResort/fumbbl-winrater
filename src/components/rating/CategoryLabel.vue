<template>
  <div class="category" @click="passedCallback()">
    {{ category.name + suffix }}
  </div>
</template>

<script setup lang="ts">
import Color from 'color'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { Category } from './match'
import type { MatchProvider } from './store'
import { useLoading } from 'vue-loading-overlay'

const props = defineProps({
  category: Object as PropType<Category>,
  active: Boolean,
  callback: Function,
  matchProvider: Object as PropType<MatchProvider>
})

const category = props.category as Category

const foreground = props.active ? category.foreground : (category.foreground as Color).alpha(0.75)
const background = props.active ? category.background : (category.background as Color).alpha(0.25)

const suffix = computed(() => {
  return props.active && props.matchProvider
    ? ': ' + props.matchProvider.matchCounts.get(category)
    : ''
})
const loading = useLoading({
  isFullPage: false
  // options
})
function passedCallback() {
  if (props.callback) {
    const loader = loading.show()
    setTimeout(() => {
      if (props.callback) {
        props.callback(category)
      }
      loader.hide()
    }, 1)
  }
}
</script>

<style scoped>
.category {
  background: v-bind(background);
  border-color: lightgray;
  border-radius: var(--line-height);
  border-style: ridge;
  color: v-bind(foreground);
  font-weight: bold;
  margin: 1px 1px 1px 0;
  padding: 0 calc(var(--line-height) / 2);
  user-select: none;
}
</style>
