$("#categoryForm").on("submit", function(e) {
    e.preventDefault();
    var formdata = $(this).serialize();
    // console.log(formdata);
    $.ajax({
      type: "post",
      url: "/categories",
      data: formdata,
      success: function(data) {
        // console.log(data);
        location.reload();
      },
      error: function(err) {
        console.log(err.responseText);
      }
    });
  });

  $.ajax({
    type:'get',
    url:'/categories',
    success:function(data){
      console.log(data);
      
        var html = template('tpl-category',{categories:data})
        $('#category-data').html(html);
    }
  });  

  // 删除
  $('#category-data').on('click','.del',function(){
    var id=$(this).attr('data-id');
    console.log(id);
    $.ajax({
      type:'DELETE',
      url:'/categories/'+id,
      success:function(){
        location.reload();
      }
    });        
  })