export default async function handler(req, res) {
  const { query } = req.query;

  const API_KEY = process.env.YT_API_KEY; // secure env variable

  const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${API_KEY}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('YouTube API error:', error);
    res.status(500).json({ error: 'YouTube API failed.' });
  }
}
