// const myKeyGoogleApi = "AIzaSyDUkLYsyGzoEavreh4lSYASKp8M6lj4B3E";

// export default function booksFetcher(input) {
//   const { setResults } = useContext(AppContext);
//   const resultFetch = fetch(
//     `https://www.googleapis.com/books/v1/volumes?q=intitle:${input}&key=${myKeyGoogleApi}`
//   )
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error(res.statusText);
//       }
//     })
//     .then((res) => {
//       if (res.totalItems >= 1) {
//         return res;
//       } else {
//         throw new Error(res.Response);
//       }
//     })
//     .catch(function (error) {
//       console.log(error.message);
//     });
//   return resultFetch;
// }
