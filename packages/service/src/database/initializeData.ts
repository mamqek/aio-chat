import { AppDataSource } from './dataSource.js';
import { Chat } from '../entities/Chat.js';
import { getConfigVariable } from '../config/config.server.js';
import { BaseUser } from '../entities/BaseUser.js';
import { UserFieldMapping } from '../types/UserConfig.js';
import { FindOptionsWhere, Repository } from 'typeorm';

// TODO: add explanation for additionalProperties and behaviour of this function to docs
export async function initializeData(additionalProperties: Record<string, any>[] = []): Promise<void> {
    let User = getConfigVariable("user_entity");
    const userRepository = AppDataSource.getRepository(User);

    const user1 = createCustomUser({
        full_name: 'Alice',
        avatar: 'alice.png',
        bio: 'Hi, I am Alice',
    }, additionalProperties[0] ?? {});

    const user2 = createCustomUser({
        full_name: 'Bob',
        avatar: 'bob.png',
        bio: 'Hello, I am Bob',
    }, additionalProperties[1] ?? {});


    if (await userExists(user1, userRepository) || await userExists(user2, userRepository)) {
        return;
    }

    try {
        await userRepository.save([user1, user2]);
    } catch (error) {
        console.error("Error creating users", (error as any).driverError ?? error);
        console.error("Please check if you provided all required values to initializeData() and user_mapping.");
        process.exit(1);
    }

    const chatRepository = AppDataSource.getRepository(Chat);
    const chat = chatRepository.create({
        user1,
        user2,
        created_at: new Date(),
        updated_at: new Date(),
        user1_unread_count: 0,
        user2_unread_count: 0
    });
    await chatRepository.save(chat);

    console.log('Sample users created:', user1, user2, chat);
}

function createCustomUser(defaultData: Partial<BaseUser>, additionalProperties: Record<string, any>): BaseUser {
    const UserEntity = getConfigVariable("user_entity");
    const user = new UserEntity();

    const mapping: UserFieldMapping = getConfigVariable("user_mapping");

    // Check if values for overridden default properties are provided or use default values
    user.full_name = additionalProperties[mapping.full_name!.name] ?? defaultData.full_name;
    user.bio = additionalProperties[mapping.bio!.name] ?? defaultData.bio;
    user.avatar = additionalProperties[mapping.avatar!.name] ?? defaultData.avatar;

    for (const [key, value] of Object.entries(additionalProperties)) {
        (user as any)[key] = value;
    }

    return user;
}

async function userExists(user: BaseUser, userRepository: Repository<BaseUser>): Promise<boolean> {
    const mapping: UserFieldMapping = getConfigVariable("user_mapping");

    const findUserQuery: FindOptionsWhere<BaseUser> = { 
        [mapping.full_name!.name]: user.full_name,
        [mapping.avatar!.name]: user.avatar,
        [mapping.bio!.name]: user.bio,
    };

    const existingUser = await userRepository.findOneBy(findUserQuery);

    if (existingUser) {
        console.log(`User with ${mapping.full_name!.name} "${user.full_name}", ${mapping.avatar!.name} "${user.avatar}", ${mapping.bio!.name} "${user.bio}" already exists. Skipping initialization.`);
        return true;
    } 
    console.log(" false userExists", user, findUserQuery, existingUser);
    return false;
}