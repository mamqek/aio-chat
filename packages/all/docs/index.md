# @aio-chat 

@aio-chat or in other words All in one chat is a highly configurable chat solution that includes a @aio-chat/client for embedding chat functionality into your frontend and a @aio-chat/service for managing chat logic, authentication, and database interactions.

## Features

- **@aio-chat/client**: Easily embed a web component into your application.
- **@aio-chat/service**: Manage chat logic, authentication, and database interactions.
- **Authentication**: Supports multiple authentication methods, including JWT, Proxy, and Custom.
- **Database Support**: Works with SQLite, MySQL, and PostgreSQL.
- **Customizability**: Override default behavior for both the @aio-chat/client and @aio-chat/service.

---

## Documentation

The documentation is divided into two main sections:

1. **[Client](./client/index.md)**: Learn how to set up and configure the web component provided by @aio-chat/client.
2. **[Service](./service/index.md)**: Understand the @aio-chat/service, its configuration, and customization options.

---

## Quick Start

### Installation

Install the necessary packages:

```bash
npm install @aio-chat/all
```
This will download both the `@aio-chat/client` and `@aio-chat/service` packages, providing everything you need to get started with the chat solution.

Also, ensure Vue.js is installed in your project:

```bash
npm install vue
```

## Client

The @aio-chat/client allows you to embed a web component into your application. It supports two ways to initialize:

1. **Using the `<chat-widget>` HTML Element**:
   ```html
   <chat-widget user_id="123" service_url="https://your-backend.com"></chat-widget>
   ```

2. **Using the `initChatWidget` Function**:
   ```javascript
   import { initChatWidget } from '@aio-chat/client';

   initChatWidget({
     user_id: 123,
     service_url: 'https://your-backend.com',
     container: document.querySelector('#chat-container')
   });
   ```

For more details, refer to the [Client Documentation](./client/index.md).

---

## Service

The @aio-chat/service provides the backend functionality required for chat, including database management, authentication, and chat logic.

### Key Features

- **Authentication**: Supports Direct, Auth Endpoint, JWT, Proxy, and Custom authentication methods.
- **Database**: Works with SQLite, MySQL, and PostgreSQL. Includes migration utilities.
- **Customizability**: Override default chat logic and user filtering.

### Setup

1. Create a file to start the service (e.g., `chat_service.js`).
2. Import and start the service:
   ```javascript
   import { startService } from '@aio-chat/service';

   startService(config)
     .then(() => console.log("Chat service started successfully."))
     .catch((err) => console.error("Failed to start chat service:", err));
   ```
    For the start you can avoid providing config, but later see all options [here](./service/config.md)
3. Add a start command to your `package.json`:
   ```json
   "scripts": {
     "start:service": "node path/to/chat_service.js"
   }
   ```

For more details, refer to the [Service Documentation](./service/index.md).

---

## Configuration

Both the @aio-chat/client and @aio-chat/service are highly configurable. Key configuration options include:

- **@aio-chat/client**:
  - `service_url`: The base URL where you host @aio-chat/service.
  - `user_id`: The ID of the authenticated user.
  - `token`: The JWT token used for authentication, check [Service authentication docs](./service/authentication.md#authentication-methods).

For a full list of options, refer to the [Client Configuration Documentation](./client/config.md).

- **@aio-chat/service**:
  - `DB_TYPE`: Type of database (`sqlite`, `mysql`, or `postgres`).
  - `AUTH_MODE`: Authentication mode (`direct`, `auth-endpoint`, `jwt`, `proxy`, or `custom`).
  - `user_mapping`: Map user fields to your database schema.

For a full list of options, refer to the [Service Configuration Documentation](./service/config.md).

---

## Authentication

@aio-chat/service supports multiple authentication methods:

1. **Direct**: Quick prototyping with minimal setup.
2. **Auth Endpoint**: Verifies users through a backend endpoint.
3. **JWT**: Uses existing JWT authentication systems.
4. **Proxy**: Routes all chat requests through an authenticated backend.
5. **Custom**: Implements custom authentication logic.

For detailed instructions, refer to the [Authentication Documentation](./service/authentication.md).

---

## Database

@aio-chat/service supports SQLite, MySQL, and PostgreSQL. It includes migration utilities to set up and manage the database schema.

- **SQLite**: Ideal for quick setups or local development.
- **MySQL/PostgreSQL**: Recommended for production environments.

For more details, refer to the [Database Documentation](./service/database.md).

---

## Customization

@aio-chat is designed to be highly customizable:

- **@aio-chat/client**: Customize the widget's behavior. In the future change modes and appearance. 
- **@aio-chat/service**: Override default chat logic, user filtering, authentication and connect it to your existing database. 

For advanced use cases, refer to the [Chat Service Documentation](./service/chat-service.md).

---

## Best Practices

1. **Change Default Authentication Method**: Avoid using the default authentication method (`direct`) in production. Choose an authentication method that best fits your application's needs, such as `jwt`, `proxy`, or `custom`.
2. **Update Authentication Defaults**: Replace default authentication values like `TOKEN_SECRET` and `PROXY_SECRET` with secure, unique values to enhance security.
3. **Migrations**: Before running migrations on existing database make sure to check documentation on [User Entity customization](./service/database.md#user-entity-customization)

---

## Troubleshooting

### Common Issues

- **Authentication Errors**: Ensure secrets and token names match between your app and the @aio-chat/service.
- **CORS Issues**: Configure CORS on both your proxy endpoint and the @aio-chat/service.
- **Database Errors**: Verify your database configuration and run migrations.

For more help, check the [GitHub repository](https://github.com/mamqek/aio-chat) or create a new issue.

---

## License

This project is licensed under the MIT License.
