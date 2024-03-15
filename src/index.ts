import { App } from './app';
import router from './routes/routes';

const app = new App([router]);

app.listen();
