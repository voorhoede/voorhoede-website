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

```
┌--------------------------------page-------------------------------┐
├-----------page-left-------------┬--------------page-right---------┤
|                                 |                                 |
|    ┌-------------------------content-------------------------┐    |
|    ├---------content-left-------┬--------content-right-------┤    |
| ** | ++ | ~~ | ++ // ~~ | ++ | ~|~ | ++ | ~~ | ++ // ~~ | ++ | ** |

** : grid margin
++ : fixed with column
~~ : fluid width column
 ~ : fluid width column half
```

For all breakpoints the number of grid lines is 51. Depending on the breakpoint however,
some columns are zero-width.

```
┌-------------------------------------------------------------------------page
├---------------------------------page-left--------------------------------┬-/
|  ┌--------------------------------------------------------------------content
|  ├------------------------------content-left-----------------------------┬-/
1  2  3                          4  13                         14 23 24 25 26
|  |  |                          -  |                          -  |  |  |  |
|  |  |                          12 |                          22 |  |  |  |
|**|++|~~~~~~~~~~~~~~~~~~~~~~~~~~|++|~~~~~~~~~~~~~~~~~~~~~~~~~~|++|~~|++| ~|~
|  |  |                          |  |                          |  |  |   small

1  2  3        4  7  8  9        10 13       14 17 18 19       20 23 24 25 26
|  |  |        -  |  |  |        -  |        -  |  |  |        -  |  |  |  |
|  |  |        6  |  |  |        12 |        16 |  |  |        22 |  |  |  |
|**|++|~~~~~~~~|++|~~|++|~~~~~~~~|++|~~~~~~~~|++|~~|++|~~~~~~~~|++|~~|++| ~|~
|  |  |        |  |  |  |        |  |        |  |  |  |      medium (>= 720px)

1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26
|**|++|~~|++|~~|++|~~|++|~~|++|~~|++|~~|++|~~|++|~~|++|~~|++|~~|++|~~|++| ~|~
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | wide (>= 1100px)
```

 ##  Usage

To add the grid to an element, add the `grid` class:

```html
<element class="grid">
  <child-element />
</element>
```

The `<element>` receives the grid. The `<child-element />` is placed on the grid.
By default, the `<child-element />` uses `var(--grid-content)`, meaning it spans across content columns (`grid-column: 2 / 50`) of the grid.

### Custom placement

You can deviate from the default placement of an element. Given this markup:

```html
<element class="grid">
  <child-element />
</element>

<style>
  child-element {
    grid-column: var(--grid-content-left);
  }
</style>
```

The `<child-element />` will now span `grid-column: 2 / 26`

You can use the following custom properties to span columns
* `--grid-page`: Spans from browser edge to edge
* `--grid-page-left`: The left 50% of the page. Ends in the exact center of the browser
* `--grid-page-right`: The right 50% of the page. Starts in the exact center of the browser
* `--grid-content`: Starts right after, and ends right before, the grid "margin"
* `--grid-content-left`: The left side of the content area. Ends at the last fixed column on the left side
* `--grid-content-right`: The right side of the content area. Starts at the first fixed column on the right side

#### Custom sections
You do not have to stick to the predefined spans, you can also set the grid lines yourself.
To start an element on the center, yet end it at the edge of the browser,
you position it like this:

```css
child-element {
  grid-column-start: var(--grid-center);
  grid-column-end: var(--grid-page-end);
}
```

Custom properties are defined to quickly refer to specific grid lines:
* `--grid-page-start`: 1
* `--grid-content-start`: 2
* `--grid-center`: 26
* `--grid-content-end`: 50
* `--grid-page-end`: 51

#### Place on specific track lines
