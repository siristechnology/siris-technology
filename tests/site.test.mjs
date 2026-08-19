import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { initializeProductSliders } from '../public/scripts/product-slider.js'

const page = (route) => readFile(new URL(`../dist/${route}/index.html`, import.meta.url), 'utf8')

test('homepage contains only the current product navigation and launch state', async () => {
  const html = await page('')

  assert.match(html, />Home</)
  assert.match(html, />Contact Us</)
  assert.match(html, /Coming soon to (?:the )?App Store/i)
  assert.match(html, /Stay connected(?:<br\s*\/?>)?\s*<em>to Nepal\.<\/em>/i)
  assert.match(html, /src="\/assets\/nepal-today-home\.png"/)
  assert.match(html, /href="\/privacy\/"/)
  assert.match(html, /data-product-slider/)
  assert.equal((html.match(/<button[^>]+data-slide-tab/g) ?? []).length, 3)
  assert.match(html, /<strong>News<\/strong>/)
  assert.match(html, /<strong>Podcasts<\/strong>/)
  assert.match(html, /<strong>Live FM<\/strong>/)
  assert.match(html, /News shaped for you, with clearer context\./)
  assert.match(html, /AI creates one shared overview/)
  assert.match(html, /Follow programs\. Listen anywhere\./)
  assert.match(html, /Live radio, wherever you are\./)
  assert.match(html, /src="\/assets\/nepal-today-feed-screen\.png"/)
  assert.match(html, /src="\/assets\/nepal-today-story-screen\.png"/)
  assert.match(html, /src="\/assets\/nepal-today-podcasts-screen\.png"/)
  assert.match(html, /src="\/assets\/nepal-today-radio-screen\.png"/)
  assert.match(html, /No account required/)
  assert.doesNotMatch(html, /setInterval|autoplay/i)
  assert.doesNotMatch(html, /on this installation/i)
  assert.doesNotMatch(html, /feature-card--personal/)
  assert.doesNotMatch(html, />Projects</)
  assert.doesNotMatch(html, />Blog</)
  assert.doesNotMatch(html, />Team</)
  assert.doesNotMatch(html, /Google Play|Android Store/i)
  assert.doesNotMatch(html, /Building a calmer way to stay connected with Nepal/i)
  assert.doesNotMatch(html, /6312 Cider Barrel|Centreville, VA 20121/i)
  assert.match(html, /<script[^>]+src="\/scripts\/product-slider\.js"/i)
})

test('product tabs switch panels by click and arrow key', () => {
  const createTab = () => {
    const listeners = new Map()
    return {
      attributes: new Map(),
      tabIndex: -1,
      focused: false,
      setAttribute(name, value) { this.attributes.set(name, value) },
      getAttribute(name) { return this.attributes.get(name) },
      addEventListener(type, listener) { listeners.set(type, listener) },
      focus() { this.focused = true },
      dispatch(type, values = {}) {
        const event = {
          ...values,
          defaultPrevented: false,
          preventDefault() { this.defaultPrevented = true },
        }
        listeners.get(type)(event)
        return event
      },
    }
  }

  const tabs = [createTab(), createTab(), createTab()]
  const panels = [{ hidden: false }, { hidden: true }, { hidden: true }]
  const slider = {
    querySelectorAll(selector) {
      return selector === '[data-slide-tab]' ? tabs : panels
    },
  }
  const root = { querySelectorAll: () => [slider] }

  initializeProductSliders(root)
  tabs[1].dispatch('click')

  assert.deepEqual(tabs.map((tab) => tab.getAttribute('aria-selected')), ['false', 'true', 'false'])
  assert.deepEqual(panels.map((panel) => panel.hidden), [true, false, true])

  const keyEvent = tabs[1].dispatch('keydown', { key: 'ArrowRight' })
  assert.equal(keyEvent.defaultPrevented, true)
  assert.deepEqual(tabs.map((tab) => tab.getAttribute('aria-selected')), ['false', 'false', 'true'])
  assert.deepEqual(panels.map((panel) => panel.hidden), [true, true, false])
  assert.equal(tabs[2].focused, true)
})

test('contact route builds a Netlify-compatible, spam-protected form', async () => {
  const html = await page('contact')

  assert.match(html, /Send us a message\./)
  assert.doesNotMatch(html, /page-hero/)
  assert.match(html, /<form[^>]+name="contact"[^>]+method="POST"/)
  assert.match(html, /data-netlify="true"/)
  assert.match(html, /netlify-honeypot="bot-field"/)
  assert.match(html, /name="form-name" value="contact"/)
  assert.match(html, /name="name"/)
  assert.match(html, /name="email"/)
  assert.match(html, /name="subject"/)
  assert.match(html, /name="message"/)
  assert.match(html, /action="\/thanks\/"/)
})

test('privacy route documents the app data paths and user controls', async () => {
  const html = await page('privacy')

  assert.match(html, /class="policy-heading"/)
  assert.match(html, /<h1>Privacy Policy<\/h1>/)
  assert.doesNotMatch(html, /policy-hero/)

  for (const expected of [
    'installation ID',
    'Apple WeatherKit',
    'Firebase Crashlytics',
    'AI-assisted grouping and summaries',
    'do not include your Nepal Today installation ID',
    'not generated uniquely for you',
    'Netlify',
    '90 days',
    'does not currently provide an individual deletion mechanism',
    'request deletion of a message',
    'do not track users across',
  ]) {
    assert.match(html, new RegExp(expected, 'i'))
  }

  assert.match(html, /info@siristechnology\.com/)
  assert.doesNotMatch(html, /request deletion of server-held installation data/i)
  assert.doesNotMatch(html, /ask for the anonymous installation ID/i)
  assert.doesNotMatch(html, /6312 Cider Barrel|Centreville, VA 20121/i)
})

test('static pages load only the first-party slider script', async () => {
  const pages = await Promise.all(['', 'contact', 'privacy'].map(page))
  const html = pages.join('\n')
  const scriptSources = [...html.matchAll(/<script[^>]+src="([^"]+)"/gi)].map((match) => match[1])

  assert.doesNotMatch(html, /googletagmanager|google-analytics|segment\.com|facebook\.net/i)
  assert.equal(scriptSources.length, 1)
  assert.equal(scriptSources[0], '/scripts/product-slider.js')
})
