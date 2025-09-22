// Advanced AI Medical Consultation System - Improved Intelligence Engine
class MedicalConsultationAI {
    constructor() {
        this.currentLanguage = 'en';
        this.currentStep = 'language';
        this.consultationData = {
            language: null,
            patientName: '',
            age: null,
            ageGroup: null,
            medicalConditions: [],
            currentMedications: '',
            familyHistory: '',
            primaryComplaint: '',
            symptomDuration: '',
            painLevel: 5,
            associatedSymptoms: [],
            recentChanges: ''
        };
        
        this.medicalDatabase = {
            symptomDiseaseMatrix: [
                {
                    symptom: "chest_pain",
                    severity: "high",
                    conditions: ["diabetes", "hypertension"],
                    probability: 85,
                    disease: "Acute Coronary Syndrome",
                    tests: ["ECG", "Cardiac Enzymes", "Echo", "Chest X-ray"],
                    urgency: "emergency"
                },
                {
                    symptom: "chest_pain",
                    severity: "moderate",
                    conditions: [],
                    probability: 30,
                    disease: "Muscular Pain",
                    tests: ["ECG", "Basic Blood Work"],
                    urgency: "routine"
                },
                {
                    symptom: "severe_headache",
                    severity: "high",
                    conditions: ["hypertension"],
                    probability: 78,
                    disease: "Hypertensive Crisis",
                    tests: ["BP Monitoring", "CT Brain", "Eye Exam", "Kidney Function"],
                    urgency: "urgent"
                },
                {
                    symptom: "frequent_urination",
                    severity: "moderate",
                    conditions: ["diabetes"],
                    probability: 70,
                    disease: "Poor Diabetic Control",
                    tests: ["HbA1c", "Fasting Glucose", "Kidney Function", "Urine Analysis"],
                    urgency: "routine"
                },
                {
                    symptom: "shortness_breath",
                    severity: "high",
                    conditions: ["heart_disease"],
                    probability: 80,
                    disease: "Heart Failure",
                    tests: ["Echo", "BNP", "Chest X-ray", "ECG"],
                    urgency: "urgent"
                }
            ],
            
            ageRiskFactors: [
                {
                    ageGroup: "18-30",
                    highRiskConditions: ["Mental Health", "Accidents", "Infectious Diseases"],
                    cardiacRisk: "low",
                    diabetesRisk: "low"
                },
                {
                    ageGroup: "31-50", 
                    highRiskConditions: ["Hypertension", "Diabetes", "Stress-related"],
                    cardiacRisk: "moderate",
                    diabetesRisk: "moderate"
                },
                {
                    ageGroup: "51-70",
                    highRiskConditions: ["Heart Disease", "Stroke", "Cancer"],
                    cardiacRisk: "high", 
                    diabetesRisk: "high"
                },
                {
                    ageGroup: "70+",
                    highRiskConditions: ["Multiple Chronic Conditions", "Falls", "Cognitive Issues"],
                    cardiacRisk: "very_high",
                    diabetesRisk: "high"
                }
            ],
            
            conditions: [
                { 
                    name: "Diabetes Type 1", 
                    hindi_name: "मधुमेह टाइप 1", 
                    category: "Endocrine", 
                    riskLevel: "high",
                    complications: ["Heart disease", "Kidney damage", "Eye problems", "Nerve damage"] 
                },
                { 
                    name: "Diabetes Type 2", 
                    hindi_name: "मधुमेह टाइप 2", 
                    category: "Endocrine", 
                    riskLevel: "high",
                    complications: ["Heart disease", "Stroke", "Kidney disease", "Eye problems"] 
                },
                { 
                    name: "Hypertension", 
                    hindi_name: "उच्च रक्तचाप", 
                    category: "Cardiovascular", 
                    riskLevel: "high",
                    complications: ["Heart attack", "Stroke", "Kidney failure", "Eye damage"] 
                },
                { 
                    name: "Heart Disease", 
                    hindi_name: "हृदय रोग", 
                    category: "Cardiovascular", 
                    riskLevel: "high",
                    complications: ["Heart attack", "Heart failure", "Arrhythmia", "Sudden death"] 
                },
                { 
                    name: "Asthma", 
                    hindi_name: "दमा", 
                    category: "Respiratory", 
                    riskLevel: "medium",
                    complications: ["Breathing difficulties", "Respiratory failure", "Reduced quality of life"] 
                },
                { 
                    name: "Kidney Disease", 
                    hindi_name: "गुर्दे की बीमारी", 
                    category: "Renal", 
                    riskLevel: "high",
                    complications: ["Kidney failure", "Dialysis requirement", "High blood pressure"] 
                },
                { 
                    name: "Arthritis", 
                    hindi_name: "गठिया", 
                    category: "Musculoskeletal", 
                    riskLevel: "medium",
                    complications: ["Joint damage", "Disability", "Chronic pain"] 
                },
                { 
                    name: "High Cholesterol", 
                    hindi_name: "उच्च कोलेस्ट्रॉल", 
                    category: "Metabolic", 
                    riskLevel: "medium",
                    complications: ["Heart disease", "Stroke", "Peripheral artery disease"] 
                },
                { 
                    name: "Thyroid Disorders", 
                    hindi_name: "थायराइड विकार", 
                    category: "Endocrine", 
                    riskLevel: "medium",
                    complications: ["Heart problems", "Bone loss", "Mental health issues"] 
                },
                { 
                    name: "COPD", 
                    hindi_name: "फेफड़ों की बीमारी", 
                    category: "Respiratory", 
                    riskLevel: "high",
                    complications: ["Breathing difficulties", "Lung infections", "Heart problems"] 
                }
            ],
            
            diagnosticTests: [
                {
                    category: "cardiac",
                    symptoms: ["chest_pain", "shortness_breath", "palpitations"],
                    tests: [
                        { name: "ECG", cost: "₹150-300", urgency: "immediate", purpose: "Heart rhythm and electrical activity" },
                        { name: "Echo", cost: "₹1500-3000", urgency: "within_24h", purpose: "Heart structure and function" },
                        { name: "Stress Test", cost: "₹3000-5000", urgency: "routine", purpose: "Heart function under stress" },
                        { name: "Cardiac Enzymes", cost: "₹800-1500", urgency: "immediate", purpose: "Heart muscle damage markers" }
                    ]
                },
                {
                    category: "diabetic", 
                    symptoms: ["frequent_urination", "excessive_thirst", "blurred_vision"],
                    tests: [
                        { name: "Fasting Glucose", cost: "₹50-100", urgency: "routine", purpose: "Blood sugar levels" },
                        { name: "HbA1c", cost: "₹400-600", urgency: "routine", purpose: "3-month average blood sugar" },
                        { name: "Kidney Function", cost: "₹500-800", urgency: "routine", purpose: "Diabetic kidney complications" },
                        { name: "Eye Exam", cost: "₹300-800", urgency: "within_week", purpose: "Diabetic eye complications" }
                    ]
                },
                {
                    category: "respiratory",
                    symptoms: ["cough", "shortness_breath", "chest_pain"], 
                    tests: [
                        { name: "Chest X-ray", cost: "₹200-500", urgency: "routine", purpose: "Lung structure and infections" },
                        { name: "Pulmonary Function", cost: "₹800-1200", urgency: "routine", purpose: "Lung capacity and function" },
                        { name: "Sputum Test", cost: "₹200-400", urgency: "routine", purpose: "Lung infection analysis" }
                    ]
                },
                {
                    category: "neurological",
                    symptoms: ["headache", "dizziness", "confusion"],
                    tests: [
                        { name: "CT Brain", cost: "₹3000-6000", urgency: "urgent", purpose: "Brain structure and bleeding" },
                        { name: "MRI Brain", cost: "₹8000-15000", urgency: "routine", purpose: "Detailed brain imaging" },
                        { name: "EEG", cost: "₹1500-2500", urgency: "routine", purpose: "Brain electrical activity" }
                    ]
                }
            ],
            
            emergencyProtocols: [
                {
                    symptoms: ["severe_chest_pain", "shortness_breath", "sweating"],
                    conditions: ["diabetes", "heart_disease"],
                    action: "Call 108 immediately - Possible Heart Attack",
                    tests: ["ECG", "Cardiac Enzymes", "Chest X-ray"]
                },
                {
                    symptoms: ["severe_headache", "vision_changes", "confusion"],
                    conditions: ["hypertension"],
                    action: "Go to ER immediately - Possible Stroke",
                    tests: ["CT Brain", "BP Monitoring", "Blood Sugar"]
                }
            ]
        };
        
        // Common symptoms for selection
        this.commonSymptoms = [
            { name: "Chest pain", hindi: "छाती में दर्द" },
            { name: "Shortness of breath", hindi: "सांस लेने में तकलीफ" },
            { name: "Severe headache", hindi: "तेज सिरदर्द" },
            { name: "Frequent urination", hindi: "बार-बार पेशाब आना" },
            { name: "Excessive thirst", hindi: "अत्यधिक प्यास" },
            { name: "Blurred vision", hindi: "धुंधली दृष्टि" },
            { name: "Fatigue", hindi: "थकान" },
            { name: "Dizziness", hindi: "चक्कर आना" },
            { name: "Nausea", hindi: "जी मिचलाना" },
            { name: "Cough", hindi: "खांसी" },
            { name: "Fever", hindi: "बुखार" },
            { name: "Abdominal pain", hindi: "पेट दर्द" },
            { name: "Joint pain", hindi: "जोड़ों में दर्द" },
            { name: "Skin rash", hindi: "त्वचा पर लाल चकत्ते" },
            { name: "Sleep problems", hindi: "नींद की समस्या" }
        ];
        
        // Translations
        this.translations = {
            en: {
                welcome_title: "Jan Mitra — Your Health Companion",
                welcome_message: "Hi — I'm Jan Mitra. Tell me your symptoms and a bit about your health, and I’ll give simple, practical advice and next steps tailored to you.",
                consultation_process: "Our Intelligent Analysis Process:",
                step_age: "Age-Specific Risk Analysis",
                step_history: "Medical History Intelligence", 
                step_symptoms: "Symptom Pattern Recognition",
                step_analysis: "Personalized Medical Intelligence",
                start_consultation: "Start Intelligent Health Analysis",
                age_title: "Age-Specific Risk Profile",
                age_subtitle: "Age determines disease risk patterns - essential for accurate diagnosis",
                your_age: "Your Age:",
                enter_age: "Enter your age",
                years: "years",
                continue: "Continue",
                back: "Back",
                history_title: "Chronic Disease Intelligence",
                history_subtitle: "Medical history affects symptom interpretation and test recommendations",
                existing_conditions: "Existing Medical Conditions:",
                current_medications: "Current Medications:",
                medications_placeholder: "List any medications you're currently taking...",
                family_history: "Family History (Genetic Risk Factors):",
                family_history_placeholder: "Family history of heart disease, diabetes, cancer...",
                symptoms_title: "Symptom Pattern Analysis",
                symptoms_subtitle: "Detailed symptom analysis for accurate medical intelligence",
                primary_complaint: "Describe your main symptom in detail:",
                primary_complaint_placeholder: "Be specific: location, quality, timing, triggers, what makes it better/worse...",
                symptom_duration: "Duration (affects urgency assessment):",
                select_duration: "Select duration",
                few_hours: "A few hours",
                "1_2_days": "1-2 days",
                "3_7_days": "3-7 days",
                "1_2_weeks": "1-2 weeks",
                more_2_weeks: "More than 2 weeks",
                chronic: "Chronic (ongoing)",
                pain_severity: "Severity Level (affects risk calculation):",
                mild: "Mild (1-3)",
                moderate: "Moderate (4-7)", 
                severe: "Severe (8-10)",
                associated_symptoms: "Associated Symptoms (for pattern recognition):",
                recent_changes: "Recent Changes or Triggers:",
                recent_changes_placeholder: "New medications, stress, travel, diet changes, activities...",
                get_analysis: "Get Intelligent Analysis",
                analysis_title: "Personalized Medical Intelligence Report",
                risk_assessment: "Intelligent Risk Assessment",
                possible_conditions: "Personalized Condition Analysis",
                testing_recommendations: "Targeted Test Recommendations",
                treatment_plan: "Personalized Care Plan",
                specialist_recommendations: "Specialist Recommendations",
                followup_plan: "Follow-up Protocol",
                emergency_warning: "URGENT MEDICAL ATTENTION",
                print_results: "Print Report",
                new_consultation: "New Consultation",
                find_hospitals: "Find Hospitals",
                analyzing_data: "Analyzing Your Medical Data...",
                please_wait: "Advanced AI processing your unique profile",
                processing_symptoms: "Correlating symptom patterns...",
                analyzing_conditions: "Cross-referencing medical history...",
                generating_recommendations: "Calculating personalized recommendations...",
                emergency_detected: "CRITICAL SYMPTOMS DETECTED",
                emergency_message: "Based on your symptom pattern and medical history, you may need immediate medical attention.",
                call_emergency: "Call 108 (Emergency)",
                continue_assessment: "Continue Analysis",
                /* Print & summary labels */
                print_title: "Personalized Medical Intelligence Report",
                print_generated: "Generated",
                print_patient: "Patient",
                print_provider: "Provided by",
                unnamed_patient: "Unnamed Patient",
                summary_patient_label: "Patient:",
                summary_risk_label: "Risk Classification:",
                summary_severity_label: "Symptom Severity:",
                summary_confidence_label: "Analysis Confidence:",
                age_specific_considerations: "Age-Specific Considerations:",
                personalized_assessment: "Personalized Assessment:",
                risk_factor_analysis: "Risk Factor Analysis:"
            },
            hi: {
                welcome_title: "जन मित्र — आपका स्वास्थ्य साथी",
                welcome_message: "नमस्ते — मैं जन मित्र हूँ। अपनी लक्षण और थोड़ी जानकारी बताइए, मैं सरल और व्यावहारिक सुझाव और अगले कदम दूँगा जो आपके लिए उपयुक्त हों।",
                consultation_process: "हमारी बुद्धिमान विश्लेषण प्रक्रिया:",
                step_age: "आयु-विशिष्ट जोखिम विश्लेषण",
                step_history: "मेडिकल हिस्ट्री इंटेलिजेंस",
                step_symptoms: "लक्षण पैटर्न पहचान",
                step_analysis: "व्यक्तिगत मेडिकल इंटेलिजेंस",
                start_consultation: "बुद्धिमान स्वास्थ्य विश्लेषण शुरू करें",
                age_title: "आयु-विशिष्ट जोखिम प्रोफाइल",
                age_subtitle: "उम्र रोग जोखिम पैटर्न निर्धारित करती है - सटीक निदान के लिए आवश्यक",
                your_age: "आपकी उम्र:",
                enter_age: "अपनी उम्र दर्ज करें",
                years: "वर्ष",
                continue: "जारी रखें",
                back: "वापस",
                history_title: "पुरानी बीमारी इंटेलिजेंस",
                history_subtitle: "मेडिकल हिस्ट्री लक्षण व्याख्या और परीक्षण सिफारिशों को प्रभावित करती है",
                existing_conditions: "मौजूदा मेडिकल स्थितियां:",
                current_medications: "वर्तमान दवाइयां:",
                medications_placeholder: "वर्तमान में ली जा रही दवाइयों की सूची बनाएं...",
                family_history: "पारिवारिक इतिहास (आनुवंशिक जोखिम कारक):",
                family_history_placeholder: "हृदय रोग, मधुमेह, कैंसर का पारिवारिक इतिहास...",
                symptoms_title: "लक्षण पैटर्न विश्लेषण",
                symptoms_subtitle: "सटीक मेडिकल इंटेलिजेंस के लिए विस्तृत लक्षण विश्लेषण",
                primary_complaint: "अपने मुख्य लक्षण का विस्तार से वर्णन करें:",
                primary_complaint_placeholder: "स्पष्ट रूप से बताएं: स्थान, गुणवत्ता, समय, ट्रिगर, क्या बेहतर/बदतर बनाता है...",
                symptom_duration: "अवधि (तात्कालिकता मूल्यांकन को प्रभावित करती है):",
                select_duration: "अवधि चुनें",
                few_hours: "कुछ घंटे",
                "1_2_days": "1-2 दिन",
                "3_7_days": "3-7 दिन",
                "1_2_weeks": "1-2 सप्ताह",
                more_2_weeks: "2 सप्ताह से अधिक",
                chronic: "पुरानी (चल रही)",
                pain_severity: "गंभीरता स्तर (जोखिम गणना को प्रभावित करती है):",
                mild: "हल्का (1-3)",
                moderate: "मध्यम (4-7)",
                severe: "गंभीर (8-10)",
                associated_symptoms: "संबंधित लक्षण (पैटर्न पहचान के लिए):",
                recent_changes: "हाल के बदलाव या ट्रिगर:",
                recent_changes_placeholder: "नई दवाएं, तनाव, यात्रा, आहार परिवर्तन, गतिविधियां...",
                get_analysis: "बुद्धिमान विश्लेषण प्राप्त करें",
                analysis_title: "व्यक्तिगत मेडिकल इंटेलिजेंस रिपोर्ट",
                risk_assessment: "बुद्धिमान जोखिम मूल्यांकन",
                possible_conditions: "व्यक्तिगत स्थिति विश्लेषण",
                testing_recommendations: "लक्षित परीक्षण सिफारिशें",
                treatment_plan: "व्यक्तिगत देखभाल योजना",
                specialist_recommendations: "विशेषज्ञ सिफारिशें",
                followup_plan: "फॉलो-अप प्रोटोकॉल",
                emergency_warning: "तत्काल चिकित्सा ध्यान",
                print_results: "रिपोर्ट प्रिंट करें",
                new_consultation: "नया परामर्श",
                find_hospitals: "अस्पताल खोजें",
                analyzing_data: "आपके मेडिकल डेटा का विश्लेषण कर रहे हैं...",
                please_wait: "उन्नत एआई आपकी अनूठी प्रोफाइल को प्रोसेस कर रहा है",
                processing_symptoms: "लक्षण पैटर्न का सहसंबंध...",
                analyzing_conditions: "मेडिकल हिस्ट्री का क्रॉस-रेफरेंसिंग...",
                generating_recommendations: "व्यक्तिगत सिफारिशें गणना कर रहे हैं...",
                emergency_detected: "महत्वपूर्ण लक्षण पाए गए",
                emergency_message: "आपके लक्षण पैटर्न और मेडिकल हिस्ट्री के आधार पर आपको तत्काल चिकित्सा सहायता की आवश्यकता हो सकती है।",
                call_emergency: "108 पर कॉल करें (आपातकाल)",
                continue_assessment: "विश्लेषण जारी रखें",
                /* Print & summary labels - Hindi */
                print_title: "व्यक्तिगत चिकित्सा बुद्धिमत्ता रिपोर्ट",
                print_generated: "निर्मित:",
                print_patient: "रोगी",
                print_provider: "प्रदाता:",
                unnamed_patient: "नाम नहीं",
                summary_patient_label: "रोगी:",
                summary_risk_label: "जोखिम वर्गीकरण:",
                summary_severity_label: "लक्षण गंभीरता:",
                summary_confidence_label: "विश्लेषण विश्वसनीयता:",
                age_specific_considerations: "आयु-विशिष्ट विचार:",
                personalized_assessment: "व्यक्तिगत मूल्यांकन:",
                risk_factor_analysis: "जोखिम कारक विश्लेषण:"
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showStep('language');
        // Render project spec and discrepancy check into UI
        try {
            this.renderProjectSpec();
        } catch (err) {
            console.warn('ProjectSpec render failed', err);
        }
    }

    // Translation helper: returns translated string for current language or default
    translate(key, defaultText) {
        try {
            const lang = this.currentLanguage || 'en';
            if (this.translations && this.translations[lang] && this.translations[lang][key]) return this.translations[lang][key];
        } catch (e) {}
        return defaultText || key;
    }

    // The canonical project specification derived from the user's request
    get PROJECT_SPEC() {
        return {
            title: 'Multilingual AI-driven Public Health Chatbot for Disease Awareness',
            channels: ['whatsapp', 'sms'],
            languages: ['en', 'hi'], // initial pilot languages (expandable)
            features: [
                'Preventive healthcare guidance',
                'Disease symptoms education',
                'Vaccination schedules (gov data)',
                'Geo-targeted outbreak alerts',
                'Human-in-the-loop escalation for low-confidence queries'
            ],
            privacy: 'minimal personal data (phone, region), consent required, encrypted transport and storage',
            goals: {
                nlu_accuracy: '>=80% (intent + factual correctness combined)',
                awareness_uplift: '>=20% (measured via pre/post surveys)'
            },
            constraints: [
                'WhatsApp provisioning and messaging costs',
                'Government data access may require MoU or CSV/ETL',
                'Native select styling varies by browser (UI limitation)'
            ]
        };
    }

    // Render a project information card and highlight discrepancies with current implementation
    renderProjectSpec() {
        const container = document.getElementById('projectSpec');
        if (!container) return;
        const spec = this.PROJECT_SPEC;

        const implemented = {
            channels: ['whatsapp', 'sms'].filter(c => ['whatsapp', 'sms'].includes(c)),
            languages: ['en', 'hi'],
            features: [
                'Preventive healthcare guidance',
                'Disease symptoms education',
                'Vaccination schedules (gov data)'
            ]
        };

        // Detect discrepancies
        const discrepancies = [];
        // Channels: in-browser app doesn't implement external channels yet
        if (!implemented.channels.includes('whatsapp') || !implemented.channels.includes('sms')) {
            discrepancies.push('Channel adapters (WhatsApp/SMS) not implemented — back-end connectors required');
        }
        // Languages
        const missingLangs = spec.languages.filter(l => !implemented.languages.includes(l));
        if (missingLangs.length > 0) {
            discrepancies.push(`Languages missing: ${missingLangs.join(', ')}`);
        }
        // Features
        spec.features.forEach(feature => {
            if (!implemented.features.includes(feature)) {
                discrepancies.push(`Feature not implemented in this UI: ${feature}`);
            }
        });

        // Goals / measurement
        if (!this.runDiagnosticSimulations) {
            discrepancies.push('Automated measurement and evaluation harness not present');
        }

        // Compose HTML
        const body = container.querySelector('.project-spec-body');
        if (!body) return;

        let html = `<p><strong>Goal:</strong> ${spec.title}</p>`;
        html += `<p><strong>Primary channels:</strong> ${spec.channels.join(', ')}</p>`;
        html += `<p><strong>Pilot languages:</strong> ${spec.languages.join(', ')}</p>`;
        html += `<p><strong>Key features (requested):</strong> ${spec.features.join('; ')}</p>`;
        html += `<p><strong>Privacy:</strong> ${spec.privacy}</p>`;
        html += `<p><strong>Targets:</strong> NLU accuracy ${spec.goals.nlu_accuracy}, Awareness uplift ${spec.goals.awareness_uplift}</p>`;

        if (discrepancies.length === 0) {
            html += `<div style="margin-top:8px; padding:8px; background-color: rgba(16,128,96,0.06); border-radius:6px;">No discrepancies detected between the problem statement and the current implementation (UI-level check).</div>`;
        } else {
            html += `<div style="margin-top:8px; padding:8px; background-color: rgba(200,40,40,0.06); border-radius:6px;"><strong>Discrepancies found:</strong><ul>`;
            discrepancies.forEach(d => html += `<li>${d}</li>`);
            html += `</ul></div>`;
        }

        body.innerHTML = html;
        console.log('Project specification rendered. Discrepancies:', discrepancies);
    }

    setupEventListeners() {
        const newDocument = document.cloneNode ? document : window.document;
        newDocument.addEventListener('click', (e) => {
            this.handleAllClicks(e);
        });
        newDocument.addEventListener('input', (e) => {
            this.handleAllInputs(e);
        });
        newDocument.addEventListener('change', (e) => {
            // Intercept language dropdown change
            if (e.target && e.target.id === 'languageSelect') {
                const val = e.target.value;
                if (!val) return;
                if (val === 'en' || val === 'hi') {
                    this.selectLanguage(val);
                } else if (val === 'other') {
                    alert(this.currentLanguage === 'hi' ? 'अन्य भाषाओं के लिए जल्द ही समर्थन उपलब्ध होगा' : 'Support for other languages is coming soon');
                } else {
                    // For other listed scripts, show coming soon but keep selection visual
                    alert(this.currentLanguage === 'hi' ? 'यह भाषा जल्द ही उपलब्ध होगी' : 'This language will be available soon');
                }
                return;
            }
            this.handleAllChanges(e);
        });
    }

    handleAllClicks(e) {
        // Language selection
        if (e.target.matches('.language-btn:not(.coming-soon)') || e.target.closest('.language-btn:not(.coming-soon)')) {
            e.preventDefault();
            const btn = e.target.matches('.language-btn') ? e.target : e.target.closest('.language-btn');
            const lang = btn?.dataset?.lang;
            if (lang) {
                this.selectLanguage(lang);
            }
            return;
        }

        let clickedWithId = null;
        try {
            clickedWithId = e.target && e.target.matches && e.target.matches('[id]') ? e.target : (e.target.closest ? e.target.closest('[id]') : null);
        } catch (err) {
            clickedWithId = e.target && e.target.id ? e.target : null;
        }
        const targetId = clickedWithId ? clickedWithId.id : (e.target && e.target.id ? e.target.id : '');
        console.log('Button clicked (resolved):', targetId); // Debug log

        switch(targetId) {
            case 'startConsultationBtn':
                console.log('Starting consultation...'); // Debug log
                this.showStep('age');
                break;
            case 'otherLanguageBtn':
                // Focus the language dropdown to show other languages
                const select = document.getElementById('languageSelect');
                if (select) select.focus();
                break;
            case 'backFromWelcome':
                // Go back to language selection
                this.showStep('language');
                break;
            case 'continueFromAge':
                this.continueFromAge();
                break;
            case 'continueFromHistory':
                this.continueFromHistory();
                break;
            case 'backFromHistory':
                this.showStep('age');
                break;
            case 'continueFromSymptoms':
                console.log('Continue from symptoms clicked'); // Debug log
                this.continueFromSymptoms();
                break;
            case 'backFromSymptoms':
                this.showStep('history');
                break;
            case 'printResults':
                this.printFullReport();
                break;
            case 'restartConsultation':
                this.restart();
                break;
            case 'findNearbyHospitals':
                this.findHospitals();
                break;
            case 'backFromResults':
                // Return to symptoms for edits
                this.showStep('symptoms');
                break;
            case 'continueAnyway':
                this.closeEmergencyModal();
                break;
        }

        // Age range selection (support clicks on inner elements inside the button)
        const ageBtn = e.target.matches('.age-range-btn') ? e.target : (e.target.closest ? e.target.closest('.age-range-btn') : null);
        if (ageBtn) {
            document.querySelectorAll('.age-range-btn').forEach(btn => btn.classList.remove('selected'));
            ageBtn.classList.add('selected');
            const ageGroup = ageBtn.dataset.age;
            if (ageGroup) {
                this.setAgeFromRange(ageGroup);
                const ageInput = document.getElementById('ageInput');
                if (ageInput) ageInput.value = this.consultationData.age || '';
            }
        }

        if (e.target.id === 'analyzeReport' || (e.target.closest && e.target.closest('#analyzeReport'))) {
            this.handleAnalyzeReport();
        }

        if (e.target.id === 'clearReport' || (e.target.closest && e.target.closest('#clearReport'))) {
            const txt = document.getElementById('doctorReportText');
            const file = document.getElementById('doctorReportFile');
            if (txt) txt.value = '';
            if (file) file.value = '';
        }

        if (e.target.id === 'startVoiceBtn') {
            this.startVoiceCapture();
        }

        if (e.target.id === 'stopVoiceBtn') {
            this.stopVoiceCapture();
        }

        if (e.target.id === 'backFromDoctorReport') {
            this.showStep('age');
        }

        if (e.target.id === 'continueFromDoctorReport') {
            const transcript = document.getElementById('voiceTranscript');
            const pasted = document.getElementById('doctorReportText');
            if (transcript && transcript.value && !this.consultationData.primaryComplaint) {
                this.consultationData.primaryComplaint = transcript.value.trim();
            }
            if (pasted && pasted.value && !this.consultationData.primaryComplaint) {
                this.consultationData.primaryComplaint = pasted.value.trim().split('\n')[0] || pasted.value.trim();
            }
            this.showStep('history');
        }

        // Condition selection
        if (e.target.matches('.condition-item') || e.target.closest('.condition-item')) {
            const item = e.target.matches('.condition-item') ? e.target : e.target.closest('.condition-item');
            this.toggleCondition(item);
        }
    }

    handleAllInputs(e) {
        if (e.target.id === 'ageInput') {
            const age = parseInt(e.target.value);
            if (age && age > 0) {
                this.consultationData.age = age;
                this.setAgeGroup(age);
                document.querySelectorAll('.age-range-btn').forEach(btn => btn.classList.remove('selected'));
            }
        }
        
        if (e.target.id === 'patientName') {
            const name = e.target.value.trim();
            this.consultationData.patientName = name;
        }
        
        if (e.target.id === 'severitySlider') {
            const value = e.target.value;
            const severityValueElement = document.getElementById('severityValue');
            if (severityValueElement) {
                severityValueElement.textContent = value;
            }
            this.consultationData.painLevel = parseInt(value);
        }
    }

    handleAllChanges(e) {
        // Handle symptom checkboxes
        if (e.target.type === 'checkbox' && e.target.id.startsWith('symptom_')) {
            const symptomIndex = parseInt(e.target.id.replace('symptom_', ''));
            const symptom = this.commonSymptoms[symptomIndex];
            
            if (symptom) {
                if (e.target.checked) {
                    if (!this.consultationData.associatedSymptoms.includes(symptom.name)) {
                        this.consultationData.associatedSymptoms.push(symptom.name);
                    }
                } else {
                    this.consultationData.associatedSymptoms = this.consultationData.associatedSymptoms.filter(s => s !== symptom.name);
                }
            }
        }
    }

    selectLanguage(lang) {
        this.currentLanguage = lang;
        this.consultationData.language = lang;
        this.updateTranslations();
        setTimeout(() => {
            this.showStep('welcome');
        }, 300);
    }

    updateTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            if (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][key]) {
                element.textContent = this.translations[this.currentLanguage][key];
            }
        });

        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(element => {
            const key = element.dataset.i18nPlaceholder;
            if (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][key]) {
                element.placeholder = this.translations[this.currentLanguage][key];
            }
        });
    }

    showStep(stepName) {
        console.log('Attempting to show step:', stepName); // Debug log
        
        // Hide all steps
        document.querySelectorAll('.consultation-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show target step
        const targetStep = document.getElementById(`${stepName}Step`);
        if (targetStep) {
            targetStep.classList.add('active');
            this.currentStep = stepName;
            console.log('Successfully showed step:', stepName); // Debug log
            
            // Initialize step-specific content
            if (stepName === 'history') {
                setTimeout(() => this.initializeHistoryStep(), 100);
            } else if (stepName === 'symptoms') {
                setTimeout(() => this.initializeSymptomsStep(), 100);
            }
        } else {
            console.error('Step not found:', `${stepName}Step`);
        }
    }

    setAgeFromRange(ageGroup) {
        this.consultationData.ageGroup = ageGroup;
        const ageInput = document.getElementById('ageInput');
        if (ageInput) ageInput.value = '';
        
        const ageMappings = {
            'child': 8, 'teen': 16, 'adult': 35, 'senior': 65
        };
        
        this.consultationData.age = ageMappings[ageGroup];
    }

    setAgeGroup(age) {
        if (age <= 12) this.consultationData.ageGroup = 'child';
        else if (age <= 19) this.consultationData.ageGroup = 'teen';
        else if (age <= 59) this.consultationData.ageGroup = 'adult';
        else this.consultationData.ageGroup = 'senior';
    }

    continueFromAge() {
        const ageInput = document.getElementById('ageInput');
        const age = ageInput ? parseInt(ageInput.value) : this.consultationData.age;
        
        if (!age || age < 1 || age > 120) {
            alert(this.currentLanguage === 'hi' ? 'कृपया वैध उम्र दर्ज करें' : 'Please enter a valid age');
            return;
        }
        // Ensure patient name captured
        const nameInput = document.getElementById('patientName');
        if (!nameInput || !nameInput.value || nameInput.value.trim().length < 1) {
            const msg = this.currentLanguage === 'hi' ? 'कृपया रोगी का नाम दर्ज करें' : 'Please enter the patient name';
            alert(msg);
            if (nameInput) nameInput.focus();
            return;
        }
        
        this.consultationData.age = age;
        this.setAgeGroup(age);
        this.showStep('doctorReport');
    }

    initializeHistoryStep() {
        const conditionsGrid = document.getElementById('conditionsGrid');
        if (!conditionsGrid) return;
        
        conditionsGrid.innerHTML = '';
        
        this.medicalDatabase.conditions.forEach((condition, index) => {
            const conditionDiv = document.createElement('div');
            conditionDiv.className = 'condition-item';
            conditionDiv.dataset.condition = condition.name;
            
            conditionDiv.innerHTML = `
                <div class="condition-checkbox"></div>
                <div class="condition-info">
                    <div class="condition-name">${condition.name}</div>
                    <div class="condition-hindi">${condition.hindi_name}</div>
                    <div class="condition-category">${condition.category}</div>
                </div>
                <div class="condition-risk ${condition.riskLevel}">${condition.riskLevel}</div>
            `;
            
            conditionsGrid.appendChild(conditionDiv);
        });
    }

    toggleCondition(item) {
        item.classList.toggle('selected');
        const conditionName = item.dataset.condition;
        
        if (item.classList.contains('selected')) {
            if (!this.consultationData.medicalConditions.includes(conditionName)) {
                this.consultationData.medicalConditions.push(conditionName);
            }
        } else {
            this.consultationData.medicalConditions = this.consultationData.medicalConditions.filter(c => c !== conditionName);
        }
    }

    continueFromHistory() {
        const medicationsInput = document.getElementById('medicationsInput');
        const familyHistoryInput = document.getElementById('familyHistoryInput');
        
        if (medicationsInput) {
            this.consultationData.currentMedications = medicationsInput.value.trim();
        }
        
        if (familyHistoryInput) {
            this.consultationData.familyHistory = familyHistoryInput.value.trim();
        }
        
        this.showStep('symptoms');
    }

    initializeSymptomsStep() {
        const symptomsChecklist = document.getElementById('symptomsChecklist');
        if (!symptomsChecklist) return;
        
        symptomsChecklist.innerHTML = '';
        
        this.commonSymptoms.forEach((symptom, index) => {
            const symptomDiv = document.createElement('div');
            symptomDiv.className = 'symptom-checkbox-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `symptom_${index}`;
            
            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = this.currentLanguage === 'hi' ? symptom.hindi : symptom.name;
            
            symptomDiv.appendChild(checkbox);
            symptomDiv.appendChild(label);
            symptomsChecklist.appendChild(symptomDiv);
        });
    }

    continueFromSymptoms() {
        console.log('continueFromSymptoms called'); // Debug log
        
        try {
            const primaryComplaintInput = document.getElementById('primaryComplaint');
            const symptomDurationSelect = document.getElementById('symptomDuration');
            const recentChangesInput = document.getElementById('recentChanges');
            
            console.log('Primary complaint input:', primaryComplaintInput); // Debug log
            console.log('Primary complaint value:', primaryComplaintInput?.value); // Debug log
            
            // More flexible validation - allow even short descriptions
            if (!primaryComplaintInput || !primaryComplaintInput.value || primaryComplaintInput.value.trim().length < 3) {
                const message = this.currentLanguage === 'hi' ? 
                    'कृपया अपनी मुख्य समस्या का वर्णन करें (कम से कम 3 अक्षर)' : 
                    'Please describe your main health concern (at least 3 characters)';
                alert(message);
                if (primaryComplaintInput) {
                    primaryComplaintInput.focus();
                }
                return;
            }
            
            // Store all form data
            this.consultationData.primaryComplaint = primaryComplaintInput.value.trim();
            this.consultationData.symptomDuration = symptomDurationSelect ? symptomDurationSelect.value : '';
            this.consultationData.recentChanges = recentChangesInput ? recentChangesInput.value.trim() : '';
            
            console.log('Stored consultation data:', this.consultationData); // Debug log
            
            // Advanced emergency detection
            if (this.detectEmergencyCondition()) {
                console.log('Emergency condition detected'); // Debug log
                this.showEmergencyModal();
                return;
            }
            
            console.log('Proceeding to analysis'); // Debug log
            this.performIntelligentAnalysis();
            
        } catch (error) {
            console.error('Error in continueFromSymptoms:', error);
            alert('An error occurred. Please try again.');
        }
    }

    handleAnalyzeReport() {
        const fileInput = document.getElementById('doctorReportFile');
        const textArea = document.getElementById('doctorReportText');
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = (evt) => {
                const text = String(evt.target.result || '');
                if (textArea) textArea.value = text;
                this.parseDoctorReportText(text);
            };
            reader.readAsText(file);
            return;
        }

        if (textArea && textArea.value) {
            this.parseDoctorReportText(textArea.value);
        } else {
            alert(this.currentLanguage === 'hi' ? 'कृपया रिपोर्ट जोड़ें या टेक्स्ट पेस्ट करें' : 'Please upload a report or paste the text');
        }
    }

    parseDoctorReportText(text) {
        const lower = (text || '').toLowerCase();
        const extractedConditions = [];
        const extractedMeds = [];

        this.medicalDatabase.conditions.forEach(cond => {
            const name = (cond.name || '').toLowerCase();
            if (lower.includes(name)) {
                extractedConditions.push(cond.name);
            }
        });

        const medRegex = /\b([A-Za-z0-9\-\+]{2,})\b/g;
        const medCandidates = new Set();
        let match;
        while ((match = medRegex.exec(text)) !== null) {
            const token = match[1];
            if (token.length >= 3 && /[A-Za-z]/.test(token)) medCandidates.add(token);
        }
        medCandidates.forEach(m => extractedMeds.push(m));

        if (extractedConditions.length > 0) {
            extractedConditions.forEach(c => {
                if (!this.consultationData.medicalConditions.includes(c)) this.consultationData.medicalConditions.push(c);
            });
        }

        if (extractedMeds.length > 0 && !this.consultationData.currentMedications) {
            this.consultationData.currentMedications = extractedMeds.join(', ');
        }

        const summaryPreview = document.createElement('div');
        summaryPreview.className = 'card__body';
        summaryPreview.innerHTML = `<div style="margin-bottom:8px;"><strong>Parsed Conditions:</strong> ${extractedConditions.join(', ') || 'None found'}</div><div><strong>Parsed Medications:</strong> ${extractedMeds.slice(0,10).join(', ') || 'None found'}</div>`;

        const uploadCard = document.querySelector('.upload-card');
        if (uploadCard) {
            const existing = uploadCard.querySelector('.report-summary');
            if (existing) existing.remove();
            const wrapper = document.createElement('div');
            wrapper.className = 'report-summary';
            wrapper.appendChild(summaryPreview);
            uploadCard.appendChild(wrapper);
        }
    }

    startVoiceCapture() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert(this.currentLanguage === 'hi' ? 'यह ब्राउज़र वॉइस इनपुट का समर्थन नहीं करता' : 'This browser does not support voice input');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this._speechRec = new SpeechRecognition();
        this._speechRec.lang = this.currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
        this._speechRec.interimResults = true;
        this._speechRec.continuous = false;

        const status = document.getElementById('voiceStatus');
        const stopBtn = document.getElementById('stopVoiceBtn');
        const startBtn = document.getElementById('startVoiceBtn');

        this._speechRec.onstart = () => {
            if (status) status.textContent = 'Listening...';
            if (startBtn) startBtn.disabled = true;
            if (stopBtn) stopBtn.disabled = false;
        };

        let finalTranscript = '';
        this._speechRec.onresult = (event) => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) finalTranscript += transcript + ' ';
                else interim += transcript;
            }
            const preview = document.getElementById('voiceTranscript');
            if (preview) preview.value = (finalTranscript + interim).trim();
        };

        this._speechRec.onerror = (e) => {
            const status = document.getElementById('voiceStatus');
            if (status) status.textContent = 'Error during speech recognition';
            if (startBtn) startBtn.disabled = false;
            if (stopBtn) stopBtn.disabled = true;
        };

        this._speechRec.onend = () => {
            const status = document.getElementById('voiceStatus');
            if (status) status.textContent = 'Idle';
            if (startBtn) startBtn.disabled = false;
            if (stopBtn) stopBtn.disabled = true;
            const preview = document.getElementById('voiceTranscript');
            if (preview && preview.value && !this.consultationData.primaryComplaint) {
                this.consultationData.primaryComplaint = preview.value.trim();
            }
        };

        try {
            this._speechRec.start();
        } catch (e) {
            console.warn('Speech recognition start error', e);
        }
    }

    stopVoiceCapture() {
        if (this._speechRec) {
            try { this._speechRec.stop(); } catch (e) {}
        }
    }

    // ADVANCED EMERGENCY DETECTION ENGINE
    detectEmergencyCondition() {
        const complaint = this.consultationData.primaryComplaint.toLowerCase();
        const symptoms = this.consultationData.associatedSymptoms.map(s => s.toLowerCase());
        const conditions = this.consultationData.medicalConditions;
        const age = this.consultationData.age;
        const painLevel = this.consultationData.painLevel;
        
        // High-risk combinations
        const emergencyPatterns = [
            {
                condition: () => complaint.includes('chest pain') && painLevel >= 7 && (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2') || conditions.includes('Heart Disease')),
                reason: "Chest pain with diabetes/heart disease - High cardiac risk"
            },
            {
                condition: () => complaint.includes('severe headache') && conditions.includes('Hypertension') && painLevel >= 8,
                reason: "Severe headache with hypertension - Possible stroke risk"
            },
            {
                condition: () => (complaint.includes('difficulty breathing') || symptoms.includes('shortness of breath')) && conditions.includes('Heart Disease'),
                reason: "Breathing problems with heart disease - Heart failure risk"
            },
            {
                condition: () => painLevel >= 9 && age >= 50,
                reason: "Severe pain in elderly - Requires immediate evaluation"
            },
            {
                condition: () => complaint.includes('confusion') && (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2')),
                reason: "Confusion with diabetes - Possible blood sugar emergency"
            }
        ];
        
        return emergencyPatterns.some(pattern => pattern.condition());
    }

    showEmergencyModal() {
        const modal = document.getElementById('emergencyModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeEmergencyModal() {
        const modal = document.getElementById('emergencyModal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.performIntelligentAnalysis();
    }

    // ADVANCED MEDICAL INTELLIGENCE ENGINE
    performIntelligentAnalysis() {
        console.log('Starting intelligent analysis'); // Debug log
        this.showLoadingScreen();
        
        const steps = document.querySelectorAll('.loading-step');
        let currentStepIndex = 0;
        
        const processSteps = () => {
            if (currentStepIndex > 0) {
                steps[currentStepIndex - 1].classList.remove('active');
            }
            if (currentStepIndex < steps.length) {
                steps[currentStepIndex].classList.add('active');
                currentStepIndex++;
                setTimeout(processSteps, 2000);
            } else {
                setTimeout(() => {
                    this.hideLoadingScreen();
                    this.generateIntelligentResults();
                    this.showStep('results');
                }, 1500);
            }
        };
        
        processSteps();
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }

    // INTELLIGENT RESULTS GENERATION ENGINE
    generateIntelligentResults() {
        console.log('Generating intelligent results'); // Debug log
        try {
            this.generatePersonalizedSummary();
            this.generateIntelligentRiskAssessment();
            this.generatePersonalizedConditions();
            this.generateTargetedTestRecommendations();
            this.generatePersonalizedTreatmentPlan();
            this.generateSpecialistRecommendations();
            this.generateIntelligentFollowupPlan();
            console.log('Results generated successfully'); // Debug log
        } catch (error) {
            console.error('Error generating results:', error);
        }
    }

    printFullReport() {
        try {
            const summary = document.getElementById('consultationSummary');
            const risk = document.getElementById('riskAssessment');
            const conditions = document.getElementById('possibleConditions');
            const tests = document.getElementById('testingRecommendations');
            const treatment = document.getElementById('treatmentPlan');
            const specialist = document.getElementById('specialistRecommendations');
            const followup = document.getElementById('followupPlan');

            const containerId = '__print_container__';
            let existing = document.getElementById(containerId);
            if (existing) existing.remove();

            const container = document.createElement('div');
            container.id = containerId;
            container.className = 'print-container';
            const timestamp = new Date().toLocaleString();

            const patientNamePrint = this.consultationData.patientName ? this.consultationData.patientName : this.translate('unnamed_patient', 'Unnamed Patient');
            container.innerHTML = `
                <div class="print-header">
                    <h1>${this.translate('print_title', 'Personalized Medical Intelligence Report')}</h1>
                    <div class="print-meta">${this.translate('print_generated', 'Generated')}: ${timestamp}</div>
                    <div class="print-patient">${this.translate('print_patient', 'Patient')}: <strong>${patientNamePrint}</strong></div>
                    <div class="print-provider">${this.translate('print_provider', 'Provided by')} Jan Mitra</div>
                    <hr/>
                </div>
                <section class="print-section">${summary ? summary.innerHTML : ''}</section>
                <section class="print-section">${risk ? risk.innerHTML : ''}</section>
                <section class="print-section">${conditions ? conditions.innerHTML : ''}</section>
                <section class="print-section">${tests ? tests.innerHTML : ''}</section>
                <section class="print-section">${treatment ? treatment.innerHTML : ''}</section>
                <section class="print-section">${specialist ? specialist.innerHTML : ''}</section>
                <section class="print-section">${followup ? followup.innerHTML : ''}</section>
            `;

            document.body.appendChild(container);

            const cleanup = () => {
                try {
                    const el = document.getElementById(containerId);
                    if (el) el.remove();
                } finally {
                    window.onafterprint = null;
                }
            };

            window.onafterprint = cleanup;

            setTimeout(() => {
                try {
                    window.print();
                } catch (err) {
                    console.error('Print failed:', err);
                    alert(this.currentLanguage === 'hi' ? 'प्रिंट विफल रहा।' : 'Print failed.');
                    cleanup();
                }
            }, 120);
        } catch (err) {
            console.error('Error in printFullReport:', err);
            alert(this.currentLanguage === 'hi' ? 'प्रिंट के दौरान त्रुटि हुई' : 'An error occurred while preparing the print');
        }
    }

    generatePersonalizedSummary() {
        const summaryDiv = document.getElementById('consultationSummary');
        if (!summaryDiv) return;
        
        const riskFactors = this.calculatePersonalizedRiskFactors();
        // Make the summary layout more explicit and aligned with the provided report example
        const severityText = `${this.consultationData.painLevel}/10 (${this.getSeverityDescription()})`;
        const patientName = this.consultationData.patientName ? this.consultationData.patientName : 'Unnamed Patient';
        summaryDiv.innerHTML = `
            <div class="summary-item">
                <div class="summary-label">Patient:</div>
                <div class="summary-value">${patientName} — ${this.consultationData.age}y, ${this.consultationData.medicalConditions.length} conditions</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Risk Classification:</div>
                <div class="summary-value">${riskFactors.level}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Symptom Severity:</div>
                <div class="summary-value">${severityText}</div>
            </div>
            <div class="summary-item">
                <div class="summary-label">Analysis Confidence:</div>
                <div class="summary-value">${riskFactors.confidence}%</div>
            </div>
        `;
    }

    getSeverityDescription() {
        const level = this.consultationData.painLevel;
        if (level <= 3) return this.translate('mild', 'Mild');
        if (level <= 6) return this.translate('moderate', 'Moderate');
        return this.translate('severe', 'Severe');
    }

    generateIntelligentRiskAssessment() {
        const riskDiv = document.getElementById('riskAssessment');
        if (!riskDiv) return;
        
        const riskFactors = this.calculatePersonalizedRiskFactors();
        // Format risk assessment to match user's requested structure closely
        riskDiv.innerHTML = `
            <div class="risk-level ${riskFactors.level.toLowerCase()}">${riskFactors.level} Risk</div>
            <p><strong>Personalized Assessment:</strong> ${riskFactors.message}</p>
            <h4>Risk Factor Analysis:</h4>
            <ul>
                ${riskFactors.factors.map(factor => `<li>${factor}</li>`).join('')}
            </ul>
            <div style="margin-top: 16px;">
                <h4>Age-Specific Considerations:</h4>
                <p>${this.getAgeSpecificRisks()}</p>
            </div>
        `;
    }

    calculatePersonalizedRiskFactors() {
        let riskScore = 0;
        let factors = [];
        
        // Age-based risk calculation
        const age = this.consultationData.age;
        if (age > 70) {
            riskScore += 3;
            factors.push(`Very elderly (${age}y) - Multiple system risks`);
        } else if (age > 60) {
            riskScore += 2;
            factors.push(`Elderly (${age}y) - Increased disease risk`);
        } else if (age > 45) {
            riskScore += 1;
            factors.push(`Middle age (${age}y) - Moderate risk increase`);
        } else if (age !== null && age < 18) {
            // Pediatric considerations: age <18 should use pediatric-focused messaging
            factors.push(`Child/Adolescent (${age}y) - Age-specific pediatric considerations`);
        }
        
        // Medical conditions risk
        const conditions = this.consultationData.medicalConditions;
        conditions.forEach(condition => {
            const conditionData = this.medicalDatabase.conditions.find(c => c.name === condition);
            if (conditionData) {
                if (conditionData.riskLevel === 'high') {
                    riskScore += 2;
                    factors.push(`${condition} - High-risk chronic condition`);
                } else if (conditionData.riskLevel === 'medium') {
                    riskScore += 1;
                    factors.push(`${condition} - Moderate risk condition`);
                }
            }
        });
        
        // Symptom severity
        const painLevel = this.consultationData.painLevel;
        if (painLevel >= 8) {
            riskScore += 3;
            factors.push(`Severe symptoms (${painLevel}/10) - Requires urgent attention`);
        } else if (painLevel >= 6) {
            riskScore += 2;
            factors.push(`Moderate-severe symptoms (${painLevel}/10) - Close monitoring needed`);
        } else if (painLevel >= 4) {
            riskScore += 1;
            factors.push(`Moderate symptoms (${painLevel}/10) - Regular follow-up advised`);
        }

        // Respiratory-specific escalation: severe exacerbations should escalate risk
        const lowerComplaint = (this.consultationData.primaryComplaint || '').toLowerCase();
        const associated = this.consultationData.associatedSymptoms || [];
        const hasRespiratoryCondition = conditions.includes('Asthma') || conditions.includes('COPD') ||
            associated.includes('Shortness of breath') || lowerComplaint.includes('shortness') || lowerComplaint.includes('breath') || lowerComplaint.includes('difficulty breathing');
        let escalateToHighDueToResp = false;
        if (hasRespiratoryCondition) {
            if (painLevel >= 9) {
                // Severe respiratory exacerbation -> strongly prefer HIGH
                riskScore += 3;
                factors.push(`Severe respiratory exacerbation (${painLevel}/10) - Urgent care recommended`);
                escalateToHighDueToResp = true;
            } else if (painLevel >= 7) {
                riskScore += 2;
                factors.push(`Respiratory exacerbation risk (${painLevel}/10) - Prompt evaluation advised`);
            }
        }
        
        // Symptom duration
        const duration = this.consultationData.symptomDuration;
        if (duration === 'chronic') {
            riskScore += 2;
            factors.push('Chronic symptoms - Ongoing management required');
        } else if (duration === '2weeks+') {
            riskScore += 1;
            factors.push('Prolonged symptoms - Professional evaluation needed');
        }
        
        // Comorbidity interactions
        if (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2')) {
            if (conditions.includes('Hypertension')) {
                riskScore += 2;
                factors.push('Diabetes + Hypertension - Cardiovascular risk multiplied');
            }
            if (conditions.includes('Heart Disease')) {
                riskScore += 3;
                factors.push('Diabetes + Heart Disease - Very high cardiac risk');
            }
        }

        // Pediatric-specific adjustments
        if (age !== null && age < 18) {
            // Hypertension in children is uncommon and requires specialist evaluation
            if (conditions.includes('Hypertension')) {
                riskScore += 2; // escalate because pediatric HTN is higher concern
                factors.push('Hypertension in a child - Pediatric hypertension requires specialist evaluation');
            }

            // Heart disease or diabetes in children are also higher concern
            if (conditions.includes('Heart Disease')) {
                riskScore += 2;
                factors.push('Heart Disease in a child - Refer to pediatric cardiology');
            }
            if (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2')) {
                riskScore += 1;
                factors.push('Diabetes in a child - Close monitoring and specialist care recommended');
            }
        }
        
        // Determine risk level and message
        let level, message, confidence;
        
        if (riskScore >= 8 || escalateToHighDueToResp) {
            level = 'HIGH';
            message = 'Multiple high-risk factors present. Requires immediate medical attention and aggressive monitoring.';
            confidence = 90;
        } else if (riskScore >= 5) {
            level = 'MEDIUM';
            message = 'Several risk factors identified. Should see healthcare provider within 1-2 days for proper evaluation.';
            confidence = 85;
        } else if (riskScore >= 2) {
            level = 'LOW-MEDIUM';
            message = 'Some risk factors present. Monitor closely and seek care if symptoms worsen.';
            confidence = 80;
        } else {
            level = 'LOW';
            message = 'Lower risk profile. Can likely be managed with self-care and routine follow-up.';
            confidence = 75;
        }
        
        return { level, message, factors, confidence };
    }

    getAgeSpecificRisks() {
        const age = this.consultationData.age;
        if (age === null || typeof age !== 'number' || isNaN(age)) {
            return `Age-appropriate screening and monitoring recommended.`;
        }

        if (age < 18) {
            // Pediatric specific message
            return `At your age (${age}), pediatric concerns apply: growth/development, infections, and mental health screening may be relevant. Seek pediatric or primary care if concerns.`;
        }

        // Parse defined age ranges like "18-30" or "70+" in the database
        const ageGroup = this.medicalDatabase.ageRiskFactors.find(group => {
            const label = group.ageGroup || '';
            if (label.includes('+')) {
                const min = parseInt(label.replace('+', ''), 10);
                return age >= min;
            }
            const parts = label.split('-').map(p => parseInt(p, 10));
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                return age >= parts[0] && age <= parts[1];
            }
            return false;
        });

        if (ageGroup) {
            return `At your age (${age}), common concerns include: ${ageGroup.highRiskConditions.join(', ')}. Cardiac risk: ${ageGroup.cardiacRisk}, Diabetes risk: ${ageGroup.diabetesRisk}.`;
        }

        return `Age-appropriate screening and monitoring recommended.`;
    }

    generatePersonalizedConditions() {
        const conditionsDiv = document.getElementById('possibleConditions');
        if (!conditionsDiv) return;
        
        const possibleConditions = this.analyzeSymptomPatterns();
        
        conditionsDiv.innerHTML = possibleConditions.map(condition => `
            <div class="condition-card">
                <div class="condition-header">
                    <div class="condition-name-card">${condition.name}</div>
                    <div class="condition-probability">${condition.probability}%</div>
                </div>
                <div class="condition-description">${condition.description}</div>
                <div style="margin-top: 12px;">
                    <strong>Key Factors:</strong> ${condition.factors.join(', ')}
                </div>
                <div style="margin-top: 8px; color: var(--color-warning);">
                    <strong>Recommendation:</strong> ${condition.recommendation}
                </div>
            </div>
        `).join('');
    }

    analyzeSymptomPatterns() {
        const complaint = this.consultationData.primaryComplaint.toLowerCase();
        const symptoms = this.consultationData.associatedSymptoms;
        const conditions = this.consultationData.medicalConditions;
        const age = this.consultationData.age;
        const painLevel = this.consultationData.painLevel;
        
        let possibleConditions = [];
        
        // CHEST PAIN ANALYSIS
        if (complaint.includes('chest pain') || symptoms.includes('Chest pain')) {
            if (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2') || conditions.includes('Heart Disease')) {
                possibleConditions.push({
                    name: "Acute Coronary Syndrome",
                    probability: 85,
                    description: "Heart attack or unstable angina - requires immediate evaluation",
                    factors: ["Chest pain", "Diabetes/Heart disease", `Age ${age}`, `Severe pain (${painLevel}/10)`],
                    recommendation: "URGENT: Go to emergency room immediately"
                });
            } else if (age >= 45) {
                possibleConditions.push({
                    name: "Cardiac Ischemia",
                    probability: 65,
                    description: "Reduced blood flow to heart muscle",
                    factors: ["Chest pain", `Age ${age}`, "Cardiac risk factors"],
                    recommendation: "See cardiologist within 24-48 hours"
                });
            } else {
                possibleConditions.push({
                    name: "Musculoskeletal Pain",
                    probability: 45,
                    description: "Muscle or chest wall pain",
                    factors: ["Chest pain", `Young age (${age})`, "No cardiac history"],
                    recommendation: "Monitor symptoms, see doctor if persists"
                });
            }
        }
        
        // SEVERE HEADACHE ANALYSIS
        if (complaint.includes('headache') || symptoms.includes('Severe headache')) {
            if (conditions.includes('Hypertension')) {
                possibleConditions.push({
                    name: "Hypertensive Crisis",
                    probability: 78,
                    description: "Dangerously high blood pressure affecting brain",
                    factors: ["Severe headache", "Hypertension history", `Pain level ${painLevel}/10`],
                    recommendation: "URGENT: Check blood pressure immediately, go to ER if >180/110"
                });
            } else if (age >= 50) {
                possibleConditions.push({
                    name: "Secondary Headache",
                    probability: 60,
                    description: "Headache due to underlying condition",
                    factors: ["Severe headache", `Age ${age}`, "New or different pattern"],
                    recommendation: "See neurologist for evaluation"
                });
            }
        }
        
        // DIABETES-SPECIFIC SYMPTOMS
        if ((complaint.includes('frequent urination') || symptoms.includes('Frequent urination')) && 
            (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2'))) {
            possibleConditions.push({
                name: "Poor Diabetic Control",
                probability: 85,
                description: "Blood sugar levels not well controlled",
                factors: ["Frequent urination", "Diabetes history", "Possible medication issues"],
                recommendation: "Check blood sugar immediately, adjust medications with doctor"
            });
        }
        
        // BREATHING PROBLEMS
        if (complaint.includes('shortness of breath') || symptoms.includes('Shortness of breath')) {
            if (conditions.includes('Heart Disease')) {
                possibleConditions.push({
                    name: "Congestive Heart Failure",
                    probability: 80,
                    description: "Heart not pumping effectively",
                    factors: ["Shortness of breath", "Heart disease history", `Age ${age}`],
                    recommendation: "URGENT: See cardiologist immediately, may need hospitalization"
                });
            } else if (conditions.includes('Asthma') || conditions.includes('COPD')) {
                possibleConditions.push({
                    name: "Respiratory Exacerbation",
                    probability: 75,
                    description: "Worsening of lung condition",
                    factors: ["Breathing difficulty", "Lung disease history", "Environmental triggers"],
                    recommendation: "Use rescue medications, see pulmonologist if no improvement"
                });
            }
        }
        
        // Add general conditions if no specific patterns found
        if (possibleConditions.length === 0) {
            possibleConditions.push({
                name: "Functional Disorder",
                probability: 40,
                description: "Symptoms without clear structural cause",
                factors: ["Symptom pattern", `Age ${age}`, "No major risk factors"],
                recommendation: "Lifestyle modifications, stress management, follow up with primary care"
            });
        }
        
        return possibleConditions.slice(0, 3); // Return top 3 most likely conditions
    }

    generateTargetedTestRecommendations() {
        const testsDiv = document.getElementById('testingRecommendations');
        if (!testsDiv) return;
        
        const recommendedTests = this.generatePersonalizedTests();
        
        // Group tests by category
        const categories = {};
        recommendedTests.forEach(test => {
            if (!categories[test.category]) {
                categories[test.category] = [];
            }
            categories[test.category].push(test);
        });
        
        let testsHTML = '';
        Object.keys(categories).forEach(category => {
            testsHTML += `
                <div class="test-category">
                    <h4>${category} Tests</h4>
                    <div class="test-list">
                        ${categories[category].map(test => `
                            <div class="test-item">
                                <div class="test-info">
                                    <div class="test-name">${test.name}</div>
                                    <div class="test-purpose">${test.purpose}</div>
                                </div>
                                <div class="test-cost">${test.cost}</div>
                                <div class="test-urgency ${test.urgency}">${test.urgency.toUpperCase()}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        testsDiv.innerHTML = testsHTML || '<p>Continue monitoring symptoms. Tests will be recommended based on clinical progression.</p>';
    }

    generatePersonalizedTests() {
        const complaint = this.consultationData.primaryComplaint.toLowerCase();
        const symptoms = this.consultationData.associatedSymptoms;
        const conditions = this.consultationData.medicalConditions;
        const age = this.consultationData.age;
        const painLevel = this.consultationData.painLevel;
        
        let recommendedTests = [];
        
        // CARDIAC TESTS - Personalized based on risk
        if (complaint.includes('chest pain') || symptoms.includes('Chest pain')) {
            recommendedTests.push({
                name: "ECG (12-Lead)",
                category: "Cardiac Emergency",
                cost: "₹150-300",
                urgency: painLevel >= 7 ? "immediate" : "urgent",
                purpose: "Detect heart attack, arrhythmias, ischemia"
            });
            
            if (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2') || age >= 45) {
                recommendedTests.push({
                    name: "Cardiac Enzymes (Troponin)",
                    category: "Cardiac Emergency",
                    cost: "₹800-1500",
                    urgency: "immediate",
                    purpose: "Detect heart muscle damage"
                });
                
                recommendedTests.push({
                    name: "Echocardiogram",
                    category: "Cardiac Assessment",
                    cost: "₹1500-3000",
                    urgency: "urgent",
                    purpose: "Assess heart structure and function"
                });
            }
        }
        
        // DIABETES MONITORING - Condition-specific
        if (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2')) {
            recommendedTests.push({
                name: "HbA1c",
                category: "Diabetic Monitoring",
                cost: "₹400-600",
                urgency: "routine",
                purpose: "3-month blood sugar control assessment"
            });
            
            if (complaint.includes('frequent urination') || symptoms.includes('Frequent urination')) {
                recommendedTests.push({
                    name: "Random Blood Glucose",
                    category: "Diabetic Emergency",
                    cost: "₹50-100",
                    urgency: "immediate",
                    purpose: "Check for diabetic ketoacidosis or hyperosmolar state"
                });
            }
            
            recommendedTests.push({
                name: "Kidney Function Tests",
                category: "Diabetic Complications",
                cost: "₹500-800",
                urgency: "routine",
                purpose: "Screen for diabetic kidney disease"
            });
            
            if (age >= 40) {
                recommendedTests.push({
                    name: "Dilated Eye Exam",
                    category: "Diabetic Complications",
                    cost: "₹500-1000",
                    urgency: "routine",
                    purpose: "Screen for diabetic retinopathy"
                });
            }
        }
        
        // HYPERTENSION MONITORING
        if (conditions.includes('Hypertension')) {
            if (complaint.includes('headache') || symptoms.includes('Severe headache')) {
                recommendedTests.push({
                    name: "Blood Pressure Monitoring",
                    category: "Hypertensive Emergency",
                    cost: "₹100-200",
                    urgency: "immediate",
                    purpose: "Rule out hypertensive crisis"
                });
                
                if (painLevel >= 8) {
                    recommendedTests.push({
                        name: "CT Brain (Non-contrast)",
                        category: "Neurological Emergency",
                        cost: "₹3000-6000",
                        urgency: "urgent",
                        purpose: "Rule out intracranial bleeding or stroke"
                    });
                }
            }
        }
        
        // RESPIRATORY TESTS
        if (complaint.includes('shortness of breath') || symptoms.includes('Shortness of breath')) {
            recommendedTests.push({
                name: "Chest X-ray",
                category: "Respiratory Assessment",
                cost: "₹200-500",
                urgency: conditions.includes('Heart Disease') ? "urgent" : "routine",
                purpose: "Assess lungs and heart for fluid, infection, or structural problems"
            });
            
            if (conditions.includes('Heart Disease')) {
                recommendedTests.push({
                    name: "BNP or NT-proBNP",
                    category: "Heart Failure Assessment",
                    cost: "₹1000-1800",
                    urgency: "urgent",
                    purpose: "Diagnose and assess heart failure severity"
                });
            }
        }
        
        // AGE-APPROPRIATE SCREENING
        if (age >= 40) {
            recommendedTests.push({
                name: "Lipid Profile",
                category: "Cardiovascular Screening",
                cost: "₹400-600",
                urgency: "routine",
                purpose: "Assess cardiovascular risk factors"
            });
        }
        
        if (age >= 18 && recommendedTests.length === 0) {
            recommendedTests.push({
                name: "Complete Blood Count",
                category: "Basic Assessment",
                cost: "₹200-400",
                urgency: "routine",
                purpose: "Screen for infections, anemia, blood disorders"
            });
        }
        
        return recommendedTests;
    }

    generatePersonalizedTreatmentPlan() {
        const treatmentDiv = document.getElementById('treatmentPlan');
        if (!treatmentDiv) return;
        
        const conditions = this.consultationData.medicalConditions;
        const complaint = this.consultationData.primaryComplaint.toLowerCase();
        const age = this.consultationData.age;
        const painLevel = this.consultationData.painLevel;
        
        let treatmentHTML = `<h4>Personalized Immediate Actions:</h4><ul>`;
        
        // CONDITION-SPECIFIC ACTIONS
        if (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2')) {
            treatmentHTML += `
                <li><strong>Blood Sugar Management:</strong> Check glucose levels immediately if symptomatic</li>
                <li><strong>Medication Adherence:</strong> Ensure consistent timing of diabetes medications</li>
                <li><strong>Dietary Control:</strong> Follow diabetic diet, avoid high-sugar foods</li>
            `;
            
            if (complaint.includes('frequent urination')) {
                treatmentHTML += `<li><strong>Urgent:</strong> Check for ketones if blood sugar >250 mg/dL</li>`;
            }
        }
        
        if (conditions.includes('Hypertension')) {
            treatmentHTML += `
                <li><strong>Blood Pressure Monitoring:</strong> Check BP twice daily</li>
                <li><strong>Medication Compliance:</strong> Take BP medications as prescribed, never skip doses</li>
                <li><strong>Sodium Restriction:</strong> Limit salt intake to <2g/day</li>
            `;
            
            if (complaint.includes('headache') && painLevel >= 7) {
                treatmentHTML += `<li><strong>Emergency:</strong> Seek immediate care if BP >180/110 mmHg</li>`;
            }
        }
        
        if (conditions.includes('Heart Disease')) {
            treatmentHTML += `
                <li><strong>Activity Modification:</strong> Avoid strenuous activities until evaluated</li>
                <li><strong>Cardiac Medications:</strong> Continue all heart medications as prescribed</li>
                <li><strong>Weight Monitoring:</strong> Daily weight checks for fluid retention</li>
            `;
        }
        
        // SYMPTOM-SPECIFIC ACTIONS
        if (complaint.includes('chest pain')) {
            treatmentHTML += `
                <li><strong>Position:</strong> Sit upright, loosen tight clothing</li>
                <li><strong>Avoid:</strong> Physical exertion, emotional stress</li>
                <li><strong>Emergency Plan:</strong> Know location of nearest emergency room</li>
            `;
        }
        
        // GENERAL CARE BASED ON SEVERITY
        if (painLevel >= 6) {
            treatmentHTML += `<li><strong>Pain Management:</strong> Use appropriate pain relief as directed by doctor</li>`;
        }
        
        treatmentHTML += `</ul>`;
        
        // LIFESTYLE MODIFICATIONS - Age and Condition Specific
        treatmentHTML += `<h4>Personalized Lifestyle Plan:</h4><ul>`;
        
        if (age >= 60) {
            treatmentHTML += `
                <li><strong>Fall Prevention:</strong> Ensure good lighting, remove tripping hazards</li>
                <li><strong>Medication Review:</strong> Regular review with pharmacist for interactions</li>
            `;
        }
        
        if (conditions.length >= 2) {
            treatmentHTML += `<li><strong>Care Coordination:</strong> Inform all doctors about your complete medical history</li>`;
        }
        
        treatmentHTML += `
            <li><strong>Stress Management:</strong> Practice relaxation techniques, adequate sleep</li>
            <li><strong>Nutrition:</strong> Balanced diet appropriate for your medical conditions</li>
            <li><strong>Hydration:</strong> Maintain adequate fluid intake unless restricted</li>
        </ul>`;
        
        // RED FLAGS - Personalized
        treatmentHTML += `<h4>URGENT - Seek Immediate Care if:</h4><ul>`;
        
        if (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2')) {
            treatmentHTML += `
                <li>Blood sugar >400 mg/dL or <70 mg/dL with symptoms</li>
                <li>Ketones in urine with nausea/vomiting</li>
            `;
        }
        
        if (conditions.includes('Heart Disease')) {
            treatmentHTML += `
                <li>New or worsening chest pain</li>
                <li>Sudden shortness of breath or leg swelling</li>
            `;
        }
        
        if (conditions.includes('Hypertension')) {
            treatmentHTML += `<li>Blood pressure >180/110 with symptoms</li>`;
        }
        
        treatmentHTML += `
            <li>Severe worsening of current symptoms</li>
            <li>New neurological symptoms (weakness, speech changes)</li>
            <li>Difficulty breathing or chest pain</li>
        </ul>`;
        
        treatmentDiv.innerHTML = treatmentHTML;
    }

    generateSpecialistRecommendations() {
        const specialistDiv = document.getElementById('specialistRecommendations');
        if (!specialistDiv) return;
        
        const conditions = this.consultationData.medicalConditions;
        const complaint = this.consultationData.primaryComplaint.toLowerCase();
        const symptoms = this.consultationData.associatedSymptoms;
        
        let specialists = [];
        
        // CONDITION-BASED SPECIALIST RECOMMENDATIONS
        if (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2')) {
            specialists.push({
                name: "Endocrinologist",
                hindi: "अंतःस्रावी रोग विशेषज्ञ",
                reason: "Diabetes management and complication prevention",
                urgency: complaint.includes('frequent urination') ? "Within 1 week" : "Within 1 month",
                services: "Blood sugar control, medication adjustment, complication screening"
            });
        }
        
        if (complaint.includes('chest pain') || symptoms.includes('Chest pain')) {
            specialists.push({
                name: "Cardiologist",
                hindi: "हृदय रोग विशेषज्ञ",
                reason: "Chest pain evaluation and cardiac risk assessment",
                urgency: (conditions.includes('Heart Disease') || conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2')) ? "Within 24-48 hours" : "Within 1 week",
                services: "ECG interpretation, stress testing, cardiac catheterization if needed"
            });
        }
        
        if (conditions.includes('Hypertension') && (complaint.includes('headache') || symptoms.includes('Severe headache'))) {
            specialists.push({
                name: "Neurologist",
                hindi: "न्यूरो रोग विशेषज्ञ",
                reason: "Severe headache with hypertension evaluation",
                urgency: "Within 1-2 days",
                services: "Brain imaging interpretation, stroke risk assessment"
            });
        }
        
        if (complaint.includes('shortness of breath') && (conditions.includes('Asthma') || conditions.includes('COPD'))) {
            specialists.push({
                name: "Pulmonologist", 
                hindi: "फेफड़े के रोग विशेषज्ञ",
                reason: "Breathing difficulty with lung disease",
                urgency: "Within 1 week",
                services: "Lung function testing, medication optimization, oxygen therapy"
            });
        }
        
        if (specialists.length === 0) {
            specialistDiv.innerHTML = `
                <p>Based on your symptoms and medical history, start with your primary care physician for initial evaluation. Specialist referrals will be made based on clinical findings.</p>
                <div style="margin-top: 20px; padding: 15px; background-color: var(--color-bg-2); border-radius: 8px;">
                    <strong>Primary Care Focus:</strong> Comprehensive evaluation, basic testing, and coordination of care
                </div>
            `;
            return;
        }
        
        specialistDiv.innerHTML = `
            <p>Based on your personalized risk profile, consider these specialist consultations:</p>
            <div class="specialist-list">
                ${specialists.map(specialist => `
                    <div class="specialist-item" style="margin-bottom: 20px; padding: 16px; border: 1px solid var(--color-card-border); border-radius: 8px; background-color: var(--color-bg-3);">
                        <h5 style="color: var(--color-text); margin-bottom: 8px;">${specialist.name} (${specialist.hindi})</h5>
                        <p><strong>Why needed:</strong> ${specialist.reason}</p>
                        <p><strong>Recommended timing:</strong> <span style="color: var(--color-primary); font-weight: bold;">${specialist.urgency}</span></p>
                        <p><strong>Services:</strong> ${specialist.services}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    generateIntelligentFollowupPlan() {
        const followupDiv = document.getElementById('followupPlan');
        if (!followupDiv) return;
        
        const conditions = this.consultationData.medicalConditions;
        const painLevel = this.consultationData.painLevel;
        const age = this.consultationData.age;
        
        let urgency;
        if (painLevel >= 8 || conditions.includes('Heart Disease')) urgency = 'urgent';
        else if (painLevel >= 6 || conditions.length >= 2) urgency = 'prompt';
        else urgency = 'routine';
        
        let followupHTML = `<div class="followup-timeline"><h4>Personalized Timeline:</h4><ul>`;
        
        switch(urgency) {
            case 'urgent':
                followupHTML += `
                    <li><strong>Immediate (Today):</strong> Monitor symptoms every 2 hours, check vital signs</li>
                    <li><strong>Within 24 hours:</strong> Medical evaluation with your primary care provider</li>
                    <li><strong>48-72 hours:</strong> Specialist consultation if symptoms persist</li>
                    <li><strong>1 week:</strong> Reassess treatment response and medication effectiveness</li>
                `;
                break;
            case 'prompt':
                followupHTML += `
                    <li><strong>Within 2-3 days:</strong> Schedule appointment with primary care physician</li>
                    <li><strong>1 week:</strong> Follow-up to assess symptom improvement</li>
                    <li><strong>2-3 weeks:</strong> Medication review and adjustment if needed</li>
                    <li><strong>1 month:</strong> Comprehensive review of treatment plan</li>
                `;
                break;
            default:
                followupHTML += `
                    <li><strong>Within 1 week:</strong> If symptoms worsen or new symptoms develop</li>
                    <li><strong>2-3 weeks:</strong> Routine follow-up with healthcare provider</li>
                    <li><strong>1-2 months:</strong> Progress evaluation and preventive care review</li>
                    <li><strong>3-6 months:</strong> Comprehensive health assessment</li>
                `;
        }
        
        followupHTML += `</ul></div>`;
        
        // CONDITION-SPECIFIC MONITORING
        if (conditions.length > 0) {
            followupHTML += `<h4>Condition-Specific Monitoring:</h4><ul>`;
            
            if (conditions.includes('Diabetes Type 1') || conditions.includes('Diabetes Type 2')) {
                followupHTML += `
                    <li><strong>Blood Sugar:</strong> Check 2-4 times daily, log results</li>
                    <li><strong>HbA1c:</strong> Every 3 months</li>
                    <li><strong>Annual Screening:</strong> Eye exam, kidney function, foot exam</li>
                `;
            }
            
            if (conditions.includes('Hypertension')) {
                followupHTML += `
                    <li><strong>Blood Pressure:</strong> Daily monitoring, same time each day</li>
                    <li><strong>Medication Review:</strong> Every 3-6 months</li>
                    <li><strong>Lifestyle Assessment:</strong> Diet, exercise, stress management</li>
                `;
            }
            
            if (conditions.includes('Heart Disease')) {
                followupHTML += `
                    <li><strong>Daily Weight:</strong> Watch for fluid retention (>2 lbs gain in 2 days)</li>
                    <li><strong>Activity Tolerance:</strong> Monitor shortness of breath with exertion</li>
                    <li><strong>Medication Adherence:</strong> Never stop heart medications without doctor consultation</li>
                `;
            }
            
            followupHTML += `</ul>`;
        }
        
        // EMERGENCY PROTOCOLS
        followupHTML += `
            <h4>Emergency Action Plan:</h4>
            <div style="background-color: var(--color-bg-4); padding: 16px; border-radius: 8px; border-left: 4px solid var(--color-error);">
                <p><strong>Call 108 immediately if:</strong></p>
                <ul>
                    <li>Chest pain with sweating, nausea, or shortness of breath</li>
                    <li>Severe headache with vision changes or confusion</li>
                    <li>Difficulty breathing or speaking</li>
                    <li>Blood pressure >200/120 with symptoms</li>
                    <li>Blood sugar <50 or >400 with ketones</li>
                    <li>Any symptom that causes severe concern</li>
                </ul>
            </div>
            
            <h4>Self-Care Monitoring:</h4>
            <ul>
                <li><strong>Symptom Diary:</strong> Track pain levels, timing, triggers, and relief measures</li>
                <li><strong>Vital Signs:</strong> Regular monitoring appropriate for your conditions</li>
                <li><strong>Medication Log:</strong> Track effectiveness and side effects</li>
                <li><strong>Quality of Life:</strong> Note impact on daily activities and sleep</li>
            </ul>
        `;
        
        followupDiv.innerHTML = followupHTML;
    }

    findHospitals() {
        alert(this.currentLanguage === 'hi' ? 
            'अस्पताल खोजने की सुविधा जल्द ही उपलब्ध होगी। तत्काल सहायता के लिए 108 पर कॉल करें।' :
            'Hospital finder feature coming soon. Call 108 for immediate emergency assistance.'
        );
    }

    restart() {
        this.consultationData = {
            language: null,
            age: null,
            ageGroup: null,
            medicalConditions: [],
            currentMedications: '',
            familyHistory: '',
            primaryComplaint: '',
            symptomDuration: '',
            painLevel: 5,
            associatedSymptoms: [],
            recentChanges: ''
        };
        
        document.querySelectorAll('input, textarea, select').forEach(element => {
            if (element.type === 'checkbox') {
                element.checked = false;
            } else {
                element.value = '';
            }
        });
        
        const severitySlider = document.getElementById('severitySlider');
        if (severitySlider) {
            severitySlider.value = 5;
            const severityValue = document.getElementById('severityValue');
            if (severityValue) severityValue.textContent = '5';
        }
        
        document.querySelectorAll('.selected').forEach(element => {
            element.classList.remove('selected');
        });
        
        this.showStep('language');
    }

    // Bulk diagnostic simulator: run randomized test cases to find potential classification issues
    runDiagnosticSimulations(count = 1000) {
        const conditionsList = this.medicalDatabase.conditions.map(c => c.name);
        const summary = { HIGH: 0, MEDIUM: 0, 'LOW-MEDIUM': 0, LOW: 0 };
        const issues = [];

        for (let i = 0; i < count; i++) {
            const age = Math.floor(Math.random() * 90) + 1; // 1..90
            const pain = Math.floor(Math.random() * 10) + 1; // 1..10
            const condCount = Math.floor(Math.random() * 3);
            const conds = [];
            for (let j = 0; j < condCount; j++) {
                const c = conditionsList[Math.floor(Math.random() * conditionsList.length)];
                if (!conds.includes(c)) conds.push(c);
            }

            const backup = JSON.parse(JSON.stringify(this.consultationData));
            this.consultationData.age = age;
            this.consultationData.painLevel = pain;
            this.consultationData.medicalConditions = conds;

            const result = this.calculatePersonalizedRiskFactors();
            summary[result.level] = (summary[result.level] || 0) + 1;

            // Heuristic checks
            if (age < 18 && conds.length > 0 && result.level === 'LOW') {
                issues.push({ age, pain, conds, level: result.level, factors: result.factors });
            }

            this.consultationData = backup;
        }

        console.log('Simulation complete:', summary);
        console.log('Sample issues (first 10):', issues.slice(0, 10));
        return { summary, issues };
    }
}

// Initialize the Advanced Medical AI with robust error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.medicalAI = new MedicalConsultationAI();
        console.log('Medical AI initialized successfully on DOMContentLoaded');
    } catch (error) {
        console.error('Error initializing Medical AI on DOMContentLoaded:', error);
    }
});

window.addEventListener('load', () => {
    if (!window.medicalAI) {
        setTimeout(() => {
            try {
                window.medicalAI = new MedicalConsultationAI();
                console.log('Medical AI initialized successfully on window load fallback');
            } catch (error) {
                console.error('Error in fallback initialization:', error);
            }
        }, 100);
    }
});