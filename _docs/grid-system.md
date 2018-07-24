# Grid system

- [Grid system](#grid-system)
  - [Grid layout](#grid-layout)
  - [Usage](#usage)
    - [Custom placement](#custom-placement)
      - [Custom sections](#custom-sections)
        - [Mix / match starting and ending on custom sections](#mix--match-starting-and-ending-on-custom-sections)
      - [Place on specific track lines](#place-on-specific-track-lines)

The project uses CSS Grid to layout components.

## Grid layout

The grid consist out of altering fixed- and fluid-width columns, wrapped in two 
"margin" columns.

A few key track lines have names for easy placement.

```

┌------------------------------------page-------------------------------------┐
|                                                                             |
├-------------page-left----------------┬--------------page-right--------------┤
|                                      |                                      |
|       ┌---------------------------content---------------------------┐       |
|       |                                                             |       |
|       ├----------content-left--------┬-------content-right----------┤       |
|       |                              |                              |       |

| ***** | === | -- | === | -- | === | #|# | === | -- | === | -- | === | ***** |


*****: grid margin
===  : fixed with column
--   : fluid width column
#    : fluid width column half

```

## Usage

To add the grid to an element, add the `grid` class:

```html
<element class="grid">
  <child-element />
</element>
```

The `<element>` receives the grid. The `<child-element />` is placed on the grid.
By default, the `<child-element />` is placed in the `content` section of the 
grid. Meaning it spans from the second track to the second-last track.

### Custom placement

You can deviate from the default placement of an element. Given this markup:

```html
<element class="grid">
  <child-element />
</element>

<style>
  child-element {
    grid-column: content-left;
  }
</style>
```

The `<child-element />` is now placed in the `content-left` section.

#### Custom sections

There are a few sections defined on the grid:

* `page`: Spans from browser edge to edge
* `page-left`: The left 50% of the page. Ends in the exact center of the browser
* `page-right`: The right 50% of the page. Starts in the exact center of the browser
* `content`: Starts right after, and ends right before, the grid "margin"
* `content-left`: The left side of the content area. Ends at the last fixed column on the left side
* `content-right`: The right side of the content area. Starts at the first fixed column on the right side

##### Mix / match starting and ending on custom sections

You can mix and match the start end ending of an element on different sections.
To start an element on `content-right` but end it at the edge of the browser, 
you position it like this:

```css
child-element {
  grid-column-start: content-right;
  grid-column-end: page;
}
```

#### Place on specific track lines

It is possible to start / end a column on track lines instead of above mentioned
sections. To start an element on the 10th track, use:

```css
child-element {
  grid-column-start: 10;
}
```

Keep in mind that the amount of columns differ from breakpoint to breakpoint.
If you place elements on track lines, you should do that for each breakpoint.
