
export type LocationInfoProps = {
  dimension: string
  name: string
}

export type CardProps = {
  results: {
    id: string
    name: string
    status: string
    species: string
    gender: string
    origin: {
      name: string
    }
    location: {
      name: string
    }
    image: string
  }[]
}

export type OptionProps = {
  name: string
  changeID: (value: number) => void
  total: number
}