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
    return { ...response.headers, id: response.data.data.id }
  } catch {
    alert("Something went wrong. Please check the server API and try again");
  }

};

export const createChannel = async (credentials = null) => {
  console.log(credentials.header)
  if (!credentials) return;
  await axios.post("http://206.189.91.54/api/v1/channels", {
    name: credentials.name,
    user_ids: credentials.member,
  }, { headers: credentials.header }).then((res) => {
    console.log(res);
    alert("Successfully Created");
  })
    .catch((ex) => {
      alert("Something went wrong. Please check the server API and try again");
      console.error(ex);
    });
};

export const addUserToChannel = async (credentials = null) => {
  // console.log(credentials);
  // if (!credentials) return;
  // await axios.post("http://206.189.91.54/api/v1/channel/add_member", {
  //   id: credentials.channel_id,
  //   member_id: credentials.member_id,
  // }, { headers: credentials.header }).then((res) => {
  //   console.log(res);
  //   alert("Member Add");
  // })
  //   .catch((ex) => {
  //     alert("Something went wrong. Please check the server API and try again");
  //     console.error(ex);
  //   });

  try {
    const response = await axios.post("http://206.189.91.54/api/v1/channel/add_member", {
      id: credentials.channel_id,
      member_id: credentials.member_id,
    }, { headers: credentials.header })

    console.log(response.data.data.channel_members)
    alert("Login Success")
    return response.data.data.channel_members
  } catch {
    alert("Something went wrong. Please check the server API and try again");
  }
};

export const sendChannelMessage = (credentials = null) => {

};


export const sendDirectMessage = async (credentials = null) => {

  if (!credentials) return;
  await axios.post("http://206.189.91.54/api/v1/messages", {
    receiver_id: credentials.receiver_id,
    receiver_class: credentials.receiver_class,
    body: credentials.body,
  }, { headers: credentials.header }).then((res) => {
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
      `http://206.189.91.54/api/v1/messages?receiver_id=${receiver_id ? receiver_id : "1"}&receiver_class=${receiver_class}`,

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
export const getChannelMembers = async (credentials = null) => {
  console.log(credentials);
  if (!credentials) return
  const { data } = await axios.get(`http://206.189.91.54/api/v1/channels/${credentials.id}`, { headers: credentials.header });
  return data.data.channel_members
};


export const getAllUsers = async (credentials = null) => {
  if (!credentials) return
  const { data } = await axios.get("http://206.189.91.54/api/v1/users", { headers: credentials });
  return data.data
};

export const getAllChannels = async (credentials = null) => {
  if (!credentials) return
  const { data } = await axios.get("http://206.189.91.54/api/v1/channels", { headers: credentials });
  return data.data
};
