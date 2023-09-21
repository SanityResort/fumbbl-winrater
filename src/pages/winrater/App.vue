<script lang="ts" setup>
import CoachLookup from '../../components/coachLocator/Component.vue'
import Rating from '../../components/rating/Component.vue'
import Graph from '../../components/graph/Component.vue'
import { useMatchStore } from '../../components/pinia/store'
import { storeToRefs } from 'pinia'
import CollapsableHeader from '../../components/collapsableheader/CollapsableHeader.vue'
import ConfigEditor from '../../components/editor/ConfigEditor.vue'

const matchStore = useMatchStore()
const { modificationCounter, stores, editedConfig } = storeToRefs(matchStore)
</script>

<template>
  <header>
    <CollapsableHeader />
    <CoachLookup class="lookup" />
  </header>

  <main
    :class="{
      'fill-height': modificationCounter === 0 || stores.size === 0,
      'fit-content': modificationCounter !== 0 && stores.size !== 0
    }"
  >
    <div class="separator" />
    <ConfigEditor v-if="editedConfig" />
    <div class="ratings">
      <Rating v-for="store in stores.values()" :key="store.coachName" :store="store" />
    </div>
    <Graph />
  </main>
</template>

<style scoped>
header {
  background: var(--color-section-background);
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  place-items: flex-start;
  width: 100%;
}

.lookup {
  margin: 0 auto;
}

main {
  background: var(--color-section-background);
  display: flex;
  flex-flow: column;
  padding: 0 0.5em;
}

.fill-height {
  height: 100%;
}

.fit-content {
  height: fit-content;
}

.ratings {
  display: flex;
  flex-flow: row wrap;
}
</style>
