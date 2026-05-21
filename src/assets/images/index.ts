import heroMain from './hero-main.jpg'
import heroThumb from './hero-thumb.jpg'
import about from './about-warehouse.jpg'
import catMobile from './cat-daily.jpg'
import catComputing from './cat-commodities.jpg'
import catAccessories from './cat-food.jpg'
import catNetworking from './cat-industrial.jpg'

export const images = {
  heroMain,
  heroThumb,
  about,
  categories: [catMobile, catComputing, catAccessories, catNetworking] as const,
}
