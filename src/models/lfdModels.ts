export type LfdParts = {
  abschnitt: string
  text: string
  teile: OverPoint[]
}

export type OverPoint = {
  ueberbegriff: string
  points: LfdEntry[]
}

export type LfdEntry = {
  lfd: string
  text: string
}

export type UserPoint = {
  index: number
  value: string
  lfd: string
}

export type Job = {
  internal: string
  display: string
}

export type ApiResponse = {
  status: number
  name: string
}