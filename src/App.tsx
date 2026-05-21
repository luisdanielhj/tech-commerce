import { useEffect, useRef, useState, type FormEvent } from 'react'
import logoMark from './assets/logo-mark.jpeg'
import logoFull from './assets/logo-full.jpeg'
import { images } from './assets/images'
import { useLocale } from './i18n'
import { CONTACT_EMAIL } from './site'

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function App() {
  useReveal()
  const { locale, setLocale, t } = useLocale()
  const [showMsg, setShowMsg] = useState(false)
  const formKey = useRef(0)

  useEffect(() => {
    if (!showMsg) return
    const timer = setTimeout(() => setShowMsg(false), 5000)
    return () => clearTimeout(timer)
  }, [showMsg])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const subject = locale === 'es' ? 'Cotización — Tech Commerce' : 'Quote — Tech Commerce'
    const body = [
      `${t.contact.nameLabel}: ${data.get('name')}`,
      `${t.contact.companyLabel}: ${data.get('company')}`,
      `${t.contact.emailLabel}: ${data.get('email')}`,
      `${t.contact.categoryLabel}: ${data.get('category')}`,
      `${t.contact.volumeLabel}: ${data.get('volume')}`,
      '',
      String(data.get('message') ?? ''),
    ].join('\n')

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setShowMsg(true)
    formKey.current += 1
  }

  return (
    <>
      <header className="nav">
        <div className="wrap row">
          <a className="brand" href="#top">
            <img src={logoMark} alt="Tech Commerce LLC" />
            <div className="name">
              TECH COMMERCE
              <small>LLC · TECHNOLOGY</small>
            </div>
          </a>
          <nav className="navlinks">
            <a href="#about">{t.nav.company}</a>
            <a href="#trade">{t.nav.products}</a>
            <a href="#values">{t.nav.values}</a>
            <a href="#contact">{t.nav.contact}</a>
            <span className="lang">
              <a
                className={locale === 'es' ? 'active' : undefined}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setLocale('es')
                }}
              >
                ES
              </a>
              <a
                className={locale === 'en' ? 'active' : undefined}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setLocale('en')
                }}
              >
                EN
              </a>
            </span>
          </nav>
          <a className="nav-cta" href="#contact">
            {t.nav.cta}
            <span className="arr">→</span>
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="wrap grid">
          <div>
            <div className="eyebrow">
              <span className="dot"></span>
              {t.hero.eyebrow}
            </div>
            <h1 className="display">
              {t.hero.titlePrefix} <span className="accent">{t.hero.titleAccent}</span>
              <br />
              {t.hero.titleLine2}
              <br />
              <span className="stripe">{t.hero.titleLine3}</span>
            </h1>
            <p className="lede">{t.hero.lede}</p>
            <div className="ctas">
              <a className="btn btn-primary" href="#contact">
                {t.hero.ctaPrimary} <span className="arr">→</span>
              </a>
              <a className="btn btn-ghost" href="#trade">
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hv-card main">
              <img src={images.heroMain} alt="" />
            </div>
            <div className="hv-card thumb">
              <img src={images.heroThumb} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="tc about" id="about">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">
                <span className="dot"></span>
                {t.about.eyebrow}
              </div>
              <h2>
                {t.about.titleLine1}
                <br />
                {t.about.titleLine2}
                <br />
                <span className="accent">{t.about.titleAccent}</span>
              </h2>
            </div>
            <p className="deck">{t.about.deck}</p>
          </div>

          <div className="layout">
            <aside className="visual reveal" aria-hidden="true" style={{ position: 'sticky', top: 110 }}>
              <img src={images.about} alt="" />
            </aside>
            <div className="copy reveal">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tc trade" id="trade">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">
                <span className="dot"></span>
                {t.trade.eyebrow}
              </div>
              <h2>
                {t.trade.titleLine1}
                <br />
                {t.trade.titleLine2}
                <br />
                <span className="accent">{t.trade.titleAccent}</span>
              </h2>
            </div>
            <p className="deck">{t.trade.deck}</p>
          </div>

          <div className="cat-grid reveal">
            {t.categories.map((c, i) => (
              <article className="cat" key={c.num}>
                <div className="num">{c.num}</div>
                <div className="ph">
                  <img src={images.categories[i]} alt={`${c.name[0]} ${c.name[1]}`} />
                </div>
                <div className="name">
                  {c.name[0]}
                  <br />
                  {c.name[1]}
                </div>
                <div className="desc">{c.desc}</div>
                <a href="#contact" className="more">
                  {t.trade.inquire} <span className="arr">→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tc values" id="values">
        <div className="wrap">
          <div className="section-head reveal" style={{ marginBottom: 56 }}>
            <div>
              <div className="eyebrow label">
                <span className="dot"></span>
                {t.values.eyebrow}
              </div>
              <h2 style={{ color: '#fff' }}>
                {t.values.titleLine1}
                <br />
                {t.values.titleLine2}
              </h2>
            </div>
            <p className="deck" style={{ color: '#B0B5BD' }}>
              {t.values.deck}
            </p>
          </div>

          <div className="layout">
            <div className="reveal">
              <div className="big">
                {t.values.honesty}
                <span className="punct">.</span>
              </div>
              <p className="desc">{t.values.honestyDesc}</p>
            </div>
            <div className="pillars reveal">
              <div className="pillar">
                <div className="k">{t.values.pillar1Key}</div>
                <div className="v">
                  {t.values.pillar1Value}
                  <small>{t.values.pillar1Small}</small>
                </div>
              </div>
              <div className="pillar">
                <div className="k">{t.values.pillar2Key}</div>
                <div className="v">
                  {t.values.pillar2Value}
                  <small>{t.values.pillar2Small}</small>
                </div>
              </div>
              <div className="pillar">
                <div className="k">{t.values.pillar3Key}</div>
                <div className="v">
                  {t.values.pillar3Value}
                  <small>{t.values.pillar3Small}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tc commit" id="commitment">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">
                <span className="dot"></span>
                {t.commitment.eyebrow}
              </div>
              <h2>
                {t.commitment.titleLine1}
                <br />
                <span className="accent">{t.commitment.titleAccent}</span>
              </h2>
            </div>
            <p className="deck">{t.commitment.deck}</p>
          </div>

          <div className="frame reveal">
            <div>
              <h3>
                {t.commitment.h3Before}{' '}
                <em style={{ fontStyle: 'normal', color: 'var(--tc-accent-deep)' }}>{t.commitment.h3Em}</em>
                {t.commitment.h3After}
              </h3>
              <p>{t.commitment.p1}</p>
              <p>{t.commitment.p2}</p>
              <div className="sig">
                <div className="who">{t.commitment.sigName}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tc contact" id="contact">
        <div className="wrap layout">
          <div className="reveal">
            <div className="eyebrow">
              <span className="dot"></span>
              {t.contact.eyebrow}
            </div>
            <h2>
              {t.contact.titleLine1}
              <br />
              <span className="accent">{t.contact.titleAccent}</span>
            </h2>
            <p className="lede">{t.contact.lede}</p>
            <dl className="info">
              <div className="info-row">
                <dt>{t.contact.email}</dt>
                <dd>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </dd>
              </div>
            </dl>
          </div>

          <form key={formKey.current} className="quote reveal" onSubmit={handleSubmit}>
            <div className="grid2">
              <div className="field">
                <label htmlFor="f-name">{t.contact.nameLabel}</label>
                <input id="f-name" name="name" required placeholder={t.contact.namePlaceholder} />
              </div>
              <div className="field">
                <label htmlFor="f-company">{t.contact.companyLabel}</label>
                <input id="f-company" name="company" placeholder={t.contact.companyPlaceholder} />
              </div>
            </div>
            <div className="field" style={{ marginTop: 18 }}>
              <label htmlFor="f-email">{t.contact.emailLabel}</label>
              <input id="f-email" type="email" name="email" required placeholder={t.contact.emailPlaceholder} />
            </div>
            <div className="grid2" style={{ marginTop: 18 }}>
              <div className="field">
                <label htmlFor="f-cat">{t.contact.categoryLabel}</label>
                <select id="f-cat" name="category" defaultValue={t.contact.categories[0]}>
                  {t.contact.categories.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-vol">{t.contact.volumeLabel}</label>
                <select id="f-vol" name="volume" defaultValue={t.contact.volumes[0]}>
                  {t.contact.volumes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field" style={{ marginTop: 18 }}>
              <label htmlFor="f-msg">{t.contact.messageLabel}</label>
              <textarea id="f-msg" name="message" rows={4} placeholder={t.contact.messagePlaceholder} />
            </div>
            <button className="form-btn" type="submit">
              {t.contact.submit} <span className="arr">→</span>
            </button>
            <div className={`form-msg${showMsg ? ' show' : ''}`}>
              <strong>{t.contact.successTitle}</strong> {t.contact.successBody}
            </div>
          </form>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <div className="layout">
            <div className="col brand-foot">
              <div className="logo-row">
                <img src={logoFull} alt="Tech Commerce LLC" />
              </div>
              <p>{t.footer.description}</p>
            </div>
            <div className="col">
              <h4>{t.footer.company}</h4>
              <a href="#about">{t.footer.about}</a>
              <a href="#values">{t.footer.values}</a>
              <a href="#commitment">{t.footer.commitment}</a>
            </div>
            <div className="col">
              <h4>{t.footer.trade}</h4>
              <a href="#trade">{t.footer.products}</a>
              <a href="#contact">{t.footer.requestQuote}</a>
              <a href="#trade">{t.footer.categories}</a>
            </div>
            <div className="col">
              <h4>{t.footer.contact}</h4>
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </div>
          </div>
          <div className="colophon">
            <span>{t.footer.copyright}</span>
            <span>
              <a href="#top">{t.footer.backToTop}</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
