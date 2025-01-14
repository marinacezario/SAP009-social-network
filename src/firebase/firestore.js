import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  onSnapshot,
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';

import { app } from './configuration.js';

const db = getFirestore(app);

async function newPost(textpost) {
  const authentication = getAuth(app);
  const currentDate = new Date();
  const createPosts = {
    userId: authentication.currentUser.uid,
    username: authentication.currentUser.displayName,
    date: currentDate,
    post: textpost,
    likes: [],
  };
  await addDoc(collection(db, 'posts'), createPosts);
}

const getUserData = () => {
  const auth = getAuth(app);
  return auth.currentUser;
};

async function findPosts(showPosts) {
  const queryOrder = query(collection(db, 'posts'), orderBy('date', 'desc'));
  onSnapshot(queryOrder, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((post) => {
      posts.push({ ...post.data(), postId: post.id });
    });
    showPosts(posts);
  });
}

async function likePosts(postId, userId) {
  await updateDoc(doc(db, 'posts', postId), {
    likes: arrayUnion(userId),
  });
}
async function dislikePosts(postId, userId) {
  await updateDoc(doc(db, 'posts', postId), {
    likes: arrayRemove(userId),
  });
}

async function getPostById(postId) {
  const postRef = doc(db, 'posts', postId);
  const post = await getDoc(postRef);
  return post.data();
}

async function like(postId, userId) {
  const post = await getPostById(postId);
  if (post.likes.includes(userId)) {
    await dislikePosts(postId, userId);
    return { liked: false, count: post.likes.length - 1 };
  }
  await likePosts(postId, userId);
  return { liked: true, count: post.likes.length + 1 };
}

async function editPost(postId, editContent) {
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('pt-BR');
  await updateDoc(doc(db, 'posts', postId), {
    post: editContent,
    editDate: dateString,
  });
}

const deletePost = async (postId) => deleteDoc(doc(db, 'posts', postId));

export {
  newPost,
  getUserData,
  findPosts,
  editPost,
  deletePost,
  like,
};
