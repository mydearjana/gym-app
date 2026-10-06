// Database Mock State
const EXERCISES_DATA = {
    'pushdown': {
        name: 'ترايسبس بوش داون',
        category: 'arms',
        targetUser: 'Ahmed Hassan',
        targetWeight: 50,
        myWeight: 45,
        myRank: 7,
        rankings: [
            { rank: 1, name: 'الكابتن عمرو', weight: 65, verified: true, time: 'منذ يومين', avatar: 'ع' },
            { rank: 2, name: 'كريم علي', weight: 60, verified: true, time: 'منذ 5 أيام', avatar: 'ك' },
            { rank: 3, name: 'مصطفى زياد', weight: 55, verified: true, time: 'منذ أسبوع', avatar: 'م' },
            { rank: 6, name: 'Ahmed Hassan', weight: 50, verified: true, time: 'منذ 3 ساعات', avatar: 'A' },
            { rank: 7, name: 'أنت (محمد علي)', weight: 45, verified: true, time: 'رقمك الموثق', isMe: true, avatar: 'M' }
        ]
    },
    'curl': {
        name: 'بايسبس كيرل بار',
        category: 'arms',
        targetUser: 'عمرو القاضي',
        targetWeight: 45,
        myWeight: 40,
        myRank: 5,
        rankings: [
            { rank: 1, name: 'كريم علي', weight: 55, verified: true, time: 'منذ 3 أيام', avatar: 'ك' },
            { rank: 2, name: 'عمرو القاضي', weight: 45, verified: true, time: 'منذ يوم', avatar: 'ع' },
            { rank: 3, name: 'يوسف حسن', weight: 42.5, verified: true, time: 'منذ 4 أيام', avatar: 'ي' },
            { rank: 5, name: 'أنت (محمد علي)', weight: 40, verified: true, time: 'رقمك الموثق', isMe: true, avatar: 'M' }
        ]
    },
    'bench': {
        name: 'Bench Press (بنش فلات)',
        category: 'chest',
        targetUser: 'زياد جابر',
        targetWeight: 120,
        myWeight: 115,
        myRank: 4,
        rankings: [
            { rank: 1, name: 'الكابتن عمرو', weight: 150, verified: true, time: 'منذ أسبوع', avatar: 'ع' },
            { rank: 2, name: 'زياد جابر', weight: 120, verified: true, time: 'منذ 3 أيام', avatar: 'ز' },
            { rank: 3, name: 'طارق الجمال', weight: 117.5, verified: true, time: 'منذ يومين', avatar: 'ط' },
            { rank: 4, name: 'أنت (محمد علي)', weight: 115, verified: true, time: 'رقمك الموثق', isMe: true, avatar: 'M' }
        ]
    },
    'lat': {
        name: 'سحب عالي (Lat Pulldown)',
        category: 'back',
        targetUser: 'حسن درويش',
        targetWeight: 90,
        myWeight: 85,
        myRank: 6,
        rankings: [
            { rank: 1, name: 'مصطفى زياد', weight: 110, verified: true, time: 'منذ أسبوعين', avatar: 'م' },
            { rank: 2, name: 'حسن درويش', weight: 90, verified: true, time: 'منذ 4 أيام', avatar: 'ح' },
            { rank: 3, name: 'علي الدين', weight: 87.5, verified: true, time: 'منذ 5 أيام', avatar: 'ع' },
            { rank: 6, name: 'أنت (محمد علي)', weight: 85, verified: true, time: 'رقمك الموثق', isMe: true, avatar: 'M' }
        ]
    },
    'squat': {
        name: 'Squat (اسكوات)',
        category: 'legs',
        targetUser: 'يوسف العبد',
        targetWeight: 150,
        myWeight: 130,
        myRank: 8,
        rankings: [
            { rank: 1, name: 'الكابتن عمرو', weight: 200, verified: true, time: 'منذ شهر', avatar: 'ع' },
            { rank: 2, name: 'يوسف العبد', weight: 150, verified: true, time: 'منذ أسبوع', avatar: 'ي' },
            { rank: 3, name: 'كريم علي', weight: 140, verified: true, time: 'منذ يومين', avatar: 'ك' },
            { rank: 8, name: 'أنت (محمد علي)', weight: 130, verified: true, time: 'رقمك الموثق', isMe: true, avatar: 'M' }
        ]
    }
};

let currentSelectedExKey = 'pushdown';
let isFollowing = false;
let followersCount = 1200;

// Init App
window.addEventListener('DOMContentLoaded', () => {
    renderExerciseCarousel('all');
    loadExerciseData(currentSelectedExKey);
    renderProfilePRs();
});

// Tab Switcher
function switchTab(navId, tabId) {
    const tabs = ['tab-leaderboard', 'tab-feed', 'tab-record', 'tab-challenges', 'tab-profile'];
    tabs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));

    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.remove('hidden');

    const targetNav = document.getElementById(navId);
    if (targetNav) targetNav.classList.add('active');
}

// Muscle Group Filter
function filterMuscleGroup(chipEl, category) {
    document.querySelectorAll('.chip-item').forEach(c => c.classList.remove('active'));
    chipEl.classList.add('active');
    renderExerciseCarousel(category);
}

// Render Exercise Carousel
function renderExerciseCarousel(category) {
    const container = document.getElementById('exercises-carousel-container');
    container.innerHTML = '';

    let firstKey = null;
    let isCurrentKeyStillVisible = false;

    Object.keys(EXERCISES_DATA).forEach(key => {
        const ex = EXERCISES_DATA[key];
        if (category === 'all' || ex.category === category) {
            if (!firstKey) firstKey = key;
            if (key === currentSelectedExKey) isCurrentKeyStillVisible = true;
        }
    });

    if (!isCurrentKeyStillVisible && firstKey) {
        currentSelectedExKey = firstKey;
    }

    Object.keys(EXERCISES_DATA).forEach(key => {
        const ex = EXERCISES_DATA[key];
        if (category === 'all' || ex.category === category) {
            const btn = document.createElement('button');
            btn.className = `ex-pill ${key === currentSelectedExKey ? 'active' : ''}`;
            btn.innerText = ex.name;
            btn.onclick = () => selectExercisePill(btn, key);
            container.appendChild(btn);
        }
    });

    if (currentSelectedExKey) {
        loadExerciseData(currentSelectedExKey);
    }
}

// Select Exercise Pill
function selectExercisePill(pillEl, key) {
    document.querySelectorAll('.ex-pill').forEach(p => p.classList.remove('active'));
    pillEl.classList.add('active');
    currentSelectedExKey = key;
    loadExerciseData(key);
}

// Load Exercise Data & Recalculate Ranks
function loadExerciseData(key) {
    const data = EXERCISES_DATA[key];
    if (!data) return;

    data.rankings.sort((a, b) => b.weight - a.weight);

    data.rankings.forEach((item, idx) => {
        item.rank = idx + 1;
        if (item.isMe) {
            data.myRank = item.rank;
            data.myWeight = item.weight;
        }
    });

    const nextRival = data.rankings.find(r => r.rank === data.myRank - 1);
    if (nextRival) {
        data.targetUser = nextRival.name;
        data.targetWeight = nextRival.weight;
        const gap = data.targetWeight - data.myWeight;
        document.getElementById('target-banner-title').innerText = `ترتيبك #${data.myRank} — المنافس التالي: ${data.targetUser}`;
        document.getElementById('target-gap-text').innerText = gap > 0 ? `الفارق ${gap} kg` : `متساويان!`;
        document.getElementById('target-current-weight').innerText = `الوزن الحالي له: ${data.targetWeight} kg`;
    } else {
        document.getElementById('target-banner-title').innerText = `ترتيبك #${data.myRank} — أنت بطل هذا التمرين! 🏆`;
        document.getElementById('target-gap-text').innerText = `المركز الأول`;
        document.getElementById('target-current-weight').innerText = `الوزن الخاص بك: ${data.myWeight} kg`;
    }

    // Render Podium
    const podiumContainer = document.getElementById('podium-section');
    podiumContainer.innerHTML = '';

    const top3 = data.rankings.slice(0, 3);
    if (top3.length >= 3) {
        const podiumOrder = [top3[1], top3[0], top3[2]];
        podiumOrder.forEach(item => {
            const card = document.createElement('div');
            card.className = `podium-card rank-${item.rank}`;
            card.innerHTML = `
                <div class="podium-avatar">${item.avatar}</div>
                <div class="podium-name">${item.name}</div>
                <div class="podium-score">${item.weight} <span class="podium-unit">KG</span></div>
            `;
            podiumContainer.appendChild(card);
        });
    }

    renderLeaderboardList(data.rankings);
}

// Render Leaderboard List
function renderLeaderboardList(list) {
    const listContainer = document.getElementById('leaderboard-list-container');
    listContainer.innerHTML = '';

    if (list.length === 0) {
        listContainer.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-sub);">لا توجد نتائج مطابقة للبحث 🔍</div>`;
        return;
    }

    list.forEach(item => {
        const card = document.createElement('div');
        card.className = `list-card ${item.isMe ? 'user-me' : ''}`;
        card.innerHTML = `
            <div class="list-left">
                <div class="rank-badge ${item.rank === 1 ? 'top-gold' : ''}">${item.rank}</div>
                <div class="user-meta">
                    <h4>${item.name} ${item.verified ? '<span class="verified-tag">✓ موثق</span>' : ''}</h4>
                    <p>${item.time}</p>
                </div>
            </div>
            <div class="weight-display" style="${item.isMe ? 'color: var(--accent-red);' : ''}">
                ${item.weight} <span class="unit">KG</span>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

// Live Search
function handleSearch() {
    const query = document.getElementById('search-user-input').value.toLowerCase().trim();
    const currentData = EXERCISES_DATA[currentSelectedExKey];
    if (!currentData) return;

    const filtered = currentData.rankings.filter(r => r.name.toLowerCase().includes(query));
    renderLeaderboardList(filtered);
}

// Edit Profile, Gym & Experience Handlers
function openEditProfileModal() {
    const currentGym = document.getElementById('user-gym-name').innerText.replace('📍 ', '');
    const currentBio = document.getElementById('user-bio-text').innerText;
    
    document.getElementById('edit-gym-input').value = currentGym;
    document.getElementById('edit-bio-input').value = currentBio.includes('إضافة البايو') ? '' : currentBio;
    document.getElementById('edit-profile-modal').classList.remove('hidden');
}

function closeEditProfileModal() {
    document.getElementById('edit-profile-modal').classList.add('hidden');
}

function saveProfileChanges(e) {
    e.preventDefault();
    const newGym = document.getElementById('edit-gym-input').value.trim();
    const newBio = document.getElementById('edit-bio-input').value.trim();
    const newWeight = document.getElementById('edit-weight-input').value.trim();
    const newHeight = document.getElementById('edit-height-input').value.trim();
    const newExpYears = document.getElementById('edit-exp-years-input').value.trim();
    const newExpMonths = document.getElementById('edit-exp-months-input').value.trim();

    if (newGym) {
        document.getElementById('user-gym-name').innerText = `📍 ${newGym}`;
        document.getElementById('app-header-gym').innerText = newGym;
    }

    document.getElementById('user-bio-text').innerText = newBio ? newBio : 'حمو الكينج';

    if (newWeight) document.getElementById('body-weight-val').innerText = `${newWeight} kg`;
    if (newHeight) document.getElementById('body-height-val').innerText = `${newHeight} cm`;

    if (newExpYears || newExpMonths) {
        let expText = '';
        const y = parseInt(newExpYears) || 0;
        const m = parseInt(newExpMonths) || 0;

        if (y === 1) expText += 'سنة';
        else if (y === 2) expText += 'سنتين';
        else if (y > 2) expText += `${y} سنوات`;

        if (m > 0) {
            if (expText !== '') expText += ' و ';
            expText += `${m} شهور`;
        }

        if (expText !== '') {
            document.getElementById('body-exp-val').innerText = expText;
        }
    }

    closeEditProfileModal();
    showToast('تم حفظ التغييرات بنجاح! 🔥');
}

// Follow Button Toggle
function toggleFollow() {
    const btn = document.getElementById('btn-follow-me');
    const followersEl = document.getElementById('followers-val');

    isFollowing = !isFollowing;

    if (isFollowing) {
        btn.innerText = 'تتابعه ✔';
        btn.classList.add('following');
        followersCount += 1;
        showToast('تمت المتابعة بنجاح!');
    } else {
        btn.innerText = 'متابعة +';
        btn.classList.remove('following');
        followersCount -= 1;
    }

    followersEl.innerText = `${(followersCount / 1000).toFixed(1)}k`;
}

// Like Button Toggle
function toggleLike(btn) {
    btn.classList.toggle('liked');
    const countSpan = btn.querySelector('.like-count');
    if (btn.classList.contains('liked')) {
        countSpan.innerText = '25 عاش';
    } else {
        countSpan.innerText = '24 عاش';
    }
}

// Real Video File Picker Handlers
function triggerVideoUpload() {
    const fileInput = document.getElementById('pr-video-file');
    if (fileInput) {
        fileInput.click();
    }
}

function handleFileSelect(input) {
    const file = input.files[0];
    const dropzone = document.getElementById('upload-zone');
    const statusTitle = document.getElementById('upload-status-title');

    if (file) {
        if (dropzone) dropzone.classList.add('selected');
        if (statusTitle) {
            statusTitle.innerText = `✔ تم اختيار الفيديو: ${file.name}`;
        }
        showToast('تم اختيار فيديو التمرين بنجاح!');
    }
}

// Start Challenge
function startChallenge(exKey) {
    const select = document.getElementById('pr-exercise-select');
    if (select) select.value = exKey;
    switchTab('nav-rank', 'tab-record');
}

// PR Form Submit
function handlePRSubmit(e) {
    e.preventDefault();

    const exKey = document.getElementById('pr-exercise-select').value;
    const weightVal = parseFloat(document.getElementById('pr-weight-input').value);
    const videoFileInput = document.getElementById('pr-video-file');

    if (!weightVal || weightVal <= 0) {
        showToast('يرجى إدخال وزن صحيح', 'info');
        return;
    }

    const exData = EXERCISES_DATA[exKey];
    if (exData) {
        let myRecord = exData.rankings.find(r => r.isMe);
        if (myRecord) {
            if (weightVal > myRecord.weight) {
                myRecord.weight = weightVal;
                myRecord.time = 'منذ لحظات';
            }
        } else {
            exData.rankings.push({
                rank: 99,
                name: 'أنت (محمد علي)',
                weight: weightVal,
                verified: true,
                time: 'منذ لحظات',
                isMe: true,
                avatar: 'M'
            });
        }
    }

    showToast(`تم رفع فيديو الـ PR (${weightVal} KG) للمراجعة من الكابتن!`);

    // Reset Form & File Input
    document.getElementById('pr-weight-input').value = '';
    document.getElementById('pr-reps-input').value = '';
    if (videoFileInput) videoFileInput.value = '';
    
    const dropzone = document.getElementById('upload-zone');
    if (dropzone) dropzone.classList.remove('selected');
    
    const statusTitle = document.getElementById('upload-status-title');
    if (statusTitle) statusTitle.innerText = 'اضغط لاختيار فيديو التمرين من المعرض';

    loadExerciseData(exKey);
    renderProfilePRs();

    setTimeout(() => {
        switchTab('nav-rank', 'tab-leaderboard');
    }, 1200);
}

// Render Profile PRs
function renderProfilePRs() {
    const container = document.getElementById('profile-pr-list');
    if (!container) return;

    container.innerHTML = '';
    let totalCount = 0;

    Object.keys(EXERCISES_DATA).forEach(key => {
        const ex = EXERCISES_DATA[key];
        const myRecord = ex.rankings.find(r => r.isMe);
        if (myRecord) {
            totalCount++;

            const card = document.createElement('div');
            card.className = 'pr-item-card approved';
            card.innerHTML = `
                <div>
                    <div class="pr-title">${ex.name}</div>
                    <div class="pr-date">${myRecord.time} • <span class="status-badge-inline approved">✔ موثق بالفيديو</span></div>
                </div>
                <div class="weight-display" style="color: var(--accent-red);">${myRecord.weight} <span class="unit">KG</span></div>
            `;
            container.appendChild(card);
        }
    });

    const pendingCard = document.createElement('div');
    pendingCard.className = 'pr-item-card pending';
    pendingCard.innerHTML = `
        <div>
            <div class="pr-title">Squat (High Bar)</div>
            <div class="pr-date">منذ ساعة • <span class="status-badge-inline pending">⏳ قيد المراجعة</span></div>
        </div>
        <div class="weight-display">160 <span class="unit">KG</span></div>
    `;
    container.appendChild(pendingCard);

    document.getElementById('profile-records-count').innerText = totalCount + 1;
    document.getElementById('vs-my-score').innerText = `${EXERCISES_DATA['pushdown'].myWeight} kg`;
}

// Toast Notification Helper
let toastTimer = null;
function showToast(msg, type = 'success') {
    const toast = document.getElementById('app-toast');
    if (!toast) return;

    toast.innerText = msg;
    
    if (type === 'info') {
        toast.className = 'toast-box show info';
    } else {
        toast.className = 'toast-box show';
    }

    if (toastTimer) clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.className = 'toast-box';
    }, 2800);
}
