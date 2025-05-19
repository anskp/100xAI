import React, { useEffect, useRef, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const Chat = ({ headerRight }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const chatEndRef = useRef(null);
  const { logout } = useAuth();

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/chat/history');
      setMessages(res.data.history || []);
    } catch (err) {
      toast.error('Failed to load chat history');
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      setMessages((prev) => [...prev, { userMessage: input, botResponse: null }]);
      const res = await api.post('/chat', { message: input });
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].botResponse = res.data.bot;
        return updated;
      });
      setInput('');
    } catch (err) {
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Clear all chat history?')) return;
    try {
      await api.delete('/chat/history');
      setMessages([]);
      toast.success('Chat history cleared');
    } catch (err) {
      toast.error('Failed to clear history');
    }
  };

  const filteredMessages = search.trim()
    ? messages.filter(
        (msg) =>
          msg.userMessage.toLowerCase().includes(search.toLowerCase()) ||
          (msg.botResponse && msg.botResponse.toLowerCase().includes(search.toLowerCase()))
      )
    : messages;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">KoBot</h1>
          {headerRight}
        </div>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl mb-2 flex gap-2">
          <input
            className="flex-1 border px-3 py-2 rounded dark:bg-gray-800 dark:text-gray-100"
            placeholder="Search chat history..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            onClick={handleClearHistory}
            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Clear History
          </button>
        </div>
        <div className="w-full max-w-2xl h-[60vh] bg-white dark:bg-gray-800 rounded shadow p-4 overflow-y-auto mb-4 flex flex-col">
          {filteredMessages.length === 0 && <div className="text-gray-400 dark:text-gray-500 text-center my-auto">No messages yet.</div>}
          {filteredMessages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block max-w-[80%] shadow-md">
                  {msg.userMessage}
                </div>
              </div>
              {msg.botResponse && (
                <div className="flex justify-start mt-1">
                  <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-lg inline-block max-w-[80%] shadow">
                    {msg.botResponse}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSend} className="w-full max-w-2xl flex gap-2">
          <input
            className="flex-1 border px-3 py-2 rounded dark:bg-gray-800 dark:text-gray-100"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            disabled={loading || !input.trim()}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Chat;