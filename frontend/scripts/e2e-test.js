import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5173';

async function runTests() {
  console.log('🚀 Starting Automated E2E Browser Testing...');
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    tests: [],
    consoleErrors: [],
    brokenImages: [],
    overflows: []
  };

  function record(name, pass, details = '') {
    results.total++;
    if (pass) {
      results.passed++;
      console.log(`  ✅ PASS: ${name}`);
    } else {
      results.failed++;
      console.log(`  ❌ FAIL: ${name} -> ${details}`);
    }
    results.tests.push({ name, pass, details });
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    results.consoleErrors.push(err.toString());
  });

  try {
    // 1. Homepage loads
    const response = await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 15000 });
    record('Homepage loads with HTTP 200', response.status() === 200, `Status: ${response.status()}`);

    // Wait for initial render
    await page.waitForSelector('nav');

    // 2. Hero Section
    const heroTitle = await page.$eval('#home h1', el => el.innerText.trim());
    record('Hero Section displays title', heroTitle.includes('Brew') && heroTitle.includes('Bean'), `Title: ${heroTitle}`);

    const heroStats = await page.$$eval('#home .font-serif.text-3xl', els => els.map(e => e.innerText));
    record('Hero Section displays stats (Origins, Guests, Years)', heroStats.length >= 3, `Stats found: ${heroStats.join(', ')}`);

    // 3. Navigation Links
    const navLinks = await page.$$eval('nav ul li button', btns => btns.map(b => b.innerText.trim()));
    record('Navbar contains navigation links', navLinks.length >= 5, `Links: ${navLinks.join(', ')}`);

    // Test Smooth scroll click
    await page.click('nav ul li button:nth-child(1)');
    record('Navbar link is clickable without errors', true);

    // 4. About Section
    const aboutTitle = await page.$eval('#about h2', el => el.innerText.trim());
    record('About Section renders with heading', aboutTitle.length > 0, `Heading: ${aboutTitle}`);

    // 5. Menu Section & Backend Data Integration
    await page.waitForSelector('#menu');
    const menuCards = await page.$$('#menu .group');
    record('Menu Section displays menu cards', menuCards.length >= 10, `Found ${menuCards.length} menu items`);

    // 6. Menu Category Filters
    const menuTabs = await page.$$eval('#menu button.rounded-full', btns => btns.map(b => b.innerText.trim()));
    record('Menu category filter buttons exist', menuTabs.includes('ESPRESSO') && menuTabs.includes('COLD BREW'), `Tabs: ${menuTabs.join(', ')}`);

    // Click 'Cold Brew' filter
    const coldBrewBtn = (await page.$$('#menu button.rounded-full'))[3]; // Cold Brew
    if (coldBrewBtn) {
      await coldBrewBtn.click();
      await new Promise(r => setTimeout(r, 400));
      const filteredCount = await page.$$eval('#menu .group', els => els.length);
      record('Category filter (Cold Brew) updates grid', filteredCount > 0 && filteredCount < 18, `Filtered count: ${filteredCount}`);
      // Click back to 'All'
      const allBtn = (await page.$$('#menu button.rounded-full'))[0];
      await allBtn.click();
      await new Promise(r => setTimeout(r, 400));
    } else {
      record('Category filter button clickable', false, 'Cold brew button not found');
    }

    // 7. Signature Drinks
    const sigCards = await page.$$('#signature .group');
    record('Signature Drinks section displays cards', sigCards.length >= 4, `Found ${sigCards.length} signature drinks`);

    // 8. Food and Desserts
    const foodCards = await page.$$('#food .group');
    record('Food and Desserts section displays items', foodCards.length >= 8, `Found ${foodCards.length} food items`);

    // 9. Gallery Images & Interaction
    const galleryItems = await page.$$('#gallery .group');
    record('Gallery displays images', galleryItems.length >= 10, `Found ${galleryItems.length} gallery images`);

    // Test Gallery Lightbox
    if (galleryItems.length > 0) {
      await galleryItems[0].click();
      await new Promise(r => setTimeout(r, 500));
      const lightboxVisible = await page.$eval('.fixed.inset-0.z-50', el => el !== null).catch(() => false);
      record('Gallery lightbox opens on click', lightboxVisible);

      if (lightboxVisible) {
        await page.click('.fixed.inset-0.z-50 button');
        await new Promise(r => setTimeout(r, 300));
        const lightboxClosed = await page.$eval('.fixed.inset-0.z-50', el => false).catch(() => true);
        record('Gallery lightbox closes on X button', lightboxClosed);
      }
    }

    // 10. Testimonials
    const testCards = await page.$$('#testimonials .group');
    record('Testimonials section renders demo reviews', testCards.length >= 3, `Found ${testCards.length} review cards`);

    // 11. Contact Section
    const contactExists = await page.$eval('#contact', el => el !== null).catch(() => false);
    record('Contact section renders', contactExists);

    // 12. WhatsApp Button
    const waLink = await page.$eval('#contact a[href*="wa.me"]', el => el.href).catch(() => null);
    record('WhatsApp button has valid link format', waLink && waLink.includes('wa.me'), `WhatsApp link: ${waLink}`);

    // 13. Footer Links
    const footerButtons = await page.$$eval('footer button', btns => btns.length);
    record('Footer renders navigation links', footerButtons >= 4, `Found ${footerButtons} footer nav buttons`);

    // 14. Contact Reservation Form Submission (E2E Integration)
    console.log('\n📝 Testing Contact Reservation Form Submission...');
    await page.type('#contact input[type="text"]', 'E2E Test User');
    await page.type('#contact input[type="tel"]', '+91 99999 88888');
    await page.type('#contact input[type="date"]', '2026-11-20');
    await page.select('#contact select', '4');
    await page.click('#contact button[type="submit"]');
    await new Promise(r => setTimeout(r, 1200));

    const successAlert = await page.$eval('#contact .text-emerald-200', el => el.innerText).catch(() => null);
    record('Contact reservation form submits to backend and shows success toast', successAlert !== null, successAlert || 'No success alert shown');

    // 15. Broken Images Check across the entire page
    // Scroll page down smoothly to let all images render
    await page.evaluate(async () => {
      await new Promise(resolve => {
        let totalHeight = 0;
        const distance = 300;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 120);
      });
    });
    await new Promise(r => setTimeout(r, 2000));

    const imageStatus = await page.evaluate(async () => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const results = [];
      for (const img of imgs) {
        if (!img.complete) {
          await new Promise(r => {
            img.onload = r;
            img.onerror = r;
            setTimeout(r, 1500);
          });
        }
        results.push({
          src: img.src,
          alt: img.alt,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        });
      }
      return results;
    });

    const broken = imageStatus.filter(img => img.naturalWidth === 0);
    record('All page images load successfully (0 broken)', broken.length === 0, `${broken.length} broken images found: ${broken.map(b => b.alt || b.src).join('; ')}`);
    results.brokenImages = broken;

    // 16. Check Console Errors
    record('Browser console has zero runtime errors', results.consoleErrors.length === 0, results.consoleErrors.join(' | '));

    // ==========================================
    // PHASE 3: RESPONSIVE TESTING
    // ==========================================
    console.log('\n📱 Testing Responsive Viewports...');
    const viewports = [
      { name: 'Desktop', width: 1440, height: 900 },
      { name: 'Laptop', width: 1280, height: 800 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 390, height: 844 },
      { name: 'Small mobile', width: 360, height: 740 }
    ];

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await new Promise(r => setTimeout(r, 600));

      // Check horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      record(`Viewport ${vp.name} (${vp.width}px) has no horizontal scroll overflow`, !hasHorizontalScroll, `Scroll width: ${vp.width}`);

      // If mobile, check hamburger menu button & test clicking it
      if (vp.width <= 768) {
        const hamburgerBtn = await page.$('nav button.md\\:hidden');
        record(`Viewport ${vp.name} displays mobile hamburger menu button`, hamburgerBtn !== null);
        if (hamburgerBtn && vp.width === 390) {
          await hamburgerBtn.click();
          await new Promise(r => setTimeout(r, 300));
          const mobileMenuVisible = await page.$eval('nav .md\\:hidden.overflow-hidden', el => el.classList.contains('max-h-screen'));
          record('Mobile hamburger menu expands on click', mobileMenuVisible);
          // Close menu
          await hamburgerBtn.click();
          await new Promise(r => setTimeout(r, 300));
        }
      }
    }

  } catch (err) {
    record('E2E Test Execution', false, err.stack || err.message);
  } finally {
    await browser.close();
  }

  console.log('\n📊 E2E TEST SUMMARY:');
  console.log(`Total: ${results.total} | Passed: ${results.passed} | Failed: ${results.failed}`);
  fs.writeFileSync('e2e-results.json', JSON.stringify(results, null, 2));
}

runTests();
