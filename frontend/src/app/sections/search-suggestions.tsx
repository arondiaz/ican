"use client"

interface SearchSuggestionsProps {
  workers: any[]
  onSuggestionClick: (suggestion: string) => void
}

export const SearchSuggestions = ({ workers, onSuggestionClick }: SearchSuggestionsProps) => {
  // Generar sugerencias basadas en los datos disponibles
  const cities = [...new Set(workers.map((w) => w.city))]
  const categories = [...new Set(workers.flatMap((w) => w.categories.map((c: any) => c.name)))]

  const suggestions = [
    ...categories.slice(0, 3),
    ...cities.slice(0, 2).flatMap((city) => categories.slice(0, 2).map((cat) => `${cat} en ${city}`)),
  ]

  return (
    <div className="mt-2 text-sm text-white/80">
      <p className="mb-2">Prueba buscar:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.slice(0, 4).map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-2 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors text-xs"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
