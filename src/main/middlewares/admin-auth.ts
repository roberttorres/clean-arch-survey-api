import { adaptMiddleware } from "../adapters/express-middleware-adapter";
import { MakeAuthMiddleware } from "../factories/middlewares/auth-middleware-factory";

export const adminAuth = adaptMiddleware(MakeAuthMiddleware('admin'))