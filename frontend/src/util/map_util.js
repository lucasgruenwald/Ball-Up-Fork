import axios from 'axios';


export const getAddress = (address) => {
  debugger
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
    address: '22 Main st Boston MA',
    key: 'AIzaSyA9w4yZlROGaoP6q-a338pBQU2haj_3v6s'
  }
)};

// import Geocodio from 'geocodio-library-node';
// const geocoder = new Geocodio('92c642cce52736158878452858b9bb46e89755e');



// export const getAdress = (adress) => {
//   return geocoder.geocode(`${adress}`)
//   .then(response => {
//     console.log(response);
//   })
// };


