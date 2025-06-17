const express = require('express');
const app = express();
app.use(express.json());

app.post('/auth/login', (req, res) => res.json({ token: "<dummy-jwt>" }));
app.get('/messages', (req, res) => res.json([]));
app.post('/messages', (req, res) => res.json({ ciphertext: "<encrypted>" }));
app.get('/analytics/themes', (req, res) => res.json({ themes: { stress: 5, sleep: 3 } }));

app.listen(8080, () => console.log('API running on port 8080'));