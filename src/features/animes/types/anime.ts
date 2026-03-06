// ============================================================================
// TIPOS BÁSICOS DE RESPOSTA
// ============================================================================

export interface JikanPagination {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: {
    count: number
    total: number
    per_page: number
  }
}

export interface JikanResponse<T = Anime> {
  data: T[]
  pagination: JikanPagination
}

export interface JikanDetailResponse<T = Anime> {
  data: T
}

// ============================================================================
// TIPOS DE IMAGENS
// ============================================================================

export interface AnimeImage {
  image_url: string | null
  small_image_url: string | null
}

export interface AnimeImages {
  jpg: AnimeImage
  webp: AnimeImage
}

// ============================================================================
// TIPOS DE TRAILER
// ============================================================================

export interface AnimeTrailer {
  youtube_id: string | null
  youtube_url: string | null
  title: string | null
  thumbnail: string | null
}

// ============================================================================
// TIPOS DE ENTIDADES RELACIONADAS
// ============================================================================

export interface AnimeGenre {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface AnimeTheme {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface AnimeStudio {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface AnimeProducer {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface AnimeDemographic {
  mal_id: number
  type: string
  name: string
  url: string
}

// ============================================================================
// TIPO PRINCIPAL - ANIME
// ============================================================================

export interface Anime {
  mal_id: number
  url: string
  images: AnimeImages
  trailer: AnimeTrailer
  approved: boolean
  titles: {
    type: string
    title: string
  }[]
  title: string
  title_english: string | null
  title_japanese: string | null
  title_synonyms: string[]
  type: 'TV' | 'Movie' | 'OVA' | 'Special' | 'ONA' | 'Music' | null
  source: string | null
  episodes: number | null
  status: 'Finished Airing' | 'Currently Airing' | 'Not yet aired' | null
  airing: boolean
  aired: {
    from: string | null
    to: string | null
    prop: {
      from: {
        day: number | null
        month: number | null
        year: number | null
      }
      to: {
        day: number | null
        month: number | null
        year: number | null
      }
    }
    string: string
  }
  duration: string | null
  rating: string | null
  score: number | null
  scored_by: number | null
  rank: number | null
  popularity: number | null
  members: number | null
  favorites: number | null
  synopsis: string | null
  background: string | null
  season: string | null
  year: number | null
  broadcast: {
    day: string | null
    time: string | null
    timezone: string | null
    string: string | null
  }
  producers: AnimeProducer[]
  licensors: AnimeProducer[]
  studios: AnimeStudio[]
  genres: AnimeGenre[]
  explicit_genres: AnimeGenre[]
  themes: AnimeTheme[]
  demographics: AnimeDemographic[]
}

// ============================================================================
// TIPOS DE PROPS PARA COMPONENTES
// ============================================================================

export interface CarouselProps {
  animes: Anime[]
  isLoading: boolean
  error: Error | null
}