//全篇单双引号都可以
$(function () {
    $(".del").click(function (e) {
        var target=$(e.target)
        var id=target.data("id")
        var tr=$(".item-id-"+id)//list.ejs中加了这个类item-id-，方便取到这一行

        $.ajax({
            type:"DELETE",
            url:"/admin/list?id="+id//切记这里的等号一定要写，
        })
            .done(function (results) {
                if(results.success===1){
                    if(tr.length>=0){
                        tr.remove()
                    }
                }
            })
    })
})