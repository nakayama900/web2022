export default function (ref) {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabList = document.querySelector('[role="tablist"]');

    // 各タブに click イベントハンドラーを追加します
    tabs.forEach(tab => {
        tab.addEventListener("click", changeTabs);
    });

    // タブリストのタブ間の矢印ナビゲーションを有効にします
    let tabFocus = 0;

    tabList.addEventListener("keydown", e => {
        // 右に移動
        if (e.keyCode === 39 || e.keyCode === 37) {
            tabs[tabFocus].setAttribute("tabindex", -1);
            if (e.keyCode === 39) {
                tabFocus++;
                // 最後にいる場合は、最初に移動します
                if (tabFocus >= tabs.length) {
                    tabFocus = 0;
                }
                // 左に移動
            } else if (e.keyCode === 37) {
                tabFocus--;
                // 最初にいる場合は、最後に移動します
                if (tabFocus < 0) {
                    tabFocus = tabs.length - 1;
                }
            }

            tabs[tabFocus].setAttribute("tabindex", 0);
            tabs[tabFocus].focus();
        }
    });
}

function changeTabs(e) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

    // タブから現在すべての選択状態を取り除きます
    parent
        .querySelectorAll('[aria-selected="true"]')
        .forEach(t => t.setAttribute("aria-selected", false));

    // このタブを選択されたタブとして設定します
    target.setAttribute("aria-selected", true);

    // すべてのタブパネルを非表示にします
    // grandparent
    //   .querySelectorAll('[role="tabpanel"]')
    //   .forEach(p => p.setAttribute("hidden", true));

    // 選択されたパネルを表示します
    // grandparent.parentNode
    //   .querySelector(`#${target.getAttribute("aria-controls")}`)
    //   .removeAttribute("hidden");
}
