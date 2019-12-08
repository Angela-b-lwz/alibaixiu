$("#logo").on("change", function() {
    var file = this.files[0];
    // 创建formData对象 实现二进制文件上传吧
    var formData = new FormData();
    // 将管理员选择到的文件添加到formData对象中
    formData.append("logo", file);
    // 向服务器端发送请求 实现文件上传
    $.ajax({
      type: "post",
      url: "/upload",
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        console.log(response);
        $("#hiddenLogo").val(response[0].logo);
        // 将logo图片显示在页面中
        $("#preview").attr("src", response[0].logo);
      }
    });
  });


  function serializeObj(form) {
    var arr = form.serializeArray();
    var obj = {};
    arr.forEach(item => {
      obj[item.name] = item.value;
    });
    return obj;
  };

  $("#settingsForm").on("submit", function() {      
    var obj =serializeObj($(this));
    if(!obj.comment){
      obj.comment=false;
    }
    if(!obj.review){
      obj.review=false;
    }

    $.ajax({
      type: "post",
      url: "/settings",
      data: obj,
      success: function() {
        location.reload();
      }
    });
    // 阻止表单默认提交行为
    return false;
  });

  $.ajax({
    type: "get",
    url: "/settings",
    success: function(response) {
      console.log(response);
      if (response) {
        // 将logo地址存储在隐藏域中
        $("#hiddenLogo").val(response.logo);
        // 将logo显示在页面中
        $("#preview").attr("src", response.logo);
        $("#description").val(response.description);
        // 将网站标题显示在页面中
        $('input[name="title"]').val(response.title);
        $('input[name="keywords"]').val(response.keywords);
        // 将是否开启评论功能显示在页面中
        $('input[name="comment"]').prop("checked", response.comment);
        // 将评论是否经过人工审核显示在页面中
        $('input[name="review"]').prop("checked", response.review);
      }
    }
  });