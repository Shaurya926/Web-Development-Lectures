// lect_5
import React, { useEffect, useState, useMemo } from 'react'

const ITEMS_PER_PAGE_OPTIONS = [8, 12, 20]

const Task = () => {
  const [search, setSearch] = useState("")
  const [allProducts, setAllProducts] = useState([])
  const [brandFilter, setBrandFilter] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [sortMode, setSortMode] = useState("none") // "none" | "low" | "high"
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(12)

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then(res => res.json())
      .then(data => setAllProducts(data.products))
  }, [])

  async function handleSearch() {
    const q = search.trim()
    const url = q
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`
      : "https://dummyjson.com/products?limit=100"
    const res = await fetch(url)
    const data = await res.json()
    setAllProducts(data.products)
    setCurrentPage(1)
    setBrandFilter("")
  }

  // Derived: unique brands from current product list
  const brands = useMemo(() => {
    return [...new Set(allProducts.map(p => p.brand).filter(Boolean))].sort()
  }, [allProducts])

  // Derived: filtered + sorted products
  const filtered = useMemo(() => {
    let result = allProducts.filter(p => {
      if (brandFilter && p.brand !== brandFilter) return false
      if (minPrice !== "" && p.price < parseFloat(minPrice)) return false
      if (maxPrice !== "" && p.price > parseFloat(maxPrice)) return false
      return true
    })
    if (sortMode === "low") result = [...result].sort((a, b) => a.price - b.price)
    if (sortMode === "high") result = [...result].sort((a, b) => b.price - a.price)
    return result
  }, [allProducts, brandFilter, minPrice, maxPrice, sortMode])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((safePage - 1) * perPage, safePage * perPage)

  function handleFilterChange(setter) {
    return (e) => { setter(e.target.value); setCurrentPage(1) }
  }

  return (
    <div style={{ padding: "1rem" }}>

      {/* Search bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          placeholder="Search products…"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Filters */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        <div>
          <label>Brand</label>
          <select value={brandFilter} onChange={handleFilterChange(setBrandFilter)}>
            <option value="">All brands</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label>Min price ($)</label>
          <input type="number" value={minPrice} onChange={handleFilterChange(setMinPrice)} placeholder="0" />
        </div>
        <div>
          <label>Max price ($)</label>
          <input type="number" value={maxPrice} onChange={handleFilterChange(setMaxPrice)} placeholder="Any" />
        </div>
      </div>

      {/* Sort + per-page */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <span>Sort:</span>
        <button onClick={() => { setSortMode("low"); setCurrentPage(1) }}>Low → High</button>
        <button onClick={() => { setSortMode("high"); setCurrentPage(1) }}>High → Low</button>
        <button onClick={() => { setSortMode("none"); setCurrentPage(1) }}>Default</button>
        <select
          value={perPage}
          onChange={e => { setPerPage(Number(e.target.value)); setCurrentPage(1) }}
          style={{ marginLeft: "auto" }}
        >
          {ITEMS_PER_PAGE_OPTIONS.map(n => (
            <option key={n} value={n}>{n} per page</option>
          ))}
        </select>
      </div>

      {/* Product grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
        {paginated.length === 0 && <p>No products found.</p>}
        {paginated.map(p => (
          <div key={p.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 10 }}>
            <img src={p.thumbnail} alt={p.title} style={{ width: "100%", height: 120, objectFit: "contain" }} />
            <div style={{ fontSize: 11, color: "#888", marginTop: 6 }}>{p.brand}</div>
            <div style={{ fontWeight: 500, fontSize: 13 }}>{p.title}</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "green" }}>${p.price.toFixed(2)}</div>
            <div style={{ fontSize: 12, color: "#888" }}>★ {p.rating.toFixed(1)}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 16, flexWrap: "wrap" }}>
        <button disabled={safePage === 1} onClick={() => setCurrentPage(p => p - 1)}>‹</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{ fontWeight: page === safePage ? 700 : 400 }}
          >
            {page}
          </button>
        ))}
        <button disabled={safePage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>›</button>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#888" }}>
          {filtered.length} products
        </span>
      </div>

    </div>
  )
}

export default Task