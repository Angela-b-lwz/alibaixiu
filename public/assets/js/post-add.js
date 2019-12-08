 //所属分类展示
 $.ajax({
    url:'/categories',
    type:'get',
    success:function(resp){
      // console.log(resp);
      var html = template('tpl-postadd',{ data:resp } );
      $('#category').html(html);          
    }
  });
//上传文章的图片thumbnail 设置隐藏域保存缩略图的地址信息

$("#feature").on("change", function() {
    // console.log(this.files);
    var formData = new FormData();
    formData.append("cover", this.files[0]);
    $.ajax({
      type: "post",
      url: "/upload",
      data: formData,
      // 告诉$.ajax方法不要解析请求参数
      processData: false,
      // 告诉$.ajax方法不要设置请求参数的类型
      contentType: false,
      success: function(response) {
        // console.log(response); 
        $('#hidden-thumbnail').val(response[0].cover);         
       
      }
    });
  });

//文章上传功能
$('#postAdd').on('submit',function(e ){
e.preventDefault();
var formData = $(this).serialize();
console.log(formData);
$.ajax({
  type:'POST',
  url:'/posts',
  data:formData,
  success:function(data){
    console.log(data);
    location.href='/admin/posts.html';
  }
})
});

//修改文章功能
function getUrlParams(name) {
var paramsAry = location.search.substr(1).split('&');
// 循环数据
for (var i = 0; i < paramsAry.length; i++) {
    var tmp = paramsAry[i].split('=');
    if (tmp[0] == name) {
        return tmp[1];
    }
}
return -1;
}

var id = getUrlParams('id');
// 当前管理员是在做修改文章操作
if (id != -1) {
// 根据id获取文章的详细信息
$.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function (response) {
        $.ajax({
            url: '/categories',
            type: 'get',
            success: function (categories) {
                response.categories = categories;
                console.log(response)
                var html = template('modifyTpl', response);
                $('#parentBox').html(html);
            }
        });			
    }
});

$('#parentBox').on('submit', '#modifyForm', function () {
// 获取管理员在表单中输入的内容
var formData = $(this).serialize()
// 获取管理员正在修改的文章id值
var id = $(this).attr('data-id');
$.ajax({
    type: 'put',
    url: '/posts/' + id,
    data: formData,
    success: function () {
        location.href = '/admin/posts.html';
    }
});
// 阻止表单默认提交行为
return false;
});
}