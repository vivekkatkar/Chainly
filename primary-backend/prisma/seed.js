
const { PrismaClient } =  require("@prisma/client");
const prismaClient = new PrismaClient()

async function main() {
    await prismaClient.availableAction.createMany({
        data : [{
            id : "email" ,
            name : "Email",
            image : "https://static.vecteezy.com/system/resources/previews/006/697/974/non_2x/mail-email-icon-template-black-color-editable-mail-email-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg",
        }, {
             id : "solana" ,
            name : "Solana",
            image : "https://logowik.com/content/uploads/images/solana1243.logowik.com.webp"
        }]
    })

     await prismaClient.availableTrigger.create({
        data : {
            id : "webhook" ,
            name : "Webhook",
            image : "https://mailparser.io/wp-content/uploads/2018/08/what-is-a-webhook-1024x536.jpeg",
        }
    })
}

main()