# Usage

This section provides examples and details on how to use the @aio-chat/client.

## Initialization

The AIOChatWC web component can be used in two ways:

### Using the `<chat-widget>` HTML Element

Import the package in a JS file that will be included on the page where the component is used:

```javascript
import '@aio-chat/client';
```

Embed the web component directly in your HTML by adding the `<chat-widget>` element and providing the required attributes.

Example:

```html
<chat-widget user_id="123" service_url="https://your-backend.com"></chat-widget>
```

### Using the `initChatWidget` Function

Initialize the web component programmatically using the `initChatWidget` function:

```javascript
import { initChatWidget } from 'aio-chat-wc';

initChatWidget({
  user_id: 123,
  service_url: 'https://your-backend.com',
  container: document.querySelector('#chat-container')
});
```
Also import this JS file to the page where the component is used.
## Events

The @aio-chat/client emits events that you can listen to (details to be added).

## Customization

Future versions will allow customization of the widget's appearance and behavior.