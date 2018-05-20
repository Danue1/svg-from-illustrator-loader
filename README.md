# svg-from-illustrator-loader

A loader for webpack that makes it easy to use SVG from Illustrator

```js
// React
import Example from './Example.svg'
export default () => (
  <span dangerouslySetInnerHTML={{ __html: Example }} />
)
```

## Installation

```bash
npm install svg-from-illustrator-loader
```

## Configuration

```javascript
// ...
{
  test: /\.svg$/,
  use: [
    {
      loader: require.resolve('svg-from-illustrator-loader')
    }
  ]
},
// ...
```

## Usage

- exportStyle: 'default' | 'name' | 'none'
    - defaultValue === 'default'

```javascript
// none
const Example = require('./Example.svg') // ES5
import Example from './Example.svg' // ES6

// name
const Example = require('./Example.svg').Example // ES5
import { Example } from './Example.svg' // ES6

// default
const Example = require('./Example.svg').default // ES5
import Example from './Example.svg' // ES6
```

- name

    - defaultValue === '[name]_[index]'
    - [name] === iconName from title
    - [index] === index in SVG

- illustratorClass
    - defaultValue === 'cls'

- remove
    - title: defaultValue === false
    - xmlns: defaultValue === false
    - space: defaultValue === false

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <style>
      <!-- illustratorClass and index -->
      .cls-1 {
        fill: none;
        stroke: #a36868;
        stroke-miterlimit: 10;
        stroke-width: 2px;
      }
    </style>
  </defs>
  <!-- iconName start -->
  <title>User</title>
  <!-- iconName end -->
  <g id="User">
    <path class="cls-1" d="M56,56A24,24,0,0,0,8,56"/>
    <circle class="cls-1" cx="32" cy="20" r="12"/>
  </g>
</svg>
```

## loadmap

- this document is a little poor...
- type support for typescript

## License

[MIT © Danuel](public.danuel@gmail.com)
