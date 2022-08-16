<template>
  <main class="energy-first-container">
    <div v-if="$i18n.locale === 'en'">
      <div class="container container-large x-spaced-medium">
        <h1 class="h1">An energy efficient web</h1>
      </div>

      <article class="x-spaced-medium y-spaced-xlarge">
        <div class="container">
          <div class="shapes" data-shapes style="--x: 30;">
            <div class="shape yellow"></div>
            <div class="shape blue"></div>
            <div class="battery"></div>
          </div>
          <div class="slider">
            <h2 class="h2">How much do you know about energy first?</h2>
            <form action="">
              <label for="range" class="typo-small">I have no clue</label>
              <input type="range" name="range" id="range" min="0" max="50" value="30" data-range>
              <label for="range" class="typo-small">Yeah, that’s my thing</label>
            </form>
          </div>
        </div>
      </article>

      <div class="container container-large x-spaced-medium y-spaced-large intro">
        <p class="typo-large">Why do websites cost energy? Sure, they have to be designed, developed, deployed and run on
          servers and devices. But let’s break it down to the physics. What is it that actually consumes energy? It’s a
          CPU or GPU that has to perform calculations, it’s a network of servers, routers and wi-fi antennas that have to
          connect to each other, it’s screens that have to produce photons to light up and display a website. So in every
          stage of a website, from its inception to a user visiting it, we have to minimise or avoid these aspects
          entirely.</p>
      </div>

      <article class="filled-primary y-spaced-xlarge x-spaced-medium">
        <div class="container design">
          <h2 class="h2">Energy efficiency starts with design</h2>
          <p>Images, videos, custom fonts, they all require energy to download, process and display. The less resources
            you use, the more energy you save.</p>
          <p>And not every resource has the same footprint:</p>
          <ol class="list">
            <li>images require less energy than videos</li>
            <li>text requires less than images</li>
            <li>a system font requires less than a custom one</li>
          </ol>
          <p>Fewer resources are not just a good way to save energy. Lightweight sites are faster, which is great for
            users and SEO. And text-heavy sites are typically more accessible.</p>
        </div>
      </article>

      <article class="filled-primary-half x-spaced-medium">
        <div class="container x-spaced-large y-spaced-large filled-secondary darkmode">
          <p class="color-light">
            Remember those photons? Dark mode can save up to 20-30% on OLED screens. So maybe it’s time to design a dark theme for your website. We're working on that ourselves too!
          </p>
        </div>
      </article>

      <article class="x-spaced-medium y-spaced-xlarge">
        <div class="container web-development">
          <h2 class="h2">Energy efficient web development in the ’20s</h2>
          <p>It’s the roaring twenties again. Gone are the days where a developer simply edits the designed resources and
            copies them onto a web server. Instead we rely on package managers, build tools, continuous integration
            servers, cloud services (like a headless CMS), preview environments and finally our actual website. Needless
            to say, all these moving parts consume energy. It’s difficult to know just how much, as it’s a web of parts
            depending on other parts depending on other parts.</p>
          <p>The good thing is that we can also use these modern development tools to save energy. We can automatically
            create smaller versions of the same videos and images, we can remove unused code from our styles, scripts and
            font files and generate static versions of our sites that only use all those connected cloud services during
            build.</p>
        </div>
      </article>

      <div class="sticky">
        <div class="container sticky-inner">
          <p class="typo-small typo-bold">Pick from the options to improve energy efficiency</p>
          <div class="battery" data-chart style="--value: 0;"></div>
        </div>
      </div>

      <article class="filled-primary y-spaced-xlarge x-spaced-medium">
        <form class="container" data-chart-form>
          <h2 class="h2">Running websites efficiently</h2>
          <ul class="options">
            <li>
              <div class="checkbox pulse">
                <input type="checkbox" name="ssr-and-caching" id="ssr-and-caching">
                <label for="ssr-and-caching" class="typo-bold">
                  <span>SSR and caching</span>
                </label>
              </div>
              <p>A lot of web pages are the same for every visitor. So it makes no sense to generate a new version of the
                page every time. Instead we only generate a new version of the page when its content changes. We use
                static site generators for this. The same can be achieved with server-side caching and a good cache
                busting strategy. As a result the server only has to serve the pre-generated / cached web page. This saves
                a lot of energy, especially on frequently visited sites.</p>
            </li>
            <li>
              <div class="checkbox pulse">
                <input type="checkbox" name="cdn-and-compression" id="cdn-and-compression">
                <label for="cdn-and-compression" class="typo-bold">
                  <span>CDN and compression</span>
                </label>
              </div>
              <p>When a user visits a page, it has to be served over the network. A request starts in the user’s browser,
                travels through the network to the server and back to the user. This could mean a full trip around the
                world. To save on network costs, we can use a world-wide content delivery network (CDN), to serve web
                pages from a server near the user. CDN’s are very easy to use with static sites, as they can simply store
                a copy of the pre-generated pages. We also use as little of the network as possible by compressing
                resources with gzip and brotli.</p>
            </li>
            <li>
              <div class="checkbox pulse">
                <input type="checkbox" name="cloud-functions" id="cloud-functions">
                <label for="cloud-functions" class="typo-bold">
                  <span>Cloud functions</span>
                </label>
              </div>
              <p>For dynamic pages we use cloud functions (lambdas) on an edge network. Just like the CDN, they run close
                to our users. Unlike a regular server, a cloud function only runs when it receives a request. When more
                requests are made at the same time, more instances of the cloud functions spin up. When the requests
                decrease, the cloud functions scale down. This way, we only use the energy we need when we need it.</p>
            </li>
            <li>
              <div class="checkbox pulse">
                <input type="checkbox" name="client-side-caching" id="client-side-caching">
                <label for="client-side-caching" class="typo-bold">
                  <span>Client-side caching</span>
                </label>
              </div>
              <p>Once a user received a resource we can ensure it never has to request it again. We achieve this using
                client-side caching. We ensure a resource never changes (or revision the resource name if it does). Then
                we tell the browser it can keep the file “forever” (using ’Cache-Control’, ‘public, max-age=31536000,
                immutable’).</p>
            </li>
            <li>
              <div class="checkbox pulse">
                <input type="checkbox" name="green-hosting" id="green-hosting">
                <label for="green-hosting" class="typo-bold">
                  <span>Green hosting</span>
                </label>
              </div>
              <p>At the end of the day, our websites will still require websites to run. The best we can do, is make sure
                they run on sustainable energy. Our websites partially use green hosting providers, so we still have some
                work to do here. You can check if your site has green hosting.</p>
            </li>
          </ul>
        </form>
      </article>

      <article class="filled-primary-half x-spaced-medium">
        <div class="container x-spaced-large y-spaced-large filled-secondary web-manifest">
          <h2 class="h2 color-light">Commit to energy efficient websites</h2>
          <p class="color-light">We’ll continue to improve the energy efficiency of our websites. And will push our design
            partners, hosting providers and clients to do the same. We are committed to creating a more sustainable web.
            So all of us at De Voorhoede signed the <a href="https://www.sustainablewebmanifesto.com/" target="_blank"
                                                       rel="noreferrer noopener">Sustainable Web Manifesto</a>. You should commit and sign it too.</p>
          <a class="button" href="https://www.sustainablewebmanifesto.com/#signature" target="_blank"
             rel="noreferrer noopener">Sign now</a>
        </div>
      </article>
    </div>
    <div v-if="$i18n.locale === 'nl'">
      <div class="container container-large x-spaced-medium">
        <h1 class="h1">Een energiezuinig web</h1>
      </div>

      <article class="x-spaced-medium y-spaced-xlarge">
        <div class="container">
          <div class="shapes" data-shapes style="--x: 30;">
            <div class="shape yellow"></div>
            <div class="shape blue"></div>
            <div class="battery"></div>
          </div>
          <div class="slider">
            <h2 class="h2">Hoeveel weet je over energie?</h2>
            <form action="">
              <label for="range" class="typo-small">Ik heb geen idee</label>
              <input type="range" name="range" id="range" min="0" max="50" value="30" data-range>
              <label for="range" class="typo-small">Helemaal mijn ding</label>
            </form>
          </div>
        </div>
      </article>

      <div class="container container-large x-spaced-medium y-spaced-large intro">
        <p class="typo-large">
          Waarom kosten websites energie? Natuurlijk moeten ze worden ontworpen, ontwikkeld, geïmplementeerd en uitgevoerd op servers en apparaten. Maar laten we het bekijken vanuit een natuurkundig perspectief. Wat verbruikt eigenlijk energie? Het is een CPU of GPU die berekeningen moet uitvoeren, het is een netwerk van servers, routers en wifi-antennes die met elkaar moeten verbinden, het zijn schermen die fotonen moeten produceren om een website op te lichten en weer te geven. Dus in elke fase van een website, vanaf het begin tot het bezoek van een gebruiker, moeten we deze aspecten minimaliseren of volledig vermijden.
        </p>
      </div>

      <article class="filled-primary y-spaced-xlarge x-spaced-medium">
        <div class="container design">
          <h2 class="h2">Energie-efficiëntie begint bij het ontwerp</h2>
          <p>Afbeeldingen, video's, aangepaste lettertypes, ze kosten allemaal energie om te downloaden, te verwerken en weer te geven. Hoe minder bronnen je gebruikt, hoe meer energie je bespaart.</p>
          <p>En niet elk item heeft dezelfde footprint:</p>
          <ol class="list">
            <li>afbeeldingen hebben minder energie nodig dan videos</li>
            <li>tekst vereist minder dan afbeeldingen</li>
            <li>een systeemlettertype vereist minder dan een aangepast lettertype</li>
          </ol>
          <p>Minder hulpbronnen zijn niet alleen een goede manier om energie te besparen. Lichtgewicht sites zijn sneller, wat geweldig is voor gebruikers en SEO. Daarnaast zijn sites met veel tekst doorgaans beter toegankelijk.</p>
        </div>
      </article>

      <article class="filled-primary-half x-spaced-medium">
        <div class="container x-spaced-large y-spaced-large filled-secondary darkmode">
          <p class="color-light">
            Herinner je je die fotonen nog? De donkere modus kan tot 20-30% besparen op OLED-schermen. Dus misschien is het tijd om een donker thema voor je website te ontwerpen? Dat staat bij ons in ieder geval hoog op de agenda.
          </p>
        </div>
      </article>

      <article class="x-spaced-medium y-spaced-xlarge">
        <div class="container web-development">
          <h2 class="h2">Energiezuinige webontwikkeling in de jaren '20</h2>
          <p>Weer zijn weer terug in de roaring twenties. Voorbij zijn de dagen dat een ontwikkelaar de ontworpen bronnen eenvoudigweg bewerkt en naar een webserver kopieert. In plaats daarvan vertrouwen we op pakketbeheerders, bouw tools, continuous integration servers, cloud services (zoals een headless CMS), preview-omgevingen en tot slot onze eigen website. Waarschijnlijk is het je wel duidelijk dat al deze dingen energie verbruiken. Het is moeilijk om te ontdekken hoeveel precies, omdat het web afhankelijk is van onderdelen, die weer van andere onderdelen afhankelijk zijn, enzovoorts.</p>
          <p>Het mooie is dat we deze moderne ontwikkeltools ook kunnen gebruiken om energie te besparen. We kunnen automatisch kleinere versies van dezelfde video's en afbeeldingen maken, we kunnen ongebruikte code uit onze styling, scripts en lettertypebestanden verwijderen en statische versies van onze sites genereren die alleen die verbonden cloudservices gebruiken tijdens het bouwen.</p>
        </div>
      </article>

      <div class="sticky">
        <div class="container sticky-inner">
          <p class="typo-small typo-bold">Kies uit de verschillende opties om energie te besparen</p>
          <div class="battery" data-chart style="--value: 0;"></div>
        </div>
      </div>

      <article class="filled-primary y-spaced-xlarge x-spaced-medium">
        <form class="container" data-chart-form>
          <h2 class="h2">Websites efficiënt laten draaien</h2>
          <ul class="options">
            <li>
              <div class="checkbox pulse">
                <input type="checkbox" name="ssr-and-caching" id="ssr-and-caching">
                <label for="ssr-and-caching" class="typo-bold">
                  <span>SSR en caching</span>
                </label>
              </div>
              <p>Veel webpagina's zijn voor elke bezoeker hetzelfde. Het heeft dus geen zin om elke keer een nieuwe versie van de pagina te genereren. In plaats daarvan genereren we alleen een nieuwe versie van de pagina wanneer de inhoud verandert. Hiervoor gebruiken we statische site generators. Hetzelfde kunnen we doen met server-side caching en een goede cache-busting-strategie. Hierdoor hoeft de server alleen de vooraf gegenereerde / in de cache opgeslagen webpagina te tonen. Dit bespaart veel energie, vooral op veelbezochte sites.</p>
            </li>
            <li>
              <div class="checkbox pulse">
                <input type="checkbox" name="cdn-and-compression" id="cdn-and-compression">
                <label for="cdn-and-compression" class="typo-bold">
                  <span>CDN en compressie</span>
                </label>
              </div>
              <p>Wanneer een gebruiker een pagina bezoekt, moet deze via het netwerk worden getoond. Een verzoek begint in de browser van de gebruiker, gaat via het netwerk naar de server en terug naar de gebruiker. Dit is soms een volledige wereldreis. Om die reis korter te maken, gebruiken we een wereldwijd content delivery network (CDN) om webpagina's te tonen vanaf een server in de buurt van de gebruiker. CDN's zijn heel gemakkelijk te gebruiken met statische sites, omdat ze eenvoudig een kopie van de vooraf gegenereerde pagina's kunnen opslaan. We gebruiken ook zo min mogelijk energie van het netwerk door bronnen te comprimeren met gzip en brotli.</p>
            </li>
            <li>
              <div class="checkbox pulse">
                <input type="checkbox" name="cloud-functions" id="cloud-functions">
                <label for="cloud-functions" class="typo-bold">
                  <span>Cloud functions</span>
                </label>
              </div>
              <p>Voor dynamische pagina's gebruiken we cloud functions (lambdas) op een edge network. Net als CDN draaien ze dicht bij onze gebruikers. In tegenstelling tot een reguliere server, wordt een cloud function alleen uitgevoerd wanneer deze een verzoek ontvangt. Wanneer er meer verzoeken tegelijkertijd worden gedaan, draaien er meer instanties van de cloud function. Op het moment dat de verzoeken afnemen, worden de cloud functions kleiner. Zo gebruiken we de energie die we nodig hebben alleen wanneer we die nodig hebben.</p>
            </li>
            <li>
              <div class="checkbox pulse">
                <input type="checkbox" name="client-side-caching" id="client-side-caching">
                <label for="client-side-caching" class="typo-bold">
                  <span>Client-side caching</span>
                </label>
              </div>
              <p>Zodra een gebruiker een bron heeft ontvangen, zorgen we ervoor dat deze deze nooit meer opgevraagd hoef te worden. Dit bereiken we met behulp van client-side caching. We zorgen ervoor dat een resource nooit verandert (of herzien de resourcenaam als dat wel het geval is). Vervolgens vertellen we de browser dat hij het bestand "voor altijd" kan houden (met behulp van 'Cache-Control', 'public, max-age=31536000, immutable').</p>
            </li>
            <li>
              <div class="checkbox pulse">
                <input type="checkbox" name="green-hosting" id="green-hosting">
                <label for="green-hosting" class="typo-bold">
                  <span>Groene hosting</span>
                </label>
              </div>
              <p>Aan het eind van de dag hebben onze websites nog steeds andere websites nodig om te draaien. Het beste wat we kunnen doen, is ervoor zorgen dat ze op duurzame energie draaien. Onze websites maken deels gebruik van groene hosting providers, dus hier hebben we nog wat werk aan. Controleer of jouw site groene hosting heeft.</p>
            </li>
          </ul>
        </form>
      </article>

      <article class="filled-primary-half x-spaced-medium">
        <div class="container x-spaced-large y-spaced-large filled-secondary web-manifest">
          <h2 class="h2 color-light">Zet in op energiezuinige websites</h2>
          <p class="color-light">We blijven de energie-efficiëntie van onze websites verbeteren. En we zetten onze ontwerppartners, hostingproviders en klanten ertoe aan hetzelfde te doen. We streven naar een duurzamer internet. Daarom hebben we bij De Voorhoede allemaal het Sustainable Web Manifesto ondertekend. Dat zou jij ook moeten doen.</p>
          <a class="button" href="https://www.sustainablewebmanifesto.com/#signature" target="_blank" rel="noreferrer noopener">Nu tekenen</a>
        </div>
      </article>
    </div>
  </main>
</template>

<script>
  import asyncData from '~/lib/async-page'
  import head from '~/lib/seo-head'

  export default {
    asyncData,
    head,
    mounted() {
      const shapes = document.querySelector('[data-shapes]')
      const range = document.querySelector('[data-range]')
      const chart = document.querySelector('[data-chart]')
      const inputs = [...document.querySelectorAll('[data-chart-form] input')]

      initShapes(shapes, range)
      initChart(chart, inputs)
    },
  }

  const get = (key) => {
    const state = localStorage.getItem(key)
    if (state === null) { return null }
    return JSON.parse(state)
  }

  const set = (key, state) => localStorage.setItem(key, JSON.stringify(state))

  function initShapes(shapes, range) {
    if (!shapes || !range) { return }

    range.addEventListener('input', onInput)

    function onInput(e) {
      shapes.style.setProperty('--x', e.currentTarget.value)
    }
  }

  function initChart(chart, inputs) {
    if (!chart || !inputs) { return }

    const strength = 100 / inputs.length
    let value = 0
    let isClicked = get('isClicked')

    if (isClicked) {
      document.body.classList.add('is-clicked')
    }

    setValue()

    inputs.forEach(input => input.addEventListener('input', onClick))

    function onClick() {
      if (!isClicked) {
        isClicked = true
        document.body.classList.add('is-clicked')
        set('isClicked', true)
      }
      setValue()
    }

    function setValue() {
      value = 0
      inputs.forEach(input => value += input.checked ? strength : 0)
      chart.style.setProperty('--value', value * .01)
    }
  }
</script>

<style scoped>
  .energy-first-container {
    font-family: var(--font-sans);
    box-sizing: border-box;
    line-height: 1.7em;
    padding-top: calc(var(--spacing-medium) + var(--app-header-height-large));
    padding-bottom: var(--spacing-xxlarge);
    isolation: isolate;

    --yellow: #ffe400;
    --blue: #0000ff;
    --blue-darken: #000044;
    --green: #2ba30f;
    --yellow-muted: #fffeca;
    --black: #222222;
    --white: #ffffff;
    --deepblue: #00002b;
    --section-background: var(--yellow-muted);
    --max-width-medium: 720px;
    --max-width-large: 900px;
    --max-width-xlarge: 1080px;
    --spacing-xsmall: 5px;
    --spacing-small: 10px;
    --spacing-medium: 20px;
    --spacing-large: 30px;
    --spacing-xlarge: 60px;
    --spacing-xxlarge: 100px;
    --checkbox: 20px;
  }

  /* ============================== globals */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
  }

  /* ============================== typo */
  .h1 {
    font-size: 3.125rem;
    line-height: 1.1em;
    color: var(--blue);
    text-align: center;
  }

  .h2 {
    font-size: 1.625rem;
    line-height: 1.3em;
    color: var(--blue);
  }

  .typo-large {
    font-size: 1.125rem;
    line-height: 1.7em;
  }

  .typo-small {
    font-size: 1rem;
    line-height: 1.3em;
  }

  .typo-bold {
    font-weight: bold;
  }

  .color-light {
    color: var(--white);
  }

  @media screen and (min-width: 800px) {
    body {
      font-size: 1rem;
    }

    .typo-large {
      font-size: 1.375rem;
    }

    .typo-small {
      font-size: .9375rem;
    }
  }

  /* === list */
  .list {
    list-style: none;
  }

  .list li {
    position: relative;
    padding-left: var(--spacing-medium);
  }

  .list li::before {
    --size: 6px;

    content: '';
    position: absolute;
    top: calc(.8em - (var(--size) * .5));
    left: 0;
    width: var(--size);
    height: var(--size);
    background-color: currentColor;
    border-radius: 50%;
  }

  /* ============================== layout */
  .container {
    max-width: var(--max-width-medium);
    margin-right: auto;
    margin-left: auto;
  }

  .container-large {
    max-width: var(--max-width-large);
  }

  .x-spaced-large {
    padding-right: var(--spacing-large);
    padding-left: var(--spacing-large);
  }

  .x-spaced-medium {
    padding-right: var(--spacing-medium);
    padding-left: var(--spacing-medium);
  }

  .y-spaced-xlarge {
    padding-top: var(--spacing-xlarge);
    padding-bottom: var(--spacing-xlarge);
  }

  .y-spaced-large {
    padding-top: var(--spacing-large);
    padding-bottom: var(--spacing-large);
  }

  .y-spaced-medium {
    padding-top: var(--spacing-medium);
    padding-bottom: var(--spacing-medium);
  }

  .filled-primary {
    background-color: var(--section-background);
  }

  .filled-primary-half {
    background-image: linear-gradient(var(--section-background), var(--section-background));
    background-size: 100% 50%;
    background-repeat: no-repeat;
    background-position: 50% 0;
  }

  .filled-secondary {
    background-color: var(--blue);
  }

  /* ============================== header */
  .header {
    padding: var(--spacing-small);
  }

  .header .inner {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    max-width: var(--max-width-xlarge);
    margin-right: auto;
    margin-left: auto;
  }

  .header .link {
    display: block;
  }

  .logo {
    display: block;
    width: 154px;
    height: 26px;
  }

  @media screen and (min-width: 900px) {
    .logo {
      width: 178px;
      height: 30px;
    }
  }

  /* ============================== button */
  .button {
    display: inline-block;
    padding: 6px 20px 3px 20px;
    text-align: center;
    color: var(--blue);
    text-decoration: none;
    border-radius: 3px;
    background-color: var(--yellow);
    box-shadow: 0 0 0 var(--yellow);
    transition: box-shadow .15s;
  }

  .button-secondary {
    padding: 2px 10px 1px 10px;
    background-color: var(--blue);
    box-shadow: 0 0 0 var(--blue);
    color: var(--white);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .button:hover,
  .button:focus {
    box-shadow: 0 0 0 3px var(--yellow);
  }

  .button-secondary:hover,
  .button-secondary:focus {
    box-shadow: 0 0 0 3px var(--blue);
  }

  /* ============================== overlapping shapes */
  .shapes {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .shapes .shape {
    position: relative;
    width: 100%;
    border-radius: 50%;
  }

  .shapes .shape::before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .shape.yellow {
    background-color: var(--yellow);

    --offset: calc(var(--x) * 1%);

    transform: translateX(var(--offset));
  }

  .shape.blue {
    background-color: var(--blue);
    overflow: hidden;

    --offset: calc(var(--x) * -1%);

    transform: translateX(var(--offset));
  }

  .shape.blue::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--green);

    --offset: calc(-100% + var(--x) * 2%);

    transform: translateX(var(--offset));
  }

  .shapes .battery {
    position: absolute;

    --width: 12%;
    --height: 50%;

    top: calc((100% - var(--height)) * .5);
    left: calc((100% - var(--width)) * .5);
    height: var(--height);
    width: var(--width);

    --progress: calc(var(--x) * .02);
    --scale: calc(var(--progress) * var(--progress));

    transform: scale(var(--scale));

    --size: calc(var(--scale) * 100%);

    box-shadow: inset 0 0 0 7px var(--white);
    background-image: linear-gradient(var(--white), var(--white));
    background-size: 100% var(--size);
    background-repeat: no-repeat;
    background-position: 0 100%;
  }

  @media screen and (min-width: 400px) {
    .shapes .battery {
      box-shadow: inset 0 0 0 9px var(--white);
    }
  }

  @media screen and (min-width: 700px) {
    .shapes .battery {
      box-shadow: inset 0 0 0 15px var(--white);
    }
  }

  /* tip */
  .shapes .battery::before {
    content: '';
    position: absolute;
    bottom: calc(100% - 1px);
    left: 25%;
    width: 50%;
    height: 10%;
    background-color: var(--white);
  }

  /* plus */
  .shapes .battery::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100' fill='none' stroke-width='15px' stroke='%232BA30F'><line x1='50' y1='5' x2='50' y2='95'/><line x1='95' y1='50' x2='5' y2='50'/></svg>");
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: center center;
  }

  /* ============================== checkbox */
  .checkbox {
    position: relative;
  }

  .checkbox input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .checkbox label {
    position: relative;
    display: block;
    padding-left: calc(var(--checkbox) + var(--spacing-medium));
    cursor: pointer;
    color: var(--blue);
  }

  .checkbox label span {
    position: relative;
    z-index: 2;
    display: inline-block;
  }

  .checkbox input:focus + label span::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -3px;
    left: calc(var(--spacing-small) * -1);
    width: calc(100% + var(--spacing-small) * 2);
    height: calc(100% + 3px);
    box-shadow: inset 0 0 0 2px var(--blue);
    border-radius: 30px;
  }

  .checkbox label::before,
  .checkbox label::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: var(--checkbox);
    transition: transform .1s;
  }

  .checkbox label::before {
    height: var(--checkbox);
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100' fill='none' stroke-width='15px' stroke='%230000ff'><line x1='50' y1='5' x2='50' y2='95'/><line x1='95' y1='50' x2='5' y2='50'/></svg>");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center center;
  }

  .checkbox label::after {
    height: calc(var(--checkbox) * .6);
    border-bottom: 4px solid var(--green);
    border-left: 4px solid var(--green);
    transform: rotate(-45deg) scale(0);
  }

  .checkbox input:checked + label::before {
    transform: scale(0);
  }

  .checkbox input:checked + label::after {
    transform: rotate(-45deg) scale(1);
  }

  .checkbox.pulse {
    position: relative;
  }

  .checkbox.pulse::before {
    --size: 80px;

    content: '';
    position: absolute;
    top: calc(50% - (var(--size) * .5));
    left: calc((var(--size) * -.5) + (var(--checkbox) * .5));
    width: var(--size);
    height: var(--size);
    pointer-events: none;
    background-color: var(--blue);
    border-radius: 50%;
    transform: scale(0);
    opacity: .3;
  }

  body:not(.is-clicked) .checkbox.pulse::before {
    animation: pulse 1.5s infinite;
  }

  /* ============================== intro */
  .intro {
    margin-bottom: var(--spacing-large);
    text-align: center;
  }

  /* ============================== sticky */
  .sticky {
    position: sticky;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    margin-top: var(--spacing-medium);
    margin-bottom: var(--spacing-xlarge);
    background-color: var(--white);
  }

  .sticky-inner {
    display: grid;
    grid-template-columns: auto 100px;
    grid-gap: var(--spacing-small);
    justify-content: center;
    padding-top: var(--spacing-small);
    padding-right: var(--spacing-medium);
    padding-bottom: var(--spacing-small);
    padding-left: var(--spacing-small);
  }

  @media screen and (min-width: 400px) {
    .sticky-inner {
      grid-template-columns: 200px 100px;
    }
  }

  @media screen and (min-width: 600px) {
    .sticky-inner {
      grid-template-columns: 200px 100px 200px;
    }
  }

  .sticky-inner p {
    text-align: right;
    color: var(--blue);
  }

  .sticky .battery {
    position: relative;
    width: 100px;
    height: 40px;
    box-shadow: inset 0 0 0 5px var(--blue);
  }

  .sticky .battery::before {
    content: '';
    position: absolute;
    top: 25%;
    left: calc(100% - 1px);
    width: 10%;
    height: 50%;
    background-color: var(--blue);
  }

  .sticky .battery::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--blue);
    transform-origin: 0 50%;
    transform: scaleX(var(--value));
    transition: transform .15s;
  }

  /* ============================== slider */
  .slider {
    --range-track: 4px;
    --range-thumb: 30px;
    --range-radius: 10px;
    --range-tooltip-height: 40px;
    --range-tooltip-pointer: 14px;
    --range-duration: .2s;
    --input-color: var(--blue);

    margin-top: var(--spacing-xlarge);
  }

  .slider h2 {
    text-align: center;
  }

  .slider form {
    position: relative;
    margin-top: var(--spacing-large);
  }

  .slider form > * {
    position: relative;
    z-index: 3;
  }

  .slider form:focus-within::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: calc(var(--spacing-small) * -1);
    left: calc(var(--spacing-small) * -1);
    width: calc(100% + var(--spacing-medium));
    height: calc(100% + var(--spacing-medium));
    pointer-events: none;
    border-radius: 4px;
    background-color: var(--blue);
    opacity: .1;
  }

  .slider form label {
    display: block;
    color: var(--blue);
  }

  @media screen and (max-width: 599px) {
    .slider input[type=range] {
      margin-top: var(--spacing-medium);
      margin-bottom: var(--spacing-medium);
    }

    .slider form label:last-child {
      text-align: right;
    }
  }

  @media screen and (min-width: 600px) {
    .slider form {
      display: grid;
      grid-template-columns: 160px 1fr 160px;
      grid-gap: var(--spacing-small);
    }

    .slider form:focus-within::before {
      border-radius: 30px;
    }

    .slider form label:first-child {
      text-align: right;
    }
  }

  /* ========= reset range input to an invisible element */
  .slider input[type=range] {
    position: relative;
    z-index: 2;
    display: block;
    width: 100%;
    border: 0;
    -webkit-appearance: none;
    background: transparent;
  }

  .slider input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  .slider input[type=range]:focus {
    outline: none;
  }

  .slider input[type=range]::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  /* ========= thumb / handle */
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: var(--range-thumb);
    width: var(--range-thumb);
    margin-top: calc((var(--range-thumb) - var(--range-track)) * -.5);
    border-radius: 50%;
    cursor: pointer;
    border: 0;
    background-color: var(--input-color);
    box-shadow: 0 0 0 0 var(--input-color);
    transition: box-shadow var(--range-duration);
  }

  input[type=range]:hover::-webkit-slider-thumb {
    box-shadow: 0 0 0 3px var(--input-color);
  }

  input[type=range]::-moz-range-thumb {
    height: var(--range-thumb);
    width: var(--range-thumb);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: var(--input-color);
    transition: transform var(--range-duration);
  }

  input[type=range]:hover::-moz-range-thumb {
    transform: scale(1.1);
  }

  input[type=range]::-ms-thumb {
    height: var(--range-thumb);
    width: var(--range-thumb);
    border-radius: 50%;
    cursor: pointer;
    background-color: var(--input-color);
    transition: transform var(--range-duration);
  }

  input[type=range]:hover::-ms-thumb {
    transform: scale(1.1);
  }

  /* ==== track */
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--range-track);
    cursor: pointer;
    background: var(--input-color);
  }

  input[type=range]:focus::-webkit-slider-runnable-track {
    background: var(--input-color);
  }

  input[type=range]::-moz-range-track {
    width: 100%;
    height: var(--range-track);
    cursor: pointer;
    background: var(--input-color);
  }

  input[type=range]::-ms-track {
    width: 100%;
    height: var(--range-track);
    cursor: pointer;
    background: var(--input-color);
    border-color: var(--input-color);
    border-width: 16px 0;
    color: var(--input-color);
  }

  input[type=range]::-ms-fill-lower {
    background: var(--input-color);
  }

  input[type=range]:focus::-ms-fill-lower {
    background: var(--input-color);
  }

  input[type=range]::-ms-fill-upper {
    background: var(--input-color);
  }

  input[type=range]:focus::-ms-fill-upper {
    background: var(--input-color);
  }

  /* ============================== options */
  .options {
    margin-top: var(--spacing-large);
    list-style: none;
  }

  .options li + li {
    margin-top: var(--spacing-large);
  }

  .options li p {
    padding-left: calc(var(--checkbox) + var(--spacing-medium));
  }

  /* ============================== darkmode */
  .darkmode {
    position: relative;
    display: flex;
    align-items: center;
  }

  .darkmode::before {
    content: '🌝';
  }

  @media screen and (max-width: 599px) {
    .darkmode::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 5rem;
      font-size: 3.125rem;
      transform: translateX(25%) translateY(-35%);
    }
  }

  @media screen and (min-width: 600px) {
    .darkmode::before {
      width: 4rem;
      margin-right: var(--spacing-medium);
      font-size: 2.5rem;
    }
  }

  /* ============================== design */
  .design > * + *:not(ol) {
    margin-top: var(--spacing-medium);
  }

  /* ============================== web-development */
  .web-development > * + * {
    margin-top: var(--spacing-medium);
  }

  /* ============================== web-manifest */
  .web-manifest > p {
    margin-top: var(--spacing-small);
  }

  .web-manifest > .button {
    margin-top: var(--spacing-medium);
  }

  .web-manifest p a {
    color: var(--white);
    text-decoration: none;
  }

  .web-manifest p a:hover,
  .web-manifest p a:focus {
    outline: none;
    text-decoration: underline;
  }

  /* ============================== motion */

  @keyframes pulse {
    70%,
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
</style>
