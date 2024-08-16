"use client";

import React, { useContext, useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "../context/AuthContext";
import { Container } from "react-bootstrap";
import Link from "next/link";

function ChatListPage() {
  const [chats, setChats] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const getChats = async () => {
    try {
      const result = await apiRequest.get(`/chat/${currentUser._id}`);
      setChats(result.data);

      getChatUser(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getChatUser = async (retreviedChats) => {
    try {
      if (currentUser.isCoach) {
        retreviedChats.map(async (chat) => {
          const result = await apiRequest.get(`/user/${chat.clientId}`);
          setChatUsers(result.data);
        });
      } else {
        const result = await apiRequest.get(
          `/user/${currentUser.assignedCoachId}`
        );
        setChatUsers(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getChats();
    }
  }, [currentUser]);
  return (
    <Container
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      {currentUser && (
        <>
          {Array.isArray(chatUsers) ? (
            <>
              {chatUsers.map((user, index) => {
                return (
                  <Link
                    className="bgPrimary text-white p-5 rounded"
                    href={`/chat/${chats[index]._id}`}
                    key={index}
                  >
                    {user.username}
                  </Link>
                );
              })}
            </>
          ) : (
            <>
              {chatUsers && (
                <Link
                  className="bgPrimary text-white p-5 rounded"
                  href={`/chat/${
                    currentUser.isCoach ? chats[0]._id : chats._id
                  }`}
                >
                  {chatUsers.username}
                </Link>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default ChatListPage;
