<script setup>
import { ref, computed, reactive } from 'vue';
import getData from '../scripts/fetch';

let comment = ref('');
let anon = ref(true);
// let comments = ref({});
let comments = reactive({});


function onAddComment(e) {
    let data = {
        comment: comment.value,
        anon: anon.value,
        postid: e.target.id
    };
}



async function onShowComments(e) {
    let res = await getData(`mockDB/comments.json`);
    //  comments.value = res.comments.filter(x => x.postId == e.target.parentNode.id);
    let articleComments = computed(() => {
        return res.comments.filter(x => x.postId == e.target.parentNode.id);
    });
    comments.value = articleComments;
}

</script>


<template>
    <form @submit.prevent="onAddComment">
        <textarea v-model="comment"></textarea>
        <div>
            <input type="checkbox" v-model="anon" />
            <label>Anon</label>
        </div>
        <ul :id="id">
            <li v-for="(comment,id) in comments.value" :key="comment.postId" :id="id">
                <h4>{{ comment.email }}</h4>
                <p>{{ comment.body }}</p>
            </li>
        </ul>

    </form>
    <button @click="onShowComments">Show comments</button>
</template>


<style scoped>
</style>