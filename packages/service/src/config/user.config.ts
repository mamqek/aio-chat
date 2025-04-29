import { getMetadataArgsStorage } from 'typeorm';
import { Entity, Column } from "typeorm";
import { UserFieldMapping, ColumnOptions } from '../types/UserConfig.js';
import { BaseUser } from '../entities/BaseUser.js';


export function addEntityMetadata(target: Function, tableName: string = 'users') {
    const metadata = getMetadataArgsStorage();

    // Define the table
    metadata.tables.push({
        target,
        name: tableName,
        type: 'regular',
    });

    // // Dynamically extract column names from the class
    // const instance = new (target as any)();
    // const columnNames = Object.keys(instance);

    // console.log('Column names:', columnNames);

    // // Define the columns dynamically
    // for (const columnName of columnNames) {
    //     metadata.columns.push({
    //         target,
    //         propertyName: columnName,
    //         mode: 'regular',
    //         options: { type: 'text' }, // Default to 'text', can be customized
    //     });
    // }

    // Dynamically extract column names from the class prototype (use prototype to exclude BaseUser constructor invocation)
    const prototype = target.prototype;
    const columnNames = Object.getOwnPropertyNames(prototype)
        .filter((key) => key !== 'constructor' && typeof prototype[key] === 'undefined'); // Exclude methods and constructor

    console.log('Column names:', columnNames);

    // Define the columns dynamically
    for (const columnName of columnNames) {
        metadata.columns.push({
            target,
            propertyName: columnName,
            mode: 'regular',
            options: { type: 'text' }, // Default to 'text', can be customized
        });
    }
}


export function generateCustomUserClass(
    fieldMapping: UserFieldMapping,
    tableName: string = "users"
): new () => BaseUser {
    // Dynamically create a new class that extends BaseUser
    @Entity({ name: tableName })
    class CustomUser extends BaseUser {
        // Provide dummy implementations of default columns to have starting pint of object
        full_name!: string;
        avatar!: string;
        bio!: string;

        constructor() {
            super();
            // Dynamically initialize custom columns based on the mapping
            for (const [propName, columnOptions] of Object.entries(fieldMapping) as [keyof UserFieldMapping, ColumnOptions][]) {
                if (!(columnOptions.name in this)) {
                    Object.defineProperty(this, columnOptions.name, {
                        value: undefined, 
                        writable: true,
                        enumerable: true,
                        configurable: true,
                    });
                    // Delete overwritten dummy column to avoid duplicate properties 
                    delete (this as any)[propName];
                }            
            }
        }
    }

    // Dynamically define columns and getters/setters
    for (const [columnName, columnOptions ] of Object.entries(fieldMapping) as [keyof UserFieldMapping, ColumnOptions][]) {
        // Define a TypeORM column for the actual field
        Column({ 
            type: "text", 
            nullable: columnOptions?.isNullable, 
            default: columnOptions?.default 
        })(CustomUser.prototype, columnOptions.name);
        
        // Define the getter and setter ONLY for the abstract property, which overrides default column
        if (columnOptions.name !== columnName) {
            Object.defineProperty(CustomUser.prototype, columnName, {
                get() {
                    return this[columnOptions.name];
                },
                set(value: any) {
                    this[columnOptions.name] = value;
                },
                enumerable: true,
                configurable: true,
            });
        }
    }
    return CustomUser as new () => BaseUser;
}