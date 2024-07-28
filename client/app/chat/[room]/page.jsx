"use client";

import Message from "@/app/components/Message/Message";
import { AuthContext } from "@/app/context/AuthContext";
import apiRequest from "@/app/lib/apiRequest";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:8000");

function ChatRoom() {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const { currentUser } = useContext(AuthContext);

  const getMessages = async () => {
    try {
      const result = await apiRequest.get(`/chat/messages/${params.room}`);
      setMessages(result.data.messages);
    } catch (err) {
      console.log(err);
    } finally {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { text } = Object.fromEntries(formData);

    try {
      const result = await apiRequest.post("/chat", {
        text,
        chatId: params.room,
        senderId: currentUser._id,
      });

      setMessages((prev) => [...prev, result.data]);
      socket.emit("sent-message", result.data);
    } catch (err) {
      console.log(err);
    } finally {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    socket.on("message-sent", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, [socket]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      <div style={{paddingBottom: "100px"}} className="px-4">
        {messages.map((message) => {
          return (
            <Message
              key={message._id}
              text={message.text}
              owner={message.senderId == currentUser._id}
            />
          );
        })}
      </div>

      <Form
        onSubmit={HandleSubmit}
        className="gap-2 w-100 fixed-bottom d-flex p-3"
        style={{ backgroundColor: "var(--primaryColor)", left: "0" }}
      >
        <FormControl
          ref={inputRef}
          name="text"
          type="text"
          placeholder="Enter your message..."
        />
        <Button type="submit" className="p-3 text-white" variant="success">
          ➤
        </Button>
      </Form>
    </>
  );
}

export default ChatRoom;
