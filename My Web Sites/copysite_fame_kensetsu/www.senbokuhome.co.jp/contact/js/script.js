$(function() {
	var adress_selector = '.az_addr';		// 住所要素のセレクタ
	var button_selector = '.az_button';		// 郵便番号検索ボタンのセレクタ
	var postal_selector = '.az_postal';		// 郵便番号要素のセレクタ

	var $address = $(adress_selector);			// 住所のテキストフィールド
	var dest_name = $address.attr('name');
	var $form = $('form');

	// 郵便番号 > 住所変換
	$(document).on('click', button_selector, function(){
		// 同じエリアにある郵便番号フィールドを取得
		$postal = $(this).closest('tr').find(postal_selector);
		if( $postal.length==1 ){
			AjaxZip3.zip2addr($postal.attr('name'),'',dest_name,dest_name);
		}else if( $postal.length==2 ){
			var name1 = $postal.eq(0).attr('name');
			var name2 = $postal.eq(1).attr('name');

			if( name1 == name2 ){
				// フィールド名が同じ場合
				// ※postal[] など、配列形式の記述を想定
				// 名前の異なる一時的なhiddenを作り、それに対しajaxzipを実行する

				if( !$postal.eq(0).attr('id') ) $postal.eq(0).attr('id') = name1+'_1';
				if( !$postal.eq(1).attr('id') ) $postal.eq(1).attr('id') = name1+'_2';
				
				var hidden = '';
				var names = [];
				$postal.each(function(){
					var name = 'az_postal_' + $(this).attr('id');
					names.push( name );
					if( $form.find('[name='+name+']').length == 0 )
						$form.append( '<input type="hidden" name="'+ name +'" class="az_postal_temp" />' );

					$form.find('[name='+name+']').val( $(this).val() );
				});

				AjaxZip3.zip2addr(names[0],names[1],dest_name,dest_name);
				$('.az_postal_temp').remove();

			}else{
				AjaxZip3.zip2addr(name1,name2,dest_name,dest_name);
			}
			
		}
		return false;
	});

	
});