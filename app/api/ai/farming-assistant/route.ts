import { type NextRequest, NextResponse } from "next/server"

interface FarmingKnowledge {
  keywords: string[]
  responses: { [key: string]: string }
}

const farmingKnowledgeBase: { [key: string]: FarmingKnowledge } = {
  crops: {
    keywords: [
      "crop",
      "crops",
      "wheat",
      "rice",
      "corn",
      "maize",
      "cotton",
      "sugarcane",
      "potato",
      "tomato",
      "onion",
      "garlic",
      "soybean",
      "mustard",
      "barley",
      "millet",
      "bajra",
      "jowar",
      "ragi",
      "cultivation",
      "farming",
      "grow",
      "plant",
      "harvest",
    ],
    responses: {
      en: "For successful crop cultivation in India:\n\n🌱 **Soil Preparation**: Test soil pH (6.0-7.5 ideal), add organic compost 2-3 weeks before planting\n🌾 **Seed Selection**: Use certified, disease-resistant varieties suited to your region\n💧 **Irrigation**: Maintain consistent moisture - drip irrigation saves 30-50% water\n🌡️ **Timing**: Plant according to monsoon patterns - Kharif (June-July), Rabi (Oct-Dec)\n🔄 **Crop Rotation**: Rotate legumes with cereals to maintain soil fertility\n\nWhich specific crop are you planning to grow? I can provide detailed guidance!",
      hi: "भारत में सफल फसल की खेती के लिए:\n\n🌱 **मिट्टी की तैयारी**: मिट्टी का pH टेस्ट करें (6.0-7.5 आदर्श), बुआई से 2-3 सप्ताह पहले जैविक खाद डालें\n🌾 **बीज चयन**: अपने क्षेत्र के लिए उपयुक्त प्रमाणित, रोग प्रतिरोधी किस्मों का उपयोग करें\n💧 **सिंचाई**: नियमित नमी बनाए रखें - ड्रिप सिंचाई से 30-50% पानी की बचत\n🌡️ **समय**: मानसून के अनुसार बुआई करें - खरीफ (जून-जुलाई), रबी (अक्टूबर-दिसंबर)\n🔄 **फसल चक्र**: मिट्टी की उर्वरता बनाए रखने के लिए दलहन और अनाज की अदला-बदली करें\n\nआप कौन सी विशिष्ट फसल उगाने की योजना बना रहे हैं?",
      te: "భారతదేశంలో విజయవంతమైన పంట సాగు కోసం:\n\n🌱 **నేల తయారీ**: నేల pH పరీక్షించండి (6.0-7.5 ఆదర్శం), నాటడానికి 2-3 వారాల ముందు సేంద్రీయ ఎరువు వేయండి\n🌾 **విత్తన ఎంపిక**: మీ ప్రాంతానికు అనుకూలమైన ధృవీకరించబడిన, వ్యాధి నిరోధక రకాలను ఉపయోగించండి\n💧 **నీటిపారుదల**: స్థిరమైన తేమను నిర్వహించండి - డ్రిప్ నీటిపారుదల 30-50% నీటిని ఆదా చేస్తుంది\n🌡️ **సమయం**: వర్షాకాలం ప్రకారం నాటండి - ఖరీఫ్ (జూన్-జూలై), రబీ (అక్టోబర్-డిసెంబర్)\n🔄 **పంట మార్పిడి**: నేల సారవంతత నిర్వహించడానికి పప్పుధాన్యాలు మరియు ధాన్యాలను మార్చండి\n\nమీరు ఏ నిర్దిష్ట పంటను పండించాలని అనుకుంటున్నారు?",
    },
  },

  pests: {
    keywords: [
      "pest",
      "pests",
      "insect",
      "insects",
      "bug",
      "bugs",
      "disease",
      "diseases",
      "fungus",
      "bacteria",
      "virus",
      "aphid",
      "caterpillar",
      "bollworm",
      "thrips",
      "whitefly",
      "control",
      "spray",
      "pesticide",
      "organic",
    ],
    responses: {
      en: "Effective pest management for Indian crops:\n\n🔍 **Early Detection**: Check plants weekly, look for yellowing leaves, holes, or unusual spots\n🌿 **Organic Solutions**:\n   • Neem oil spray (2-3ml/liter) - effective against aphids, thrips\n   • Turmeric + soap solution for fungal diseases\n   • Marigold companion planting deters many pests\n\n🧪 **Integrated Approach**:\n   • Use pheromone traps for bollworms\n   • Encourage beneficial insects (ladybugs, spiders)\n   • Rotate crops to break pest cycles\n\n⚠️ **Chemical Control**: Use only when necessary, follow label instructions\n\nWhat specific pest problem are you facing?",
      hi: "भारतीय फसलों के लिए प्रभावी कीट प्रबंधन:\n\n🔍 **जल्दी पहचान**: साप्ताहिक पौधों की जांच करें, पीले पत्ते, छेद या असामान्य धब्बे देखें\n🌿 **जैविक समाधान**:\n   • नीम तेल स्प्रे (2-3ml/लीटर) - एफिड्स, थ्रिप्स के खिलाफ प्रभावी\n   • हल्दी + साबुन का घोल फंगल रोगों के लिए\n   • गेंदे की सहयोगी खेती कई कीटों को दूर रखती है\n\n🧪 **एकीकृत दृष्टिकोण**:\n   • बॉलवर्म के लिए फेरोमोन ट्रैप का उपयोग करें\n   • लाभकारी कीटों को प्रोत्साहित करें\n   • कीट चक्र तोड़ने के लिए फसल चक्र अपनाएं\n\n⚠️ **रासायनिक नियंत्रण**: केवल आवश्यक होने पर उपयोग करें\n\nआप किस विशिष्ट कीट समस्या का सामना कर रहे हैं?",
      te: "భారతీయ పంటలకు ప్రభావవంతమైన కీటక నిర్వహణ:\n\n🔍 **ముందస్తు గుర్తింపు**: వారానికి మొక్కలను తనిఖీ చేయండి, పసుపు ఆకులు, రంధ్రాలు లేదా అసాధారణ మచ్చలను చూడండి\n🌿 **సేంద్రీయ పరిష్కారాలు**:\n   • వేప నూనె స్ప్రే (2-3ml/లీటర్) - అఫిడ్స్, థ్రిప్స్‌కు వ్యతిరేకంగా ప్రభావవంతం\n   • పసుపు + సబ్బు ద్రావణం ఫంగల్ వ్యాధులకు\n   • బంతిపువ్వు సహచర నాటడం అనేక కీటకాలను దూరం చేస్తుంది\n\n🧪 **సమగ్ర విధానం**:\n   • బాల్‌వార్మ్‌లకు ఫెరోమోన్ ట్రాప్‌లను ఉపయోగించండి\n   • ప్రయోజనకరమైన కీటకాలను ప్రోత్సహించండి\n   • కీటక చక్రాలను విచ్ఛిన్నం చేయడానికి పంట మార్పిడి చేయండి\n\n⚠️ **రసాయన నియంత్రణ**: అవసరమైనప్పుడు మాత్రమే ఉపయోగించండి\n\nమీరు ఏ నిర్దిష్ట కీటక సమస్యను ఎదుర్కొంటున్నారు?",
    },
  },

  soil: {
    keywords: [
      "soil",
      "earth",
      "dirt",
      "fertility",
      "ph",
      "nutrients",
      "fertilizer",
      "compost",
      "organic",
      "manure",
      "nitrogen",
      "phosphorus",
      "potassium",
      "npk",
      "testing",
      "improvement",
    ],
    responses: {
      en: "Soil health is the foundation of successful farming:\n\n🧪 **Soil Testing**: Test every 2-3 years for pH, NPK, organic matter\n   • Ideal pH: 6.0-7.5 for most crops\n   • Cost: ₹200-500 at agricultural universities\n\n🌱 **Improving Soil Fertility**:\n   • Add 2-3 tons compost per acre annually\n   • Green manuring with dhaincha, sunhemp\n   • Vermicompost: 1-2 tons per acre\n\n⚖️ **Nutrient Management**:\n   • Nitrogen: For leafy growth (urea 100-150 kg/acre)\n   • Phosphorus: For root development (DAP 50-75 kg/acre)\n   • Potassium: For disease resistance (MOP 25-50 kg/acre)\n\nWhat's your current soil condition?",
      hi: "मिट्टी का स्वास्थ्य सफल खेती की नींव है:\n\n🧪 **मिट्टी परीक्षण**: pH, NPK, जैविक पदार्थ के लिए हर 2-3 साल में परीक्षण करें\n   • आदर्श pH: अधिकांश फसलों के लिए 6.0-7.5\n   • लागत: कृषि विश्वविद्यालयों में ₹200-500\n\n🌱 **मिट्टी की उर्वरता में सुधार**:\n   • प्रति एकड़ सालाना 2-3 टन कंपोस्ट डालें\n   • ढैंचा, सनई से हरी खाद\n   • वर्मीकंपोस्ट: 1-2 टन प्रति एकड़\n\n⚖️ **पोषक तत्व प्रबंधन**:\n   • नाइट्रोजन: पत्तेदार वृद्धि के लिए (यूरिया 100-150 किग्रा/एकड़)\n   • फास्फोरस: जड़ विकास के लिए (DAP 50-75 किग्रा/एकड़)\n   • पोटेशियम: रोग प्रतिरोधा के लिए (MOP 25-50 किग्रा/एकड़)\n\nआपकी वर्तमान मिट्टी की स्थिति क्या है?",
    },
  },

  weather: {
    keywords: [
      "weather",
      "rain",
      "monsoon",
      "drought",
      "temperature",
      "humidity",
      "climate",
      "season",
      "kharif",
      "rabi",
      "zaid",
      "irrigation",
      "water",
    ],
    responses: {
      en: "Weather-smart farming for Indian conditions:\n\n🌧️ **Monsoon Planning**:\n   • Southwest monsoon: June-September (Kharif season)\n   • Northeast monsoon: October-December (Rabi season)\n   • Pre-monsoon preparation: Clear drainage, repair bunds\n\n☀️ **Season-wise Crops**:\n   • **Kharif** (June-Oct): Rice, cotton, sugarcane, maize\n   • **Rabi** (Nov-Apr): Wheat, barley, mustard, gram\n   • **Zaid** (Apr-June): Fodder, vegetables with irrigation\n\n💧 **Water Management**:\n   • Rainwater harvesting: Build farm ponds\n   • Mulching reduces water loss by 50-70%\n   • Drip irrigation for water-scarce areas\n\nWhich season are you planning for?",
      hi: "भारतीय परिस्थितियों के लिए मौसम-स्मार्ट खेती:\n\n🌧️ **मानसून योजना**:\n   • दक्षिण-पश्चिम मानसून: जून-सितंबर (खरीफ सीजन)\n   • उत्तर-पूर्व मानसून: अक्टूबर-दिसंबर (रबी सीजन)\n   • मानसून पूर्व तैयारी: जल निकासी साफ करें, बांध की मरम्मत करें\n\n☀️ **मौसम के अनुसार फसलें**:\n   • **खरीफ** (जून-अक्टूबर): धान, कपास, गन्ना, मक्का\n   • **रबी** (नवंबर-अप्रैल): गेहूं, जौ, सरसों, चना\n   • **जायद** (अप्रैल-जून): चारा, सिंचाई के साथ सब्जियां\n\n💧 **जल प्रबंधन**:\n   • वर्षा जल संचयन: फार्म तालाब बनाएं\n   • मल्चिंग से 50-70% पानी की हानि कम होती है\n   • पानी की कमी वाले क्षेत्रों के लिए ड्रिप सिंचाई\n\nआप किस मौसम की योजना बना रहे हैं?",
    },
  },

  general: {
    keywords: [
      "help",
      "advice",
      "farming",
      "agriculture",
      "question",
      "problem",
      "issue",
      "guidance",
      "support",
      "assistance",
    ],
    responses: {
      en: "Welcome to your AI Farming Assistant! 🌾\n\nI'm here to help you with all aspects of farming:\n\n🌱 **Crop Cultivation**: Planting, growing, harvesting techniques\n🐛 **Pest & Disease Management**: Organic and chemical solutions\n🌍 **Soil Health**: Testing, fertilization, improvement methods\n🌧️ **Weather & Irrigation**: Seasonal planning, water management\n💰 **Market Information**: Pricing, government schemes, subsidies\n🔬 **Modern Techniques**: Precision farming, technology adoption\n\nFeel free to ask me anything about farming! I can provide advice in multiple Indian languages.\n\nWhat farming challenge can I help you with today?",
      hi: "आपके AI कृषि सहायक में आपका स्वागत है! 🌾\n\nमैं खेती के सभी पहलुओं में आपकी मदद के लिए यहां हूं:\n\n🌱 **फसल की खेती**: बुआई, उगाना, कटाई की तकनीकें\n🐛 **कीट और रोग प्रबंधन**: जैविक और रासायनिक समाधान\n🌍 **मिट्टी का स्वास्थ्य**: परीक्षण, उर्वरीकरण, सुधार के तरीके\n🌧️ **मौसम और सिंचाई**: मौसमी योजना, जल प्रबंधन\n💰 **बाजार की जानकारी**: मूल्य निर्धारण, सरकारी योजनाएं, सब्सिडी\n🔬 **आधुनिक तकनीकें**: सटीक खेती, प्रौद्योगिकी अपनाना\n\nखेती के बारे में मुझसे कुछ भी पूछने में संकोच न करें!\n\nआज मैं आपकी किस कृषि चुनौती में मदद कर सकता हूं?",
    },
  },
}

function findBestResponse(message: string, language: string): string {
  const messageLower = message.toLowerCase()
  let bestMatch = { category: "general", score: 0 }

  // Find the best matching category based on keywords
  for (const [category, data] of Object.entries(farmingKnowledgeBase)) {
    const matchCount = data.keywords.filter((keyword) => messageLower.includes(keyword.toLowerCase())).length

    if (matchCount > bestMatch.score) {
      bestMatch = { category, score: matchCount }
    }
  }

  const selectedCategory = farmingKnowledgeBase[bestMatch.category]
  return selectedCategory.responses[language] || selectedCategory.responses.en || selectedCategory.responses.hi
}

export async function POST(request: NextRequest) {
  try {
    const { message, language = "en", history = [] } = await request.json()

    const response = findBestResponse(message, language)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in farming assistant API:", error)

    const errorMessages = {
      en: "I'm sorry, I'm having trouble processing your request right now. Please try asking your farming question again.",
      hi: "क्षमा करें, मुझे अभी आपके अनुरोध को संसाधित करने में समस्या हो रही है। कृपया अपना कृषि प्रश्न फिर से पूछें।",
      te: "క్షమించండి, నేను ఇప్పుడు మీ అభ్యర్థనను ప్రాసెస్ చేయడంలో ఇబ్బంది పడుతున్నాను। దయచేసి మీ వ్యవసాయ ప్రశ్నను మళ్లీ అడగండి।",
      ta: "மன்னிக்கவும், உங்கள் கோரிக்கையை இப்போது செயலாக்குவதில் எனக்கு சிக்கல் உள்ளது। தயவுசெய்து உங்கள் விவசாய கேள்வியை மீண்டும் கேளுங்கள்।",
      bn: "দুঃখিত, আমি এখন আপনার অনুরোধ প্রক্রিয়া করতে সমস্যায় পড়েছি। অনুগ্রহ করে আপনার কৃষি প্রশ্ন আবার জিজ্ঞাসা করুন।",
      gu: "માફ કરશો, મને અત્યારે તમારી વિનંતી પ્રક્રિયા કરવામાં મુશ્કેલી આવી રહી છે. કૃપા કરીને તમારો ખેતીનો પ્રશ્ન ફરીથી પૂછો।",
      mr: "माफ करा, मला आत्ता तुमची विनंती प्रक्रिया करण्यात अडचण येत आहे. कृपया तुमचा शेतीचा प्रश्न पुन्हा विचारा।",
      pa: "ਮਾਫ਼ ਕਰੋ, ਮੈਨੂੰ ਹੁਣ ਤੁਹਾਡੀ ਬੇਨਤੀ ਦੀ ਪ੍ਰਕਿਰਿਆ ਕਰਨ ਵਿੱਚ ਸਮੱਸਿਆ ਆ ਰਹੀ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਖੇਤੀ ਦਾ ਸਵਾਲ ਦੁਬਾਰਾ ਪੁੱਛੋ।",
    }

    let requestLanguage = "en"
    try {
      const requestBody = await request.json()
      requestLanguage = requestBody.language || "en"
    } catch {
      // If parsing fails, use default language
    }

    const errorMessage = errorMessages[requestLanguage as keyof typeof errorMessages] || errorMessages.en

    return NextResponse.json({ response: errorMessage })
  }
}
