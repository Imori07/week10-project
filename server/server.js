import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const dbConnectionString = process.env.DATABASE_URL;

const db = new pg.Pool({
  connectionString: dbConnectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>
  res.send(
    '<h1 style="color: red; text-align: center;">Welcome to the Music Reviews API</h1>'
  )
);

app.get('/reviews', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM music_reviews');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server is down :(' });
  }
});

// app.get('/users', async (req, res) => {
//   try {
//     const { rows } = await db.query(
//       'SELECT DISTINCT username FROM music_reviews'
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'No users found' });
//     }
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server is down :(' });
//   }
// });

app.get('/reviews/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      'SELECT * FROM music_reviews WHERE id = $1',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/post-review', async (req, res) => {
  const { username, band_name, src, description, musical_rating } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO music_reviews (username, band_name, src, description, musical_rating) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [username, band_name, src, description, musical_rating]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to post review' });
  }
});

app.delete('/delete-review/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM music_reviews WHERE id = $1', [
      id,
    ]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Review deleted' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Failed to delete review' });
  }
});

// app.patch('/reviews/:id/likes', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await db.query(
//       'UPDATE music_reviews SET likes = likes + 1 WHERE id = $1 RETURNING likes;',
//       [id]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: 'Review not found' });
//     }

//     res.json({ likes: result.rows[0].likes });
//   } catch (error) {
//     console.error('Error updating likes:', error);
//     res.status(500).json({ error: 'Failed to update likes' });
//   }
// });

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
