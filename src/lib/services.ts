import axios from 'axios';

export async function getPopularNews() {
  return await axios
    .get(
      'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=ELOcWDw61Kg4rsOghjlig4kuovmsCea1'
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    });
}
