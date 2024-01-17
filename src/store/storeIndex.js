import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import client from "../../client.js";

export const useSanityStore = defineStore("sanityStore", () => {
  const menu_is_active = ref(false);
  let posts = reactive([]);
  const authors = ref([]);
  const total_posts = ref(0);

  const toggleMenu = () => {
    menu_is_active.value = !menu_is_active.value;
  };

  const fetchPosts = () => {
    const query = `*[_type == "post"] | order(_createdAt desc) {
        ...,
        author->
    }`;

    client.fetch(query).then((data) => {
      posts.value = data;
    });
  };

  //   const sortedPosts = computed(() => {
  //     return posts.value.sort(
  //       (a, b) =>
  //         new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
  //     );
  //   });

  function updatePost(post) {
    console.log("I am the post", post);
    posts.value.map((p) => {
      console.log("A list of ps", p);
      if (p._id === post._id) {
        return post; // Return the updated post
      } else {
        return p; // Return the original post
      }
    });
  }

  function replacePost(post) {
    console.log("I am the post", post);
    const index = posts.findIndex((p) => p._id === post._id);
    if (index !== -1) {
      posts[index] = post;
      console.log("oh well...");
    }
  }

  return {
    menu_is_active,
    posts,
    authors,
    total_posts,
    toggleMenu,
    fetchPosts,
    updatePost,
    replacePost,
    // sortedPosts,
  };
});
