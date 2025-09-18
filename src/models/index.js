import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Sequelize } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";

// Load config.json manually
const configPath = path.join(__dirname, "../config/config.json");
const configJson = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const config = configJson[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = { sequelize, Sequelize };

// Dynamically import models
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file =>
    file.endsWith(".js") && file !== path.basename(__filename)
  );

for (const file of modelFiles) {
  const fileUrl = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(fileUrl);

  // Some files may not have default export, skip them
  if (!modelModule.default) continue;

  const ModelClass = modelModule.default;

  // Only include Sequelize Models
  if (typeof ModelClass === "function" && "init" in ModelClass) {
    db[ModelClass.name] = ModelClass;
    // Initialize model with sequelize if not done inside the file
    if (!ModelClass.sequelize) {
      ModelClass.init(ModelClass.rawAttributes, {
        sequelize,
        modelName: ModelClass.name,
        tableName: ModelClass.tableName || undefined,
        timestamps: true,
      });
    }
  }
}

// Setup associations
Object.values(db).forEach(model => {
  if (typeof model.associate === "function") {
    model.associate(db);
  }
});

export default db;
