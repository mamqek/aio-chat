# @aio-chat/service

This package provides the backend service for the [`@aio-chat/client`](https://www.npmjs.com/package/@aio-chat/client). It handles chat logic, user management, authentication, database interactions, and real-time communication via WebSockets.

## Features

-   **Authentication**: Supports Direct, Auth Endpoint, JWT, Proxy, and Custom authentication methods.
-   **Database**: Works with SQLite, MySQL, and PostgreSQL. Includes migration utilities.
-   **Real-time**: Uses Socket.IO for real-time message delivery.
-   **Customizability**: Override default chat logic, user filtering, authentication, and connect to your existing database.

---

## Installation

Install the service package:

```bash
npm install @aio-chat/service
```

You will also need `reflect-metadata` for TypeORM:

```bash
npm install reflect-metadata
```

---

## Quick Start

### Setup

1.  Import `reflect-metadata` at the top of your entry file:
    ```javascript
    import 'reflect-metadata';
    ```
2.  Create a file to start the service (e.g., `server.js`).
3.  Import and start the service:
    ```javascript
    import { startService } from '@aio-chat/service';

    startService(config)
      .then(() => console.log("Chat service started successfully."))
      .catch((err) => console.error("Failed to start chat service:", err));
    ```

4.  Add a start command to your `package.json`:
    ```json
    "scripts": {
      "start:service": "node path/to/server.js"
    }
    ```

---

## Configuration

Key configuration options include:

-   `DB_TYPE`: Type of database (`sqlite`, `mysql`, or `postgres`).
-   `AUTH_MODE`: Authentication mode (`direct`, `auth-endpoint`, `jwt`, `proxy`, or `custom`).
-   `user_mapping`: Map user fields to your database schema.
-   `TOKEN_SECRET`, `PROXY_SECRET`: Secrets for specific auth modes.

For a full list of configuration options, refer to the [Configuration Documentation](./docs/config.md).

---

## Authentication

@aio-chat/service supports multiple authentication methods:

1.  **Direct**: Quick prototyping with minimal setup.
2.  **Auth Endpoint**: Verifies users through a backend endpoint.
3.  **JWT**: Uses existing JWT authentication systems.
4.  **Proxy**: Routes all chat requests through an authenticated backend.
5.  **Custom**: Implements custom authentication logic.

For detailed instructions, refer to the [Authentication Documentation](./docs/authentication.md).

---

## Database

@aio-chat/service supports SQLite, MySQL, and PostgreSQL. It includes migration utilities to set up and manage the database schema.

-   **SQLite**: Ideal for quick setups or local development.
-   **MySQL/PostgreSQL**: Recommended for production environments.

For more details, refer to the [Database Documentation](./docs/database.md).

---

## Customization

@aio-chat/service is designed to be highly customizable:

-   Override default chat logic, user filtering, authentication and connect it to your existing database.

For advanced use cases, refer to the [Chat Service Documentation](./docs/chat-service.md).

---

## Best Practices

1.  **Change Default Authentication Method**: Avoid using the default authentication method (`direct`) in production. Choose an authentication method that best fits your application's needs, such as `jwt`, `proxy`, or `custom`.
2.  **Update Authentication Defaults**: Replace default authentication values like `TOKEN_SECRET` and `PROXY_SECRET` with secure, unique values to enhance security.
3.  **Migrations**: Before running migrations on existing database make sure to check documentation on [User Entity customization](./docs/database.md#user-entity-customization).

---

## Troubleshooting

### Common Issues

-   **Authentication Errors**: Ensure secrets and token names match between your app and the @aio-chat/service.
-   **CORS Issues**: Configure CORS on both your proxy endpoint and the @aio-chat/service.
-   **Database Errors**: Verify your database configuration and run migrations.

For more help, check the [GitHub repository](https://github.com/mamqek/aio-chat) or create a new issue.

---

## Related Packages

-   **@aio-chat/client**: The frontend web component package.

---

## License

This project is licensed under the MIT License.