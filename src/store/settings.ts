import { defineStore } from "pinia";
import globalSettings from "@/settings";
import { ref } from "vue";

const useSettingsStore = defineStore("settings", () => {
  const settings = ref(globalSettings);
  return { settings };
});
export default useSettingsStore;
