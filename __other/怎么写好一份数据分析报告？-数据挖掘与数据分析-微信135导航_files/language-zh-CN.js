jQuery(function($){
	$.jslanguage = {
		selectAll: '全选',
		noSelect: '没有选中项',
		confirm_trash: '您确认要删除数据到回收站吗？',
		confirm_delete: '您确认要彻底删除数据吗？',
		confirm_restore: '您确认要从回收站恢复数据吗？',
		confirm_publish: '您确认要发布这些数据吗？',
		confirm_batchEdit: '批量修改将会修改您选择的所有行的值，您确认要进行批量修改吗？',
		confirm_unpublish: '您确认要使这些发布的数据下线吗？',
		needlogin:'需要登录才能继续操作',
		dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
		dayNamesMin: ['日','一','二','三','四','五','六'],
		weekHeader: '周',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '',
		noSelect: '没有选中项',
		wysiswyg_mode: '不能在查看源代码时插入',
		select_editor: '请先在编辑器中选择要插入的位置',
		insert_portlet:'插入portlet',
		
		use_editor: '使用编辑器',
		destory_editor: '注销编辑器'
	};
	
	/* jquery tools validator language. */
	if(typeof $.tools !='undefined' && typeof $.tools.validator !='undefined'){
		$.tools.validator.localize("zh", {
			'*'			: '请检查输入格式是否正确',
			':email'  	: '请输入有效的邮箱地址。',
			':number' 	: '请输入有效的数字。',
			':url' 		: '请输入有效的网址。',
			'[max]'	 	: '最大值不大于$1',
			'[min]'		: '最小值不小于$1',
			'[required]'	: '此项必填，不允许为空。'
		});
	}
});
