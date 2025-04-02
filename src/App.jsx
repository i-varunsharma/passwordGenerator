import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_=+[]{}|;:,.<>?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
    setCopied(false);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-400">🔐 Password Generator</h1>

        {/* Password Display with Copy Button */}
        <div className="relative mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-3 px-4 bg-gray-900 text-lg font-medium rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            readOnly
          />
          <button
            className={`absolute right-3 top-2 px-4 py-2 text-sm font-semibold rounded-lg transition ${
              copied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={copyToClipboard}
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        </div>

        {/* Settings */}
        <div className="space-y-3">
          {/* Include Numbers */}
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
              className="w-5 h-5 text-blue-500 accent-blue-500"
            />
            <span className="text-lg">Include Numbers</span>
          </label>

          {/* Include Special Characters */}
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
              className="w-5 h-5 text-blue-500 accent-blue-500"
            />
            <span className="text-lg">Include Special Characters</span>
          </label>

          {/* Password Length */}
          <div>
            <label className="block mb-2 text-lg font-semibold">Password Length: {length}</label>
            <input
              type="range"
              min="6"
              max="20"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg mt-4 transition shadow-md"
          onClick={passwordGenerator}
        >
          🔄 Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
