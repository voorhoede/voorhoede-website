<template>
  <div class="code-block">
    <pre
      :class="codeLanguage"
    ><code v-html="content"/></pre>
  </div>
</template>
<script>
export default {
  props: {
    language: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  computed: {
    codeLanguage(){
      return Array.of(`language-${this.language}`)
    }
  }
}
</script>

<style>
:root {
  --base03:    #002b36;
  --base02:    #073642; /* used */
  --base01:    #586e75; /* used */
  --base00:    #657b83;
  --base0:     #839496;
  --base1:     #93a1a1; /* used */
  --base2:     #eee8d5; /* used */
  --base3:     #fdf6e3; /* used */
  --yellow:    #b58900; /* used */
  --orange:    #cb4b16; /* used */
  --red:       #dc322f;
  --magenta:   #d33682;
  --violet:    #6c71c4;
  --blue:      #268bd2; /* used */
  --cyan:      #2aa198; /* used */
  --green:     #859900; /* used */
}
.code-block code,
.code-block pre {
  background-color: var(--base2);
  font-family: Consolas, Menlo, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  text-align: left;
  white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;
	-moz-tab-size: 2;
	-o-tab-size: 2;
	tab-size: 2;
	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
  hyphens: none;
}

pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
	background: var(--base02);
}

pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
code[class*="language-"]::selection, code[class*="language-"] ::selection {
	background: var(--base02);
}

/* Code blocks */
pre[class*="language-"] {
	padding: 1em;
	margin: .5em 0;
	overflow: auto;
	border-radius: 0.3em;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: var(--base1)
}

.token.punctuation {
	color: var(--base01);
}

.namespace {
	opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
	color: var(--blue);
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.url,
.token.inserted {
	color: var(--cyan)
}

.token.entity {
	color: var(--base00);
	background: var(--base2);
}

.token.atrule,
.token.attr-value,
.token.keyword {
	color: var(--green)
}

.token.function,
.token.class-name {
	color: var(--yellow);
}

.token.regex,
.token.important,
.token.variable {
	color: var(--orange)
}

.token.important,
.token.bold {
	font-weight: bold;
}
.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}

@media (min-width: 720px) {
  .code-block pre {
    padding: var(--spacing-large);
  }
}

@media (min-width: 1440px) {
  .code-block pre {
    padding: var(--spacing-large) var(--spacing-larger);
  }
}
</style>
