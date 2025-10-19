# 🚀 Quick Setup Guide - en-git Chrome Extension

## ✅ What's Been Created

Your Chrome extension is ready! Here's what we built:

### Files Created:

```
chrome-extension/
├── manifest.json          ✅ Extension config
├── popup.html            ✅ Popup UI structure
├── popup.js              ✅ Built React app (247KB)
├── background.js         ✅ Background service worker
├── content.js            ✅ GitHub page integration
├── content.css           ✅ Injected styles
├── assets/
│   └── popup.css         ✅ Built styles (118KB)
├── icons/
│   ├── icon16.svg        ✅ Small icon
│   ├── icon48.svg        ✅ Medium icon
│   └── icon128.svg       ✅ Large icon
└── README.md             ✅ Documentation
```

## 🎯 Load Extension in Chrome (NOW!)

1. **Open Chrome Extensions Page:**

   - Type in address bar: `chrome://extensions/`
   - OR: Menu → More Tools → Extensions

2. **Enable Developer Mode:**

   - Toggle the switch in the **top-right corner**

3. **Load Your Extension:**

   - Click **"Load unpacked"** button
   - Navigate to: `C:\Users\tejas\Desktop\Github\chrome-extension`
   - Click **"Select Folder"**

4. **Success! 🎉**
   - You should see "en-git" in your extensions list
   - The icon will appear in your Chrome toolbar

## 🧪 Test Your Extension

### Test 1: Popup

1. Click the extension icon in Chrome toolbar
2. You should see the en-git popup with:
   - en-git branding
   - Input field for GitHub username
   - Analyze and Compare tabs
   - Open App button

### Test 2: GitHub Integration

1. Go to any GitHub profile (e.g., `https://github.com/torvalds`)
2. You should see an "**Analyze with en-git**" button
3. Click it → Opens analysis in new tab

### Test 3: Repository Integration

1. Go to any GitHub repo (e.g., `https://github.com/facebook/react`)
2. You should see a "**Deep Dive**" button
3. Click it → Opens repo analysis in new tab

### Test 4: Context Menu

1. Right-click any GitHub profile link on any page
2. Select "**Analyze with en-git**" from context menu
3. Opens analysis in new tab

## 🐛 Troubleshooting

**Popup is blank?**

- Right-click extension icon → "Inspect popup"
- Check console for errors
- Try reloading extension

**Buttons not showing on GitHub?**

- Refresh the GitHub page
- Check if content script loaded (F12 → Console → look for "en-git content script loaded")

**Extension won't load?**

- Make sure you're selecting the `chrome-extension` folder, not the root
- Check that `manifest.json` exists in the folder

## 🎨 Customizing Icons (Optional)

The current icons are SVG placeholders. To create professional PNG icons:

1. **Design your icons** (recommended sizes: 16x16, 48x48, 128x128)
2. **Export as PNG**
3. **Replace files** in `chrome-extension/icons/`
4. **Update manifest.json** to use `.png` instead of `.svg`
5. **Reload extension** in Chrome

## 🔄 Making Changes

After editing the React app (ExtensionApp.jsx, etc.):

```powershell
cd C:\Users\tejas\Desktop\Github\client
npm run build:extension
```

Then in Chrome:

- Go to `chrome://extensions/`
- Click the **refresh icon** ↻ on your extension

## 🌐 Publishing (Later)

When ready to publish to Chrome Web Store:

1. Create high-quality icons (PNG format)
2. Take 5 screenshots (1280x800 recommended)
3. Write store description
4. Create promotional tile (440x280)
5. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
6. Pay $5 one-time fee
7. Upload extension ZIP
8. Submit for review

## 📝 Next Steps

- [ ] Load extension in Chrome
- [ ] Test all features
- [ ] Design custom icons
- [ ] Add more features (see README.md)
- [ ] Share with friends for feedback
- [ ] Publish to Chrome Web Store

---

**Need help?** Check the full README.md in the chrome-extension folder!

**Built with:** React + Vite + shadcn/ui + Chrome Extensions API v3
