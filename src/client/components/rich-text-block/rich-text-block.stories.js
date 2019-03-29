import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import RichTextBlock from './rich-text-block.vue'

const stories = storiesOf('Components/Rich Text Block', module)
  .addDecorator(withKnobs)

Vue.component('rich-text-block', RichTextBlock)

stories.add(
  'Rich Text Block',
  () => ({
    template: '<rich-text-block :text="text" />',
    data() {
      return {
        text: `
          <div style="padding: 1rem">
            <h1>This is an h1</h1>
            <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim ad minim veniam, <span>&nbsp;</span><code>quis-nostrud</code><span>&nbsp;</span> exercitation <span style="text-decoration: line-through;">ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</p>
            <h2>This is an h2</h2>
            <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim ad minim veniam, <span>&nbsp;</span><code>quis-nostrud</code><span>&nbsp;</span> exercitation <span style="text-decoration: line-through;">ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</p>
            <h3>This is an h3</h3>
            <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim ad minim veniam, <span>&nbsp;</span><code>quis-nostrud</code><span>&nbsp;</span> exercitation <span style="text-decoration: line-through;">ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</p>
            <h4>This is an h4</h4>
            <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim ad minim veniam, <span>&nbsp;</span><code>quis-nostrud</code><span>&nbsp;</span> exercitation <span style="text-decoration: line-through;">ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</p>
            <h5>This is an h5</h5>
            <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim ad minim veniam, <span>&nbsp;</span><code>quis-nostrud</code><span>&nbsp;</span> exercitation <span style="text-decoration: line-through;">ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</p>
            <h6>This is an h6</h6>
            <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim ad minim veniam, <span>&nbsp;</span><code>quis-nostrud</code><span>&nbsp;</span> exercitation <span style="text-decoration: line-through;">ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</p>
            <p><a href="https://github.com/voorhoede/voorhoede-dragonfly" target="_blank" rel="noreferrer noopener">Link</a></p>
            <table border="1" style="border-collapse: collapse; width: 100%;">
              <tbody>
                <tr style="height: 17px;">
                  <td style="width: 33%; height: 17px;"><strong>Why</strong></td>
                  <td style="width: 33%; height: 17px;"><strong>use</strong></td>
                  <td style="width: 33%; height: 17px;"><strong>tables?</strong></td>
                </tr>
                <tr style="height: 17px;">
                  <td style="width: 33%; height: 17px;">Something</td>
                  <td style="width: 33%; height: 17px;">Something</td>
                  <td style="width: 33%; height: 17px;">Something</td>
                </tr>
                <tr style="height: 17px;">
                  <td style="width: 33%; height: 17px;">Something</td>
                  <td style="width: 33%; height: 17px;">Something</td>
                  <td style="width: 33%; height: 17px;">Something</td>
                </tr>
                <tr style="height: 17px;">
                  <td style="width: 33%; height: 17px;">Something</td>
                  <td style="width: 33%; height: 17px;">Something</td>
                  <td style="width: 33%; height: 17px;">Something</td>
                </tr>
              </tbody>
            </table>
            <p>Oredered list</p>
            <ol>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ol>
            <p>Unordered list</p>
            <ul>
              <li>Coffee</li>
              <li>Tea</li>
              <li>Beer</li>
            </ul>
          </div>`
      }
    }
  }),
)

stories.add(
  'Rich Text Block - Larger font size',
  () => ({
    template: '<rich-text-block :text="text" large-text />',
    data() {
      return {
        text: `
          <div style="padding: 1rem">
            <h1>This is an h1</h1>
            <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim ad minim veniam, <span>&nbsp;</span><code>quis-nostrud</code><span>&nbsp;</span> exercitation <span style="text-decoration: line-through;">ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</p>
            <h2>This is an h2</h2>
            <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim ad minim veniam, <span>&nbsp;</span><code>quis-nostrud</code><span>&nbsp;</span> exercitation <span style="text-decoration: line-through;">ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</p>
            <h3>This is an h3</h3>
            <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim ad minim veniam, <span>&nbsp;</span><code>quis-nostrud</code><span>&nbsp;</span> exercitation <span style="text-decoration: line-through;">ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</p>
            <h4>This is an h4</h4>
            <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim ad minim veniam, <span>&nbsp;</span><code>quis-nostrud</code><span>&nbsp;</span> exercitation <span style="text-decoration: line-through;">ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</p>
            <h5>This is an h5</h5>
            <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim ad minim veniam, <span>&nbsp;</span><code>quis-nostrud</code><span>&nbsp;</span> exercitation <span style="text-decoration: line-through;">ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</p>
            <h6>This is an h6</h6>
            <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua. Ut enim ad minim veniam, <span>&nbsp;</span><code>quis-nostrud</code><span>&nbsp;</span> exercitation <span style="text-decoration: line-through;">ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</p>
            <p><a href="https://github.com/voorhoede/voorhoede-dragonfly" target="_blank" rel="noreferrer noopener">Link</a></p>
            <table border="1" style="border-collapse: collapse; width: 100%;">
              <tbody>
                <tr style="height: 17px;">
                  <td style="width: 33%; height: 17px;"><strong>Why</strong></td>
                  <td style="width: 33%; height: 17px;"><strong>use</strong></td>
                  <td style="width: 33%; height: 17px;"><strong>tables?</strong></td>
                </tr>
                <tr style="height: 17px;">
                  <td style="width: 33%; height: 17px;">Something</td>
                  <td style="width: 33%; height: 17px;">Something</td>
                  <td style="width: 33%; height: 17px;">Something</td>
                </tr>
                <tr style="height: 17px;">
                  <td style="width: 33%; height: 17px;">Something</td>
                  <td style="width: 33%; height: 17px;">Something</td>
                  <td style="width: 33%; height: 17px;">Something</td>
                </tr>
                <tr style="height: 17px;">
                  <td style="width: 33%; height: 17px;">Something</td>
                  <td style="width: 33%; height: 17px;">Something</td>
                  <td style="width: 33%; height: 17px;">Something</td>
                </tr>
              </tbody>
            </table>
            <p>Oredered list</p>
            <ol>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ol>
            <p>Unordered list</p>
            <ul>
              <li>Coffee</li>
              <li>Tea</li>
              <li>Beer</li>
            </ul>
          </div>`
      }
    }
  }),
)
