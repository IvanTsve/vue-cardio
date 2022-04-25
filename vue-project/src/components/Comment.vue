<script setup>
import { ref } from 'vue';
import getData from '../scripts/fetch';


const comment = ref('');
const anon = ref(true);
const comments = ref({});

function onAddComment(e) {
    const data = {
        comment: comment.value,
        anon: anon.value,
        postid: e.target.id
    };
}

async function onShowComments(e) {
    let res = await getData(`mockDB/comments.json`);
    comments.value = res.comments.filter(x => x.postId == e.target.parentNode.id);
}

</script>


<template>
    <form @submit.prevent="onAddComment" :id="id">
        <textarea v-model="comment" :id="id"></textarea>
        <div>
            <input type="checkbox" :id="id" v-model="anon" />
            <label :for="id">Anon</label>
        </div>
        <ul>
            <li v-for="(comment) in comments" :key="comment.id">
                <h4>{{ comment.email }}</h4>
                <p>{{ comment.body }}</p>
            </li>
        </ul>
        <button :id="id" >Add comment</button>
        <button :id="id" @click="onShowComments">Show comments</button>
    </form>
</template>


<style scoped>
</style>