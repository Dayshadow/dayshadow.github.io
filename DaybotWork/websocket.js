
    let ws = new WebSocket("wss://24.63.238.100:3000");
    
    ws.onmessage = (message) => {
        msg = JSON.parse(message.data);
        if (msg.type === "") {

        } 
    }

ws.send(JSON.stringify({content: "hello"}));