import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
export const useCourses = defineStore("courses", () => {
  const route = useRoute();
  const router = useRouter();
  const coursesArr = ref([]);
  const coursesObj = ref({});
  const gotoCourses = (id) => {
    router.push(`/courses/${id}`);
  };
  const goBack = () => {
    router.go(-1);
  };
  const coursesArrRes = async () => {
    const res = await axios.get("https://vue-lessons-api.vercel.app/courses/list");
    coursesArr.value = res.data;
  };
  const coursesRes = async () => {
    const res = await axios.get(`https://vue-lessons-api.vercel.app/courses/${route.params.id}`);
    coursesObj.value = res.data.data[0];
    console.log(coursesObj.value);
  };
  return { gotoCourses, goBack, coursesArrRes, coursesArr, coursesRes, coursesObj };
});
