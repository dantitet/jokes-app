import axios from 'axios';

const fetchJoke = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://official-joke-api.appspot.com/random_joke')
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {
  fetchJoke,
};
