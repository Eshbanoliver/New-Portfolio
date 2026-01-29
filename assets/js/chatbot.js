/**
 * Nexure Chatbot - AI-powered assistant for Eshban Oliver's Portfolio
 * Responds based on website content about projects, certifications, skills, and services
 */

class NexureChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.init();
    }

    // Website knowledge base
    knowledgeBase = {
        // About Eshban Oliver
        about: {
            name: "Eshban Oliver",
            title: "Best Web Developer in Udaipur",
            role: "Front-end Developer & React Native Specialist",
            location: "Udaipur, Rajasthan, India",
            experience: "60+ projects delivered",
            certifications: "40+ professional certifications",
            technologies: "20+ technologies",
            languages: "10+ programming languages",
            email: "Contact through the contact form",
            social: {
                github: "https://github.com/Eshbanoliver",
                linkedin: "https://in.linkedin.com/in/eshban-oliver-757352372",
                google: "https://g.dev/Eshbanoliver"
            }
        },

        // Skills and Technologies
        skills: {
            frontend: ["HTML5", "CSS3", "JavaScript", "React", "React Native"],
            backend: ["PHP", "MySQL", "Node.js"],
            cms: ["WordPress", "WooCommerce"],
            tools: ["Git", "GitHub", "VS Code", "Figma"],
            other: ["SEO", "UI/UX Design", "Responsive Design", "Cross-platform Development"]
        },

        // Project categories and examples
        projects: {
            categories: ["Business & Corporate", "Interior & Architecture", "Spa, Salon & Wellness", "E-commerce & Retail", "Healthcare & Education", "Travel, Events & Hospitality"],
            examples: [
                { name: "India Decor Plaster", category: "Interior & Architecture", url: "https://indiadecorplaster.com/" },
                { name: "ND Production", category: "Business & Corporate", url: "https://ndproduction.in/" },
                { name: "Cloudtail Marketing", category: "Digital Marketing", url: "https://cloudtailmarketing.in/" },
                { name: "Apex Sports India", category: "E-commerce", url: "https://apexsportsindia.in/" },
                { name: "Lifecare Ayurvedic Spa", category: "Spa & Wellness", url: "https://lifecareayurvedicspa.com/" },
                { name: "Blossom Buds School", category: "Education", url: "https://blossombudsschool.com/" },
                { name: "Kohinoor Gems & Jewellers", category: "E-commerce", url: "https://kohinoorgemsandjewellers.com/" },
                { name: "Mahendra Resort", category: "Hospitality", url: "https://mahendraresort.in/" }
            ],
            count: "60+"
        },

        // Certifications
        certifications: {
            count: "40+",
            platforms: ["HubSpot", "Google", "Udemy", "HP LIFE", "Great Learning Academy", "Simplilearn", "IIDE"],
            categories: ["Web Development", "Digital Marketing", "AWS Cloud", "Artificial Intelligence", "Data Science", "Cybersecurity", "Project Management", "Android Development"],
            examples: [
                "HubSpot Digital Marketing",
                "Full Stack Web Development",
                "AWS Cloud Practitioner",
                "Artificial Intelligence Fundamentals",
                "Data Science with Python",
                "Cybersecurity Essentials",
                "Agile Project Management",
                "SEO Mastery"
            ]
        },

        // Services offered
        services: {
            list: [
                "Website Design & Development",
                "E-commerce Development (WooCommerce)",
                "WordPress Development",
                "React Native Mobile Apps",
                "SEO Optimization",
                "UI/UX Design",
                "Website Maintenance",
                "Custom Web Applications"
            ],
            industries: ["Business", "Interior Design", "Spa & Wellness", "E-commerce", "Healthcare", "Education", "Hospitality", "Events"]
        }
    };

    // Response patterns
    getResponse(message) {
        const lowerMessage = message.toLowerCase().trim();

        // Greeting patterns
        if (this.matchesPattern(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'hola'])) {
            return this.getGreeting();
        }

        // About Eshban Oliver
        if (this.matchesPattern(lowerMessage, ['who is eshban', 'about eshban', 'tell me about', 'who are you working for', 'whose website', 'about you', 'introduce'])) {
            return this.getAboutResponse();
        }

        // Contact information
        if (this.matchesPattern(lowerMessage, ['contact', 'email', 'phone', 'reach', 'hire', 'get in touch', 'message'])) {
            return this.getContactResponse();
        }

        // Skills and technologies
        if (this.matchesPattern(lowerMessage, ['skill', 'technology', 'tech stack', 'what can', 'expertise', 'programming', 'language', 'tools', 'framework'])) {
            return this.getSkillsResponse();
        }

        // Projects
        if (this.matchesPattern(lowerMessage, ['project', 'portfolio', 'work', 'website', 'built', 'created', 'developed', 'showcase'])) {
            return this.getProjectsResponse();
        }

        // E-commerce specific
        if (this.matchesPattern(lowerMessage, ['ecommerce', 'e-commerce', 'online store', 'shop', 'woocommerce', 'shopping'])) {
            return this.getEcommerceResponse();
        }

        // Certifications
        if (this.matchesPattern(lowerMessage, ['certification', 'certificate', 'qualified', 'credential', 'training', 'course'])) {
            return this.getCertificationsResponse();
        }

        // Services
        if (this.matchesPattern(lowerMessage, ['service', 'offer', 'provide', 'help with', 'do you do', 'can you'])) {
            return this.getServicesResponse();
        }

        // Experience
        if (this.matchesPattern(lowerMessage, ['experience', 'years', 'how long', 'worked'])) {
            return this.getExperienceResponse();
        }

        // Location
        if (this.matchesPattern(lowerMessage, ['location', 'based', 'from', 'where', 'udaipur', 'rajasthan', 'india'])) {
            return this.getLocationResponse();
        }

        // Pricing
        if (this.matchesPattern(lowerMessage, ['price', 'cost', 'charge', 'rate', 'quote', 'budget', 'how much'])) {
            return this.getPricingResponse();
        }

        // WordPress
        if (this.matchesPattern(lowerMessage, ['wordpress', 'wp', 'cms'])) {
            return this.getWordPressResponse();
        }

        // React/Mobile
        if (this.matchesPattern(lowerMessage, ['react', 'mobile', 'app', 'native', 'android', 'ios'])) {
            return this.getMobileResponse();
        }

        // SEO
        if (this.matchesPattern(lowerMessage, ['seo', 'search engine', 'google ranking', 'optimization'])) {
            return this.getSEOResponse();
        }

        // Say thanks
        if (this.matchesPattern(lowerMessage, ['thank', 'thanks', 'appreciate', 'helpful'])) {
            return this.getThankYouResponse();
        }

        // Goodbye
        if (this.matchesPattern(lowerMessage, ['bye', 'goodbye', 'see you', 'later', 'exit', 'close'])) {
            return this.getGoodbyeResponse();
        }

        // Best web developer
        if (this.matchesPattern(lowerMessage, ['best web developer', 'top developer', 'recommended', 'best in udaipur'])) {
            return this.getBestDeveloperResponse();
        }

        // Default response
        return this.getDefaultResponse();
    }

    matchesPattern(message, patterns) {
        return patterns.some(pattern => message.includes(pattern));
    }

    getGreeting() {
        const greetings = [
            `Hello! 👋 I'm Nexure, Eshban Oliver's AI assistant. I can help you learn about his web development services, projects, and skills. What would you like to know?`,
            `Hi there! 🌟 Welcome to Eshban Oliver's portfolio! I'm Nexure, here to answer your questions about the best web developer in Udaipur. How can I assist you today?`,
            `Hey! 😊 I'm Nexure, and I'd love to tell you about Eshban Oliver's amazing work. Ask me about projects, skills, certifications, or services!`
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    getAboutResponse() {
        return `**About Eshban Oliver** 👨‍💻

Eshban Oliver is a passionate **Front-end Developer** and **React Native Specialist** based in Udaipur, Rajasthan. Recognized as one of the **best web developers in Udaipur**, he specializes in:

✅ **60+ Projects** delivered successfully
✅ **40+ Certifications** from top platforms
✅ **20+ Technologies** mastered
✅ Expertise in JavaScript, React, WordPress & more

He transforms complex ideas into stunning, SEO-optimized websites that drive real business results! 🚀

Want to know more about his [Projects](/projects) or [Certifications](/certifications)?`;
    }

    getContactResponse() {
        return `**Get in Touch** 📬

Ready to start your project? Here's how to reach Eshban Oliver:

📧 **Contact Form**: Visit the [Contact Page](/contact.html)
💼 **LinkedIn**: [Connect on LinkedIn](https://in.linkedin.com/in/eshban-oliver-757352372)
🐙 **GitHub**: [View on GitHub](https://github.com/Eshbanoliver)
🌐 **Google Dev**: [Google Developers Profile](https://g.dev/Eshbanoliver)

Eshban typically responds within 24 hours and offers free consultations for new projects! 🎯`;
    }

    getSkillsResponse() {
        return `**Skills & Technologies** 💻

Eshban Oliver is proficient in:

**Frontend:**
• HTML5, CSS3, JavaScript
• React, React Native
• Responsive Design, UI/UX

**Backend & CMS:**
• PHP, MySQL
• WordPress, WooCommerce

**Tools & Practices:**
• Git, GitHub, VS Code
• SEO Optimization
• Cross-platform Development

With **20+ technologies** mastered and **10+ programming languages** known, Eshban delivers cutting-edge solutions! 🔥`;
    }

    getProjectsResponse() {
        const examples = this.knowledgeBase.projects.examples.slice(0, 4);
        let projectList = examples.map(p => `• **${p.name}** - ${p.category}`).join('\n');

        return `**Project Portfolio** 🎨

Eshban has delivered **60+ successful projects** across multiple industries:

**Categories:**
• Business & Corporate
• Interior & Architecture
• E-commerce & Retail
• Healthcare & Education
• Spa, Salon & Wellness
• Travel & Hospitality

**Featured Projects:**
${projectList}

View all projects at [Projects Page](/projects) to see live examples! 🌐`;
    }

    getEcommerceResponse() {
        return `**E-commerce Solutions** 🛒

Eshban specializes in building powerful online stores:

✅ **WooCommerce Development**
✅ Product Catalog Management
✅ Secure Payment Integration
✅ Inventory Management
✅ Mobile-optimized Shopping

**Notable E-commerce Projects:**
• Apex Sports India - Sports equipment
• Kohinoor Gems & Jewellers - Luxury jewelry
• AIM Computers - Electronics retail
• Chanda Furniture - Home furnishings

Ready to launch your online store? [Contact Eshban](/contact.html)! 💼`;
    }

    getCertificationsResponse() {
        return `**Professional Certifications** 🏆

Eshban holds **40+ verified certifications** from top platforms:

**Platforms:**
• HubSpot Academy
• Google
• Udemy
• HP LIFE
• Great Learning Academy

**Certification Areas:**
• Web Development (Full Stack)
• Digital Marketing
• AWS Cloud
• Artificial Intelligence
• Data Science
• Cybersecurity
• Project Management

View all certifications at [Certifications Page](/certifications)! 📜`;
    }

    getServicesResponse() {
        return `**Services Offered** 🚀

Eshban Oliver provides comprehensive web solutions:

**Development Services:**
• Custom Website Design
• E-commerce Development
• WordPress Solutions
• React Native Mobile Apps
• Landing Pages

**Additional Services:**
• SEO Optimization
• UI/UX Design
• Website Maintenance
• Performance Optimization
• Custom Web Applications

**Industries Served:**
Business, Healthcare, Education, Hospitality, E-commerce, Spa & Wellness, and more!

[Get a Free Quote](/contact.html) today! 💰`;
    }

    getExperienceResponse() {
        return `**Experience & Expertise** ⭐

Eshban Oliver has an impressive track record:

📊 **60+ Projects** delivered successfully
🏢 **Diverse Industries** - From healthcare to e-commerce
🎓 **40+ Certifications** - Continuous learning
🌐 **International Clients** - Trusted worldwide

Each project is crafted with attention to detail, SEO optimization, and a focus on converting visitors into customers!

See the [Portfolio](/projects) for live examples! 🔗`;
    }

    getLocationResponse() {
        return `**Location** 📍

Eshban Oliver is based in **Udaipur, Rajasthan, India** - the beautiful City of Lakes!

🌍 **Services Available:**
• Local clients in Udaipur & Rajasthan
• Remote projects across India
• International clients worldwide

Distance is never a barrier! Eshban works with clients globally through modern collaboration tools.

Contact for your project at [Contact Page](/contact.html)! 🌐`;
    }

    getPricingResponse() {
        return `**Pricing & Quotes** 💰

Every project is unique! Pricing depends on:

• Project complexity
• Number of pages
• Features required
• Timeline

**What's Included:**
✅ Free initial consultation
✅ Custom design
✅ SEO optimization
✅ Mobile responsiveness
✅ Post-launch support

Get a **FREE personalized quote** by visiting the [Contact Page](/contact.html)!

Eshban offers competitive rates with premium quality! 🎯`;
    }

    getWordPressResponse() {
        return `**WordPress Development** 📝

Eshban is an expert WordPress developer:

**WordPress Services:**
• Custom Theme Development
• Plugin Customization
• WooCommerce Stores
• Blog & Portfolio Sites
• Business Websites

**Why Choose WordPress?**
✅ Easy content management
✅ SEO-friendly structure
✅ Huge plugin ecosystem
✅ Mobile responsive
✅ Cost-effective

Many projects like Lifecare Spa, Mahendra Resort, and more are built on WordPress!

[Get a WordPress Quote](/contact.html) 🚀`;
    }

    getMobileResponse() {
        return `**Mobile App Development** 📱

Eshban specializes in React Native development:

**Mobile Capabilities:**
• Cross-platform Apps (iOS & Android)
• React Native Development
• Mobile-first Web Design
• Progressive Web Apps (PWA)
• Responsive Websites

Build once, deploy everywhere! React Native allows creating apps for both iOS and Android from a single codebase.

Interested in mobile development? [Contact Eshban](/contact.html)! 📲`;
    }

    getSEOResponse() {
        return `**SEO Optimization** 🔍

Every website by Eshban is SEO-optimized:

**SEO Services Included:**
• Meta tags optimization
• Semantic HTML structure
• Fast page loading
• Mobile responsiveness
• Image optimization
• Schema markup
• Keyword optimization

**SEO Certifications:**
Eshban holds certifications in Digital Marketing and SEO from HubSpot, IIDE, and more!

Rank higher on Google with [Eshban's web solutions](/contact.html)! 📈`;
    }

    getBestDeveloperResponse() {
        return `**Best Web Developer in Udaipur** 🏅

Why Eshban Oliver is considered the best?

✅ **60+ Successful Projects** - Proven track record
✅ **40+ Certifications** - Verified expertise
✅ **Diverse Portfolio** - Multiple industries served
✅ **Modern Technologies** - Latest tech stack
✅ **SEO Focus** - Websites that rank
✅ **Client Satisfaction** - Happy customers

From e-commerce to corporate websites, Eshban delivers premium quality at competitive prices!

Experience the difference at [Portfolio](/projects)! 🚀`;
    }

    getThankYouResponse() {
        const responses = [
            "You're welcome! 😊 Feel free to ask if you have more questions about Eshban's services!",
            "Happy to help! 🌟 Don't hesitate to reach out if you need anything else!",
            "My pleasure! 🎉 Eshban would love to work on your project. Visit the [Contact Page](/contact.html) when you're ready!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getGoodbyeResponse() {
        const responses = [
            "Goodbye! 👋 Thanks for visiting Eshban Oliver's portfolio. Come back anytime!",
            "See you later! 🌟 Remember, Eshban is just a message away for your next project!",
            "Take care! 😊 Visit the [Contact Page](/contact.html) when you're ready to start your project!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getDefaultResponse() {
        const defaults = [
            `I'm not sure I understood that. 🤔 You can ask me about:\n\n• Eshban Oliver's **skills & technologies**\n• His **projects & portfolio**\n• **Certifications**\n• **Services offered**\n• How to **contact** him\n\nWhat would you like to know?`,
            `Let me help you better! 💡 Try asking about:\n\n• "What projects has Eshban built?"\n• "What technologies does he use?"\n• "How can I contact Eshban?"\n• "What services are offered?"\n\nI'm here to help! 🚀`,
            `I'd love to help! 🌟 I can tell you about:\n\n• **About** Eshban Oliver\n• **Projects** - 60+ completed\n• **Skills** - 20+ technologies\n• **Certifications** - 40+ credentials\n• **Services** available\n\nJust ask! 😊`
        ];
        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    // Create chatbot UI
    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
    }

    createChatbotHTML() {
        const iconPath = document.querySelector('script[src*="chatbot.js"]').getAttribute('src').replace('js/chatbot.js', 'img/nexure-icon.png');
        const chatbotHTML = `
        <div id="nexure-chatbot" class="nexure-chatbot">
            <!-- Chat Toggle Button (Left Side) -->
            <button id="nexure-toggle" class="nexure-toggle" aria-label="Open chat">
                <img src="${iconPath}" alt="Nexure" class="nexure-icon">
                <span class="nexure-pulse"></span>
            </button>
            
            <!-- Chat Window -->
            <div id="nexure-window" class="nexure-window">
                <div class="nexure-header">
                    <div class="nexure-header-info">
                        <img src="${iconPath}" alt="Nexure" class="nexure-avatar">
                        <div>
                            <h4>Nexure</h4>
                            <span class="nexure-status">AI Assistant</span>
                        </div>
                    </div>
                    <button id="nexure-close" class="nexure-close" aria-label="Close chat">×</button>
                </div>
                
                <div id="nexure-messages" class="nexure-messages">
                    <div class="nexure-message nexure-bot">
                        <img src="${iconPath}" alt="Nexure" class="nexure-msg-avatar">
                        <div class="nexure-msg-content">
                            <p>Hello! 👋 I'm <strong>Nexure</strong>, Eshban Oliver's AI assistant. I can help you learn about his web development services, projects, certifications, and more!</p>
                            <p>What would you like to know today?</p>
                        </div>
                    </div>
                </div>
                
                <div class="nexure-suggestions">
                    <button class="nexure-suggestion" data-query="What projects has Eshban built?">Projects</button>
                    <button class="nexure-suggestion" data-query="What are Eshban's skills?">Skills</button>
                    <button class="nexure-suggestion" data-query="How can I contact Eshban?">Contact</button>
                    <button class="nexure-suggestion" data-query="What services are offered?">Services</button>
                </div>
                
                <div class="nexure-input-area">
                    <input type="text" id="nexure-input" placeholder="Ask me anything..." autocomplete="off">
                    <button id="nexure-send" aria-label="Send message">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const toggle = document.getElementById('nexure-toggle');
        const closeBtn = document.getElementById('nexure-close');
        const sendBtn = document.getElementById('nexure-send');
        const input = document.getElementById('nexure-input');
        const suggestions = document.querySelectorAll('.nexure-suggestion');

        toggle?.addEventListener('click', () => this.toggleChat());
        closeBtn?.addEventListener('click', () => this.closeChat());
        sendBtn?.addEventListener('click', () => this.sendMessage());

        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        suggestions.forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.dataset.query;
                input.value = query;
                this.sendMessage();
            });
        });
    }

    toggleChat() {
        const window = document.getElementById('nexure-window');
        const toggle = document.getElementById('nexure-toggle');
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            window.classList.add('active');
            toggle.classList.add('active');
            document.getElementById('nexure-input')?.focus();
        } else {
            window.classList.remove('active');
            toggle.classList.remove('active');
        }
    }

    closeChat() {
        const window = document.getElementById('nexure-window');
        const toggle = document.getElementById('nexure-toggle');
        this.isOpen = false;
        window.classList.remove('active');
        toggle.classList.remove('active');
    }

    sendMessage() {
        const input = document.getElementById('nexure-input');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTyping();

        // Get response after a short delay
        setTimeout(() => {
            this.hideTyping();
            const response = this.getResponse(message);
            this.addMessage(response, 'bot');
        }, 800 + Math.random() * 500);
    }

    addMessage(content, type) {
        const messagesContainer = document.getElementById('nexure-messages');
        const iconPath = document.querySelector('script[src*="chatbot.js"]').getAttribute('src').replace('js/chatbot.js', 'img/nexure-icon.png');

        // Parse markdown-like formatting
        const formattedContent = this.formatMessage(content);

        const messageHTML = type === 'bot'
            ? `<div class="nexure-message nexure-bot">
                <img src="${iconPath}" alt="Nexure" class="nexure-msg-avatar">
                <div class="nexure-msg-content">${formattedContent}</div>
               </div>`
            : `<div class="nexure-message nexure-user">
                <div class="nexure-msg-content">${formattedContent}</div>
               </div>`;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="nexure-link">$1</a>')
            .replace(/\n/g, '<br>')
            .replace(/• /g, '<span class="nexure-bullet">•</span> ');
    }

    showTyping() {
        const iconPath = document.querySelector('script[src*="chatbot.js"]').getAttribute('src').replace('js/chatbot.js', 'img/nexure-icon.png');
        const messagesContainer = document.getElementById('nexure-messages');
        const typingHTML = `
            <div class="nexure-message nexure-bot nexure-typing" id="nexure-typing">
                <img src="${iconPath}" alt="Nexure" class="nexure-msg-avatar">
                <div class="nexure-msg-content">
                    <div class="nexure-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>`;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typing = document.getElementById('nexure-typing');
        typing?.remove();
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.nexure = new NexureChatbot();
});
