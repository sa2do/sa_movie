import express from 'express';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes';




const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/movies', movieRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});