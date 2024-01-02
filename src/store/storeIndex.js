import { defineStore } from "pinia";
import { ref, computed } from "vue";
import client from "../../client.js";

export const useSanityStore = defineStore("sanityStore", () => {
  const menu_is_active = ref(false);
  const posts = ref([]);
  const authors = ref([]);
  const total_posts = ref(0);

  const toggleMenu = () => {
    menu_is_active.value = !menu_is_active.value;
  };

  const fetchPosts = (limit) => {
    const query = `*[_type == "post"] {
            ...,
            author->
        } | order(_createdAt desc)${limit ? `[0...${limit}]` : ""}`;

    client.fetch(query).then((data) => {
      posts.value = data;
    });
  };

  const sortedPosts = computed(() => {
    console.log(posts.value, "posts");
    return posts.value.sort(
      (a, b) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );
  });

  return {
    menu_is_active,
    posts,
    authors,
    total_posts,
    toggleMenu,
    fetchPosts,
    sortedPosts,
  };
});
