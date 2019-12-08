 //创建评论
    // $.ajax({
    //   url:'/comments',
    //   type:'post',
    //   data:{
    //     author:'5de8f4d924c5f217c824ee9d',
    //     content:'第一条评论',
    //     post:'5deb0800d595bc19ac13d900'
    //   },
    //   success:function(data){
    //       console.log(data);
    //   }
    // })

    //获取评论列表
    $.ajax({
        url:'/comments',
        type:'get',
        success:function(data){
          // console.log(data);
          var html=template('tpl-comments',data);
          $('#commentsBox').html(html); 
          var page = template('tpl-pagination',data);
          $('#pagination').html(page);       
        }
      });
  
    //删除评论
    $('#commentsBox').on('click','.del',function(){
      var id = $(this).attr('data-id');
     $.ajax({
       type:'delete',
       url:'/comments/'+id,
       success:function(data){
        //  console.log(data);       
          location.reload();
       }
     });    
    });
  
    $('#commentsBox').on('click','.edit',function(){
      var id = $(this).attr('data-id');
      var status = $(this).attr('data-state');
      $.ajax({
          type: 'put',
          url: '/comments/' + id,
          data: {
              state: status == 0 ? 1 : 0
          },
          success: function (data) {
        // console.log(data);
              location.reload();      
          }
      })
    });
  
    // 实现分页
  function changePage (page) {
      $.ajax({
          type: 'get',
          url: '/comments',
          data: {
              page: page
          },
          success: function (data) {
              // console.log(data)
            var html=template('tpl-comments',data);
          $('#commentsBox').html(html); 
          var page = template('tpl-pagination',data);
          $('#pagination').html(page);   
          }
      })
  }