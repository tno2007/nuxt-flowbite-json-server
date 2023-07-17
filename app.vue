+
<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

const layouts = ["default", "flowbite"];
const index = ref(0);
// const currentLayout = ref(layouts[index.value]);

setPageLayout(layouts[index.value]);

const toggle = () => {
  ++index.value;
  if (index.value >= layouts.length) {
    index.value = 0;
  }
  setPageLayout(layouts[index.value]);
};

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <!--<NuxtLayout :name="currentLayout">-->
  <NuxtLayout>
    <p class="font-bold">Some page content</p>
    <br />
    index:
    <pre>{{ index }}</pre>
    <br />
    <button
      type="button"
      @click="toggle"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Default
    </button>
  </NuxtLayout>
</template>
