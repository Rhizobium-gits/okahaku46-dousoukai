// パスワード
const CORRECT_PASSWORD = 'okahaku.asanogakunenn.4346';
let isAuthenticated = false;

// 画像フェードエフェクト
let imageOpacity = 0.2;
let fadeDirection = 1;

setInterval(() => {
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        imageOpacity += fadeDirection * 0.01;
        if (imageOpacity >= 0.2) {
            fadeDirection = -1;
        } else if (imageOpacity <= 0.05) {
            fadeDirection = 1;
        }
        heroImage.style.opacity = imageOpacity;
    }
}, 100);

// モーダル制御
const passwordModal = document.getElementById('passwordModal');
const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('passwordInput');
const errorMessage = document.getElementById('errorMessage');
const cancelBtn = document.getElementById('cancelBtn');
const unlockBtn = document.getElementById('unlockBtn');

// モーダルを開く
function openModal() {
    passwordModal.classList.add('active');
    passwordInput.focus();
}

// モーダルを閉じる
function closeModal() {
    passwordModal.classList.remove('active');
    passwordInput.value = '';
    errorMessage.textContent = '';
}

// パスワード確認
passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = passwordInput.value;
    
    if (password === CORRECT_PASSWORD) {
        isAuthenticated = true;
        closeModal();
        // 参加者コンテンツを表示
        document.getElementById('participantsLocked').style.display = 'none';
        document.getElementById('participantsContent').style.display = 'block';
        // 参加者セクションにスクロール
        document.getElementById('participants').scrollIntoView({ behavior: 'smooth' });
    } else {
        errorMessage.textContent = 'パスワードが正しくありません';
    }
});

// キャンセルボタン
cancelBtn.addEventListener('click', closeModal);

// アンロックボタン
unlockBtn.addEventListener('click', openModal);

// ナビゲーション制御
const homePage = document.getElementById('homePage');
const committeePage = document.getElementById('committeePage');
const aboutPage = document.getElementById('aboutPage');

// ページ表示関数
function showPage(page) {
    homePage.style.display = 'none';
    committeePage.style.display = 'none';
    aboutPage.style.display = 'none';
    
    if (page === 'home') {
        homePage.style.display = 'block';
    } else if (page === 'committee') {
        committeePage.style.display = 'block';
    } else if (page === 'about') {
        aboutPage.style.display = 'block';
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ナビゲーションリンク
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const section = link.getAttribute('data-section');
        const page = link.getAttribute('data-page');
        
        if (page) {
            // ページ切り替え
            showPage(page);
        } else if (section) {
            // セクションスクロール
            if (homePage.style.display === 'none') {
                showPage('home');
                setTimeout(() => {
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// 参加者ナビゲーションリンク
document.getElementById('participantsNavLink').addEventListener('click', () => {
    if (homePage.style.display === 'none') {
        showPage('home');
    }
    
    setTimeout(() => {
        if (!isAuthenticated) {
            openModal();
        } else {
            document.getElementById('participants').scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
});

// 初期表示
showPage('home');
