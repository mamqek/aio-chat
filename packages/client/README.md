# @aio-chat/client

This package provides the frontend web component(s) for the [@aio-chat system](https://www.npmjs.com/package/@aio-chat/all). It allows you to easily embed chat functionality into your web application. It is best matched with [`@aio-chat/service`](https://www.npmjs.com/package/@aio-chat/service)

## Features

- **Web Component**: Easily embed a web component using a standard HTML tag or JavaScript initialization.
- **Customizable**: Configure appearance and behavior (future).
- **Authentication Integration**: Works with various authentication methods provided by `@aio-chat/service`.

---

## Installation

Install the client package:

```bash
npm install @aio-chat/client
```

Also, ensure Vue.js is installed in your project, as the component relies on it:

```bash
npm install vue
```

---

## Quick Start

The @aio-chat/client web component allows you to embed a web component into your application. It supports two ways to initialize:

1.  **Using the `<chat-widget>` HTML Element**:

    Import the package in some JS file that you will later import to the page or layout where component is used. 
    ```javascript
    import '@aio-chat/client';
    ```

    Just define the element 
    ```html
    <chat-widget user_id="123" service_url="https://your-backend.com"></chat-widget>
    ```

2.  **Using the `initChatWidget` Function**:
    ```javascript
    import { initChatWidget } from '@aio-chat/client';

    initChatWidget({
      user_id: 123,
      service_url: 'https://your-backend.com',
      container: document.querySelector('#chat-container')
    });
    ```

---

## Configuration

Key configuration options include:

-   `service_url`: The base URL of the chat service ([`@aio-chat/service`](https://www.npmjs.com/package/@aio-chat/service)).
-   `user_id`: The ID of the authenticated user.
-   `token`: The JWT token used for authentication (if using JWT mode, for more info check docs of [`@aio-chat/service`](https://www.npmjs.com/package/@aio-chat/service)).

For more details, refer to the [Web Component Documentation](./docs/index.md). 

---

## Related Packages

-   **@aio-chat/service**: The backend service required for chat functionality.

---

## License

This project is licensed under the MIT License.