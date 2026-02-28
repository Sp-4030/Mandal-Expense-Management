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
          className="mt-2 w-88 bg-white rounded-2xl shadow-lg flex flex-col border border-gray-200 overflow-hidden"
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
              className="text-sm px-3 py-1 bg-white border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              {showInstructions ? "Hide Instructions" : "Show Instructions"}
            </button>
          </div>

          {showInstructions && (
            <div className="p-3 bg-yellow-50 text-sm text-gray-800 font-bold border-t border-gray-200 space-y-1 overflow-y-auto" style={{maxHeight: "45vh"}}>
              <div className="text-center  text-red-600"><u className="capitalize">Your question must include at least one word</u></div>
              <br />
              <div className="max-w-4xl mx-auto ">
  <table className="w-full border border-gray-400 text-left">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-400 px-4 py-2">English</th>
        <th className="border border-gray-400 px-4 py-2">मराठी</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Donation</td>
        <td className="border border-gray-400 px-4 py-2">देणगी / देणगीदार</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Donations</td>
        <td className="border border-gray-400 px-4 py-2">देणग्या</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Contribution</td>
        <td className="border border-gray-400 px-4 py-2">योगदान</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Contributions</td>
        <td className="border border-gray-400 px-4 py-2">योगदान</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Committee</td>
        <td className="border border-gray-400 px-4 py-2">समिती</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Committee Contribution</td>
        <td className="border border-gray-400 px-4 py-2">समिती योगदान</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Expense</td>
        <td className="border border-gray-400 px-4 py-2">खर्च</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Expenses</td>
        <td className="border border-gray-400 px-4 py-2">खर्च</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Total Expense</td>
        <td className="border border-gray-400 px-4 py-2">एकूण खर्च</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Spent Amount</td>
        <td className="border border-gray-400 px-4 py-2">झालेला खर्च</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Previous Year</td>
        <td className="border border-gray-400 px-4 py-2">मागील वर्ष</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Last Year</td>
        <td className="border border-gray-400 px-4 py-2">मागील वर्ष</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Market</td>
        <td className="border border-gray-400 px-4 py-2">बाजार</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Market Expense</td>
        <td className="border border-gray-400 px-4 py-2">बाजार खर्च</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Material</td>
        <td className="border border-gray-400 px-4 py-2">साहित्य</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Materials</td>
        <td className="border border-gray-400 px-4 py-2">साहित्य</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Income</td>
        <td className="border border-gray-400 px-4 py-2">उत्पन्न</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Total Income</td>
        <td className="border border-gray-400 px-4 py-2">एकूण उत्पन्न</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Amount</td>
        <td className="border border-gray-400 px-4 py-2">रक्कम</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Total Amount</td>
        <td className="border border-gray-400 px-4 py-2">एकूण रक्कम</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Balance</td>
        <td className="border border-gray-400 px-4 py-2">शिल्लक</td>
      </tr>
      <tr>
        <td className="border border-gray-400 px-4 py-2">Remaining Balance</td>
        <td className="border border-gray-400 px-4 py-2">उर्वरित शिल्लक</td>
      </tr>
    </tbody>
  </table>
</div>

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
               Ask a question to Hindvi Ai see a response here. 👇
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
                  : "bg-red-500 hover:bg-red-600 cursor-pointer"
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
