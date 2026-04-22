import { useState } from 'react'
import { useAnime } from '../../context/AnimeContext'
import AnimeCard from '../../components/AnimeCard/AnimeCard'
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard'
import Grid from '../../components/Grid/Grid'
import styles from './SearchPage.module.css'

export default function SearchPage() {
  const { results, loading, error, pagination, search } = useAnime()
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [page, setPage] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setSubmittedQuery(query)
    setPage(1)
    search(query, 1)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    search(submittedQuery, newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        <span className={styles.accent}>Buscar</span> Anime
      </h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Ej: Naruto, Attack on Titan, One Piece..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button type="submit" className={styles.searchBtn} disabled={loading}>
          {loading ? '...' : 'Buscar'}
        </button>
      </form>

      {error && (
        <div className={styles.error}>
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {submittedQuery && !error && !loading && results.length > 0 && (
        <p className={styles.resultsInfo}>
          Resultados para <strong>"{submittedQuery}"</strong>
          {pagination && ` — página ${page} de ${pagination.last_visible_page}`}
        </p>
      )}

      <Grid>
        {loading
          ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
          : results.map((anime) => <AnimeCard key={anime.mal_id} anime={anime} />)}
      </Grid>

      {!loading && results.length > 0 && pagination && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            ← Anterior
          </button>
          <span className={styles.pageInfo}>
            {page} / {pagination.last_visible_page}
          </span>
          <button
            className={styles.pageBtn}
            onClick={() => handlePageChange(page + 1)}
            disabled={!pagination.has_next_page}
          >
            Siguiente →
          </button>
        </div>
      )}

      {!loading && !submittedQuery && (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🔍</span>
          <p>Busca tu anime favorito arriba</p>
        </div>
      )}
    </main>
  )
}