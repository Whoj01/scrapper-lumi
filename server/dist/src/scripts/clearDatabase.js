import { deleteItemFromAWS } from "../api/awsS3/uploadToAws";
import prismaClient from "../api/prismaClient";
(async () => {
    const bills = await prismaClient.bill.findMany({
        select: {
            pdfKey: true,
            qrcodeKey: true,
        },
    });
    await prismaClient.user.deleteMany({});
    await prismaClient.bill.deleteMany({});
    for await (const bill of bills) {
        await deleteItemFromAWS(bill.pdfKey);
        await deleteItemFromAWS(bill.qrcodeKey);
    }
})();
