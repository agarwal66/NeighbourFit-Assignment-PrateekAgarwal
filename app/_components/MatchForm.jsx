"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  MapPin, Shield, Coffee, TreeDeciduous, School, Bus,
  X, Search, Github, Linkedin, Frown, Sun, Moon
} from "lucide-react";

// --- Preferences List for Bento Grid ---
const preferencesList = [
  { key: "safety", label: "Safety", icon: <Shield className="w-7 h-7 mb-2" /> },
  { key: "cafes", label: "Cafes", icon: <Coffee className="w-7 h-7 mb-2" /> },
  { key: "parks", label: "Parks", icon: <TreeDeciduous className="w-7 h-7 mb-2" /> },
  { key: "schools", label: "Schools", icon: <School className="w-7 h-7 mb-2" /> },
  { key: "publicTransport", label: "Transport", icon: <Bus className="w-7 h-7 mb-2" /> },
];

export default function HomePage() {
  const [preferences, setPreferences] = useState([]);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDark(true);
  }, []);

  const togglePreference = (pref) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResults([]);
    try {
      const res = await axios.post("/api/match", { preferences });
      setResults(res.data);
    } catch (err) {
      alert("Error fetching results.");
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = results
    .filter((r) =>
      r.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score;
      if (sortBy === "name") return a.name.localeCompare(b.name);
    });

  const clearFilters = () => {
    setPreferences([]);
    setSearchQuery("");
    setSortBy("score");
    setResults([]);
  };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-500 relative">
      {/* --- Animated Aurora Background --- */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-green-300 to-purple-400 opacity-60 blur-3xl animate-[aurora_12s_ease-in-out_infinite]" />
        <style>{`
          @keyframes aurora {
            0% { filter: blur(40px); }
            50% { filter: blur(60px); }
            100% { filter: blur(40px); }
          }
        `}</style>
      </div>

      {/* --- Sidebar Navigation --- */}
      <aside className="fixed top-0 left-0 h-full w-20 flex flex-col items-center bg-white/80 dark:bg-neutral-950/80 shadow-xl z-40 pt-6 gap-6">
        <button
          className="p-3 rounded-full bg-gradient-to-br from-blue-600 to-green-500 shadow-lg mb-5"
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-blue-700" />}
        </button>
        <a href="https://github.com/agarwal66" target="_blank" rel="noopener noreferrer">
          <Github className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-blue-500" />
        </a>
        <a href="https://www.linkedin.com/in/prateekpassionate/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-blue-500" />
        </a>
      </aside>

      {/* --- Full-page Hero with 3D/Illustration and CTA --- */}
      <section className="ml-20 pt-12 pb-8 px-8 flex flex-col md:flex-row items-center gap-10 bg-transparent">
        <div className="flex-1 text-left">
          <h1 className="text-5xl md:text-7xl font-black text-blue-700 dark:text-green-300 mb-6 leading-tight">
            <span className="block">Find Your</span>
            <span className="block bg-gradient-to-r from-blue-600 via-green-400 to-purple-500 bg-clip-text text-transparent">Perfect Neighborhood</span>
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-200 mb-8">
            AI-powered, adaptive, and fun. Experience the future of search.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-400 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition"
            >
              <MapPin className="w-6 h-6 inline mr-2" />
              Find Now
            </button>
            <button
              onClick={clearFilters}
              className="bg-white/80 dark:bg-neutral-800 border px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-blue-50 dark:hover:bg-neutral-700 transition"
            >
              <X className="w-5 h-5 inline mr-2" />
              Reset
            </button>
          </div>
        </div>
        {/* --- 3D/Illustration Placeholder --- */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-72 h-72 bg-gradient-to-br from-blue-400 via-green-200 to-purple-300 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden">
            <span className="text-[7rem]">🏙️</span>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/80 dark:from-neutral-900/80 to-transparent" />
          </div>
        </div>
      </section>

      {/* --- Bento Grid Preferences --- */}
      <section className="ml-20 px-8 py-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Choose Your Preferences</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {preferencesList.map((pref) => (
            <button
              key={pref.key}
              className={`flex flex-col items-center justify-center px-6 py-8 rounded-2xl font-semibold text-lg shadow-md border-2 transition-all duration-200
                ${preferences.includes(pref.key)
                  ? "bg-gradient-to-br from-blue-500 via-green-400 to-purple-400 text-white scale-105 border-blue-400 shadow-xl"
                  : "bg-white/80 dark:bg-neutral-800 text-blue-700 dark:text-green-200 border-blue-100 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-neutral-700 hover:scale-105"
                }`}
              onClick={() => togglePreference(pref.key)}
            >
              {pref.icon}
              <span>{pref.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* --- Search, Sort, and Results (Storytelling Scroll) --- */}
      <section className="ml-20 px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              placeholder="Search neighborhoods…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-2 border-blue-200 dark:border-green-400 px-5 py-3 rounded-xl w-full md:w-80 bg-white/90 dark:bg-neutral-900 text-lg focus:ring-2 ring-blue-400 dark:ring-green-400 outline-none transition"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <X className="w-5 h-5 text-gray-400 dark:text-gray-300" />
              </button>
            )}
            <Search className="w-6 h-6 text-blue-400 dark:text-green-400 ml-2" />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-base font-medium dark:text-gray-200">Sort by:</label>
            <select
              className="border-2 px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 dark:text-gray-100 shadow"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="score">Score</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* --- Results with Parallax/Scroll Animation --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px]">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center h-full py-16">
              <svg className="animate-spin h-14 w-14 text-blue-500 dark:text-green-400 mb-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="text-blue-700 dark:text-green-300 font-semibold text-xl">Searching for the best neighborhoods...</span>
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((n, idx) => (
              <div
                key={n._id}
                className="bg-gradient-to-br from-white/90 via-blue-50/80 to-green-50/90 dark:from-neutral-900/90 dark:via-neutral-800/80 dark:to-neutral-900/90 border border-blue-100 dark:border-neutral-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 group backdrop-blur-md"
                style={{
                  transform: `translateY(${idx * 8}px)`,
                  transition: "transform 0.3s",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-7 h-7 text-blue-600 group-hover:text-green-500 dark:text-green-400 transition" />
                  <h3 className="text-2xl font-bold text-blue-900 dark:text-green-200">{n.name}</h3>
                </div>
                <ul className="text-lg text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Score:</strong> {n.score}</li>
                  <li className="flex items-center"><Shield className="w-5 h-5 mr-1 text-blue-400 dark:text-green-400" /> Safety: {n.safety}</li>
                  <li className="flex items-center"><Coffee className="w-5 h-5 mr-1 text-yellow-600 dark:text-yellow-400" /> Cafes: {n.cafes}</li>
                  <li className="flex items-center"><TreeDeciduous className="w-5 h-5 mr-1 text-green-600 dark:text-green-500" /> Parks: {n.parks}</li>
                  <li className="flex items-center"><School className="w-5 h-5 mr-1 text-purple-600 dark:text-purple-400" /> Schools: {n.schools}</li>
                  <li className="flex items-center"><Bus className="w-5 h-5 mr-1 text-pink-600 dark:text-pink-400" /> Transport: {n.publicTransport}</li>
                </ul>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center h-full py-12">
              <Frown className="w-10 h-10 text-gray-400 dark:text-gray-600 mb-3" />
              <span className="text-gray-500 dark:text-gray-400 font-medium text-lg mb-1">No results found</span>
              <span className="text-gray-400 dark:text-gray-500 text-sm text-center max-w-xs">Try adjusting your preferences or search for a different location.</span>
            </div>
          )}
        </div>
      </section>

      {/* --- Footer with Minimalist Info --- */}
      <footer className="ml-20 px-8 py-8 bg-white/70 dark:bg-neutral-950/80 border-t border-blue-100 dark:border-neutral-800 shadow-inner">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-base text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-green-400" />
            <span className="font-bold text-blue-700 dark:text-green-400">Neighborhood Matcher</span>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/agarwal66" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 hover:text-blue-600 dark:hover:text-green-400" />
            </a>
            <a href="https://www.linkedin.com/in/prateekpassionate/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 hover:text-blue-600 dark:hover:text-green-400" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
