import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

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

test('static pages do not load advertising or analytics scripts', async () => {
  const pages = await Promise.all(['', 'contact', 'privacy'].map(page))
  const html = pages.join('\n')

  assert.doesNotMatch(html, /googletagmanager|google-analytics|segment\.com|facebook\.net/i)
  assert.doesNotMatch(html, /<script[^>]+src=/i)
})
