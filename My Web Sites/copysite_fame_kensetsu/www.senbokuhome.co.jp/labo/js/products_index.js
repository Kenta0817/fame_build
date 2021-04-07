$(function() {
    $("#products").infiniteScroll({
        /*
        navSelector : '#page-nav', // ナビゲーション
        nextSelector : '#page-nav a', // 次ページへのリンク
        itemSelector : '.product', // 次ページ内で探す要素
        
        loading : {
            finishedMsg : 'これ以上、画像がありません。',
            img : '/labo/img/loader.gif'// ローディング画像
        }
        */
        path: '#page-nav a',
        append: '.product',
        status: '.scroller-status',
        hideNav: '#page-nav',
        button:'#page-nav a',
    });

});
