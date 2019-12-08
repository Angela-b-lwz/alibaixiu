 //根据id删除文章
 $("#posts").on("click", ".del", function() {
    var id = $(this).attr("data-id");
    // console.log(id);
    $.ajax({
      type: "DELETE",
      url: "/posts/" + id,
      success: function(data) {
        // console.log(data);
        location.reload();
      }
    });
  });
  //获取分类列表
  $.ajax({
    type: "get",
    url: "/categories",
    success: function(data) {
      // console.log(data);
      var html = template("tpl-category", { category: data });
      $("#category").html(html);
    }
  });

  // //查询文章渲染页面
  //        $.ajax({
  //     type: "get",
  //     url: "/posts",
  //     success: function(data) {
  //       // console.log(data);
  //       var html = template("tpl-posts", data);
  //       $("#posts").html(html);
  //       var page = template("tpl-pagination", data);
  //       $("#pagination").html(page);
  //     }
  //   });
  //   //根据分类获取文章列表
  //   $("#selectForm").on("submit", function(e) {
  //     e.preventDefault();
  //     var formData = $(this).serialize();
  //     // console.log(formData);
  //     $.ajax({
  //       type: "GET",
  //       url: "/posts",
  //       data: formData,
  //       success: function(data) {
  //         console.log(data);
  //         var html = template("tpl-posts", data);
  //         $("#posts").html(html);
  //         var page = template("tpl-pagination", data);
  //         $("#pagination").html(page);
  //       }
  //     });

  //   });

  //   function changePage(page) {
  //     // 向服务器端发送请求 获取文章列表数据
  //     $.ajax({
  //       type: "get",
  //       url: "/posts",
  //       data: {
  //         page: page
  //       },
  //       success: function(data) {
  //         var html = template("tpl-posts", data);
  //         $("#posts").html(html);
  //         var page = template("tpl-pagination", data);
  //         $("#pagination").html(page);
  //       }
  //     });
  //   }

  var queryObj = {};
  function queryPost(obj, page) {
    queryObj = obj;
    obj.page = page || 1;
    $.ajax({
      url: "/posts",
      type: "GET",
      data: obj,
      success: function(data) {
        console.log("data-->", data);
        var html = template("tpl-posts", data);
        $("#posts").html(html);
        var page = template("tpl-pagination", data);
        $("#pagination").html(page);
      }
    });
  };

  function changePage(page) {
    console.log(queryObj, page);
    queryPost(queryObj, page);
  };

  // 收集form 的数据
  function serializeObj(form) {
    var arr = form.serializeArray();
    var obj = {};
    arr.forEach(item => {
      obj[item.name] = item.value;
    });
    return obj;
  };

  queryPost({}, 1);
  // 绑定事件
  $("#selectForm").on("submit", function(e) {
    e.preventDefault();
    var ob = serializeObj($(this));
    console.log(ob);
    queryPost(ob, 1);
  });