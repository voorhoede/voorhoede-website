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
  --base03:    var(--bg-pastel-inverse);
  --base02:    var(--paper-inverse);
  --base01:    var(--off-black);
  --base00:    #666;
  --base0:     #777;
  --base1:     #A39F7E;
  --base2:     var(--paper);
  --base3:     var(--bg-pastel);
  --yellow:    #B89B03;
  --orange:    #FF870D;
  --red:       var(--soft-red);
  --magenta:   #d33682;
  --violet:    #8000ff;
  --blue:      var(--active-blue);
  --cyan:      #00AEA3;
  --green:     #4E9F45;
}
.code-block code,
.code-block pre {
  background-color: var(--base2);
  color: var(--blue);
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

/* Code blocks */
.code-block pre {
  padding: var(--spacing-medium);
	overflow: auto;
}

.code-block .token.comment,
.code-block .token.prolog,
.code-block .token.doctype,
.code-block .token.cdata {
  color: var(--base1);
}

.code-block .token.punctuation {
  color: var(--base01);
}

.code-block .token.property,
.code-block .token.tag,
.code-block .token.boolean,
.code-block .token.number,
.code-block .token.constant,
.code-block .token.symbol,
.code-block .token.deleted {
	color: var(--cyan);
}

.code-block .token.attr-name,
.code-block .token.string,
.code-block .token.char,
.code-block .token.builtin,
.code-block .token.url,
.code-block .token.inserted {
	color: var(--magenta)
}

.code-block .token.selector {
  color: var(--violet);
}

.code-block .token.entity {
	color: var(--base00);
	background: var(--base2);
}

.code-block .token.atrule,
.code-block .token.attr-value,
.code-block .token.keyword,
.code-block .token.operator {
	color: var(--red)
}

.code-block .token.function,
.code-block .token.class-name {
	color: var(--yellow);
}

.code-block .token.regex,
.code-block .token.important,
.code-block .token.variable {
	color: var(--orange)
}

.code-block .token.important,
.code-block .token.bold {
	font-weight: bold;
}
.code-block .token.italic {
	font-style: italic;
}

.code-block .token.entity {
	cursor: help;
}

@media (min-width: 720px) {
  .code-block pre {
    padding: var(--spacing-medium);
  }
}

@media (min-width: 1440px) {
  .code-block pre {
    padding: var(--spacing-medium) var(--spacing-larger);
  }
}
</style>
