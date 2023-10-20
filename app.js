import 'dotenv/config'
import express from 'express';
import createError from 'http-errors'
import cors from 'cors';
import indexRoutes from './routes/index.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import { connectDb } from './db.js';

/* Clear the console  */
console.log("\x1Bc");

const app = express();
const port = 4000;  // porque va a ir en el 4000 el backend

app.set('port', process.env.PORT || port) // va a leer del archivo de entorno si existe ese y sino le va a setear el que yo le di


connectDb();


/* Middlewares - configuraciones basicas que hay que hacerle a express */
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(
  cors({
  origin:
    process.env.NODE_ENV === "local"
      ? [`http://${process.env.FRONT_URL}`]
      : [
          `https://${process.env.FRONT_URL}`,
          `https://www.${process.env.FRONT_URL}`,
        ],
  credentials: true,
  exposedHeaders: "Authorization", // me aseguro que ocon el pedido del endpoint de la api no me salte el cors
})
) //si yo tengo la url - le da esa y sino la que yo creo

/* Routes */
app.use('/', indexRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)


/* Error handler  */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); //crea el error por si no existe
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({ message: err.message || "error" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({ message: err.message || 'error' });
});

/* Starting server */
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
// esto dice que en ese port que appenas cargue abra la aplicacion y que quede disponible