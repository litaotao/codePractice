define(function(require, exports){

    /**
     *	图片上传组建
     **/
    require('jquery.jUploader-1.01.min.js');
    fmUpdata();

	


})


function fmUpdata() {
    jQ.jUploader({
        button: 'fm_img_updata', // 这里设置按钮id
        action: '/js_anthology.html?opt=uploadimg&huxiu_hash_code='+huxiu_hash_code, // 这里设置上传处理接口

        // 开始上传事件
        onUpload: function (fileName) {
            jQ('#tip').text('正在上传 ' + fileName + ' ...');
        },

        // 上传完成事件
        onComplete: function (fileName, response) {
            // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
            if (response.is_success=='1') {
                jQ('#fm-img').attr('src', response.server_pic).show();
				jQ('#fm-img-shuoming').remove();
                jQ('#database_pic').val(response.database_pic);
                jQ('#tip').text(fileName + ' 上传成功。');

                // 这里说明一下，一般还会在图片附近加添一个hidden的input来存放这个上传后的文件路径(response.fileUrl)，方便提交到服务器保存
            } else {
//                alert('上传失败');
                jQ('#tip').text('上传失败');
            }
        },

        // 系统信息显示（例如后缀名不合法）
        showMessage: function (message) {
            //jQ('#tip').text(message);
            alert(message);
        },

        // 取消上传事件
        onCancel: function (fileName) {
            jQ('#tip').text(fileName + ' 上传取消。');
        }
    });
}