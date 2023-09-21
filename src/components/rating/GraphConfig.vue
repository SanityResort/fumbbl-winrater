<style scoped>
.config {
  --color-circle-size: 1.9em;
}

.config-color {
  border-radius: 25%;
  box-shadow: inset 0 0 0 0.1em black, inset 0 0 0 0.2em white;
  height: var(--line-height);
  margin-right: 1em;
  width: calc(var(--line-height) * 2);
}

.config-header {
  background: var(--color-element-header-background);
  border-start-end-radius: var(--border-radius-element);
  border-start-start-radius: var(--border-radius-element);
  color: var(--color-text-header);
  padding: 0.25em 2.5em;
  position: relative;
}

.config-title {
  display: flex;
  flex-flow: row;
  margin: auto;
  width: fit-content;
  user-select: none;
}

.editConfig {
  position: absolute;
  top: 0;
  left: 0;
}

.labels {
  display: flex;
  flex-flow: row wrap;
  font-size: 0.75em;
  margin: 0.2em;
}

.removeStore {
  position: absolute;
  top: 0;
  right: 0;
}
</style>

<template>
  <div class="config">
    <div class="config-header">
      <IconButton
        class="editConfig"
        :src="editIcon"
        alt="Edit config"
        :callback="edit"
        :show-indicator="false"
      />
      <div class="config-title">
        <input type="color" class="config-color" :value="background" @change="updateColor" />
        <div>{{ config.matches().length }} (#{{ config.configNumber }})</div>
      </div>
      <IconButton
        v-if="showRemoveButton"
        class="removeStore"
        alt="Remove config"
        :callback="remove"
        :src="removeIcon"
        :show-indicator="true"
      />
    </div>
    <div class="labels">
      <CategoryLabel
        v-for="category in storeCategories"
        :key="category.name"
        :category="category"
        :active="isActive(category)"
        :callback="toggleCategory"
        :match-provider="config"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryLabel from './CategoryLabel.vue'
import { Category } from './match'
import { GraphConfig, Store } from './store'
import IconButton from '../iconButton/IconButton.vue'
import removeIcon from '../../icons/removeIcon.png'
import editIcon from '../../icons/editIcon.png'
import { storeToRefs } from 'pinia'
import { useMatchStore } from '../pinia/store'

const props = defineProps({
  config: GraphConfig,
  store: Store,
  showRemoveButton: Boolean
})

const config = props.config as GraphConfig
const background = config.color.hex()

const categories: Category[] = config.categories

const store = props.store as Store
const storeCategories = store.categories

function updateColor(value: Event) {
  const newColorHex = (value.target as HTMLInputElement).value
  config.updateHexColor(newColorHex)
}

function isActive(category: Category): boolean {
  return categories.indexOf(category) >= 0
}

function remove() {
  store.removeConfig(config)
}

function toggleCategory(category: Category) {
  config.toggleCategory(category)
}

function edit() {
  const { editedConfig } = storeToRefs(useMatchStore())
  editedConfig.value = config
}
</script>
