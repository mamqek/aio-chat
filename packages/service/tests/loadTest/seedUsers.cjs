"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// tests/loadTest/seedUsers.ts
var seedUsers_exports = {};
__export(seedUsers_exports, {
  seedUsers: () => seedUsers
});
module.exports = __toCommonJS(seedUsers_exports);

// src/config/CJSandESMCompatibility.ts
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_meta = {};
var isCommonJS = typeof __dirname !== "undefined";
if (!global.__srcDir) {
  let calculatedDir;
  if (!isCommonJS) {
    try {
      const currentFileDir = import_path.default.dirname((0, import_url.fileURLToPath)(import_meta.url));
      global.__dirname = currentFileDir;
      if (import_path.default.basename(currentFileDir) === "dist") {
        calculatedDir = import_path.default.resolve(currentFileDir, "../src");
      } else {
        calculatedDir = import_path.default.resolve(currentFileDir, "..");
      }
      global.__srcDir = calculatedDir;
    } catch (error) {
      console.error("Error in ESM path resolution:", error);
      global.__srcDir = process.cwd();
    }
  } else {
    const currentFileDir = __dirname;
    global.__dirname = currentFileDir;
    const parentDir = import_path.default.resolve(currentFileDir, "..");
    if (import_path.default.basename(parentDir) === "dist") {
      calculatedDir = import_path.default.resolve(parentDir, "../src");
    } else {
      calculatedDir = parentDir;
    }
    global.__srcDir = calculatedDir;
  }
}

// tests/loadTest/seedUsers.ts
var import_typeorm8 = require("typeorm");

// src/entities/DefaultUser.ts
var import_typeorm2 = require("typeorm");

// src/entities/BaseUser.ts
var import_typeorm = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata, "_ts_metadata");
var _BaseUser = class _BaseUser {
  constructor() {
    __publicField(this, "id");
    __publicField(this, "created_at");
    __publicField(this, "updated_at");
    if (this.constructor === _BaseUser) {
      throw new Error("BaseUser is an abstract class and cannot be instantiated directly.");
    }
    const requiredProperties = [
      "full_name",
      "avatar",
      "bio"
    ];
    const prototype = Object.getPrototypeOf(this);
    for (const property of requiredProperties) {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, property);
      const isColumn = (0, import_typeorm.getMetadataArgsStorage)().columns.find((column) => column.target === prototype.constructor && column.propertyName === property);
      if (!descriptor?.get && !isColumn) {
        throw new Error(`Derived class must implement '${property}' getter.`);
      }
      if (!descriptor?.set && !isColumn) {
        throw new Error(`Derived class must implement '${property}' setter.`);
      }
    }
  }
  // Add the toJSON method to include getters in the JSON output
  // So full_name, avatar, and bio are present on the frontend
  toJSON() {
    return {
      ...this,
      full_name: this.full_name,
      avatar: this.avatar,
      bio: this.bio
    };
  }
};
__name(_BaseUser, "BaseUser");
var BaseUser = _BaseUser;
_ts_decorate([
  (0, import_typeorm.PrimaryGeneratedColumn)(),
  _ts_metadata("design:type", Number)
], BaseUser.prototype, "id", void 0);
_ts_decorate([
  (0, import_typeorm.CreateDateColumn)(),
  _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BaseUser.prototype, "created_at", void 0);
_ts_decorate([
  (0, import_typeorm.UpdateDateColumn)(),
  _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BaseUser.prototype, "updated_at", void 0);

// src/entities/DefaultUser.ts
function _ts_decorate2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate2, "_ts_decorate");
function _ts_metadata2(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata2, "_ts_metadata");
var _DefaultUser = class _DefaultUser extends BaseUser {
  constructor() {
    super(...arguments);
    __publicField(this, "full_name");
    __publicField(this, "avatar");
    __publicField(this, "bio");
  }
};
__name(_DefaultUser, "DefaultUser");
var DefaultUser = _DefaultUser;
_ts_decorate2([
  (0, import_typeorm2.Column)({
    type: "text"
  }),
  _ts_metadata2("design:type", String)
], DefaultUser.prototype, "full_name", void 0);
_ts_decorate2([
  (0, import_typeorm2.Column)({
    type: "text"
  }),
  _ts_metadata2("design:type", String)
], DefaultUser.prototype, "avatar", void 0);
_ts_decorate2([
  (0, import_typeorm2.Column)({
    type: "text"
  }),
  _ts_metadata2("design:type", String)
], DefaultUser.prototype, "bio", void 0);
DefaultUser = _ts_decorate2([
  (0, import_typeorm2.Entity)({
    name: "users"
  })
], DefaultUser);

// src/entities/Chat.ts
var import_typeorm7 = require("typeorm");

// src/entities/ChatMessage.ts
var import_typeorm4 = require("typeorm");

// src/entities/ChatMessageStatus.ts
var import_typeorm3 = require("typeorm");
function _ts_decorate3(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate3, "_ts_decorate");
function _ts_metadata3(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata3, "_ts_metadata");
var _ChatMessageStatus = class _ChatMessageStatus {
  constructor() {
    // Composite primary key: message_id
    __publicField(this, "message_id");
    // Composite primary key: receiver_id
    __publicField(this, "receiver_id");
    __publicField(this, "status", "sent");
    __publicField(this, "created_at");
    __publicField(this, "updated_at");
    /**
     * Even though each ChatMessageStatus is logically linked to a single ChatMessage,
     * we use @ManyToOne here because TypeORM requires one side of a one-to-one relationship
     * to be defined as the owning side. By using @ManyToOne (with a unique constraint on the foreign key),
     * we can properly manage the 'message_id' and even handle composite keys if needed.
     */
    __publicField(this, "message");
  }
};
__name(_ChatMessageStatus, "ChatMessageStatus");
var ChatMessageStatus = _ChatMessageStatus;
_ts_decorate3([
  (0, import_typeorm3.PrimaryColumn)({
    type: "int"
  }),
  _ts_metadata3("design:type", Number)
], ChatMessageStatus.prototype, "message_id", void 0);
_ts_decorate3([
  (0, import_typeorm3.PrimaryColumn)({
    type: "int"
  }),
  _ts_metadata3("design:type", Number)
], ChatMessageStatus.prototype, "receiver_id", void 0);
_ts_decorate3([
  (0, import_typeorm3.Column)({
    type: "text"
  }),
  _ts_metadata3("design:type", String)
], ChatMessageStatus.prototype, "status", void 0);
_ts_decorate3([
  (0, import_typeorm3.CreateDateColumn)(),
  _ts_metadata3("design:type", typeof Date === "undefined" ? Object : Date)
], ChatMessageStatus.prototype, "created_at", void 0);
_ts_decorate3([
  (0, import_typeorm3.UpdateDateColumn)(),
  _ts_metadata3("design:type", typeof Date === "undefined" ? Object : Date)
], ChatMessageStatus.prototype, "updated_at", void 0);
_ts_decorate3([
  (0, import_typeorm3.ManyToOne)(() => ChatMessage, {
    onDelete: "CASCADE"
  }),
  (0, import_typeorm3.JoinColumn)({
    name: "message_id"
  }),
  _ts_metadata3("design:type", typeof Relation === "undefined" ? Object : Relation)
], ChatMessageStatus.prototype, "message", void 0);
ChatMessageStatus = _ts_decorate3([
  (0, import_typeorm3.Entity)({
    name: "chat_message_statuses"
  })
], ChatMessageStatus);

// src/entities/ChatMessage.ts
function _ts_decorate4(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate4, "_ts_decorate");
function _ts_metadata4(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata4, "_ts_metadata");
var _ChatMessage = class _ChatMessage {
  constructor() {
    __publicField(this, "id");
    __publicField(this, "chat");
    __publicField(this, "sender_id");
    __publicField(this, "receiver_id");
    __publicField(this, "replied_to");
    __publicField(this, "text");
    // Setting eager to true ensures it's loaded automatically and cascade so the status is automatically saved.
    __publicField(this, "status");
    // Using simple-json to store JSON data (like attachment information)
    __publicField(this, "attachment");
    __publicField(this, "deleted");
    __publicField(this, "created_at");
    __publicField(this, "updated_at");
  }
};
__name(_ChatMessage, "ChatMessage");
var ChatMessage = _ChatMessage;
_ts_decorate4([
  (0, import_typeorm4.PrimaryGeneratedColumn)(),
  _ts_metadata4("design:type", Number)
], ChatMessage.prototype, "id", void 0);
_ts_decorate4([
  (0, import_typeorm4.ManyToOne)(() => Chat, (chat) => chat.messages, {
    onDelete: "CASCADE"
  }),
  (0, import_typeorm4.JoinColumn)({
    name: "chat_id"
  }),
  _ts_metadata4("design:type", typeof Relation === "undefined" ? Object : Relation)
], ChatMessage.prototype, "chat", void 0);
_ts_decorate4([
  (0, import_typeorm4.Column)({
    type: "int"
  }),
  _ts_metadata4("design:type", Number)
], ChatMessage.prototype, "sender_id", void 0);
_ts_decorate4([
  (0, import_typeorm4.Column)({
    type: "int"
  }),
  _ts_metadata4("design:type", Number)
], ChatMessage.prototype, "receiver_id", void 0);
_ts_decorate4([
  (0, import_typeorm4.ManyToOne)(() => ChatMessage, {
    nullable: true,
    onDelete: "CASCADE"
  }),
  (0, import_typeorm4.JoinColumn)({
    name: "replied_to"
  }),
  _ts_metadata4("design:type", Object)
], ChatMessage.prototype, "replied_to", void 0);
_ts_decorate4([
  (0, import_typeorm4.Column)({
    type: "text",
    nullable: true
  }),
  _ts_metadata4("design:type", String)
], ChatMessage.prototype, "text", void 0);
_ts_decorate4([
  (0, import_typeorm4.OneToOne)(() => ChatMessageStatus, (status) => status.message, {
    eager: true,
    nullable: true
  }),
  _ts_metadata4("design:type", typeof Relation === "undefined" ? Object : Relation)
], ChatMessage.prototype, "status", void 0);
_ts_decorate4([
  (0, import_typeorm4.Column)({
    type: "simple-json",
    nullable: true
  }),
  _ts_metadata4("design:type", Object)
], ChatMessage.prototype, "attachment", void 0);
_ts_decorate4([
  (0, import_typeorm4.Column)({
    type: "boolean",
    default: false
  }),
  _ts_metadata4("design:type", Boolean)
], ChatMessage.prototype, "deleted", void 0);
_ts_decorate4([
  (0, import_typeorm4.CreateDateColumn)(),
  _ts_metadata4("design:type", typeof Date === "undefined" ? Object : Date)
], ChatMessage.prototype, "created_at", void 0);
_ts_decorate4([
  (0, import_typeorm4.UpdateDateColumn)(),
  _ts_metadata4("design:type", typeof Date === "undefined" ? Object : Date)
], ChatMessage.prototype, "updated_at", void 0);
ChatMessage = _ts_decorate4([
  (0, import_typeorm4.Entity)({
    name: "chat_messages"
  })
], ChatMessage);

// src/config/config.server.ts
var import_shared = require("@aio-chat/shared");

// src/config/user.config.ts
var import_typeorm5 = require("typeorm");
var import_typeorm6 = require("typeorm");

// src/config/config.server.ts
var defaultConfig = {
  production: global.__dirname.includes("dist"),
  PORT: 4e3,
  SERVICE_URL: "http://localhost:4000",
  HOST: "0.0.0.0",
  UPLOAD_DIR: "uploads",
  UPLOAD_URL: "uploads",
  CORS_ORIGIN: [
    "http://localhost:5174",
    "http://localhost:5173"
  ],
  user_filter: {},
  DB_PATH: "src/database/chatdb.sqlite",
  DB_TYPE: "sqlite",
  DB_NAME: "chatdb",
  DB_HOST: "",
  DB_PORT: void 0,
  DB_USER: "",
  DB_PASS: "",
  logging: false,
  // TODO: serve default profile pic and add docs for path override (maybe for default use some generator like https://www.gravatar.com/ or github profile pic)
  user_table_name: "users",
  user_entity: DefaultUser,
  user_mapping: {
    full_name: {
      name: "full_name",
      default: "User"
    },
    avatar: {
      name: "avatar",
      default: "https://example.com/default-avatar.png"
    },
    bio: {
      name: "bio",
      isNullable: true
    }
  },
  AUTH_MODE: "direct",
  // Auth Endpoint Authentication
  AUTH_ENDPOINT_URL: "",
  // JWT defaults
  TOKEN_NAME: "chat_token",
  TOKEN_SECRET: "chat-secret-change-me-in-production",
  JWT_ALGORITHM: "HS256",
  JWT_USER_ID_FIELD: "id",
  // Proxy defaults
  TRUSTED_PROXIES: [],
  PROXY_USER_ID_SOURCE: "body",
  PROXY_USER_ID_FIELD: "user_id"
};
var currentConfig = {
  ...defaultConfig
};
function getConfig() {
  return currentConfig;
}
__name(getConfig, "getConfig");

// src/entities/Chat.ts
function _ts_decorate5(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate5, "_ts_decorate");
function _ts_metadata5(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata5, "_ts_metadata");
var _Chat = class _Chat {
  constructor() {
    __publicField(this, "id");
    __publicField(this, "user1");
    __publicField(this, "user2");
    __publicField(this, "user1_unread_count", 0);
    __publicField(this, "user2_unread_count", 0);
    // The last message in the chat (nullable). On deletion of the referenced message, sets to NULL.
    __publicField(this, "last_message");
    __publicField(this, "created_at");
    __publicField(this, "updated_at");
    __publicField(this, "messages");
  }
  // Getter to support legacy backend code that expects a numeric user1_id and user2_id.
  get user1_id() {
    return this.user1?.id;
  }
  get user2_id() {
    return this.user2?.id;
  }
  // Add the toJSON method to include getters in the JSON output.
  toJSON() {
    return {
      ...this,
      user1_id: this.user1?.id,
      user2_id: this.user2?.id
    };
  }
};
__name(_Chat, "Chat");
var Chat = _Chat;
_ts_decorate5([
  (0, import_typeorm7.PrimaryGeneratedColumn)(),
  _ts_metadata5("design:type", Number)
], Chat.prototype, "id", void 0);
_ts_decorate5([
  (0, import_typeorm7.ManyToOne)(() => {
    const config = getConfig();
    return config.user_entity;
  }, {
    eager: true,
    cascade: true
  }),
  (0, import_typeorm7.JoinColumn)({
    name: "user1_id"
  }),
  _ts_metadata5("design:type", typeof BaseUser === "undefined" ? Object : BaseUser)
], Chat.prototype, "user1", void 0);
_ts_decorate5([
  (0, import_typeorm7.ManyToOne)(() => {
    const config = getConfig();
    return config.user_entity;
  }, {
    eager: true,
    cascade: true
  }),
  (0, import_typeorm7.JoinColumn)({
    name: "user2_id"
  }),
  _ts_metadata5("design:type", typeof BaseUser === "undefined" ? Object : BaseUser)
], Chat.prototype, "user2", void 0);
_ts_decorate5([
  (0, import_typeorm7.Column)({
    type: "int",
    default: 0
  }),
  _ts_metadata5("design:type", Number)
], Chat.prototype, "user1_unread_count", void 0);
_ts_decorate5([
  (0, import_typeorm7.Column)({
    type: "int",
    default: 0
  }),
  _ts_metadata5("design:type", Number)
], Chat.prototype, "user2_unread_count", void 0);
_ts_decorate5([
  (0, import_typeorm7.ManyToOne)(() => ChatMessage, {
    nullable: true,
    onDelete: "SET NULL",
    eager: true
  }),
  (0, import_typeorm7.JoinColumn)({
    name: "last_message_id"
  }),
  _ts_metadata5("design:type", typeof Relation === "undefined" ? Object : Relation)
], Chat.prototype, "last_message", void 0);
_ts_decorate5([
  (0, import_typeorm7.CreateDateColumn)(),
  _ts_metadata5("design:type", typeof Date === "undefined" ? Object : Date)
], Chat.prototype, "created_at", void 0);
_ts_decorate5([
  (0, import_typeorm7.UpdateDateColumn)(),
  _ts_metadata5("design:type", typeof Date === "undefined" ? Object : Date)
], Chat.prototype, "updated_at", void 0);
_ts_decorate5([
  (0, import_typeorm7.OneToMany)(() => ChatMessage, (message) => message.chat),
  _ts_metadata5("design:type", typeof Relation === "undefined" ? Object : Relation)
], Chat.prototype, "messages", void 0);
Chat = _ts_decorate5([
  (0, import_typeorm7.Entity)({
    name: "chats"
  })
], Chat);

// tests/loadTest/seedUsers.ts
var ds = new import_typeorm8.DataSource({
  type: "sqlite",
  database: "tests/loadTest/db.sqlite",
  // type: "postgres",
  // url: "postgresql://postgres.gquvgjieqndssqwqrqdi:Vlad311020022%21@aws-0-eu-central-1.pooler.supabase.com:6543/postgres", // chat test db
  // database: "chatdb",
  entities: [
    DefaultUser,
    Chat,
    ChatMessage,
    ChatMessageStatus
  ]
});
async function seedUsers() {
  let connectionInitialized = false;
  try {
    if (!ds.isInitialized) {
      await ds.initialize();
      connectionInitialized = true;
    }
    const repo = ds.getRepository(DefaultUser);
    for (let i = 1; i <= 200; i++) {
      const u = repo.create({
        full_name: `loadtest${i}`,
        bio: `loadtest bio ${i}`,
        avatar: `https://example.com/avatar${i}.png`
      });
      await repo.save(u);
    }
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  } finally {
    if (connectionInitialized && ds.isInitialized) {
      await ds.destroy();
      console.log("DataSource destroyed after seeding.");
    }
  }
}
__name(seedUsers, "seedUsers");
seedUsers().then(() => {
  console.log("Seeding finished.");
  process.exit(0);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  seedUsers
});
