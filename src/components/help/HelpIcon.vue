<template>
  <div :id="props.id" class="help-container">
    <div class="help">?</div>
  </div>
  <div class="tooltip">
    <div class="tooltip-content">{{ props.tooltip }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import tippy from 'tippy.js'

const props = defineProps({
  id: String,
  tooltip: String
})

const id: string = props.id as string

onMounted(() => {
  tippy(document.getElementById(id)!, {
    content: document.getElementsByClassName('tooltip-content')[0]
  })
})
</script>

<style scoped>
.help {
  color: var(--color-text-header);
  background: var(--color-help-background);
  border: 1px solid black;
  border-radius: 100%;
  font-weight: bolder;
  font-size: 0.75em;
  height: var(--line-height);
  line-height: var(--line-height);
  text-align: center;
  user-select: none;
  width: var(--line-height);
}

.help-container {
  vertical-align: center;
  height: var(--line-height);
}

.tooltip-content {
  background-color: var(--color-element-background);
  border: var(--color-text) 1px solid;
  border-radius: 0.5em;
  color: var(--color-text);
  font-size: 0.9em;
  line-height: calc(var(--line-height) * 0.9);
  padding: 0.25em;
}
</style>
