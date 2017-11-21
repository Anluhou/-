//在线翻译查询(百度翻译)
    $('#selectBtn').click(function() {
        var appid = '20171115000095684';//填你自己的百度翻译APP ID
        var key = 'bgXR6YWIfdQUufEpVLuz';//填你自己的百度翻译密钥
        var salt = (new Date).getTime();//取当前时间作为随机数
        var query= $('#transInput').val();//取输入框的val
        var q = encodeURIComponent(query);//编码UTF-8
        var str1 = appid + query + salt +key;//秘钥
        var sign = MD5(str1);//md5加密
        $.ajax({
            url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
            type: 'get',
            dataType: 'jsonp',
            data: {
                q: query,
                appid: appid,
                salt: salt,
                from: 'auto',
                to: 'auto',
                sign: sign
            },
            success: function (data) {
                  console.log(data);
                  var result = data.trans_result;
                  $('#transDisplay').empty();
                  for(var i in result){
                      var html = decodeURIComponent(result[i].dst);
                      $('#transDisplay').append(html);
                  }
              },
              error: function(){
                alert('error');
              }
          });
      });
