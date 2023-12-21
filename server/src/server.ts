import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { AppDataSource } from './data-source';
import authRoutes from './routes/auth';
import subRoutes from './routes/subs';
import postRoutes from './routes/posts';
import voteRoutes from './routes/votes';
import userRoutes from './routes/users';

const app = express();
const origin = "http://localhost:3000";

app.use(cors({
    origin,
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
dotenv.config();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Reddit Clone API',
            version: '1.0.0',
            description: 'Reddit Clone API Documentation'
        },
    },
    apis: ['src/routes/**/*.ts']
};

const specs = swaggerJsdoc(swaggerOptions);

app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes)
app.use("/api/subs", subRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/votes", voteRoutes)
app.use("/api/users", userRoutes)
app.use(express.static("public"))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

let port = 4000;

app.listen(port, async() => {
    console.log(`Server running at http://localhost:${port}`);

    AppDataSource.initialize().then(() => {
        console.log("database initialized")
    }).catch(error => console.log(error))
})