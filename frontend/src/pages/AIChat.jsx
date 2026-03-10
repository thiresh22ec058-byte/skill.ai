import { useState } from "react";

function AIChat() {

  const [message,setMessage] = useState("");
  const [reply,setReply] = useState("");

  const sendMessage = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/ai/chat",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({message})
      });

      const data = await res.json();
      setReply(data.reply);

    } catch(err) {

      console.log(err);

    }

  };

  return (

    <div style={{padding:"20px"}}>

      <h2>AI Career Assistant</h2>

      <input
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Ask about careers..."
      />

      <button onClick={sendMessage}>
        Ask AI
      </button>

      {reply && (
        <p>{reply}</p>
      )}

    </div>

  );

}

export default AIChat;