// src/routes/chatRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import chatService from './chatService.js';
import { uploadDisk } from './config/multerConfig.js';
import { broadcastToUser } from './socket.js';
import jwt from 'jsonwebtoken';
import { withContext } from './auth/context.js';
import { AuthenticatedRequest } from './auth/authMiddleware.js';
import { getConfigVariable } from './config/config.server.js';





const router = Router();

/*
  This route handler is wrapped in two parts using the `withContext` helper.
  We wrap the multer middleware separately from the final handler to ensure that the AsyncLocalStorage context 
  (which includes authentication and request-specific data) is preserved across asynchronous boundaries.
  
  Multer’s internal asynchronous callbacks do not automatically inherit the outer context, so we re-establish the context 
  immediately after file processing. Similarly, wrapping the final handler ensures that any async operations there still have 
  access to the original context.
*/
router.post(
    '/sendMessage',
    withContext((req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        uploadDisk.any()(req, res, next);
    }),
    withContext(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            let message = await chatService.processMessage(req.body);

            if (req.files && Array.isArray(req.files)) {
                const attachments = (req.files as Express.Multer.File[]).filter(
                    file => file.fieldname === 'attachment[]'
                );
                console.log('Attachments:', attachments);
                if (attachments.length > 0) {
                    message = await chatService.processAttachments(message, attachments);
                }
            }

            broadcastToUser('messageSent', message, req.body.receiver_id);
            // Add the message to the email batch for the receiver.
            // chatService.addToEmailBatch(req.body.receiver_id, message);

        return res.json(message);
        } catch (error) {
            console.error('sendMessage error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    })
);



router.get('/chats', async (req: AuthenticatedRequest, res: Response) => {
    try {
        const chats = await chatService.getChats();
        return res.json(chats);
    } catch (error) {
        console.error('getChats error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/openChat/:chat_id', async (req: AuthenticatedRequest, res: Response) => {
    try {
        // Extract chat_id from URL parameters and convert to number.
        const chatId = Number(req.params.chat_id);
        const chatHistory = await chatService.getChatHistory(chatId);
        return res.json(chatHistory);
    } catch (error) {
        console.error('openChat error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/markAsRead', async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { chatId, senderId, messagesIds } = req.body;
        await chatService.markAsRead(chatId, senderId, messagesIds);
        return res.sendStatus(200);
    } catch (error) {
        console.error('markAsRead error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/otherChatters', async (req: AuthenticatedRequest, res: Response) => {
    try {
        const advisors = await chatService.getOtherChatters();
        return res.json(advisors);
    } catch (error) {
        console.error('getAdvisors error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/createChat', async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { advisor_id } = req.body;
        const chat = await chatService.createChat(advisor_id);
        return res.status(200).json({
            chat,
            title: 'Chat created successfully',
        });
    } catch (error) {
        console.error('createChat error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/chatWith/:user_id', async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { user_id } = req.params;
        const chat = await chatService.createChat(Number(user_id));
        return res.redirect(`/panel/chat?id=${chat.id}`);
    } catch (error) {
        console.error('chatWith error:', error);
        return res.status(500).send('Internal server error');
    }
});


router.post('/login', async (req: Request, res: Response) => {
    const { user_id } = req.body;
    
    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }

    const token = jwt.sign(
        { id: user_id },
        getConfigVariable('TOKEN_SECRET'),
        { 
            algorithm: getConfigVariable('JWT_ALGORITHM') as jwt.Algorithm,
            expiresIn: '24h'  // Token validity period
        }
    );
    
    res.cookie(getConfigVariable('TOKEN_NAME'), token, {
        httpOnly: true,
        secure: getConfigVariable('production'),
        sameSite: getConfigVariable('production') ? 'none' : 'lax',
        maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({ success: true });
});

router.get('/user', (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    
    return res.json({ user: req.user });
});

export default router;
