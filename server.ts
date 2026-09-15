import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Medical fallback rule engine for instant offline/keyless symptom matching in both English and Bengali
function fallbackTriage(query: string, language: "bn" | "en") {
  const q = query.toLowerCase();
  const isBn = language === "bn";

  if (q.includes("chest") || q.includes("বুকে") || q.includes("হার্ট") || q.includes("heart") || q.includes("breath") || q.includes("শ্বাস")) {
    return {
      analysis: isBn
        ? "বুকে ব্যথা বা শ্বাসকষ্ট সম্ভাব্য হৃদরোগ বা ফুসফুসজনিত সমস্যার লক্ষণ হতে পারে। দ্রুত কার্ডিওলজিস্ট বা জরুরি বিভাগে যোগাযোগ করুন।"
        : "Chest discomfort or breathing difficulty may indicate cardiovascular or pulmonary issues requiring prompt evaluation.",
      triageLevel: "Urgent",
      recommendedSpecialties: isBn ? ["কার্ডিওলজি (হৃদরোগ)", "রেসপিরেটরি মেডিসিন"] : ["Cardiology", "Pulmonology"],
      recommendedTests: isBn ? ["ইসিজি (12-Lead ECG)", "ট্রোপোনিন-আই (Troponin-I)", "চেস্ট এক্স-রে"] : ["12-Lead ECG", "Troponin-I High Sensitivity", "Chest X-Ray Digital"],
      suggestedPackageId: "pkg-cardiac",
      immediateAdvice: isBn
        ? "শান্ত হয়ে বিশ্রাম নিন। অতিরিক্ত পরিশ্রম বা হাঁটাচলা করবেন না। তীব্র শ্বাসকষ্ট হলে অবিলম্বে আমাদের ২৪/৭ হটলাইন ১০৬৮৮ নম্বরে কল করুন।"
        : "Rest immediately in an upright position. Avoid physical exertion. If radiating pain or severe breathlessness occurs, call 10688.",
      warningSigns: isBn
        ? ["বাম বাহু বা চোয়ালে ছড়িয়ে পড়া ব্যথা", "অতিরিক্ত ঘাম", "মাথা ঘোরা"]
        : ["Pain radiating to left arm/jaw", "Profuse cold sweat", "Syncope or dizziness"],
    };
  }

  if (q.includes("fever") || q.includes("জ্বর") || q.includes("headache") || q.includes("মাথাব্যথা") || q.includes("শীত") || q.includes("cold") || q.includes("কাশি") || q.includes("cough")) {
    return {
      analysis: isBn
        ? "তীব্র জ্বর এবং মাথাব্যথা ভাইরাল ইনফেকশন, ডেঙ্গু, ইনফ্লুয়েঞ্জা বা টাইফয়েডের উপসর্গ হতে পারে।"
        : "High fever accompanied by headache or chills strongly points towards acute viral infection, seasonal influenza, or vector-borne illness (Dengue).",
      triageLevel: "Routine",
      recommendedSpecialties: isBn ? ["জেনারেল ও ফ্যামিলি মেডিসিন", "ইন্টারনাল মেডিসিন"] : ["Family Medicine", "Internal Medicine"],
      recommendedTests: isBn ? ["সিবিসি (CBC with Platelets)", "ডেঙ্গু এনএস১ অ্যান্টিজেন (Dengue NS1)", "ইউরিন রুটিন মাইক্রোস্কোপি"] : ["Complete Blood Count (CBC)", "Dengue NS1 Antigen", "Serum CRP"],
      suggestedPackageId: "pkg-fever",
      immediateAdvice: isBn
        ? "পর্যাপ্ত ওরাল রিহাইড্রেশন স্যালাইন ও পানি পান করুন। প্যারাসিটামল সেবন করতে পারেন এবং তাপমাত্রা মনিটর করুন।"
        : "Maintain adequate hydration with ORS and fresh fluids. Monitor temperature every 4 hours. Avoid NSAIDs without doctor advice.",
      warningSigns: isBn
        ? ["ক্রমাগত বমি ও পেটে ব্যথা", "শরীরে লালচে দাগ বা রক্তক্ষরণ", "অতিরিক্ত দুর্বলতা"]
        : ["Persistent vomiting or severe abdominal pain", "Petechiae/bleeding spots", "Extreme lethargy"],
    };
  }

  if (q.includes("stomach") || q.includes("পেট") || q.includes("বমি") || q.includes("vomit") || q.includes("gas") || q.includes("গ্যাস") || q.includes("acidity") || q.includes("ডায়রিয়া") || q.includes("diarrhea")) {
    return {
      analysis: isBn
        ? "পেটে ব্যথা, এসিডিটি বা গ্যাস্ট্রিকের উপসর্গ গ্যাস্ট্রাইটিস, পেপটিক আলসার বা পেটের সংক্রমণের নির্দেশ করতে পারে।"
        : "Abdominal distress, acid reflux, or digestive upset often relates to acute gastroenteritis, peptic ulcer disease, or functional dyspepsia.",
      triageLevel: "Routine",
      recommendedSpecialties: isBn ? ["গ্যাস্ট্রোএন্টারোলজি", "জেনারেল মেডিসিন"] : ["Gastroenterology", "Internal Medicine"],
      recommendedTests: isBn ? ["হোল অ্যাবডোমেন আল্ট্রাসনোগ্রাম", "এইচ. পাইলোরি অ্যান্টিবডি", "লিভার ফাংশন টেস্ট (LFT)"] : ["USG Whole Abdomen", "H. Pylori Serology", "Liver Function Test (LFT)"],
      suggestedPackageId: "pkg-executive",
      immediateAdvice: isBn
        ? "তেল-মশলাযুক্ত খাবার এড়িয়ে চলুন, সেলাইন ও সেদ্ধ হালকা খাবার খান। খালি পেটে চা বা কফি খাবেন না।"
        : "Follow a bland diet with oral rehydration salts. Refrain from spicy or oily foods. Take prescribed antacids if familiar.",
      warningSigns: isBn
        ? ["মলের সাথে রক্ত বা কালো মল", "তীব্র পেট শক্ত হয়ে যাওয়া", "পানি শূন্যতা"]
        : ["Black tarry stools or blood", "Abdominal rigidity with high fever", "Signs of severe dehydration"],
    };
  }

  if (q.includes("sugar") || q.includes("ডায়াবেটিস") || q.includes("diabetes") || q.includes("পিপাসা") || q.includes("urine") || q.includes("ঘন ঘন প্রস্রাব")) {
    return {
      analysis: isBn
        ? "ঘন ঘন তৃষ্ণা ও প্রস্রাব রক্তে গ্লুকোজের তারতম্য বা ডায়াবেটিসের প্রাথমিক লক্ষণ হতে পারে।"
        : "Symptoms of frequent urination and excessive thirst warrant comprehensive glycemic screening and endocrine assessment.",
      triageLevel: "Routine",
      recommendedSpecialties: isBn ? ["এন্ডোক্রাইনোলজি ও ডায়াবেটোলজি"] : ["Endocrinology & Diabetology"],
      recommendedTests: isBn ? ["এইচবিএ১সি (HbA1c)", "ফাস্টিং ব্লাড গ্লুকোজ", "লিপিড প্রোফাইল", "সিরাম ক্রিয়েটিনিন"] : ["HbA1c (3-Month Average)", "Fasting Blood Sugar", "Lipid Profile Fasting", "Serum Creatinine"],
      suggestedPackageId: "pkg-diabetic",
      immediateAdvice: isBn
        ? "অতিরিক্ত মিষ্টি ও প্রক্রিয়াজাত খাবার পরিহার করুন এবং সকালে খালি পেটে সুগার টেস্ট করান।"
        : "Refrain from refined sugar and processed carbohydrates. Schedule fasting blood glucose and HbA1c tests.",
      warningSigns: isBn
        ? ["হঠাৎ অতিরিক্ত ওজন হ্রাস", "দৃষ্টি ঘোলাটে হওয়া", "অজ্ঞান ভাব"]
        : ["Rapid unexplained weight loss", "Blurred vision", "Ketone breath odor or confusion"],
    };
  }

  // General default fallback
  return {
    analysis: isBn
      ? `আপনার উল্লেখিত লক্ষণ "${query}" বিশ্লেষণ করে দেখা হয়েছে। একজন অভিজ্ঞ ফ্যামিলি মেডিসিন চিকিৎসকের সাথে পরামর্শ করা সর্বোত্তম।`
      : `Based on your stated symptom "${query}", a comprehensive clinical evaluation by a Family Physician or General Internist is recommended.`,
    triageLevel: "Routine",
    recommendedSpecialties: isBn ? ["ফ্যামিলি মেডিসিন কনসালট্যান্ট", "জেনারেল মেডিসিন"] : ["Family Medicine", "Internal Medicine"],
    recommendedTests: isBn ? ["কমপ্লিট হেলথ চেকআপ স্ক্রিনিং", "সিবিসি", "রক্তের শর্করা ও কিডনি প্রোফাইল"] : ["Complete Health Profile", "CBC with ESR", "Comprehensive Metabolic Panel"],
    suggestedPackageId: "pkg-executive",
    immediateAdvice: isBn
      ? "পর্যাপ্ত বিশ্রাম নিন, পুষ্টিকর খাবার গ্রহণ করুন এবং লক্ষণের মাত্রা বৃদ্ধি পেলে চিকিৎসকের পরামর্শ নিন।"
      : "Rest adequately, hydrate, and book a consultation with our verified doctors for exact clinical diagnosis.",
    warningSigns: isBn
      ? ["শ্বাসকষ্ট বা তীব্র অস্থিরতা", "অজ্ঞান হওয়া", "তীব্র অসহ্য ব্যথা"]
      : ["Sudden intense pain", "Loss of consciousness", "Uncontrolled high fever"],
  };
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Dhaka New Hospital Core API", time: new Date().toISOString() });
});

// AI Symptom Triage Endpoint
app.post("/api/symptom-triage", async (req, res) => {
  const { symptomText, language = "en" } = req.body;
  if (!symptomText || typeof symptomText !== "string") {
    res.status(400).json({ error: "symptomText string is required" });
    return;
  }

  const ai = getGeminiClient();
  if (!ai) {
    // If API key is not yet set in environment, return the robust clinical triage rule engine
    const fallback = fallbackTriage(symptomText, language === "bn" ? "bn" : "en");
    res.json({ ...fallback, source: "clinical-engine" });
    return;
  }

  try {
    const isBn = language === "bn";
    const prompt = `You are an expert clinical triage AI assistant for "Dhaka New Hospital", a premier multi-specialty hospital and modern healthcare network in Dhaka.
Analyze the patient's symptoms: "${symptomText}".
Respond in ${isBn ? "Bengali (বাংলা)" : "English"}.
Categorize the triageLevel into: 'Routine', 'Urgent', or 'Emergency'.
Provide clinical summary, recommended medical specialties, recommended lab diagnostic tests, an appropriate health screening package ID (one of: 'pkg-executive', 'pkg-cardiac', 'pkg-diabetic', 'pkg-senior', 'pkg-women', 'pkg-fever'), immediate safe advice, and red flag warning signs.`;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Gemini request timeout")), 4000)
    );

    const generatePromise = ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING, description: "Detailed clinical summary of potential causes and next steps." },
            triageLevel: { type: Type.STRING, description: "Routine, Urgent, or Emergency" },
            recommendedSpecialties: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Specialist doctors to consult (e.g. Cardiologist, Neurologist, Family Medicine)",
            },
            recommendedTests: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Accredited lab or radiology diagnostic tests recommended",
            },
            suggestedPackageId: { type: Type.STRING, description: "Health checkup package ID" },
            immediateAdvice: { type: Type.STRING, description: "Immediate supportive home care and hydration guidance" },
            warningSigns: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Red flag indicators requiring immediate hospital emergency visit",
            },
          },
          required: ["analysis", "triageLevel", "recommendedSpecialties", "recommendedTests", "suggestedPackageId", "immediateAdvice", "warningSigns"],
        },
      },
    });

    const response = (await Promise.race([generatePromise, timeoutPromise])) as any;

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, source: "gemini-ai" });
  } catch (err: any) {
    console.error("Gemini triage error, using clinical fallback engine:", err?.message || err);
    const fallback = fallbackTriage(symptomText, language === "bn" ? "bn" : "en");
    res.json({ ...fallback, source: "clinical-engine-fallback" });
  }
});

// Diagnostic sample tracker endpoint
app.get("/api/track-sample/:sampleId", (req, res) => {
  const { sampleId } = req.params;
  const idUpper = (sampleId || "").trim().toUpperCase();

  // Return realistic live tracking data
  const sampleDatabase: Record<string, any> = {
    "PRV-88219": {
      sampleId: "PRV-88219",
      patientName: "Shafin Ahmed",
      ageGender: "38 Y / Male",
      collectionDate: "Today, 08:30 AM",
      collectionMode: "Doorstep Home Phlebotomy (Banani Hub)",
      tests: [
        { name: "Complete Blood Count (CBC) with ESR", department: "Hematology", status: "Completed", normal: true },
        { name: "HbA1c Glycated Hemoglobin", department: "Biochemistry", status: "Completed", normal: true },
        { name: "Lipid Profile (Fasting)", department: "Clinical Biochemistry", status: "Completed", normal: false },
        { name: "Serum Creatinine with eGFR", department: "Renal Function", status: "Completed", normal: true },
      ],
      currentStep: 4, // 1: Sample Collected, 2: Lab Processing, 3: Doctor Verification, 4: Ready for Download
      timeline: [
        { step: 1, title: "Sample Collected", time: "Today 08:30 AM", detail: "Phlebotomist Kamrul Hasan barcoded blood samples." },
        { step: 2, title: "Received at CAP Central Lab", time: "Today 10:15 AM", detail: "Cold-chain verified. Analyzers Beckman Coulter DxH & Roche Cobas." },
        { step: 3, title: "Verified by Consultant Pathologist", time: "Today 01:45 PM", detail: "Dr. Farzana Kabir, MD Pathologist digitally signed results." },
        { step: 4, title: "Report Published", time: "Today 02:10 PM", detail: "Digitally signed with QR code authentication." },
      ],
      doctorNote: "Mild elevation in LDL cholesterol (142 mg/dL). HbA1c is within optimal range (5.4%). Follow up with Family Physician.",
      downloadAvailable: true,
      reportUrl: "#download",
    },
    "PRV-99402": {
      sampleId: "PRV-99402",
      patientName: "Tasnim Rahman",
      ageGender: "29 Y / Female",
      collectionDate: "Today, 11:15 AM",
      collectionMode: "In-Clinic (Dhanmondi Center)",
      tests: [
        { name: "Dengue NS1 Antigen & IgM/IgG", department: "Serology", status: "In Progress", normal: null },
        { name: "Platelet Count (STAT)", department: "Hematology", status: "In Progress", normal: null },
      ],
      currentStep: 2,
      timeline: [
        { step: 1, title: "Sample Collected", time: "Today 11:15 AM", detail: "Blood drawn at Dhanmondi Diagnostic Lab." },
        { step: 2, title: "Processing in Lab", time: "Today 11:45 AM", detail: "Automated chemiluminescence analyzer run in progress." },
        { step: 3, title: "Doctor Verification", time: "Pending", detail: "Awaiting final review by Senior Microbiologist." },
        { step: 4, title: "Report Ready", time: "Estimated 03:30 PM", detail: "SMS notification will be sent." },
      ],
      doctorNote: "Analysis is running with STAT emergency priority.",
      downloadAvailable: false,
    },
  };

  const sample = sampleDatabase[idUpper] || {
    sampleId: idUpper,
    patientName: "Verified Patient",
    ageGender: "Adult Patient",
    collectionDate: "Recent Collection",
    collectionMode: "Dhaka New Hospital Care Network",
    tests: [
      { name: "Comprehensive Health Panel", department: "Multi-Disciplinary", status: "Processing in Lab", normal: true },
      { name: "Automated Biochemistry Profile", department: "Diagnostics", status: "Processing in Lab", normal: true },
    ],
    currentStep: 2,
    timeline: [
      { step: 1, title: "Sample Collected", time: "Completed", detail: "Sterile barcoded collection verified." },
      { step: 2, title: "Processing in Lab", time: "Active", detail: "Undergoing automated analyzer testing." },
      { step: 3, title: "Doctor Verification", time: "Next", detail: "Consultant pathologist quality audit." },
      { step: 4, title: "Report Ready", time: "Within 4 Hours", detail: "Digital PDF & SMS alert." },
    ],
    doctorNote: "Your sample is being processed following CAP and ISO 15189 laboratory quality standards.",
    downloadAvailable: false,
  };

  res.json(sample);
});

// Vite middleware in development vs static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dhaka New Hospital server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
