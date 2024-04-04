import {prisma} from "../../lib/prisma";

async function seed() {
    await prisma.event.create({
        data: {
            id: '9e9bd979-9d10-4915-b339-3786b1634f33',
            title: 'Sonangol Summit',
            slug: 'sonangol-summit',
            details: 'Um evento para colaboradores da Sonangol',
            maximumAttendeess: 10000,
        }
    })

    seed().then(() => {
        console.log('Database seeded!')
        prisma.$disconnect()
    })
}