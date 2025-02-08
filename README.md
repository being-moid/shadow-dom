# Shadow DOM Widgets with Tailwind CSS

This project provides reusable web components built using Shadow DOM and styled with Tailwind CSS. These components are designed to work seamlessly with WebForms applications.

## Features

- Shadow DOM encapsulation for style isolation
- Tailwind CSS integration
- Modern build setup with Webpack
- Cross-browser compatibility with WebComponents polyfill
- Easy to integrate with existing WebForms applications

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Usage in WebForms

1. Include the built bundle in your WebForms page:
```html
<script src="path/to/bundle.js"></script>
```

2. Use the components in your WebForms:
```html
<form runat="server">
    <form-input
        label="Username"
        name="username"
        placeholder="Enter your username"
        required
    ></form-input>
</form>
```

## Available Components

### FormInput
A customizable input component with built-in label and styling.

```html
<form-input
    label="Username"
    name="username"
    type="text"
    placeholder="Enter your username"
    required
></form-input>
```

#### Properties
- `label`: String - Label text for the input
- `type`: String - Input type (text, email, password, etc.)
- `value`: String - Input value
- `name`: String - Input name
- `placeholder`: String - Placeholder text
- `required`: Boolean - Whether the input is required

#### Events
- `input`: Fired when the input value changes. Event detail contains:
  - `value`: Current input value
  - `name`: Input name

## Development

The project uses:
- Lit for web components
- Tailwind CSS for styling
- Webpack for bundling
- Babel for transpilation

To add new components, create them in the `src/components` directory and import them in `src/index.js`. 