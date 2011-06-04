(function($) {
$.fn.autoselect = function($o) {
	var _o = $.extend({
		defaultItem: '',
		clearUnmatched: true,
		staticList: true
	}, $o);

	return this.each(function() {
		var _ob = $(this);

		_ob.autocomplete({
			minLength: 0,
			source: _o.source,
			select: function($e, $ui) {
				this.value = $ui.item.value;
				if ($.isFunction(_o.callback)) {
					_o.callback($e, $ui);
				}
				return false;
			}
		})
		.bind('autocompleteopen focus keypress', function($e) {
			switch ($e.type) {
				case !$(this).autocomplete('widget').is(':visible') &&
					  _o.staticList &&
				'focus':
					$(this).val(_o.defaultItem)
						   .autocomplete('search', _o.defaultItem);
					_o.staticList = false;
					break;

				case 'autocompleteopen':
					var _menu = $(this).data('autocomplete').menu;
					_menu.activate(
						$.Event({ type: 'mouseenter' }),
						_menu.element.children().first()
					);
					break;

				case !$(this).autocomplete('widget').is(':visible') &&
					  $e.which === 13 &&
				'keypress':
					if (_o.clearUnmatched) {
						$(this).val('');
					}
					return false;
			}
		});

		return true;
	});
};
}(jQuery));
