import React, { useState } from "react";
import axios from "axios";
import userProfileStore from "../store/userProfile";

export const createNewAccount = async (credentials = null) => {
  if (!credentials) return;
  await axios
    .post("http://206.189.91.54/api/v1/auth", {
      email: credentials.email,
      password: credentials.password,
      password_confirmation: credentials.password_confirmation,
    })
    .then((res) => {
      console.log(res);
      alert("Successfully Created");
    })
    .catch((ex) => {
      alert("Something went wrong. Please check the server API and try again");
      console.error(ex);
    });
};

export const loginAccount = async (credentials = null) => {  
  try {
  const response = await axios.post("http://206.189.91.54/api/v1/auth/sign_in", {
    email: credentials.email,
    password: credentials.password,
  })

  console.log(response)
  alert("Login Success")
  return {...response.headers, id: response.data.data.id}
  } catch {
    alert("Something went wrong. Please check the server API and try again");
  }
   
};

export const createChannel = async (credentials = null) => {
  console.log(credentials.header)
 if(!credentials) return;
     await axios.post("http://206.189.91.54/api/v1/channels", {
      name: credentials.name,
      user_ids: credentials.member,
    },{headers: credentials.header}).then((res) => {
      console.log(res);
      alert("Successfully Created");
    })
    .catch((ex) => {
      alert("Something went wrong. Please check the server API and try again");
      console.error(ex);
    }); 
};

export const addUserToChannel = (credentials = null) => {};

export const sendChannelMessage = (credentials = null) => {};

export const getChannelMessage = (credentials = null) => {};

export const sendDirectMessage = async (credentials = null) => {

  if(!credentials) return;
  await axios.post("http://206.189.91.54/api/v1/messages", {
   receiver_id: credentials.receiver_id,
   receiver_class: credentials.receiver_class,
   body: credentials.body,
 },{headers: credentials.header}).then((res) => {
   console.log(res);
   alert("Message Sent");
 })
 .catch((ex) => {
   alert("Something went wrong. Please check the server API and try again");
   console.error(ex);
 }); 
  
};

export const getDirectMessages = async (
  credentials = null,
  receiver_id = 1, 
  receiver_class = "User"
) => {
  try {
    const { data } = await axios.get(
      // `http://206.189.91.54/api/v1/messages?receiver_id=${receiver_id.trim() === "" ? "1" : receiver_id}&receiver_class=${receiver_class}`,
      `http://206.189.91.54/api/v1/messages?receiver_id=${receiver_id ? receiver_id : "1" }&receiver_class=${receiver_class}`,

      { headers: credentials.header }
      // { receiver_id: credentials.receiver_id,
      //   receiver_class: credentials.receiver_class}, 
    );

    return data.data;
  } catch {
    // alert("Something went wrong. Please check the server API and try again");
    return [];
  }
};

export const getAllUsers = async (credentials = null) => {  
  if (!credentials) return  
  const {data} = await axios.get("http://206.189.91.54/api/v1/users",{ headers: credentials});
  return data.data
};

export const getAllChannels = async (credentials = null) => {
  if (!credentials) return  
  const {data} = await axios.get("http://206.189.91.54/api/v1/channels",{ headers: credentials});
  return data.data
};
