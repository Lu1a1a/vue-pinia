import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export const useMember = defineStore("member", () => {
  const route = useRoute();
  const router = useRouter();
  const info = ref(route.name === "member" ? "" : route.name);
  return { router, info };
});
