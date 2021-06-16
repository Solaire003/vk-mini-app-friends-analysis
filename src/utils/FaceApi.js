import * as faceapi from "face-api.js";
import axios from "axios";

export async function initFaceapi() {
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  // // await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  // // await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  await faceapi.nets.faceExpressionNet.loadFromUri("/models");
  console.log("faceapi loaded!", faceapi.nets);
}

export function sortResult(arr) {
  const expressions = new Set(arr.map((el) => el.expresion));
  return [...expressions].map((el) => {
    return arr.filter(({ expresion }) => expresion === el);
  });
}

export function getResult(photos = [], number = 1) {
  return sortResult(
    photos.map((el) => {
      if (el.analise.length) {
        const expresion = Object.entries(el.analise[0].expressions);
        console.log("expresion", expresion);

        expresion.sort((a, b) => {
          return Math.abs(number - a[1]) - Math.abs(number - b[1]);
        });

        console.log("SORTED", expresion);
        return {
          url: el.url,
          expresion: expresion[0][0],
        };
      }

      return {
        url: el.url,
        expresion: "null",
      };
    })
  );
}

export async function detectImage(photos) {
  const formattedPhotos = photos.map(
    ({ sizes }) => sizes[sizes.length - 1].url
  );
  const all = [];

  formattedPhotos.forEach((el) => {
    const detect = async () => {
      const img = await faceapi.fetchImage(el);
      return faceapi.detectAllFaces(img).withFaceExpressions();
    };

    all.push(detect());
  });

  return await Promise.all(all).then((res) => {
    return res.map((el, i) => {
      return {
        url: formattedPhotos[i],
        analise: el,
      };
    });
  });
}

export async function detectImageOnServer(photos) {
  console.log("photos for analize", photos);
  axios
    .post("http://localhost:3000/", {
      photos,
    })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
