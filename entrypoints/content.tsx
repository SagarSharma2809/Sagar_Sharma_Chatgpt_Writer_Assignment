
import { createRoot } from 'react-dom/client';
import App from './App';


// Inject React components into LinkedIn DOM
export default defineContentScript({
  matches: ['https://www.linkedin.com/*'], // Ensure it only runs on LinkedIn

  main() {
    const rootElement = document.createElement('div');
    rootElement.id = 'linkedin-extension-root';

    document.body.appendChild(rootElement);

    const root = createRoot(rootElement);
    root.render(<App />);

    console.log('LinkedIn AI Assistant extension loaded');
  }
});

