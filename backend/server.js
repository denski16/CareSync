const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder');

// API Routes Stubs
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CareSync Backend is running' });
});

app.post('/api/triage', (req, res) => {
  // Stub for AI-Driven Triage
  res.json({ recommended_action: 'General Consultation', priority: 'Normal' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
