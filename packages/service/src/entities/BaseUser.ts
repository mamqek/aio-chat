import { PrimaryGeneratedColumn, getMetadataArgsStorage, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// BaseUser is an abstract class that defines the common properties of all user entities.
// It includes the id, created_at, and updated_at fields which are added to all user entities.
// It also includes abstract getters and setters for full_name, avatar, and bio, which must be implemented by derived classes by columns or getters/setters.
export abstract class BaseUser {
    constructor() {
        if (this.constructor === BaseUser) {
            throw new Error("BaseUser is an abstract class and cannot be instantiated directly.");
        }

        // Check if all required properties are implemented as either columns or getters/setters
        const requiredProperties = ['full_name', 'avatar', 'bio'];
        const prototype = Object.getPrototypeOf(this);

        for (const property of requiredProperties) {
            const descriptor = Object.getOwnPropertyDescriptor(prototype, property);
           
            // Check if the property is decorated with @Column using TypeORM's metadata storage
            const isColumn = getMetadataArgsStorage().columns.find(
                (column) => column.target === prototype.constructor && column.propertyName === property
            );

            if (!descriptor?.get && !isColumn) {
                throw new Error(`Derived class must implement '${property}' getter.`);
            }
            if (!descriptor?.set && !isColumn) {
                throw new Error(`Derived class must implement '${property}' setter.`);
            }
        }
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    // Abstract properties that must be implemented by derived classes
    abstract get full_name(): string;
    abstract get avatar(): string;
    abstract get bio(): string;
    abstract set full_name(value: string);
    abstract set avatar(value: string);
    abstract set bio(value: string);

    // Add the toJSON method to include getters in the JSON output
    // So full_name, avatar, and bio are present on the frontend
    toJSON() {
  // ——— 1) Log all TypeORM columns for this class ———
  getMetadataArgsStorage()
    .columns
    .filter(c => c.target === this.constructor)
    .forEach(c => {
      console.log(`[toJSON] @Column() → property='${c.propertyName}', mappedName='${c.options?.name ?? c.propertyName}'`);
    });

  // ——— 2) Log every own property/value on the instance ———
  Object.getOwnPropertyNames(this).forEach(key => {
    console.log(`[toJSON] this.${key} =`, (this as any)[key]);
  });

  // ——— 3) Log what each getter is about to return ———
  console.log(`[toJSON] getter full_name →`, this.full_name);
  console.log(`[toJSON] getter avatar    →`, this.avatar);
  console.log(`[toJSON] getter bio       →`, this.bio);

        console.log("toJSON called on BaseUser");
        console.log("this:", this);
        console.log("this.full:", this.full_name);
        return {
            ...this,
            full_name: this.full_name,
            avatar: this.avatar,    
            bio: this.bio,    
        };
    }
}