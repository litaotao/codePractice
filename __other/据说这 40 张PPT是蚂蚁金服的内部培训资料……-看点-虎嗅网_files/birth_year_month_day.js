jQ(function () {
    var jQday = jQ("#birth_day"),
        jQmonth = jQ("#birth_month"),
        jQyear = jQ("#birth_year");

    <!--出始化年-->
    var dDate = new Date(),
        dCurYear = dDate.getFullYear(),
        str = "",
        nYear = dCurYear;
    for (var i = nYear - 100; nYear -1 > i; nYear--) {
        if (nYear == 1980) {
            str = "<option value=" + nYear + " selected=true>" + nYear + "</option>";
        } else {
            str = "<option value=" + nYear + ">" + nYear + "</option>";
        }
        jQyear.append(str);
    }

    <!--出始化月-->
    for (var i = 12; i >= 1; i--) {

        if (i == 1) {
            str = "<option value=" + i + " selected=true>" + i + "</option>";
        } else {
            str = "<option value=" + i + ">" + i + "</option>";
        }
        jQmonth.append(str);
    }
    <!--调用函数出始化日-->
    TUpdateCal(jQyear.val(),jQmonth.val());
    jQ("#birth_year,#birth_month").bind("change", function(){
        TUpdateCal(jQyear.val(),jQmonth.val());
    });
    setSelected('birth_year');
    setSelected('birth_month');
    setSelected('birth_day');
});

<!--根据年月获取当月最大天数-->
function TGetDaysInMonth(iMonth, iYear) {
    var dPrevDate = new Date(iYear, iMonth, 0);
    return dPrevDate.getDate();
}

function TUpdateCal(iYear, iMonth) {
    var dDate = new Date(),
        daysInMonth = TGetDaysInMonth(iMonth, iYear),
        str = ""
        odaysInMonth = parseInt(daysInMonth) ;

    jQ("#birth_day").empty();

    for (var d = 1; odaysInMonth >= d; odaysInMonth--) {

        if (odaysInMonth == 1) {
            str = "<option value=" + odaysInMonth + " selected=true>" + odaysInMonth + "</option>";
        } else {
            str = "<option value=" + odaysInMonth + ">" + odaysInMonth + "</option>";
        }
        jQ("#birth_day").append(str);
    }
}  

function setSelected(id){
    var jQselectOpt = jQ('#'+id).attr('selid');
    jQ('#'+id).find('option').each(function(){
        if(jQ(this).val()==jQselectOpt){
            jQ(this).attr('selected','true');
        }else{
            jQ(this).removeAttr('selected');
        }
    })
}