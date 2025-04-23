# TalkMate AI Chatbot

![Chatbot Demo](./public/img/aibot.gif)

## Overview

TalkMate is an **AI-powered chatbot** that delivers intelligent, contextual conversations through a modern web interface. Built with **HTML5**, **CSS3**, and **JavaScript**, and deployed via **Vercel**, this project leverages Hugging Face's transformer models for advanced natural language understanding.

## Key Features

### Core Functionality
- **Hugging Face AI Integration**: Powered by `facebook/blenderbot-400M-distill` for human-like conversations
- **Vercel Serverless Deployment**: Secure API endpoints with automatic scaling
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

### Enhanced User Experience
- **Dark/Light Mode Toggle**: Eye-friendly theme switching with system preference detection
- **Chat History**: Persistent conversation sessions with quick access to previous chats
- **Modern UI**: ChatGPT-inspired interface with message bubbles and typing indicators

### Technical Highlights
- **Environment Variable Security**: Protected API keys using Vercel's configuration
- **Optimized API Calls**: Automatic retries with exponential backoff for Hugging Face
- **Modular Architecture**: Clean separation of frontend and backend components

## Future Roadmap

### Near-Term Enhancements
- [ ] **User Authentication**: JWT-based login system
- [ ] **Conversation Memory**: Context-aware responses using chat history
- [ ] **Multi-model Support**: Fallback to alternative AI models when primary is unavailable

### Long-Term Vision
- [ ] **File Upload Processing**: PDF/Word document analysis
- [ ] **Voice Interaction**: Speech-to-text and text-to-speech integration
- [ ] **Admin Dashboard**: Conversation analytics and model performance metrics

## Technology Stack

### Frontend
- **HTML5** - Semantic page structure
- **CSS3** - Flexbox/Grid layouts with CSS variables for theming
- **JavaScript ES6+** - Async/await for API interactions

### Backend
- **Vercel Serverless Functions** - Node.js API endpoints
- **Hugging Face Inference API** - Transformer model hosting

### DevOps
- **Vercel Platform** - CI/CD pipeline and hosting
- **Environment Variables** - Secure credential management

## Installation & Deployment

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Milinda55/TalkMate-Ai-chatBot.git
   cd TalkMate-Ai-chatBot
   ```
2. **Create .env.local file**:

   ```env
   HUGGINGFACE_API_KEY=your_test_key_here
   ```
3. **Start dev server**:

   ```bash
   vercel dev
   ```
### Production Deployment

1. **Set up Vercel environment variables**:

   ```bash
   vercel env add HUGGINGFACE_API_KEY production
   ```
2. **Deploy**:

   ```bash
   vercel --prod
   ```

## Usage Guide

### Starting a Chat
- **New Conversation**: Click the "New Chat" button to start fresh
- **Chat History**: Access previous conversations from the left sidebar
- **Persistent Sessions**: Chats are automatically saved during your session

### Theme Customization
- **Toggle Button**: Click the moon/sun icon in the top-right corner
- **System Preference**: Automatically detects your OS color scheme
- **Session Memory**: Remembers your last selected theme

### Advanced Features
| Command          | Description                          |
|------------------|--------------------------------------|
| `/help`          | Show available commands              |
| `/clear`         | Reset current conversation           |
| `/theme [dark/light]` | Force theme change           |

**Message Actions**:
- Long-press messages to edit or regenerate
- Click profile icons to view participant info

## Troubleshooting

| Error | Solution | Additional Info |
|-------|----------|-----------------|
| 503 Service Unavailable | Wait 30 seconds and retry | Model may be loading |
| 429 Rate Limit Exceeded | [Upgrade account](https://huggingface.co/pricing) or wait 1 hour | Free tier has 500 requests/day |
| 404 API Not Found | Check Vercel deployment logs | Ensure `api/chatbot.js` exists |

## License

[MIT License](LICENSE.txt) - Copyright © 2025 [Talkmate Ai Chatbot]

**Permissions**:
- Commercial use
- Modification
- Private use

**Limitations**:
- Liability
- Warranty

## Acknowledgments

We extend our gratitude to:

- [Hugging Face](https://huggingface.co) for their cutting-edge NLP models
- [Vercel](https://vercel.com) for their seamless deployment platform
- [Font Awesome](https://fontawesome.com) for the beautiful icons
- The open-source community for invaluable contributions

---

**Pro Tip**: For faster responses during peak times, try using the `/retry` command when encountering errors.
