import App from '@/app';
import { AuthRoute, IndexRoute, UsersRoute } from '@/routes';
import { validateEnv } from '@/utils';

new validateEnv();

const app = new App([new AuthRoute(), new UsersRoute(), new IndexRoute()]);

app.listen();
