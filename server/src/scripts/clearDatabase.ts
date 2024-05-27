import { deleteItemFromAWS } from "../api/awsS3/uploadToAws";
import prismaClient from "../api/prismaClient";
import { logger } from "../libs/logger";

(async () => {
    const bills = await prismaClient.bill.findMany({
        select: {
            pdfKey: true,
            qrcodeKey: true,
        },
    });

    await prismaClient.user.deleteMany({});
    logger.info('usuários deletados da base de dados');
    
    await prismaClient.bill.deleteMany({});
    logger.info('contas deletadas da base de dados');

    await Promise.all(bills.map(async (bill) => {
        await deleteItemFromAWS(bill.pdfKey);
        logger.info(`pdf ${bill.pdfKey} deletado da AWS S3`);
        
        if (bill.qrcodeKey === null) return;

        await deleteItemFromAWS(bill.qrcodeKey);
        logger.info(`qrcode ${bill.qrcodeKey} deletado da AWS S3`);
    }));
})();