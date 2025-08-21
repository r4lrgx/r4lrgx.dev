import compression from 'compression';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());

app.use(compression());

const limiter = rateLimit({
 windowMs: 15 * 60 * 1000,
 max: 100,
});
app.use(limiter);

app.use(morgan('combined'));

app.use(
 express.static(path.join(__dirname, 'public'), {
  dotfiles: 'allow',
 })
);

app.use((_req, res) => {
 res.status(200).type('text/plain').send('It makes me laugh');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
