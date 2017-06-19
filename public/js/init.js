(function ($) {
    $(function () {

        $('.button-collapse').sideNav();
        $('.parallax').parallax();

    }); // end of document ready
})(jQuery); // end of jQuery name space

var appName;
var appId;
var appType;

$(document).ready(function(){
    //显示上传dialog
    $('.container i.material-icons').on('click',function(){
       $('#new-version-dialog').css('display','block');
        appName = $(this).attr('app-name');
        appId = $(this).attr('app-id');
        appType = $(this).attr('app-type');

       $('#new-version-dialog a.title').html('给' + appType + '的' + appName + '提交一个新版本吧');
    });

    //上传文件
    $('.upload-btn').on('click',function(){
        $(this).find('.upload-file')[0].click();
    });
    //上传文件
    $('.upload-icon-btn').on('click',function(){
        $(this).find('.upload-file')[0].click();
    });

    //监听上传文件
    $('.upload-file').on('change',function() {
        var filePath = $(this)[0].value;
        console.log(filePath);
        if (filePath) {
            var fileName = filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.length);
            $(this).parent().find('span').text(fileName);
        }
    });

    //添加新的app
    $('#add-app-button').on('click',function(){
        $('#add-app-dialog').css('display','block');
    });
});

/**
 * 当上传
 */
function onUpload(){
    console.log('app_name' + appName);
    console.log('app_id' + appId);
    console.log('app_type' + appType);

    var formData = new FormData($( "#upload-app-form" )[0]);
    formData.append('app_name',appName);
    formData.append('app_id',appId);
    formData.append('app_type',appType);
    $.ajax({
        url: '/api/file/update' ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            dismissDialog();

            var res = JSON.parse(returnData);
            if(res.code && res.code == 100) {
                Materialize.toast('发布成功!', 3000, 'rounded');
            }else{
                Materialize.toast('发布失败,' + res.msg, 3000, 'rounded');
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

/**
 * 添加一个新的app
 */
function onAddApp(){
    console.log('upload');

    var formData = new FormData($( "#add-app-form" )[0]);
    $.ajax({
        url: '/api/file/add' ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returnData) {
            dismissDialog();
            var res = JSON.parse(returnData);
            if(res.code && res.code == 100) {
                Materialize.toast('发布成功!', 3000, 'rounded');
            }else{
                Materialize.toast('发布失败,' + res.msg, 3000, 'rounded');
            }
        },
        error: function (returnData) {
            console.log(returnData);
        }
    });
}

function dismissDialog(){
    $('#add-app-dialog').css('display', 'none');
    $('#new-version-dialog').css('display', 'none');
}