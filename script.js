document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // 移除所有 active class
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));

            // 加上 active class 給點擊的連結
            this.classList.add('active');

            // 顯示對應的區域
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active-section');
        });
    });

    // 卡片展開放大邏輯 (Modal)
    const cards = document.querySelectorAll('.card:not(.modal-card)');
    
    // 建立背景遮罩
    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';
    document.body.appendChild(overlay);

    // 建立一個獨立的 modal 容器放置在最上層（body），避免被 section 的 backdrop-filter 影響而模糊
    const modalContainer = document.createElement('div');
    modalContainer.className = 'card modal-card';
    document.body.appendChild(modalContainer);

    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 將此卡片的內容複製一份到獨立的 modalContainer 中
            modalContainer.innerHTML = this.innerHTML;
            
            // 加入關閉按鈕
            const closeBtn = document.createElement('div');
            closeBtn.className = 'close-btn';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            modalContainer.appendChild(closeBtn);
            
            // 綁定關閉事件
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                closeModal();
            });

            // 顯示動畫
            overlay.classList.add('active');
            modalContainer.classList.add('show');
            document.body.style.overflow = 'hidden'; // 防止背景滑動
        });
    });

    function closeModal() {
        modalContainer.classList.remove('show');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 點擊背景遮罩也可以關閉
    overlay.addEventListener('click', closeModal);
});
