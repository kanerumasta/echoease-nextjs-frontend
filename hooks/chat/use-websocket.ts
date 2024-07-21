import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function useWebsocket(url: string) {
    const [isReady, setIsReady] = useState(false);
    const [val, setVal] = useState(false);

    const ws = useRef<WebSocket | null>(null);

    const handleSend = (message:string) => {
        if(ws.current ){
            ws.current.send(message)
        }
    }

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            toast.success("Connected");
            setIsReady(true);
        };
        socket.onclose = () => {
            toast.error("close");
            setIsReady(false);
        };
        socket.onmessage = (event) => setVal(event.data);

        ws.current = socket;

        return () => socket.close();
    }, []);
    return [isReady, val,handleSend];
}
