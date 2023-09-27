<script lang="ts" setup>
import CoachLookup from '../../components/coachLocator/Component.vue'
import Rating from '../../components/rating/Component.vue'
import Graph from '../../components/graph/Component.vue'
import { useMatchStore } from '../../components/pinia/store'
import { storeToRefs } from 'pinia'
import CollapsableHeader from '../../components/collapsableheader/CollapsableHeader.vue'
import ConfigEditor from '../../components/editor/ConfigEditor.vue'

const matchStore = useMatchStore()
const { stores, editedConfig } = storeToRefs(matchStore)
</script>

<template>
  <header>
    <CollapsableHeader />
    <CoachLookup class="lookup" />
  </header>

  <main>
    <div class="separator" />
    <ConfigEditor v-if="editedConfig" />
    <div class="ratings">
      <Rating v-for="store in stores.values()" :key="store.coachName" :store="store" />
    </div>
    <Graph />
  </main>
</template>

<style scoped>
@import './winrater.less';
</style>
