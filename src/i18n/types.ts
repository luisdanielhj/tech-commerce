export type Locale = 'es' | 'en'

export type CategoryTranslation = {
  num: string
  name: [string, string]
  desc: string
}

export type Translations = {
  meta: {
    title: string
    description: string
    lang: Locale
  }
  nav: {
    company: string
    products: string
    values: string
    contact: string
    cta: string
  }
  hero: {
    eyebrow: string
    titlePrefix: string
    titleAccent: string
    titleLine2: string
    titleLine3: string
    lede: string
    ctaPrimary: string
    ctaSecondary: string
  }
  about: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    titleAccent: string
    deck: string
    p1: string
    p2: string
    p3: string
  }
  trade: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    titleAccent: string
    deck: string
    inquire: string
  }
  values: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    deck: string
    honesty: string
    honestyDesc: string
    pillar1Key: string
    pillar1Value: string
    pillar1Small: string
    pillar2Key: string
    pillar2Value: string
    pillar2Small: string
    pillar3Key: string
    pillar3Value: string
    pillar3Small: string
  }
  commitment: {
    eyebrow: string
    titleLine1: string
    titleAccent: string
    deck: string
    h3Before: string
    h3Em: string
    h3After: string
    p1: string
    p2: string
    sigName: string
  }
  contact: {
    eyebrow: string
    titleLine1: string
    titleAccent: string
    lede: string
    email: string
    nameLabel: string
    namePlaceholder: string
    companyLabel: string
    companyPlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    categoryLabel: string
    volumeLabel: string
    messageLabel: string
    messagePlaceholder: string
    submit: string
    successTitle: string
    successBody: string
    categories: string[]
    volumes: string[]
  }
  footer: {
    description: string
    company: string
    about: string
    values: string
    commitment: string
    trade: string
    products: string
    requestQuote: string
    categories: string
    contact: string
    copyright: string
    backToTop: string
  }
  categories: CategoryTranslation[]
}
