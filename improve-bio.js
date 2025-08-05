import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default async function handler(req, res) {
  const { bio, language } = req.body

  const prompt = language === 'si'
    ? `Popravi ta opis za zmenke, da bo bolj naraven, slogovno dodelan in slovnično pravilen:\n"${bio}"`
    : `Improve this dating bio: make it more natural, grammatically correct and stylistically engaging.\n"${bio}"`

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that rewrites dating bios in a friendly and engaging tone.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7
  })

  const improved = chatCompletion.choices[0].message.content.trim()
  res.status(200).json({ improved })
}