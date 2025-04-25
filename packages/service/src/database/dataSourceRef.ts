// As this file acts as an entry point for migrations process 
// load  reflect-metadata for TypeORM
import 'reflect-metadata';
//  and __dirname resolution
import '../config/CJSandESMCompatibility';

import { setConfig } from "../config/config.server";
import { AppDataSource, initDatasource } from "./dataSource";

if (process.env.USER_CONFIG) {
   setConfig(JSON.parse(process.env.USER_CONFIG));
}

initDatasource();

export { AppDataSource };