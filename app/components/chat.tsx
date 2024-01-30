// Made 1-26-2024
'use client'
import React, { useState, useEffect, MouseEvent, FormEvent } from 'react'
import { io } from "socket.io-client";

// Returns the ChatBox when called
export function GetChatBox() {
    const [userMsg, setMsg] = useState('')
    const [chat, setChat] = useState([]);
    const [socket, setSoc] = useState(null)
    const [name, setName] = useState("Guest")

    // This will set the username of the client
    async function getUname() {
        const getDa = await fetch("../api/database", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json; charset=utf8'
            },
            body: JSON.stringify({type: "userData"})
        }).then((res) => res.json())
        console.log(getDa)
        setName(await getDa.username)
    }

    // Occurs every time the page loads
    useEffect(() => {
        console.log("Connecting to WebSocket server...");
        const newSocket = io("http://localhost:3001")
    
        newSocket.on("connect", () => {
            console.log("Connected to WebSocket server");
            newSocket.emit("join_room", "public") // Joins the Public Room
        });
    
        newSocket.on("message", (msgData) => {
            console.log("Received message:", msgData);
            var msgFor = `${msgData.uname} | ${msgData.msg}`
            setChat((prevMessages) => [...prevMessages, msgFor]);
        });
        
        setSoc(newSocket);

        getUname()
        // Clean up the socket connection on unmount
        return () => {
            console.log("Disconnecting from WebSocket server...");
            newSocket.disconnect();
        };
      }, []);

    // When send btn is clicked
    const sendMsg = () => {
        if (userMsg.length == 0) {return}
        // Send the message to the server
        socket.emit("message", {data: userMsg, name:name, room:"public"})
        // Clear the currentMessage state
        var msgFor = `${name} | ${userMsg}`
        setChat((prevMessages) => [...prevMessages, msgFor]);
        setMsg('');
    };

    return (
        <>
            <div id="msgBox">
                {chat.map((message, index) => (
                    <div className="msgtext" key={index}>{message}</div>
                ))}
            </div>
            <br/>
            <input name="msgInp" value={userMsg} onChange={(e) => setMsg(e.target.value)}/><br/>
            <button onClick={sendMsg}>Send</button>
        </>
    )
}