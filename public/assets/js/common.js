$.ajax({
    url:'/users/'+userId,
    type:'get',
    success:function(data){
        console.log(data);
        $('.profile .name').html(data.nickName);
        $('.profile .avatar').prop('src',data.avatar);        
    }
})