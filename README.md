# Payment List
A Payments visualizer

### Features
- View payments fetched from API
- Order Payments by column
- Search Payments by text
- Filter Payments by date (building) 

### Technical Features:
- API Mocked with json-mock library
- On load, it shows a Loading skeleton
- On error, it shows a toast informing the user
- Custom hooks and util functions to reuse code
<br />

# Technologies

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.<br/>
Currently, two official plugins are available:

- [Typescript](https://www.typescriptlang.org/)
- [ReactJS](https://react.dev/)
- [vite](https://vite.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs/)
- [Shadcn UI](https://ui.shadcn.com/docs/)
  
<br />


# How to run
You need to have up-to-date NodeJs installed.

1- Install dependencies
```
npm install
pnpm install
```

2- Run the app
```
npm run dev
pnpm run dev
```
The project will start on port 3000. You can access it through the url: "http://localhost:3000/"

<br />



---
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],****
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
