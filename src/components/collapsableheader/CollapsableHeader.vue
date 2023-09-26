<template>
  <div class="collapse-wrapper" :class="{ collapsed: stores.size > 0 }">
    <div class="top-bar title">
      <div class="title-text">WinRater</div>
    </div>
    <div class="top-bar pull-down">
      <img id="pull-down-icon" src="../../icons/pulldown.png" alt="Pull down arrow" />
    </div>
    <div class="description">
      <div class="description-section">
        <p>
          With the WinRater you can visualize the win ratio development for fumbbl coaches. To start
          simply enter the coach name into the search box and hit the add button. You can load the
          data for several coaches simultaneously and compare their development.
        </p>
        <p>
          Currently the horizontal position of data points is only based on the number of games in
          the given dataset and not on the time when the games were played.
        </p>
        <p>
          For each coach multiple graph configs can be added. In each of these configs you can
          filter games be the different divisions. A config is assigned a random color which can be
          changed with the color picker in the config header. With the orange edit button on a
          config a panel opens allowing you to further customize the data set.
        </p>
      </div>
      <div class="description-section">
        <p>
          You can reduce the size of the data set by either count (i.e. first 100 games, games 75 -
          157 etc.), being a range of match ids or certain dates. This filter is applied after the
          division filter.
        </p>
        <p>In addition you can choose between two aggregation modes:</p>
        <ul>
          <li>
            Sum: Default mode, the win ratio will be summed up showing the total win ratio up until
            the specific match
          </li>
          <li>
            Sliding window: Instead of a sum this shows the win ratio for all sets of
            <i>n</i> consecutive games
          </li>
        </ul>
        <p>
          To open a specific match in your browser you can click the dot over data point in the
          graph (the tooltip itself is not clickable due to technical issues with tippy.js)
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMatchStore } from '../pinia/store'
import { storeToRefs } from 'pinia'

const matchStore = useMatchStore()
const { stores } = storeToRefs(matchStore)
</script>

<style scoped>
.collapse-wrapper {
  width: 100%;
}

.collapsed > .description {
  height: 0;
}

.description-section,
.collapsed:hover > .description-section {
  background: var(--color-element-background);
  border: black 2px solid;
  border-radius: 1em;
  font-size: 0.85em;
  padding: 0.5em;
  margin: 1em 1em 0 1em;
  max-width: 50em;
}

.description-section > p {
  margin: 0.5em;
}

.description,
.collapsed:hover > .description {
  display: flex;
  flex-flow: row;
  height: auto;
  margin: auto;
  width: fit-content;
}

@media (max-width: 50em) {
  .description,
  .collapsed:hover > .description {
    flex-flow: row wrap;
  }
}

.collapsed > .top-bar.pull-down {
  height: var(--line-height);
  opacity: 1;
  padding: 0.2em 0;
  text-align: center;
}

.collapsed > .top-bar.pull-down > #pull-down-icon {
  height: var(--line-height);
  transition: opacity 0.25s ease;
}

.collapsed > .top-bar.title > .title-text {
  height: 0;
  opacity: 0;
}

.collapsed:hover > .top-bar.pull-down > #pull-down-icon {
  opacity: 0;
}

.description {
  background: var(--color-section-background);
  display: flex;
  overflow: hidden;
}

.top-bar {
  background: var(--color-title-background);
  color: var(--color-element-background);
}

.top-bar.pull-down {
  height: 0;
  opacity: 0;
  transition: height 0.5s 0.5s ease-out, opacity 0.5s 0.5s ease-out;
}

.top-bar.title {
  font-size: xxx-large;
  font-weight: bold;
  overflow: hidden;
  text-align: center;
}

.top-bar.title > .title-text {
  height: var(--line-height);
  line-height: var(--line-height);
  opacity: 1;
  transition: height 0.5s ease-in, opacity 0.5s ease-in;
}
</style>
