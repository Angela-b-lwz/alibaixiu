$('#modifyPassword').on('submit',function(){
    var  formdata = $(this).serialize();
    console.log(formdata);
    $.ajax({
      type:'put',
      url:'/users/password',
      data:formdata,
      success:function(){
        alert('密码修改成功,跳转到登录页面')
        location.href='/admin/login.html';
      }
    })
    return false;  

  })