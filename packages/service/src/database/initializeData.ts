import { AppDataSource } from './dataSource.js';
import { Chat } from '../entities/Chat.js';
import { getConfigVariable } from '../config/config.server.js';
import { BaseUser } from '../entities/BaseUser.js';
import { UserFieldMapping } from '../types/UserConfig.js';

export async function initializeData() {
    let User = getConfigVariable("user_entity");
    const userRepository = AppDataSource.getRepository(User);
    const userCount = await userRepository.count();

    if (userCount === 0) {
        const user1 = createCustomUser({
            full_name: 'Alice',
            avatar: 'alice.png',
            bio: 'Hi, I am Alice',
        });
        const user2 = createCustomUser({
            full_name: 'Bob',
            avatar: 'bob.png',
            bio: 'Hello, I am Bob',
        });
        
        await userRepository.save([user1, user2]);

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

        console.log('Sample users created:', user1, user2);
    } else {
        console.log('Users already exist, skipping user creation.');
    }
}

function createCustomUser(data: Partial<BaseUser>): BaseUser {
    const UserConstructor = getConfigVariable("user_entity");
    const user = new UserConstructor();

    const mapping : UserFieldMapping = getConfigVariable("user_mapping");
    
    // TODO: fix this to not be ugly with ts and check if getters and setters on usre field work correctly
    for (const [defaultAttributeName, { name: customAttributeName }] of Object.entries(mapping)) {
        // Use 'as any' to bypass strict index type checking
        const valueToAssign = (data as any)[defaultAttributeName];

        if (valueToAssign !== undefined) {
            // if attribute wasn't overridden
            if (defaultAttributeName == customAttributeName) {
                (user as any)[defaultAttributeName] = valueToAssign;
            // if attribute was overridden, use the custom name
            } else {
                (user as any)[customAttributeName] = valueToAssign;
            }
        }
    }
// // --- Add loggingQ here ---
//     console.log(`--- Inspecting properties for UserConstructor: ${UserConstructor.name} ---`);
//     const propertiesToInspect = ['full_name', 'bio', 'avatar'];
//     // Also inspect the actual mapped column names if known (e.g., from mapping)
//     if (mapping.full_name) propertiesToInspect.push(mapping.full_name.name);
//     if (mapping.bio) propertiesToInspect.push(mapping.bio.name);
//     if (mapping.avatar) propertiesToInspect.push(mapping.avatar.name);

//     for (const propName of [...new Set(propertiesToInspect)]) { // Use Set to avoid duplicates
//         // Check descriptor on the instance itself
//         const instanceDescriptor = Object.getOwnPropertyDescriptor(user, propName);
//         console.log(`Descriptor for '${propName}' on instance:`, instanceDescriptor);

//         // Check descriptor on the prototype (where getters/setters are usually defined)
//         const prototypeDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(user), propName);
//         console.log(`Descriptor for '${propName}' on prototype:`, prototypeDescriptor);
//     }
//     console.log(`--- End inspection ---`);
//     // --- End logging ---


    // console.log('Mapping:', mapping);
    // if (data.full_name) user.full_name = data.full_name;
    // if (data.bio) user.bio = data.bio;
    // console.log('User:', user);
    // if (data.avatar) user.avatar = data.avatar;
    return user;
}