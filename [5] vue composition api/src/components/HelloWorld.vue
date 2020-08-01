<template>
  <div>
    {{ message }}
    <hr />
    <input v-model="obj.name" @input="onChange" />
    <br />
    <child :name="obj.name"></child>
    <hr />
    <h2>Observable Test</h2>
    <input v-model="name" @input="onChange" />
    <br />
    <child :name="name"></child>
    <hr />
    age: {{ age }}
    <child v-bind="childProps"></child>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  Ref
} from "@vue/composition-api";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Child, { ChildPropsType } from "./Child.vue";
import { UnwrapRef } from "@vue/composition-api/dist/reactivity";

export default defineComponent({
  name: "HelloWorld",
  components: { Child },
  setup() {
    interface StateType {
      message: string;
      name: string;
    }
    const state: UnwrapRef<StateType> = reactive({
      message: "hello",
      name: "wanzin"
    });

    const age: Ref<number> = ref(30);

    const obj = {
      name: "wanzin"
    };

    const childProps: UnwrapRef<ChildPropsType> = reactive({
      name: "bongsu",
      age: 31
    });

    setTimeout(() => {
      state.message = "바보 권봉수";
      age.value = 18;
    }, 1000);

    return {
      ...toRefs(state),
      childProps,
      age,
      obj,
      onChange(val: any) {
        //
      }
    };
  }
});
</script>

<style lang="scss" scoped></style>
