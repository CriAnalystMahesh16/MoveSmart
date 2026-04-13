const express = require('express');
const cors = require('cors');
const { db } = require('./firebaseConfig');
const { VertexAI } = require('@google-cloud/vertexai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID || 'YOUR_GCP_PROJECT_ID';
const GCP_LOCATION = process.env.GCP_LOCATION || 'us-central1';

// Static spatial data mapping out the stadium features
const stadiumTopology = `
Stadium Amenities Map:
- Zone A (North Gate): Main entrance, Merchandise Shop, Coffee Stand.
- Zone B (South Entrance): VIP Lounge, Restrooms, Premium Dining.
- Zone C (East Concourse): Food Court, First Aid, Main Bar.
`;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MoveFast API is running.' });
});

app.post('/api/update-crowd', async (req, res) => {
  const { zoneId, level, density, capacity } = req.body;
  if (!db) return res.status(503).json({ error: 'Firebase DB not initialized' });
  if (!zoneId || !level) return res.status(400).json({ error: 'Missing zoneId or level' });

  try {
    const docRef = db.collection('crowd_zones').doc(zoneId);
    await docRef.set({
      level, density: density || 'Unknown', capacity: capacity || 0,
      timestamp: new Date().toISOString()
    }, { merge: true });
    res.json({ status: 'success', message: `Zone ${zoneId} updated to ${level}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update Firestore' });
  }
});

app.post('/api/chat', async (req, res) => {
  const { message, userLocation } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  // 1. Fetch Latest Context from Firestore
  let crowdContext = "Live DB offline. Fallback: Zone A is Low, Zone B is High, Zone C is Medium crowd density.";
  if (db) {
    try {
      const snapshot = await db.collection('crowd_zones').get();
      if (!snapshot.empty) {
        let zonesInfo = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          zonesInfo.push(`${doc.id} (Level: ${data.level})`);
        });
        crowdContext = "Live Crowd Data: " + zonesInfo.join(' | ');
      }
    } catch (e) {
      console.warn("Failed to fetch crowd context:", e);
    }
  }

  // 2. Build the Advanced System Prompt
  const currentLoc = userLocation || 'Unknown Location';
  const systemPrompt = `You are 'MoveFast Assistant', highly intelligent concierge for the stadium.
Your goal is to provide hyper-personalized instructions based on what the user wants, their current location, and the live crowd densities.

CURRENT CONTEXT:
1. User's Location: ${currentLoc}
2. Live Crowds: ${crowdContext}
3. Stadium Topology: ${stadiumTopology}

GUIDELINES:
- If the user asks for food/drinks/restrooms, tell them the best place to go. 
- ALWAYS cross-reference the topology with the live crowd data. For example, if they want food, and Zone C (Food Court) is "High" crowd, suggest alternative nearby options or warn them about the wait.
- If they ask "Where should I go now?", suggest the least crowded area near them with amenities.
- Keep answers very conversational, concise (2-3 sentences), incredibly helpful and smart.
- If the user specifies they are entering the stadium from a specific gate, factor that into directions.`;

  // 3. Query Gemini via Vertex AI
  try {
    const vertex_ai = new VertexAI({ project: GCP_PROJECT_ID, location: GCP_LOCATION });
    const generativeModel = vertex_ai.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const chat = generativeModel.startChat({
        systemInstruction: systemPrompt
    });
    
    // We send just the user's message since the system instruction holds the complex context natively in gemini-1.5-pro
    const result = await chat.sendMessage(message);
    const responseText = result.response.candidates[0].content.parts[0].text;
    
    res.json({ reply: responseText });

  } catch (error) {
    console.warn("Vertex AI Invocation Error:", error.message);
    res.json({ 
      fallback: `I see you are at ${currentLoc} and you asked: "${message}". I would suggest heading to Zone A as it usually has the lowest wait times. (Note: To get live AI insights, you must authenticate GCP Vertex AI credentials in the backend.)` 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
