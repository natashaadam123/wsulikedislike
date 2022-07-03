import { APIES, SERVER_END_POINT, ThumBooleans } from "../constant";

const endPoint = SERVER_END_POINT + APIES.THUM;
const headers = {
  "content-type": "application/json",
};

export const Get_thum = async () => {
  return await fetch(endPoint, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
    });
};

export const Thumup = async () => {
  return await fetch(endPoint, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      [ThumBooleans.field]: ThumBooleans.YES,
    }),
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
    });
};

export const Thumdown = async () => {
  return await fetch(endPoint, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      [ThumBooleans.field]: ThumBooleans.NO,
    }),
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
    });
};

export const ThumEmpty = async () => {
  return await fetch(endPoint, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      [ThumBooleans.field]: ThumBooleans.EMPTY,
    }),
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
    });
};
