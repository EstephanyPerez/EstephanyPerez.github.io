import { API } from "./API";

export async function getRatingsByPublication(idPublication) {
   let responseData = [];
   await API.get("/api/publication/rating/findByPublication", {
      params: { id: idPublication }
   })
      .then(res => {
         console.log("RATINGS - como mandan: ", res.data.body);
         responseData = res.data.body.map(e => {
            return {
               profile: {
                  avatar: e.picture,
                  name: e.user
               },
               score: e.score,
               comment: e.comment
            };
         });
      })
      .catch(err => console.log(err));
   return responseData;
}
