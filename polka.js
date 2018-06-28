/**
 * Created by ProvokatorDark on 26.06.2018.
 */
jQuery(document).ready(function (jQuery) {
    var returnObj = JSON.parse(localStorage.getItem("myKey"));
    if (returnObj === null){
        var obj =  [];
        var serialObj = JSON.stringify(obj);
        localStorage.setItem("myKey", serialObj);
        console.log(typeof serialObj +" serialObj " +serialObj);
        return;
    }
    var obj2 = returnObj.reduce(function (result, item, index, array) {
        result[index] = item;
        return result;
    }, {});
    var box = jQuery('#polka');
    var addPolkaButton = jQuery('.addpolka .polkabutton');
    addPolkaButton.on('click', function () {
        addPolkaButton.html('Добавлено на полку');
        var returnObjon = JSON.parse(localStorage.getItem("myKey"));
        var clickIdAdd = jQuery('#lava').attr('value');
        if (returnObjon.indexOf(Number(clickIdAdd)) !== -1) {
            addPolkaButton.html('Такая книга уже есть');
        } else {
            returnObjon.push(Number(clickIdAdd));
            var intObject = JSON.stringify(returnObjon);
            localStorage.setItem("myKey", intObject);
        }
    });
    box.animate({opacity: 0.5}, 600);
    var data = {
        action: 'polka',
        name: obj2
    };
    jQuery.get(myPlugin.ajaxurl, data, function (response) {
        box.html(response).animate({opacity: 1}, 600);
    });
    jQuery('#polka').on('click', 'button.polkabutton', function (e) {
        e.preventDefault();
        var returnObjon = JSON.parse(localStorage.getItem("myKey"));
        var clickId = jQuery(this).closest('.block').attr('id');
        var els = returnObjon.indexOf(Number(clickId));
        returnObjon.splice(els, 1);
        var intObject = JSON.stringify(returnObjon);
        localStorage.setItem("myKey", intObject);
        jQuery(this).closest('.block').remove();
    });

});
