<script setup>
import { onMounted, ref } from "vue";
import { useCourses } from "../../store/courses";
import { storeToRefs } from "pinia";
const courses = useCourses();
const { coursesRes, goBack } = courses;
const { coursesObj } = storeToRefs(courses);
//問題:
//1.與index.vue一樣，API非同步問題
//2.由於是點擊之後去透過網址請求API，所以會有時間等待，出現的問題是如果上一張點擊JavaScript & TypeScript，而現在點擊Vue3 高效入門與實踐，會先出現幾秒JS的圖，過幾秒才正確顯示vue3圖示，是否有解決方法，目前我想到的是在點擊時讓他先執行寫好的loading動效，之後等待資料拿回來後再透過檢查等關閉動效

onMounted(() => {
  coursesRes();
});
</script>
<template>
  <div class="courses_box flex-center">
    <div class="content flex-center flex-col">
      <img :src="coursesObj.photo" alt="" />
      <p>{{ coursesObj.description }}</p>
      <button @click="goBack">返回</button>
    </div>
  </div>
</template>
<style scoped>
.courses_box {
  width: 100%;
  height: 100%;
  background-color: #333;
}
img {
  margin-bottom: 20px;
  width: 100%;
  height: 346px;
  background-color: #555;
}
p {
  display: block;
  font-size: 20px;
  color: #fff;
  line-height: 38px;
  height: 152px;
}
.content {
  width: 704px;
}
button {
  cursor: pointer;
  width: 160px;
  height: 30px;
  border-radius: 50px;
  margin-top: 20px;
  background-color: #7dd19f;
  border: 0px;
  color: #001c3c;
  font-size: 16px;
}
</style>
