import { products } from "./products"

export interface UserAnswers {
  emotion: string
  color: string
  intention: string
  name: string
  birthDate: string
  zodiac?: string
}

export interface AIReading {
  energyStatus: string
  description: string
  recommendedProduct: (typeof products)[0]
  stoneExplanations: string[]
  affirmation: string
  adviceMessage: string
}

// Rule-based AI logic mapping emotions + colors to products
const emotionColorMap: Record<string, Record<string, string>> = {
  stress: {
    brown: "calm-night",
    gold: "prosperity-flow",
    pink: "heart-healing",
  },
  lonely: {
    pink: "heart-healing",
    gold: "sun-balance",
    brown: "calm-night",
  },
  lost: {
    gold: "prosperity-flow",
    brown: "calm-night",
    pink: "heart-healing",
  },
  balance: {
    gold: "sun-balance",
    brown: "prosperity-flow",
    pink: "heart-healing",
  },
  growth: {
    gold: "prosperity-flow",
    brown: "sun-balance",
    pink: "heart-healing",
  },
}

const intentionMessages: Record<string, string> = {
  peace: "Bạn tìm kiếm sự bình yên trong tâm hồn. Năng lượng của mình có khả năng giải phóng lo lắng.",
  work: "Bạn đang tập trung vào sự phát triển nghề nghiệp. Chiếc vòng tay này sẽ là người đồng hành trong hành trình thành công.",
  love: "Tình yêu và kết nối con người là ưu tiên của bạn. Năng lượng này sẽ giúp bạn yêu thương bản thân hơn trước.",
  healing: "Bạn đang trên hành trình chữa lành bản thân. Mỗi viên đá sẽ nhắc nhở bạn về sức mạnh nội tại của mình.",
}

const emotionAffirmations: Record<string, string> = {
  stress: "Tôi là người mạnh mẽ. Những thách thức chỉ là những bậc thang giúp tôi lên cao.",
  lonely: "Tôi xứng đáng được yêu thương, đặc biệt là từ chính bản thân mình.",
  lost: "Tôi tin vào quá trình. Mỗi bước đi đều mang tôi gần hơn đến mục tiêu.",
  balance: "Tôi sống hòa hợp giữa các khía cạnh của cuộc sống.",
  growth: "Tôi không ngừng phát triển. Mỗi ngày là một cơ hội để trở nên tốt hơn.",
}

export function analyzeEnergy(answers: UserAnswers): AIReading {
  // Determine product recommendation
  const emotionGroup = answers.emotion.toLowerCase()
  const colorGroup = answers.color.toLowerCase()
  const productId = emotionColorMap[emotionGroup]?.[colorGroup] || "sun-balance"
  const recommendedProduct = products.find((p) => p.id === productId) || products[0]

  // Generate personalized messages
  const intentionMessage = intentionMessages[answers.intention] || intentionMessages["peace"]
  const affirmation = emotionAffirmations[emotionGroup] || emotionAffirmations["balance"]

  // Generate energy description based on emotion and intention
  const energyDescriptions: Record<string, string> = {
    "stress-peace":
      "Năng lượng của bạn đang cầu cứu sự yên tĩnh. Dòng năng lượng hiện tại cho thấy bạn cần phải dừng lại, thở sâu, và để cho cơ thể bạn được thư giãn.",
    "lonely-love":
      "Năng lượng của bạn đang reo gọi tình yêu và kết nối. Bạn cần nhắc nhở bản thân rằng bạn không bao giờ đơn độc.",
    "lost-work":
      "Năng lượng của bạn đang tìm kiếm phương hướng. Hãy tin rằng mỗi bước đi, mỗi quyết định đều là một phần của hành trình tuyệt vời của bạn.",
    "growth-growth":
      "Năng lượng của bạn đang bùng nổ với tiềm năng. Bạn đang trên con đường của sự thay đổi tích cực. Hãy ôm lấy nó.",
  }

  const key = `${emotionGroup}-${answers.intention}`
  const energyDescription =
    energyDescriptions[key] ||
    `Năng lượng của bạn phản ánh sự ${answers.color}. Hiện tại, bạn đang cần ${answers.intention}.`

  return {
    energyStatus: `Trạng thái năng lượng: ${recommendedProduct.energyType}`,
    description: energyDescription,
    recommendedProduct,
    stoneExplanations: recommendedProduct.stones.map((stone) => `${stone.name}: ${stone.meaning}`),
    affirmation,
    adviceMessage: `${answers.name}, ${intentionMessage.toLowerCase()}`,
  }
}
