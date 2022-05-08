<script setup>
import { onMounted, ref,reactive } from 'vue';
import getData from '../scripts/fetch';
import endpoints from '../scripts/endpoints';
import Comment from './Comment.vue';


const data = ref([]);
let likedArticles = reactive([]);

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
    console.log();
  

})

function onLikedArticles(e) {
    console.log(e.target.parentNode);

    likedArticles.push(e.target.parentNode.id);

}

</script>

<template>
{{likedArticles}}

    <h1 v-if="data">hello from home template</h1>
    <ul>
        <li class="article" :key="id" :id="id" v-for="(article, id) in data.value">
            <h2>{{ article.name }}</h2>
            <p>{{ article.datePublished.slice(0, 10) }}</p>
            <img v-if="article.image" :src="article.image.thumbnail.contentUrl" alt="article img" />
            <img v-else src="../assets/not-found-image-15383864787lu.jpg" alt="article img" />
            <p>{{ article.description }}</p>
            <Comment :id="id"  />
            <button @click="onLikedArticles" :id="id">Like article</button>

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
