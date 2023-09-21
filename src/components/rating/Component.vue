<script lang="ts" setup>
import { Store } from './store'
import { useMatchStore } from '../pinia/store'
import { storeToRefs } from 'pinia'
import CategoryLabel from './CategoryLabel.vue'
import GraphConfig from './GraphConfig.vue'
import IconButton from '../iconButton/IconButton.vue'
import { reactive } from 'vue'
import addIcon from '../../icons/addIcon.png'
import removeIcon from '../../icons/removeIcon.png'

const props = defineProps({
  store: Store
})

const matchStore = useMatchStore()
const { stores } = storeToRefs(matchStore)
let { modificationCounter } = storeToRefs(matchStore)

const store: Store = props.store as Store
const key = store.coachName
const matches = store.matches()
const categories = store.categories
const configs = store.configs
const storeRef = reactive(store)

function removeStore() {
  stores.value.delete(key)
  if (stores.value.size == 0) {
    modificationCounter.value = 0
  } else {
    modificationCounter.value += 1
  }
}

function addConfig() {
  store.addConfig()
}
</script>

<style scoped>
.coachData,
.config {
  background: var(--color-element-background);
  border: 1px solid black;
  border-radius: var(--border-radius-element);
  margin: 0.25em;
  max-width: 23em;
}

.coachName {
  padding: 0.25em 2.5em;
}

.labels {
  display: flex;
  flex-flow: row wrap;
  font-size: 0.75em;
  margin: 0.2em;
}

.rating {
  background: var(--color-sub-section-background);
  border: 2px black solid;
  border-radius: 2em;
  display: flex;
  flex-flow: row wrap;
  margin: 0.5em;
  padding: 0.5em;
}

.removeStore {
  position: absolute;
  top: 0;
  right: 0;
}

.store {
  background: var(--color-title-background);
  border-start-end-radius: var(--border-radius-element);
  border-start-start-radius: var(--border-radius-element);
  color: var(--color-text-header);
  flex-flow: row;
  position: relative;
  text-align: center;
  user-select: none;
}
</style>

<template>
  <div class="rating" :key="modificationCounter">
    <div class="coachData">
      <div class="store">
        <div class="coachName">{{ key }}: {{ matches.length }}</div>
        <IconButton
          class="removeStore"
          alt="Remove coach"
          :callback="removeStore"
          :src="removeIcon"
          :show-indicator="true"
        />
      </div>
      <div class="labels">
        <CategoryLabel
          v-for="category in categories"
          :key="category.name"
          :category="category"
          :active="true"
          :match-provider="store"
        />
      </div>
    </div>
    <GraphConfig
      class="config"
      v-for="config in configs"
      :key="configs.indexOf(config)"
      :config="config"
      :store="store"
      :show-remove-button="configs.length > 1"
    />

    <IconButton
      v-if="storeRef.ready"
      alt="Add config"
      :callback="addConfig"
      :src="addIcon"
      :show-indicator="true"
    />
  </div>
</template>
