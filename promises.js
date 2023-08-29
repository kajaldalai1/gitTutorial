const posts = [];
let lastUserActivityTime = null;

function updateLastUserActivityTime() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      lastUserActivityTime = new Date();
      resolve();
    }, 1000);
  });
}

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      resolve();
    }, 1000);
  });
}

function deleteLastPost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (posts.length > 0) {
        posts.pop();
        resolve();
      } else {
        reject("No posts to delete");
      }
    }, 1000);
  });
}

// Chaining promises
createPost({ title: "Post 1" })
  .then(() => updateLastUserActivityTime())
  .then(() => {
    console.log("Posts:", posts);
    console.log("Last Activity Time:", lastUserActivityTime);
  })
  .then(() => deleteLastPost())
  .then(() => {
    console.log("Updated Posts:", posts);
  })
  .catch(error => console.error(error));
