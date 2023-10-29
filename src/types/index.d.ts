export type AuthorInformation = {
  name: string
  github: string
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  authors: Array<AuthorInformation>
}
