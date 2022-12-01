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
  return response.headers
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

export const getDirectMessages = async (credentials = null, receiver = null) => {
  if (!credentials || !receiver) return  
 try {
  const {data} = await axios.get(`http://206.189.91.54/api/v1/messages?receiver_id=${receiver.receiver_id}&receiver_class=${receiver.receiver_class}`, { headers: credentials.header},
  // { receiver_id: credentials.receiver_id,
  //   receiver_class: credentials.receiver_class},
 )
//  const response = await axios.get("http://206.189.91.54/api/v1/messages?receiver_id=2986&receiver_class=User", { headers: credentials.header},
//   { receiver_id: credentials.receiver_id,
//     receiver_class: credentials.receiver_class},
//  )
//  console.log(response)
console.log(data)
  return data.data}
  catch {
    // alert("Something went wrong. Please check the server API and try again");
    return []
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
