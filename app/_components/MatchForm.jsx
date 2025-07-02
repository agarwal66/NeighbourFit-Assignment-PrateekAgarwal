"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Shield,
  Coffee,
  TreeDeciduous,
  School,
  Bus,
  X,
  Search,
  Github,
  Linkedin,
  Frown,
} from "lucide-react";

const preferencesList = [
  { key: "safety", label: "Safety", icon: <Shield className="w-5 h-5 mr-1" /> },
  { key: "cafes", label: "Cafes", icon: <Coffee className="w-5 h-5 mr-1" /> },
  { key: "parks", label: "Parks", icon: <TreeDeciduous className="w-5 h-5 mr-1" /> },
  { key: "schools", label: "Schools", icon: <School className="w-5 h-5 mr-1" /> },
  { key: "publicTransport", label: "Transport", icon: <Bus className="w-5 h-5 mr-1" /> },
];

export default function HomePage() {
  const [preferences, setPreferences] = useState([]);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [loading, setLoading] = useState(false);

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
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-br from-blue-600 to-green-500 rounded-full p-2 shadow-sm">
              <MapPin className="w-6 h-6 text-white" />
            </span>
            <span className="text-xl font-bold text-blue-700 tracking-tight">
              Neighborhood Matcher
            </span>
          </div>
          <nav className="flex gap-4 items-center text-gray-700 font-medium">
            <a href="https://github.com/agarwal66/NeighbourFit-Assignment-PrateekAgarwal" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/prateekpassionate/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-[350px] sm:h-[400px] bg-gradient-to-br from-blue-600 to-green-500 mt-16">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
            Discover Your <span className="bg-white/20 px-3 py-1 rounded text-blue-100">Perfect Neighborhood</span>
          </h1>
          <p className="text-xl text-blue-100 font-medium drop-shadow mb-8">
            Use smart filters to match with the ideal places for your lifestyle.
          </p>
        </div>
      </section>

      {/* Preferences & Search */}
      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 -mt-24 mb-10 z-20 relative">
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-800 text-lg">Your Preferences</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {preferencesList.map((pref) => (
              <button
                key={pref.key}
                className={`flex items-center justify-center px-4 py-2 rounded-full font-medium transition-all duration-200 shadow
                  ${preferences.includes(pref.key)
                    ? "bg-blue-600 text-white scale-105 ring-2 ring-blue-300"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:scale-105"
                  }`}
                onClick={() => togglePreference(pref.key)}
              >
                {pref.icon}
                {pref.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input
              placeholder="Search by location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-4 py-2 rounded w-full sm:w-64"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
            <Search className="w-5 h-5 text-gray-400 ml-2" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sort by:</label>
            <select
              className="border px-2 py-1 rounded"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="score">Score</option>
              <option value="name">Name</option>
            </select>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded ml-2"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </div>

        <button
          className="mt-8 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold flex items-center gap-2 shadow-lg"
          onClick={handleSubmit}
          disabled={loading}
        >
          <MapPin className="w-5 h-5" />
          {loading ? "Finding..." : "Find Neighborhoods"}
        </button>

        {/* Results */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px]">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center h-full py-12">
              <svg className="animate-spin h-12 w-12 text-blue-500 mb-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="text-blue-700 font-semibold text-lg">Searching for the best neighborhoods...</span>
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((n) => (
              <div
                key={n._id}
                className="bg-white border rounded-xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600 group-hover:text-green-500 transition" />
                  <h3 className="text-lg font-bold text-gray-900">{n.name}</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><strong>Score:</strong> {n.score}</li>
                  <li className="flex items-center"><Shield className="w-4 h-4 mr-1 text-blue-400" /> Safety: {n.safety}</li>
                  <li className="flex items-center"><Coffee className="w-4 h-4 mr-1 text-yellow-600" /> Cafes: {n.cafes}</li>
                  <li className="flex items-center"><TreeDeciduous className="w-4 h-4 mr-1 text-green-600" /> Parks: {n.parks}</li>
                  <li className="flex items-center"><School className="w-4 h-4 mr-1 text-purple-600" /> Schools: {n.schools}</li>
                  <li className="flex items-center"><Bus className="w-4 h-4 mr-1 text-pink-600" /> Transport: {n.publicTransport}</li>
                </ul>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center h-full py-12">
              <Frown className="w-10 h-10 text-gray-400 mb-3" />
              <span className="text-gray-500 font-medium text-lg mb-1">No results found</span>
              <span className="text-gray-400 text-sm text-center max-w-xs">Try adjusting your preferences or search for a different location.</span>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gradient-to-r from-blue-50 to-green-50 border-t py-6 shadow-inner">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 text-sm text-gray-500">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-700">Neighborhood Matcher</span>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/agarwal66" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 hover:text-blue-600" />
            </a>
            <a href="https://www.linkedin.com/in/prateekpassionate/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 hover:text-blue-600" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
