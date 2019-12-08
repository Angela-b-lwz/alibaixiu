 //添加新用户
 $("#usersForm").on("submit", function() {
    var formdata = $(this).serialize();
    console.log(formdata);
    $.ajax({
      type: "post",
      url: "/users",
      data: formdata,
      success: function(data) {
        location.reload();
      },
      error: function() {
        alert("添加失败");
      }
    });
    return false;
  });
  //上传图像
  $("#modifyBox").on("change", "#avatar", function() {
    console.log(this.files);
    var formData = new FormData();
    formData.append("avatar", this.files[0]);
    $.ajax({
      type: "post",
      url: "/upload",
      data: formData,
      // 告诉$.ajax方法不要解析请求参数
      processData: false,
      // 告诉$.ajax方法不要设置请求参数的类型
      contentType: false,
      success: function(response) {
        console.log(response);
        // 实现头像预览功能
        $("#preview").attr("src", response[0].avatar);
        $("#hiddenInput").val(response[0].avatar);
      }
    });
  });
  //渲染页面
  $.ajax({
    type: "get",
    url: "/users",
    success: function(response) {
      // console.log(response);
      // 使用模板引擎将数据和HTML字符串进行拼接
      var html = template("userTpl", { data: response });
      // 将拼接好的字符串显示在页面中
      $("#userBox").html(html);
    }
  });
  //点击编辑按钮,呈现要修改的用户信息
  $("#userBox").on("click", ".edit", function() {
    var id = $(this).data("id");
    $.ajax({
      type: "get",
      url: "/users/" + id,
      success: function(data) {
        // console.log(data);
        var html = template("tpl-modify", data);
        $("#modifyBox").html(html);
      }
    });
  });
  //点击修改按钮,修改用户信息
  $("#modifyBox").on("submit", "#modifyForm", function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    console.log(formData);
    // 获取要修改的那个用户的id值
    var id = $(this).attr("data-id");
    // console.log(id);
    // 发送请求 修改用户信息
    $.ajax({
      type: "put",
      url: "/users/" + id,
      data: formData,
      success: function(response) {
        // 修改用户信息成功 重新加载页面
        location.reload();
      }
    });
    // 阻止表单默认提交
    return false;
  });

  // 点击删除按钮删除用户
  $("#userBox").on("click", ".del", function() {
    var id = $(this).attr("data-id");
    // console.log(id);
    if (confirm("您确定要删除么?")) {
      $.ajax({
        type: "delete",
        url: "/users/" + id,
        success: function(data) {
          console.log(data);
          location.reload();
        }
      });
    }
  });

  //全选反选以及出现批量删除
  var checkAll = $("#checkAll");
  //全选控制下面的复选框
  checkAll.on("change", function() {
    var inputs = $("#userBox").find("input");
    // console.log(inputs);
    var isChecked = $(this).prop("checked");
    $(inputs).prop("checked", isChecked);
   if(isChecked){
     $('#delMany').show();
   }else{
    $('#delMany').hide();
   }
  });
//复选框控制全选框
  $("#userBox").on("change", "#checkbox", function() {
    //复选框的数量
    // console.log($('#userBox').find('input').length);
    //已经选中的复选框的数量
    // console.log($('#userBox').find('input').filter(':checked').length);
    if (
      $("#userBox").find("input").length ==
      $("#userBox")
        .find("input")
        .filter(":checked").length
    ) {
      checkAll.prop("checked", "checked");
    } else {
      checkAll.prop("checked", "");
    }
    if($('#userBox').find('input').filter(':checked').length>0){
      $('#delMany').show();
    }else{
      $('#delMany').hide();
    }

  });


  //点击批量删除按钮,批量删除
  $('#delMany').on('click',function(){ 
    var checkedL= $('#userBox').find('input').filter(':checked') 
    // console.log(checkedL);              
   
    var ids=[];
       ids.push(checkedL.toArray().map(function(ele){
      return $(ele).attr('data-id')
    }))
    // console.log(ids[0]);
    // console.log(ids[0].join("-"))      

    $.ajax({
      url:'/users/'+ ids[0].join('-'),
      type:'DELETE',
      success:function(data){
          // console.log(data);
          location.reload();              
      }
    })       
  });