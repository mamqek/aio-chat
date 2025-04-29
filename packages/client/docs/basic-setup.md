# Basic Setup

The @aio-chat/client allows you to embed a web component into your application. Follow these steps to set it up:

## Installation

Install the package:

```bash
npm install @aio-chat/client
```

Also, ensure Vue.js is installed in your project:

```bash
npm install vue
```

## Setup

There are two ways to initialize the @aio-chat/client:

1. **Using the `<chat-widget>` HTML Element**:
   Import the package in a JS file that will be included on the page where the component is used:
   ```javascript
   import '@aio-chat/client';
   ```
   Then, use the custom element in your HTML:
   ```html
   <chat-widget user_id="123" service_url="https://your-backend.com"></chat-widget>
   ```

2. **Using the `initChatWidget` Function**:
   Import the function and call it with your configuration:
   ```javascript
   import { initChatWidget } from '@aio-chat/client';

   initChatWidget({
     user_id: 123,
     service_url: 'https://your-backend.com',
     container: document.querySelector('#chat-container')
   });
   ```

For more details on configuration, see the [Configuration](./config.md) documentation.