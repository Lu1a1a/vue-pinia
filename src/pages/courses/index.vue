<script setup>
import { onMounted, ref } from "vue";
import { useCourses } from "../../store/courses";
import { storeToRefs } from "pinia";
const courses = useCourses();
const { coursesArrRes, gotoCourses } = courses;
const { coursesArr } = storeToRefs(courses);
//問題:
//1.全部都放進pinia裡，需要的引入，但API引入出來時會有非同步的問題需要把onMounted加上async await，但我不想加(因為目前沒看過有人加所以沒有加)，但我這樣寫好像也不會出錯(補充有邏輯說明，不確定是否這樣寫是否可以)，而也想不到其他方法了....

//補充:
//首先pinia用ref定義，這裡用storeToRefs引入(保持響應)，在mounted時請求api，改變coursesArr，所以一開始就算為空值也會在拿回資料後再次渲染正確的資料
onMounted(() => {
  coursesArrRes();
});
</script>
<template>
  <div class="box">
    <div v-if="coursesArr.length === 0" class="flex-around w-1000px">
      <a class="card bg-gray-ddd">
        <div class="sk-img"></div>
      </a>
      <a class="card bg-gray-ddd">
        <div class="sk-img"></div>
      </a>
      <a class="card bg-gray-ddd">
        <div class="sk-img"></div>
      </a>
    </div>
    <div v-else class="flex-around w-1000px">
      <a class="card" v-for="item in coursesArr" :key="item.id" @click="gotoCourses(item.id)">
        <p class="more" @click.stop="openUrl(item.moreUrl)">觀看更多</p>
        <img :src="item.photo" alt="" />
        <div class="content">
          <h1>{{ item.name }}</h1>
          <p class="description">
            {{ item.description }}
          </p>
          <div class="teacher-box">
            <div class="teach-img">
              <img class="teacher" :src="item.teacher.img" alt="" />
              <p>{{ item.teacher.name }}</p>
            </div>
            <h2>NTD: {{ item.money }}</h2>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-around {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}
.w-1000px {
  width: 1000px;
}
a.card {
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 318px;
  height: 388px;
  padding: 0px;
  border-radius: 5px;
  margin: 0px 10px 0px 10px;
  opacity: 0.9;
  transition: opacity 0.2s;
  background-color: rgb(249, 249, 249);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.bg-gray-ddd {
  background-color: #fff !important;
}

.sk-img {
  width: 100%;
  height: 155px;
  background-color: #ddd;
}
a.card:hover {
  opacity: 1;
}
a.card > img {
  width: 100%;
}

p.more {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #00000057;
  color: white;
  padding: 5px 10px;
  border-radius: 0px 0px 0px 5px;
  font-size: 12px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: #393939;
}
.content > h1 {
  width: 100%;
  font-size: 26px;
  height: 100%;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
}

.content > .description {
  font-size: 12px;
  text-align: left;
  padding: 0px 25px 10px 25px;
}
.teacher-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #393939;
  padding: 10px 18px 20px 18px;
}
.teacher-box > h2 {
  font-size: 13px;
}
.teacher-box > .teach-img {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.teacher-box > .teach-img > img {
  border-radius: 25px;
  margin-right: 10px;
  width: 25px;
  height: 25px;
}
button {
  cursor: pointer;
  width: 200px;
  height: 30px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0 auto;
  border-radius: 30px;
  background-color: lightseagreen;
  color: #fff;
  font-size: 20px;
}
</style>
