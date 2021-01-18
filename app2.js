
var info=document.getElementById("widget");
var info1=document.getElementById("widget1");
var contact=document.getElementsByClassName("contact");
let Nxtval=$("#numholder").val();
let Gtagger=$("#Gtag").val();
let Nxtvali=parseInt(Nxtval);
let Ftagger=$("#Ftag")
let tagger=$("#tag")
let Atagger=$("#Atag")
let resultData="";
let resultData2="";
function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}


//returns formated Json file
function formatter(JsonFile) {

    var itemsFormatted = [];

    // format the data
    JsonFile.forEach((item) => {
        itemsFormatted.push({
            name: item.name.title+ "." + " " +item.name.first +" " +item.name.last, // remove commas to avoid errors,
            location: item.location.street.number + ' ' + item.location.street.name + ' ' + item.location.city + ' ' + item.location.state,
            email: item.email,
            phone: item.phone,
            cell: item.cell

        });
    });
    return itemsFormatted;
}




//returns display widget
function display(a){

    var output = " ";
// for (i=0; i<data.results.length;i++){
    for (var key in a) {

        output +="<div class='card mb-3'>\n" +
            "    <div class='row no-gutters'>\n" +
            "    <div class='col-xs-12 col-sm-12 col-md-4'>\n" +
            "    <div class='rounder'></div>";

        if (a.hasOwnProperty(key)) {

//picture
            let pictureData = a[key].picture;

            let nameData = a[key].name;

            let locationData = a[key].location;
            let streetData = locationData.street;

            output +=
                "<img src='"+pictureData.large+"' class='card-img' alt='...'>\n"+
                "</div>\n"+
                "<div class='col-xs-12 col-sm-12 col-md-8'>\n" +
                "    <div class='floater'></div>\n" +
                "    <div class='card-body'>\n"+
                "<h5 class='card-title name'>"+nameData.title + '.' + ' ' + nameData.first + ' ' + nameData.last+"</h5>\n"+
                "<p class='card-text address'>"+locationData.street.number + ' ' + locationData.street.name + ',' + ' ' + locationData.city + ',' + ' ' + locationData.state+"</p>\n"+
                "<p class='card-text'>\n" +
                "    <div class='contact d-flex justify-content-left'>\n" +
                "    <li><i class='far fa-envelope'></i>"+a[key].email+"</li>\n" +
                "<li><i class='fas fa-phone'></i>"+a[key].phone+"</li>\n"+
                "<li>\n"+
                "<div class='oneer'>\n" +
                "<span hidden id='picker'>"+a[key].login.uuid+"</span>\n"+
                "    <i class='fas fa-arrow-right' id='oneer'></i>\n" +
                "    </div>\n"+
            "  </li>\n" +
            "    </div>\n" +
            "    </p>\n" +
            "    </div>\n";
            // console.log(data.as[key].cell);
        }
        output += "    </div>\n" +
            "    </div>\n" +
            "    </div>";
    }
output +='<div class="footer mt-4">\n' +
    '    <div class="footers d-flex justify-content-left">\n' +
    // '<input type="text" name="result" id="resultArray">\n'+
    '        <li><button class="btn btn-success download"  id="download"><i class="fas fa-cloud-download-alt"></i>  &nbsp;&nbsp;&nbsp; Download results</button></li>\n' +
    '\n' +
    '        <div class="paginate d-flex justify-content-center">\n' +
    '        <li><button class="btn  prev" id="prev"><i class="fas fa-chevron-left text-white"></i></button></li>\n' +
    '        <li><button class="btn  next" id="next"><i class="fas fa-chevron-right text-white"></i></button></li>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>';


    return  info.insertAdjacentHTML('beforeend',output);
}


//Error message
function errorMessage(message) {
    let output="<div class='alert alert-danger'>"+message+"</div>";
    return  info.insertAdjacentHTML('beforeend',output);

}



function paginate(myArray,seed, pageIndex) {
    var resultArray=[];
    var result1 = $.grep(myArray, function(e){ return e.gender === "female"; });
    var result2 = $.grep(myArray, function(e){ return e.gender === "male"; });
    let URL="";
    let genderR="";
    // console.log(myArray);
    // console.log($("#tag").val());
    if($("#tag").val()==="F"){
        genderR=result1[0].gender;
        URL='https://randomuser.me/api/?page=' + pageIndex + '&results=3&gender=female&seed='+seed;
    }else if($("#tag").val()==="M"){
        genderR=result2[0].gender;
        URL='https://randomuser.me/api/?page=' + pageIndex + '&results=3&gender=male&seed='+seed;
    }
    else{
        URL= 'https://randomuser.me/api/?page=1&results=&seed='+seed;
    }
resultArray.push(URL);
resultArray.push(genderR);
return resultArray;
}

function next(info,results) {

    let seed=info.seed;
    let pageIndex=Nxtvali++;
    var myArray=results;
    let navResult=paginate(myArray,seed,pageIndex);

    if(navResult[1]!==""){
        $.ajax({
            url: navResult[0],

            dataType: 'json',
            success: function (data2) {

                var myArray=data2.results;
                var result = $.grep(myArray, function(e){ return e.gender === navResult[1]; });
                if(result.length!==0) {
                    $("#widget").html(" ");
                    $("#numholder").val(data2.info.page);
                    display(result);
                    resultData="";
                    resultData2="";

                    // console.log(resultData2.info.seed);

                    resultData2=info;
                    resultData=result;
                }else{
                    $("#widget").html(" ");
                    errorMessage("No Data both");

                }
            },
            error: function(err) {
                $("#widget").html(" ");
                errorMessage("Api network Glitch [Cors Policy] click next again!!!!!")
            }
        })
    }else {
        $.ajax({
            url: 'https://randomuser.me/api/?page='+pageIndex+'&results=3&seed='+seed,

            dataType: 'json',
            success: function (data2) {

                var myArray=data2.results;
                if(myArray.length!==0) {
                    $("#widget").html(" ");
                    $("#numholder").val(data2.info.page);

                    display(myArray);
                    resultData="";
                    resultData2="";

                    // console.log(resultData2.info.seed);

                    resultData2=info;
                    resultData=myArray;
                }else{
                    $("#widget").html(" ");
                    errorMessage("No Data all");

                }
            },
            error: function(err) {
                $("#widget").html(" ");
                errorMessage("Api network Glitch [Cors Policy] click next again")
            }
        })
    }




}

function prev(info,results) {

    let seed=info.seed;
    let pageIndex=Nxtvali--;
    var myArray=results;
    let navResult=paginate(myArray,seed,pageIndex);

    if(navResult[1]!==""){
        $.ajax({
            url: navResult[0],

            dataType: 'json',
            success: function (data2) {

                var myArray=data2.results;
                var result = $.grep(myArray, function(e){ return e.gender === navResult[1]; });
                if(result.length!==0) {
                    $("#widget").html(" ");
                    $("#numholder").val(data2.info.page);
                    display(result);
                    resultData="";
                    resultData2="";

                    // console.log(resultData2.info.seed);

                    resultData2=info;
                    resultData=result;
                }else{
                    $("#widget").html(" ");
                    errorMessage("No Data both");

                }
            },
            error: function(err) {
                $("#widget").html(" ");
                errorMessage("Api network Glitch [Cors Policy] click next again!!!!!")
            }
        })
    }else {
        $.ajax({
            url: 'https://randomuser.me/api/?page='+pageIndex+'&results=3&seed='+seed,

            dataType: 'json',
            success: function (data2) {

                var myArray=data2.results;
                if(myArray.length!==0) {
                    $("#widget").html(" ");
                    $("#numholder").val(data2.info.page);

                    display(myArray);
                    resultData="";
                    resultData2="";

                    // console.log(resultData2.info.seed);

                    resultData2=info;
                    resultData=myArray;
                }else{
                    $("#widget").html(" ");
                    errorMessage("No Data all");

                }
            },
            error: function(err) {
                $("#widget").html(" ");
                errorMessage("Api network Glitch [Cors Policy] click next again")
            }
        })
    }




}

function oneer(info,results) {

    let seed=info.seed;
    let pageIndex=Nxtvali;
    let display_block=document.getElementById("picker").innerText;
                console.log(display_block);
                console.log(pageIndex);
                console.log(seed);
    let URP;
    if (seed === null) {
        URP ='https://randomuser.me/api/?page=1&results=3&seed=123';

    } else {
        URP = 'https://randomuser.me/api/?results=3&page=' + pageIndex + '&seed=' + seed;
    }

                $.ajax({

                    url: URP,//reduced result due to band with restrictions from API Server
                    dataType: 'json',
                    success:function (data4) {

                        console.log(data4);
                        var myArray=data4.results;
                        var result = $.grep(myArray, function(e){
                            console.log(e.login.uuid);
                            return e.login.uuid==display_block;
                        });
                        console.log(result);
                        if(result.length!==0){
                            $("#widget").removeClass("display").addClass("no-display");
                            $("#widget1").removeClass("no-display").addClass("display");
                            // display(result);
                            let a=result;
                            let SingleOutput='';

                            for (var key in a) {
                                SingleOutput +="<div class='card mb-3'>\n" +
                                    "    <div class='row no-gutters'>\n" +
                                    "    <div class='col-xs-12 col-sm-12 col-md-4'>\n" +
                                    "    <div class='rounder'></div>";

                                if (a.hasOwnProperty(key)) {

//picture
                                    let pictureData = a[key].picture;

                                    let nameData = a[key].name;

                                    let locationData = a[key].location;
                                    let streetData = locationData.street;
                                    let registered=a[key].registered;
                                    let dob=a[key].dob.age;
                                    SingleOutput +=
                                        '                                <img src="'+pictureData.large+'" class="card-img" alt="...">\n' +
                                        '\n' +
                                        '                            </div>\n' +
                                        '                            <div class="col-xs-12 col-sm-12 col-md-8">\n' +
                                        '                                <div class="floater"></div>\n' +
                                        '                                <div class="card-body">\n' +
                                        '                                    <h5 class="card-title name">'+nameData.title+" "+nameData.first+" "+nameData.last+'</h5><h3>'+dob+'</h3>\n' +
                                        '                                    <p class="card-text address">'+locationData.street.number + +" "+locationData.street.name+" "+locationData.city+" "+locationData.state+'</p>\n' +
                                        '                                    <p class="card-text">\n' +
                                        '                                    <div class="contact justify-content-left">\n' +
                                        '                                        <li class="mb-3"><div class="ELighter"><i class="far fa-envelope mt-3"></i>&nbsp;&nbsp;'+a[key].email+'</div></li>\n' +
                                        '                                    <li class="mb-3"><div class="JLighter"><i class="fas fa-sign-in-alt mt-3"></i>&nbsp;&nbsp;JOINED:'+registered.date.substring(0,10)+'</div></li>\n' +
                                        '                                        <li class="mb-3"><i class="fas fa-phone"></i>&nbsp;&nbsp;'+a[key].phone+'</li>\n' +
                                        '                                        <li class="mb-3"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;'+a[key].cell+'</li>\n' +
                                        '\n' +
                                        '                                    </div>\n' +
                                        '                                    </p>\n' +
                                        '                                </div>';
                                }
                                SingleOutput += "    </div>\n" +
                                    "    </div>\n" +
                                    "    </div>";
                            }

                            info1.insertAdjacentHTML('beforeend',SingleOutput);

let footer='\n' +
    '                    <div class="footer mt-4">\n' +
    '                        <div class="footers d-flex justify-content-left">\n' +
    '                            <li><button class="btn btn-success download" id="download1"><i class="fas fa-cloud-download-alt"></i>  &nbsp;&nbsp;&nbsp; Download results</button></li>\n' +
    '\n' +
    '                            <div class="paginate d-flex justify-content-center">\n' +
    '                            <li><button class="btn  prev"  id="prev1"><i class="fas fa-chevron-left text-white"></i></button></li>\n' +
    '                            <li><button class="btn  next"  id="next1"><i class="fas fa-chevron-right text-white"></i></button></li>\n' +
    '\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>'
                            info1.insertAdjacentHTML('beforeend',footer);

                            document.getElementById("prev1").disabled = true;
                            document.getElementById("next1").disabled = true;
                            document.getElementById("download1").disabled = true;

                        }
                        else{
                            $("#widget").html(" ");

                            errorMessage("can't find a matching UUID OR More than one found");

                        }


                    }
                })
}

function Launcher() {

    $.ajax({

        url: 'https://randomuser.me/api/?page=1&results=3&seed=123',

        dataType: 'json',
        success: function(data) {
            $(".Ausers").removeClass("no-display").addClass("display");
            $(".Musers").removeClass("display").addClass("no-display");
            $(".Fusers").removeClass("display").addClass("no-display");
            $(".Ulist").removeClass("display").addClass("no-display");

            // display function above
            $("#widget").html(" ");

            display(data.results);


            resultData2=data;
            console.log(resultData2);
            resultData=data.results;


        },
        error: function(err) {
            $("#widget").html(" ");

            errorMessage("Api network Glitch [Cors Policy]")
        }
    });
}


$(document).ready(function () {



    $("#widget").on('click','.download',function(e){
        let download=$(this);
       console.log(download);
        let result= $(this).parent().prev().val();
        console.log(result);
        var headers = {
            name: 'Name'.replace(/,/g, ''), // remove commas to avoid errors
            location: "Address",
            email: "Email",
            phone: "Phone",
            cell: "Cell"
        };

        let itemsFormatted = formatter(resultData);


        var fileTitle = 'AllUsers'; // or 'my-unique-title'


                exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download


    });

    $("#widget").on('click','.next',function(e) {
            e.preventDefault();

        next(resultData2,resultData);
        // console.log($("#numholder").val());
        // if($("#numholder").val()===1){
        //     document.getElementById("prev").disabled = true;
        // }

    });


    $("#widget").on('click','.prev',function(e) {
            e.preventDefault();

        prev(resultData2,resultData);


    });


    $("#widget").on('click','.oneer',function(e){

    oneer(resultData2,resultData);
    $(".return").removeClass("no-display ").addClass("display");

    });

    //Get all records
    $(".all").click(function (e) {
        e.preventDefault();

        $.ajax({

            url: 'https://randomuser.me/api/?page=1&results=3&seed=abc',

            dataType: 'json',
            success: function(data) {


                // display function above
                $("#widget").html(" ");
                    display(data.results);

                $(".Ausers").removeClass("no-display").addClass("display");
                $(".Musers").removeClass("display").addClass("no-display");
                $(".Fusers").removeClass("display").addClass("no-display");
                $(".Ulist").removeClass("display").addClass("no-display");

                // Emptying previous data
                resultData="";
                resultData2="";


                resultData2=data.info;
                resultData=data.results;

                document.getElementById('tag').value="";
                console.log($(document.getElementById('tag').value));



            },
            error: function(err) {
                $("#widget").html(" ");

                errorMessage("Api network Glitch [Cors Policy]")
            }
        });
    })



    //Get all Male records
    $(".male").click(function (e) {
        e.preventDefault();


        $.ajax({

            url: 'https://randomuser.me/api/?page=1&results=3&gender=male',

            dataType: 'json',
            success: function(data) {

                // display function above
                $("#widget").html(" ");
                display(data.results);

                //Emptying and resetting data
                resultData="";
                resultData2="";

                // console.log(resultData2.info.seed);

                resultData2=data.info;
                resultData=data.results;

                document.getElementById('tag').value="M";
                console.log($(document.getElementById('tag').value));

                $(".Ausers").removeClass("display").addClass("no-display");
                $(".Musers").removeClass("no-display").addClass("display");
                $(".Fusers").removeClass("display").addClass("no-display");
                $(".Ulist").removeClass("display").addClass("no-display");



            },
            error: function(err) {
                $("#widget").html(" ");
                errorMessage("Api network Glitch [Cors Policy],Click again")
            }
        });
    })


    //Get all feMale records
    $(".female").click(function (e) {
        e.preventDefault();


        $.ajax({

            url: 'https://randomuser.me/api/?page=1&results=3&gender=female',

            dataType: 'json',
            success: function(data) {
                console.log(data);
                // if(data.readyState===0){
                //     errorMessage("An error occured");
                //
                // }
                $(".Ausers").removeClass("display").addClass("no-display");
                $(".Musers").removeClass("display").addClass("no-display");
                $(".Fusers").removeClass("no-display").addClass("display");
                $(".Ulist").removeClass("display").addClass("no-display");
                // display function above
                $("#widget").html(" ");
                display(data.results);

                //Emptying and resetting data
                resultData="";
                resultData2="";


                resultData2=data.info;
                resultData=data.results;

                //changing value for paginate function identification
                document.getElementById('tag').value="F";
                console.log($(document.getElementById('tag').value));



            },
            error: function(err) {
                $("#widget").html(" ");

                errorMessage("Api network Glitch [Cors Policy]")
            }
        });
    })


$(".return").click(function () {
    $("#widget1").removeClass("display").addClass("no-display");
    $("#widget").removeClass("no-display").addClass("display");
    $(".return").removeClass("display").addClass("no-display");
    $("#widget1").empty();
    $("#prev1").prop('disabled', false);
    $("#next1").prop('disabled', false);
    $(".download1").prop('disabled', false);
})




    //individual record
    // $("#widget").on('click','#oneer1',function(e){
    //     let display_block=$(this).offsetParent();
    //     console.log(display_block);
    //     // $("#widget").html(" ");
    //     // $("#widget2").html(display_block);
    //     $(".Ausers").removeClass("display").addClass("no-display");
    //     $(".Musers").removeClass("display").addClass("no-display");
    //     $(".Fusers").removeClass("display").addClass("no-display");
    //     $(".Ulist").removeClass("no-display").addClass("display");
    //
    // });


    //search Record

    $('#search').click(function (e) {
        e.preventDefault()
        var pos = $(this).parent().find('.name').val().toLowerCase();
        var button_content = $(this);

        $.ajax({

            url: 'https://randomuser.me/api/?results=100&seed=abc',//reduced result due to band with restrictions from API Server
            dataType: 'json',
            success:function (data) {
//j

                var myArray=data.results;
                var result = $.grep(myArray, function(e){ return e.name.first.toLowerCase() === pos; }); //Louane or Julia or Milan these names exist in this seed

                if(result.length!==0){
                    if(result.length===1) {
                        $("#widget").html(" ");
                        display(result);
                        $("#prev1").prop('disabled', true);
                        $("#next1").prop('disabled', true);
                    }
                }
                else{
                    $("#widget").html(" ");

                    errorMessage("can't find a matching first name");

                }


            },
            error: function(err) {
                $("#widget").html(" ");

                errorMessage("Api network Glitch [Cors Policy]")
            }
        })
    })


})



