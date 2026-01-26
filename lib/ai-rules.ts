import { products } from "./products"
import {
  zodiacSigns,
  getZodiacByDate,
  emotionalNeeds,
  barriers,
  lifeGoals,
  energyVibes,
  randomAffirmations,
  type Zodiac,
} from "./zodiac-elements"

export interface UserAnswers {
  // Part 1: Identity
  birthDate: string
  zodiacSign: string
  gender: string

  // Part 2: Emotional Assessment
  emotionalState: string
  barrier: string

  // Part 3: Goals & Intentions
  lifeGoal: string
  energyVibe: string

  // Part 4: Aesthetics & Personalization
  fashionStyle: string
  colorPreference: string
  wristSize: string
  budget: string
  affirmation: string

  // Basic info
  name: string
}

export interface AIReading {
  zodiacInfo: { name: string; element: string; birthstone: string }
  emotionalAnalysis: string
  lifeGoalMessage: string
  energyDescription: string
  recommendedProduct: (typeof products)[0]
  stoneExplanations: string[]
  affirmation: string
  readingCard: {
    mainMessage: string
    affirmationText: string
    energyGuidance: string
  }
}

export function analyzeEnergy(answers: UserAnswers): AIReading {
  // Parse birthdate
  const [year, month, day] = answers.birthDate.split("-").map(Number)
  const zodiac = getZodiacByDate(day, month)

  // Get emotional analysis
  const emotionalData = emotionalNeeds[answers.emotionalState as keyof typeof emotionalNeeds]
  const barrierData = barriers[answers.barrier as keyof typeof barriers]
  const goalData = lifeGoals[answers.lifeGoal as keyof typeof lifeGoals]
  const vibeData = energyVibes[answers.energyVibe as keyof typeof energyVibes]

  // Determine product based on emotion + goal + barrier
  const productId = determineProductMatch(answers.emotionalState, answers.lifeGoal, answers.barrier)
  const recommendedProduct = products.find((p) => p.id === productId) || products[0]

  // Generate personalized affirmation
  const userAffirmation = answers.affirmation.trim() || randomAffirmations[Math.floor(Math.random() * randomAffirmations.length)]

  // Generate reading messages
  const emotionalAnalysis = `Trạng thái tinh thần: ${emotionalData?.label || "Cân bằng"}. ${emotionalData?.advice || "Bạn đang ổn định."}`

  const lifeGoalMessage = `Mục tiêu cuộc sống: ${goalData?.label || "Sức khỏe và bình an"}. ${goalData?.description || ""}`

  const energyDescription = generateEnergyDescription(
    answers.emotionalState,
    answers.lifeGoal,
    zodiac.element,
    answers.energyVibe
  )

  const readingCard = {
    mainMessage: `${answers.name}, năng lượng của bạn đang cầu cứu ${goalData?.description || "sự bình an"}. Chiếc vòng tay này sẽ là người đồng hành trong hành trình của bạn.`,
    affirmationText: userAffirmation,
    energyGuidance: `Hướng dẫn năng lượng: Bạn là một người ${zodiac.name} với mệnh ${zodiac.element}. Năng lượng của bạn cần được hỗ trợ bằng ${recommendedProduct.name.toLowerCase()}.`,
  }

  return {
    zodiacInfo: {
      name: zodiac.name,
      element: zodiac.element,
      birthstone: zodiac.mainStone,
    },
    emotionalAnalysis,
    lifeGoalMessage,
    energyDescription,
    recommendedProduct,
    stoneExplanations: recommendedProduct.stones.map((stone) => `${stone.name}: ${stone.meaning}`),
    affirmation: userAffirmation,
    readingCard,
  }
}

// Product matching logic
function determineProductMatch(emotion: string, goal: string, barrier: string): string {
  // Map combinations to products
  const matchMap: Record<string, string> = {
    // Stress combinations
    "stress-wealth": "prosperity-flow",
    "stress-love": "heart-healing",
    "stress-wisdom": "calm-night",
    "stress-health": "calm-night",

    // Lost combinations
    "lost-wealth": "prosperity-flow",
    "lost-love": "heart-healing",
    "lost-wisdom": "prosperity-flow",
    "lost-health": "calm-night",

    // Anxious combinations
    "anxious-wealth": "calm-night",
    "anxious-love": "heart-healing",
    "anxious-wisdom": "calm-night",
    "anxious-health": "calm-night",

    // Angry combinations
    "angry-wealth": "prosperity-flow",
    "angry-love": "heart-healing",
    "angry-wisdom": "calm-night",
    "angry-health": "calm-night",

    // Bored combinations
    "bored-wealth": "prosperity-flow",
    "bored-love": "sun-balance",
    "bored-wisdom": "prosperity-flow",
    "bored-health": "sun-balance",

    // Happy combinations
    "happy-wealth": "sun-balance",
    "happy-love": "heart-healing",
    "happy-wisdom": "prosperity-flow",
    "happy-health": "sun-balance",
  }

  const key = `${emotion}-${goal}`
  return matchMap[key] || "sun-balance"
}

// Energy description generation
function generateEnergyDescription(emotion: string, goal: string, element: string, vibe: string): string {
  const descriptions: Record<string, string> = {
    "stress-wealth":
      "Năng lượng của bạn đang cầu cứu sự bình yên để có thể tập trung vào sự thành công. Bạn cần khôi phục sức sống trước tiên.",
    "stress-love":
      "Năng lượng của bạn yêu cầu tình yêu thương bản thân. Hãy dành thời gian để chữa lành tổn thương và yêu thương bản thân hơn.",
    "lost-wealth":
      "Năng lượng của bạn đang tìm kiếm phương hướng để đạt được thành công. Tin tưởng vào quá trình, mỗi bước đều quan trọng.",
    "lost-love":
      "Năng lượng của bạn tìm kiếm kết nối sâu sắc. Bạn xứng đáng với tình yêu thật và những mối quan hệ chân thành.",
    "anxious-health":
      "Năng lượng của bạn cần được làm dịu dàng. Hãy thường xuyên lấy lại cân bằng và bình yên bằng cách dừng lại, thở sâu.",
    "angry-health":
      "Năng lượng của bạn cần được làm mát. Những viên đá mát mẻ sẽ giúp bạn hạ bớt sự nóng nảy và tìm lại bình yên.",
    "bored-wealth":
      "Năng lượng của bạn cần được kích thích. Hãy mở lòng với những cơ hội mới và để sự phát triển diễn ra một cách tự nhiên.",
    "happy-health":
      "Năng lượng của bạn đang rạng rỡ. Hãy duy trì và khuếch tán sự bình yên và vui vẻ này cho những người xung quanh.",
  }

  const key = `${emotion}-${goal}`
  return (
    descriptions[key] ||
    `Năng lượng của bạn với mệnh ${element} cần được hỗ trợ bằng những viên đá với năng lượng ${vibe}. Hãy tin tưởng vào quá trình.`
  )
}
