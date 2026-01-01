import express, { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.post('/ask-ai', async (req, res) => {
  try {
    const { question, userContext } = req.body;

    const prompt = `
You are a professional fitness assistant.

USER PROFILE:
- Height: ${userContext.height} cm
- Weight: ${userContext.weight} kg
- BMI: ${userContext.bmi}
- Goal: ${userContext.goal}

INSTRUCTIONS:
- Respond in Markdown
- Simple and short
- Use headings and bullet points
- Avoid medical diagnosis

USER QUESTION:
${question}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
      return res.status(500).json({ message: 'Gemini API error' });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'AI service failed' });
  }
});

export default router;
