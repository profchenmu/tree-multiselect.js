var data = this.cao;
    var treeA = [];
    _.each(data.treeData, function(e,i){
    loops(e)
    });
    var treeB = [];
    _.each(treeA, function(e){
        e.text0 = e.text.substring(0,e.text.indexOf('/'));
        e.text = e.text.substring(e.text.indexOf('/')+1);
        e.text = e.text.split("/").reverse().join("/");
        treeB.push(e);
        var tpl = '<option value="'+ e.value +'" data-section="'+ e.text +'">'+ e.text0 +'</option>'

        $('#test-select').append(tpl);
    });

    data.treeA = treeA;
    function loops(a){
    if(a.nodes){
        _.each(a.nodes, function(f){
        f.id = f.id + '/' + a.id;
        f.text = f.text + '/' + a.text;
        loops(f);
        })
    }
    else{
    treeA.push({value: a.id, text: a.text, orgCode: a.orgCode});
    }
    }
    var cao = $("#test-select").treeMultiselect({ startCollapsed: true, hideSidePanel: true});
    
    // $('input').betterCheckbox();

    
    // $('.betterCheckbox-box').on('click', function(e){
    //   $(e.currentTarget).prev('input').trigger('change');
    // })
    
    $('#cao').on('click',function(e){
    console.log($('#test-select').val());
    })