import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { withKnobs } from '@storybook/addon-knobs/vue'
// import { action } from '@storybook/addon-actions'

import '../app-core/index.css'

import RichTextBlock from './rich-text-block.vue'
import README from './README.md'

const stories = storiesOf('Components/Rich Text Block', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(README))

Vue.component('rich-text-block', RichTextBlock)

stories.add(
  'Rich Text Block',
  () => ({
    template: '<rich-text-block :text="text"/>',
    data() {
      return {
        text: `<div style="padding: 1rem">
                <h1>This is an h1</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation <strong>ullamco laboris</strong> nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, <em>consectetur adipiscing elit</em>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h2>This is an h2</h2>
                <p>Lorem ipsum <a href="https://github.com/voorhoede/voorhoede-dragonfly" target="_blank" rel="noopener">dolor sit amet</a>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue lacus viverra vitae congue eu. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. In cursus turpis massa tincidunt. Volutpat lacus laoreet non curabitur gravida arcu. Arcu felis bibendum ut tristique et egestas quis ipsum. Porttitor massa id neque aliquam vestibulum. Eu facilisis sed odio morbi quis commodo. Arcu dictum varius duis at consectetur lorem donec. Arcu cursus euismod quis viverra nibh cras. Tellus at urna condimentum mattis pellentesque id. Eu turpis egestas pretium aenean pharetra. In aliquam sem fringilla ut morbi tincidunt. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Morbi leo urna molestie at elementum. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet.</p>
                <p><span style="text-decoration: line-through;">A scelerisque purus</span> semper eget duis at tellus at. Adipiscing vitae proin sagittis nisl rhoncus mattis. Enim praesent elementum facilisis leo vel. Magna ac placerat vestibulum lectus mauris ultrices eros. Vitae tempus quam pellentesque nec. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Ornare suspendisse sed nisi lacus. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Mauris ultrices eros in cursus turpis massa tincidunt dui. Tellus at urna condimentum mattis pellentesque id nibh tortor.</p>
                <h3>This is an h3</h3>
                <p>A scelerisque purus semper eget duis at tellus at. Adipiscing vitae proin sagittis nisl rhoncus mattis. Enim praesent elementum facilisis leo vel. Magna ac placerat vestibulum lectus mauris ultrices eros. Vitae tempus quam pellentesque nec. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Ornare suspendisse sed nisi lacus. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Mauris ultrices eros in cursus turpis massa tincidunt dui. Tellus at urna condimentum mattis pellentesque id nibh tortor.</p>
                <h4>This is an h4</h4>
                <h5>This is an h5</h5>
                <h6>This is an h6</h6>
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
                <table border="1" style="border-collapse: collapse; width: 100%;">
                <tbody>
                <tr style="height: 17px;">
                <td style="width: 25%; height: 17px;"><strong>Why</strong></td>
                <td style="width: 25%; height: 17px;"><strong>use</strong></td>
                <td style="width: 25%; height: 17px;"><strong>tables?</strong></td>
                </tr>
                <tr style="height: 17px;">
                <td style="width: 25%; height: 17px;">Something</td>
                <td style="width: 25%; height: 17px;">Something</td>
                <td style="width: 25%; height: 17px;">Something</td>
                </tr>
                <tr style="height: 17px;">
                <td style="width: 25%; height: 17px;">Something</td>
                <td style="width: 25%; height: 17px;">Something</td>
                <td style="width: 25%; height: 17px;">Something</td>
                </tr>
                <tr style="height: 17px;">
                <td style="width: 25%; height: 17px;">Something</td>
                <td style="width: 25%; height: 17px;">Something</td>
                <td style="width: 25%; height: 17px;">Something</td>
                </tr>
                </tbody>
                </table>
                <p><a href="https://github.com/voorhoede/voorhoede-dragonfly" target="_blank" rel="noopener">Link</a></p>
              </div>`
      }
    }
  }),
)
