"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const seeder_1 = require("./database/seeders/seeder");
const seeder_module_1 = require("./database/seeders/seeder.module");
async function bootstrap() {
    core_1.NestFactory.createApplicationContext(seeder_module_1.SeederModule)
        .then((appContext) => {
        const seeder = appContext.get(seeder_1.Seeder);
        seeder
            .seed()
            .then(() => {
            console.log('Seeding complete!');
        })
            .catch((error) => {
            console.error('Seeding failed!');
            throw error;
        })
            .finally(() => appContext.close());
    })
        .catch((error) => {
        throw error;
    });
}
bootstrap();
//# sourceMappingURL=seed.js.map