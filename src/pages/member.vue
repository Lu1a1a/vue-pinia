<script setup>
import { watch } from "vue";
import { storeToRefs } from "pinia";
import RadioType from "../components/RadioType/index.vue";
import { useMember } from "../store/member.js";

//只有watch保留，其餘都放進pinia
const member = useMember();
const { info } = storeToRefs(member);
const { router } = member;

//問題:
//1.不確定router相關的是否該放進pinia
//2.在watch及pinia裡的info有做小修改。如果點擊中等會員然後f5刷新頁面，頁面是保持一樣沒有問題
//但如果是點擊其他router切換，會造成頁面與上次離開時不一致，所以增加watch屬性immediate，讓每次頁面都檢查一次，有想過用keepAlive但沒有作用
//有在想是因為直接使用tagName而不是利用component is:來切換所以沒反應?(不確定)

watch(
  info,
  (newVal) => {
    router.push(`/member/${newVal}`);
  },
  {
    immediate: true,
  },
);
</script>
<template>
  <div class="content flex-center">
    <RadioType v-model="info" />
    <main class="flex-center">
      <router-view />
    </main>
  </div>
</template>
<style scoped>
.content {
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  color: #fff;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
main {
  width: 400px;
  height: 400px;
  background-color: darkgray;
}
</style>
