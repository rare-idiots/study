<template>
  <div>
    <h3>{{ name }}</h3>
    <h3>{{ age }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export interface ChildPropsType {
  name?: string;
  age: number;
}

export default defineComponent({
  name: "Child",
  props: {
    name: {
      type: String,
      default: ""
    },
    age: {
      type: Number,
      default: 0
    }
  },
  setup() {
    return {};
  }
});
</script>

<style lang="postcss" scoped></style>
