<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useSanityStore } from "@/store/storeIndex";
import PostCard from "@/components/PostCard.vue";
import client from "../../client";

const store = useSanityStore();
const subscription = ref(null);
let toPost = null;
const posts = store.posts;

onMounted(() => {
  // store.fetchPost()
  const query = '*[_type == "post"]';
  store.fetchPosts();

  subscription.value = client.listen(query).subscribe(async (update) => {
    // switch (update.transition) {
    //   case "update":
    //     console.log("post updated", update);
    //     client.getDocument(update.result.author._ref).then((author) => {
    //       let post = null;

    //       if (update.result.author._ref) {
    //         post = {
    //           ...update.result,
    //           author,
    //         };
    //       }

    //       return store.updatePost(post);
    //     });
    //     // await client.getDocument(update.result.author._ref).then((author) => {
    //     //   // const post = {
    //     //   //   ...update.result,
    //     //   //   author,
    //     //   // };
    //     //   store.updatePost({
    //     //     ...update.result,
    //     //     author,
    //     //   });
    //     //   console.log("author", author);
    //     // });
    //     break;
    //   case "appear":
    //     console.log("Post appeared", update);
    //     break;
    //   case "disappear":
    //     console.log("Post disappeared", update);
    //     break;
    // }
    if (update.transition === "update") {
      try {
        const author = await client.getDocument(update.result.author._ref);
        toPost = {
          ...update.result,
          author,
        };
        // store.updatePost(toPost);
        store.replacePost(toPost);
        console.log("post updated", toPost);
      } catch (error) {
        console.log("error posting update", error);
      }
    }
  });
});

onUnmounted(() => {
  subscription.value.unsubscribe();
});
</script>

<template>
  <main class="home-page">
    <section class="container mx-auto p-4">
      <h1 class="text-2xl mb-8">Latest Posts</h1>

      <div class="grid gap-4">
        <PostCard v-for="(post, i) in posts" :key="i" :post="post" />
      </div>
    </section>
  </main>
</template>
