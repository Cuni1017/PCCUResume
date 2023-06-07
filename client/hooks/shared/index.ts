import { getCookie } from "cookies-next";

const JWT = getCookie("JWT");

export const defaultTokenHeaders = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RVREVOVCIsImlkIjoiUzIwMjMwMzA4MjAiLCJ1c2VybmFtZSI6ImNvcnkiLCJzdWIiOiJjb3J5IiwiaWF0IjoxNjgwODYzNDM1LCJleHAiOjE2NzkxNjA0Njd9.tKWBTuGFs1GoD2xnM1hxWlXoztjsfbWSKBA5eJQaVc0`,
    "Content-Type": "Application/json"
  },
}

export const defaultSelfTokenHeaders = {
  headers: {
    Authorization: `Bearer ${JWT}`,
    "Content-Type": "Application/json"
  },
}

export const fileHeaders = {
  headers: {
    Authorization: `Bearer ${JWT}`,
    "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>"
  }
}