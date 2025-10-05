import { useState, useEffect } from "react";

const FilterByTag = ({ events, onFilteredEvents }) => {
  const [selectedTag, setSelectedTag] = useState("Todos");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Extraer tags únicos de los eventos
    const uniqueTags = [...new Set(events.map(event => event.tag || "Sin categoría"))];
    setTags(["Todos", ...uniqueTags]);
  }, [events]);

  useEffect(() => {
    if (selectedTag === "Todos") {
      onFilteredEvents(events);
    } else {
      const filtered = events.filter(event => 
        event.tag === selectedTag
      );
      onFilteredEvents(filtered);
    }
  }, [selectedTag, events, onFilteredEvents]);

  return (
    <div className="mb-6">
      <div className="flex flex-wrap justify-center gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === tag
                ? "bg-verdeArk text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterByTag; 