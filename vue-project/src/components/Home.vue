<script setup>
import { onMounted, ref } from 'vue';
import getData from '../scripts/fetch';
import endpoints from '../scripts/endpoints';
import Comment from './Comment.vue';


const data = ref([]);


onMounted(async () => {
    let options = {
        method: 'GET',
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        }
    };
    data.value = await getData(endpoints.news, options);
})



</script>

<template>
    <h1 v-if="data">hello from home template</h1>
    <ul :id="id" :key="id" v-for="(article, id) in data.value">
        <li class="article">
            <h2>{{ article.name }}</h2>
            <p>{{ article.datePublished.slice(0, 10) }}</p>
            <img v-if="article.image" :src="article.image.thumbnail.contentUrl" alt="article img" />
            <img v-else src="../assets/not-found-image-15383864787lu.jpg" alt="article img" />
            <p>{{ article.description }}</p>
            <Comment :id='id'/>

        </li>
    </ul>

</template>


<style scoped>
.article {
    border: 1px solid black;
    margin: 10px;
    padding: 7px;
    list-style: none outside;
}
</style>
