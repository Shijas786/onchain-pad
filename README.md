# 📝 Onchain Pad

<div align="center">

![Onchain Pad Banner](https://onchain-note.vercel.app/icon.png)

**A decentralized note-taking app on Base blockchain**

[Live Demo](https://onchain-note.vercel.app) · [Smart Contract](https://basescan.org/address/0x2df31A447D7a662D95F334aB04EaaC6EDA33D981) · [Farcaster Mini App](https://onchain-note.vercel.app)

[![Built on Base](https://img.shields.io/badge/Built%20on-Base-0052FF?style=for-the-badge&logo=coinbase)](https://base.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Farcaster](https://img.shields.io/badge/Farcaster-Mini%20App-8A63D2?style=for-the-badge&logo=farcaster)](https://warpcast.com/)

</div>

---

## 🌟 Overview

**Onchain Pad** is a minimalist, decentralized note-taking application that lives entirely on the Base blockchain. Write short, permanent notes that are stored immutably onchain, creating a public, censorship-resistant digital notepad. Every note is a piece of history, timestamped and attributed to your wallet address.

Perfect for:
- 💭 Sharing quick thoughts
- 📣 Making public announcements
- 🎯 Leaving onchain messages
- ✨ Creating permanent digital artifacts

## ✨ Features

### Core Functionality
- 🔗 **Fully Onchain** - All notes stored permanently on Base blockchain
- 📏 **80-Character Limit** - Encourages concise, Twitter-style messages
- 🎨 **Sticky Note UI** - Beautiful, minimal interface with smooth animations
- ⚡ **Real-time Updates** - Instant display of new notes
- 🔐 **Wallet Integration** - Seamless Web3 wallet connection

### Farcaster Integration
- 📱 **Mini App** - Runs natively inside Farcaster clients
- 🎯 **One-Click Launch** - Direct access from Warpcast
- 🔄 **Auto-Connect** - Automatic wallet connection in Farcaster environment
- 🎪 **Frame Compatible** - Works with Farcaster Frames protocol

### Technical Highlights
- ⚡ Lightning-fast with Next.js 14 App Router
- 🎭 Smooth animations powered by Framer Motion
- 🎨 Modern UI with Tailwind CSS
- 🔌 Multi-wallet support (Coinbase Wallet, MetaMask, WalletConnect)
- 📊 Real-time blockchain data fetching
- 🏗️ Type-safe with TypeScript

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** React Hooks + TanStack Query

### Blockchain & Web3
- **Network:** Base (Ethereum L2)
- **Web3 Library:** Wagmi v3 + Viem
- **Wallet Connection:** Reown AppKit (formerly WalletConnect)
- **Smart Contract:** Solidity ^0.8.20

### Farcaster
- **SDK:** @farcaster/frame-sdk
- **Wagmi Connector:** @farcaster/miniapp-wagmi-connector
- **Integration:** Native mini-app support with auto-connect
- **Auto-connect:** Instant wallet connection in Farcaster clients
- **Chain Switching:** Automatic Base network switching

## 📄 Smart Contract

**Contract Address (Base Mainnet):**  
[`0x2df31A447D7a662D95F334aB04EaaC6EDA33D981`](https://basescan.org/address/0x2df31A447D7a662D95F334aB04EaaC6EDA33D981)

### Contract Functions

```solidity
// Add a new note (max 80 characters)
function addNote(string calldata content) external

// Get total number of notes
function getNotesCount() external view returns (uint256)

// Get a specific note by index
function getNote(uint256 index) external view returns (Note memory)
```

### Note Structure
```solidity
struct Note {
    address author;    // Wallet address of the author
    string content;    // Note content (max 80 chars)
    uint256 timestamp; // Block timestamp
}
```

### Events
```solidity
event NoteAdded(
    address indexed author,
    string content,
    uint256 timestamp
);
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Web3 wallet (Coinbase Wallet, MetaMask, etc.)
- Base network added to your wallet

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Shijas786/onchain-pad.git
cd onchain-pad
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
NEXT_PUBLIC_ONCHAIN_NOTES_ADDRESS=0x2df31A447D7a662D95F334aB04EaaC6EDA33D981
```

Get your Reown Project ID from [Reown Cloud](https://cloud.reown.com/)

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Usage

### Writing Your First Note

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the top right
   - Select your preferred wallet
   - Approve the connection

2. **Compose a Note**
   - Type your message (max 80 characters)
   - Click "Post Note"
   - Confirm the transaction in your wallet

3. **View Notes**
   - Your note appears instantly after confirmation
   - All notes are displayed in a grid
   - Scroll to see historical notes

### Using in Farcaster

1. Open [Onchain Pad](https://onchain-note.vercel.app) in Warpcast
2. Your wallet automatically connects
3. Start posting notes immediately!

## 🏗️ Project Structure

```
onchain-pad/
├── contracts/
│   └── OnchainNotes.sol          # Smart contract source
├── public/
│   ├── .well-known/
│   │   └── farcaster.json        # Farcaster manifest
│   └── icon.png                  # App icon
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── providers.tsx         # Context providers
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── NoteComposer.tsx      # Note input component
│   │   ├── NotesGrid.tsx         # Notes display grid
│   │   └── FarcasterProvider.tsx # Farcaster integration
│   └── lib/
│       ├── appkit.ts             # AppKit configuration
│       ├── wagmi.ts              # Wagmi configuration
│       └── contract.ts           # Contract ABI & address
├── package.json
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Key Components

### NoteComposer
Text input with character counter and transaction handling
```tsx
<NoteComposer />
```

### NotesGrid
Displays all onchain notes in a responsive grid
```tsx
<NotesGrid />
```

### FarcasterProvider
Handles Farcaster SDK initialization and auto-connect
```tsx
<FarcasterProvider>
  {children}
</FarcasterProvider>
```

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Shijas786/onchain-pad)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Important Files for Farcaster

Ensure these files exist for Farcaster mini-app functionality:
- `public/.well-known/farcaster.json` - Manifest file
- `public/icon.png` - App icon
- `public/screenshot.png` - Screenshot for app store

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build check
npm run build
```

## 🔐 Security Considerations

- ✅ Contract validates note length (max 80 chars)
- ✅ No admin functions - fully decentralized
- ✅ All notes are public and permanent
- ✅ Gas-efficient design
- ⚠️ Notes cannot be edited or deleted once posted
- ⚠️ Be mindful of what you post - it's permanent!

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Base](https://base.org) - For the amazing L2 blockchain
- [Farcaster](https://farcaster.xyz) - For the mini-app framework
- [Reown](https://reown.com) - For wallet connection infrastructure
- [Vercel](https://vercel.com) - For hosting platform
- [Coinbase](https://www.coinbase.com) - For smart wallet technology

## 📱 Links

- **Live App:** https://onchain-note.vercel.app
- **Smart Contract:** [BaseScan](https://basescan.org/address/0x2df31A447D7a662D95F334aB04EaaC6EDA33D981)
- **Farcaster:** [Warpcast Link](https://onchain-note.vercel.app)
- **Creator:** [@shijas](https://warpcast.com/shijas)

## 💡 Future Roadmap

- [ ] Thread/reply functionality
- [ ] Like/react to notes
- [ ] Tag system for categorization
- [ ] User profiles and note history
- [ ] Export notes as NFTs
- [ ] Multi-language support
- [ ] Custom themes
- [ ] Note search and filters

## 📊 Stats

- **Network:** Base Mainnet
- **Contract:** Verified on BaseScan
- **Max Note Length:** 80 characters
- **Average Gas Cost:** ~50,000 gas per note
- **Total Notes:** Check [live contract](https://basescan.org/address/0x2df31A447D7a662D95F334aB04EaaC6EDA33D981)

---

<div align="center">

**Built with ❤️ on Base**

Made by [Shijas](https://github.com/Shijas786)

Star ⭐ this repo if you find it useful!

</div>
