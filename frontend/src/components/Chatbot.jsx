import axios from "axios";
import { useState, useEffect, useRef } from "react";
import auth from "../utils/auth"; // JWT helper
import { CgMinimizeAlt } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    auth.loadToken();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory, isOpen]);

  const sendChat = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/chat",
        { message },
        { headers: { "Content-Type": "application/json" } }
      );
      setChatHistory((prev) => [...prev, { user: message, bot: res.data }]);
      setMessage("");
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { user: message, bot: "⚠️ Server error. Check backend or network." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-red-500 cursor-pointer text-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center focus:outline-none"
      >
        {isOpen ? <CgMinimizeAlt /> : <FaRobot />}
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div
          className="mt-2 w-80 bg-white rounded-2xl shadow-lg flex flex-col border border-gray-200 overflow-hidden"
          style={{
            maxHeight: "70vh", 
          }}
        >
          <div className="bg-red-500 text-white font-bold p-3 text-center">
            🤖 हिंदवी AI 🤖
          </div>

          {/* Instructions toggle + panel */}
          <div className="px-3 pt-2">
            <button
              onClick={() => setShowInstructions((s) => !s)}
              className="text-sm px-3 py-1 bg-white border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {showInstructions ? "Hide Instructions" : "Show Instructions"}
            </button>
          </div>

          {showInstructions && (
            <div className="p-3 bg-yellow-50 text-sm text-gray-800 font-bold border-t border-gray-200 space-y-1 overflow-y-auto" style={{maxHeight: "45vh"}}>
              <div className="text-center  text-red-600"><u>Your question must include at least one text</u></div>
              <div>donation - देणगी,देणगीदार</div>
              <div>donations - देणग्या</div>
              <div>contribution - योगदान</div>
              <div>contributions - योगदान</div>
              <div>committee - समिती</div>
              <div>committee contribution - समिती योगदान</div>
              <div>expense - खर्च</div>
              <div>expenses - खर्च</div>
              <div>total expense - एकूण खर्च</div>
              <div>spent amount - झालेला खर्च</div>
              <div>previous year - मागील वर्ष</div>
              <div>last year - मागील वर्ष</div>
              <div>market - बाजार</div>
              <div>market expense - बाजार खर्च</div>
              <div>material - साहित्य</div>
              <div>materials - साहित्य</div>
              <div>income - उत्पन्न</div>
              <div>total income - एकूण उत्पन्न</div>
              <div>amount - रक्कम</div>
              <div>total amount - एकूण रक्कम</div>
              <div>balance - शिल्लक</div>
              <div>remaining balance - उर्वरित शिल्लक</div>
            </div>
          )}

          {/* Chat messages (scrollable area) */}
          {!showInstructions && (
          <div
            ref={chatBoxRef}
            className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-2"
          >
            {chatHistory.length ? (
              chatHistory.map((chat, idx) => (
                <div key={idx}>
                  <p className="bg-red-500 font-semibold text-white px-2 py-1 rounded">
                    You: {chat.user}
                  </p>
                  <pre className="whitespace-pre-wrap text-gray-800">
                    हिंदवी Ai:  {chat.bot}
                  </pre>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">
                👆 Ask a question to Hindvi Ai see a response here.
              </p>
            )}
            {loading && <p className="text-gray-500 text-center">Thinking...</p>}
          </div>
          )}

          {/* Input area */}
          <div className="p-3 border-t border-gray-200">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full h-20 p-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={sendChat}
              disabled={loading}
              className={`w-full py-2 mt-2 text-white font-semibold rounded-xl transition-all ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-indigo-700 cursor-pointer"
              }`}
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
