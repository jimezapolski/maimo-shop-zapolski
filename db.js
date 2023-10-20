import mongoose from "mongoose"; //para mongo db
import chalk from "chalk"; // para que la consola tenga colores
import "dotenv/config"; 

// DB Connection // funcion asincronica que traemos el protocolo
const connectDb = async () => {
  let connectionString = process.env.DB_PROTOCOL; // algo interno de node que nos permite leer e interpretar que trae - la va a remplazar por DB_HOST= "mongodb+srv://jimezapolski:<password>@cluster0.jf6r2u5.mongodb.net/"
  if (process.env.DB_USER && process.env.DB_PASS) {
    connectionString += `${process.env.DB_USER}:${process.env.DB_PASS}@`; // arma la concatenacion de lo que me aparece en mongodb = forma nuestro string de conexion - todo traido desde el .env
  }
  connectionString += `${process.env.DB_HOST}/${process.env.DB_NAME}`;

  mongoose
    .connect(`${connectionString}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(chalk.green("Conected to database")))
    .catch((err) =>
      console.log(
        chalk.bgRed.white("Database not connected", err.code, err.input)
      )
    );
}; //armamos el try catch para poder conectarnos a la base de datos

const disconnectDb = async () => {
  try {
    await mongoose.connection.close();
    console.log(chalk.green("Disconnected from Database"));
  } catch (err) {
    console.log(err);
  }
};

export { connectDb, disconnectDb };