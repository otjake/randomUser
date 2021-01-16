
var info=document.getElementById("widget");
var info1=document.getElementById("widget1");
var contact=document.getElementsByClassName("contact");
let Nxtval=$("#next2").val();
let Nxtvali=parseInt(Nxtval);

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
                "<span hidden>"+a[key].login.uuid+"</span>\n"+
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



    return  info.insertAdjacentHTML('beforeend',output);
}

function errorMessage(message) {
    let output="<div class='alert alert-danger'>"+message+"</div>";
    return  info.insertAdjacentHTML('beforeend',output);

}



function Next(seed, page) {


}
$(document).ready(function () {


    //Get all records
    $(".all").click(function (e) {
        e.preventDefault();
        // let result=$("#result");

        $.ajax({

            url: 'https://randomuser.me/api/?page=1&results=3&seed=abc',
            // url: 'https://randomuser.me/api/?results=3&page=3&gender=male&inc=name,nat,location,email,phone,cell,picture&noinfo',
            // url: 'https://randomuser.me/api/?results=5&gender=male',
            // url: 'https://randomuser.me/api/?page=3&results=3&seed=abc',
            // url: 'https://randomuser.me/api/?results=5&gender=female',
            // url: 'https://randomuser.me/api/?results=5000',
            // url: 'https://randomuser.me/api',
            dataType: 'json',
            success: function(data) {

                // display function above
                $("#widget").html(" ");
                display(data.results);


                var headers = {
                    name: 'Name'.replace(/,/g, ''), // remove commas to avoid errors
                    location: "Address",
                    email: "Email",
                    phone: "Phone",
                    cell: "Cell"
                };

                let itemsFormatted= formatter(data.results);


                var fileTitle = 'AllUsers'; // or 'my-unique-title'
                $("#download").click(function (e) {
                    e.preventDefault();

                    exportCSVFile(headers,itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
                })


            }
        });
    })



    //Get all Male records
    $(".male").click(function (e) {
        e.preventDefault();
        // let result=$("#result");

        $.ajax({

            url: 'https://randomuser.me/api/?page=1&results=3&gender=male&seed=abc',

            dataType: 'json',
            success: function(data) {

                // display function above
                $("#widget").html(" ");
                display(data.results);


                var headers = {
                    name: 'Name'.replace(/,/g, ''), // remove commas to avoid errors
                    location: "Address",
                    email: "Email",
                    phone: "Phone",
                    cell: "Cell"
                };

                let itemsFormatted= formatter(data.results);


                var fileTitle = 'AllUsers'; // or 'my-unique-title'
                $("#download").click(function (e) {
                    e.preventDefault();

                    exportCSVFile(headers,itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
                })


            }
        });
    })




    //Get all FeMale records
    $(".female").click(function (e) {
        e.preventDefault();
        // let result=$("#result");

        $.ajax({

            url: 'https://randomuser.me/api/?page=1&results=3&gender=female&seed=abc',

            dataType: 'json',
            success: function(data) {

                // display function above
                $("#widget").html(" ");
                display(data.results);


                var headers = {
                    name: 'Name'.replace(/,/g, ''), // remove commas to avoid errors
                    location: "Address",
                    email: "Email",
                    phone: "Phone",
                    cell: "Cell"
                };

                let itemsFormatted= formatter(data.results);


                var fileTitle = 'AllUsers'; // or 'my-unique-title'
                $("#download").click(function (e) {
                    e.preventDefault();

                    exportCSVFile(headers,itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
                })

                $("#next").click(function (e) {
                    e.preventDefault();
                    // Next(seed,page);
                    let seed=data.info.seed;
                    let pageIndex=Nxtvali++;
                    let URL
                    $.ajax({
                        url: 'https://randomuser.me/api/?page=' + pageIndex + '&results=3&gender=female&seed='+seed,

                        dataType: 'json',
                        success: function (data2) {

                            var myArray=data2.results;
                            var result = $.grep(myArray, function(e){ return e.gender === "female"; }); //Louane

                            $("#result").html(" ");
                            $("#next2").val(data2.info.page);

                            display(result);
                            // var headers = {
                            //     name: 'Name'.replace(/,/g, ''), // remove commas to avoid errors
                            //     location: "Address",
                            //     email: "Email",
                            //     phone: "Phone",
                            //     cell: "Cell"
                            // };
                            //
                            // let itemsFormatted = formatter(data2.results);
                            //
                            //
                            // var fileTitle = 'AllUsers'; // or 'my-unique-title'
                            // $("#download").click(function (e) {
                            //     e.preventDefault();
                            //
                            //     exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
                            // })

                        }
                    })
                    // }
                })



                $("#prev").click(function (e) {
                    e.preventDefault();
                    // Next(seed,page);
                    let seed=data.info.seed;
                    let pageIndex=Nxtvali--;
                    let URL
                    $.ajax({
                        url: 'https://randomuser.me/api/?page=' + pageIndex + '&results=3&gender=female&seed='+seed,

                        dataType: 'json',
                        success: function (data2) {

                            var myArray=data2.results;
                            var result = $.grep(myArray, function(e){ return e.gender === "female"; }); //Louane

                            $("#result").html(" ");
                            $("#next2").val(data2.info.page);

                            display(result);
                            // var headers = {
                            //     name: 'Name'.replace(/,/g, ''), // remove commas to avoid errors
                            //     location: "Address",
                            //     email: "Email",
                            //     phone: "Phone",
                            //     cell: "Cell"
                            // };
                            //
                            // let itemsFormatted = formatter(data2.results);
                            //
                            //
                            // var fileTitle = 'AllUsers'; // or 'my-unique-title'
                            // $("#download").click(function (e) {
                            //     e.preventDefault();
                            //
                            //     exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
                            // })

                        }
                    })
                    // }
                })

            }
        });
    })
    //
    //
    // $("#prev").click(function (e) {
    //     e.preventDefault();
    //     // Next(seed,page);
    //     let seed='abc';
    //     let pageIndexP=Nxtvali--;
    //     // for (i=pageIndex;i<=data.results.length;i++) {
    //     //     let pageIndex = i;
    //     $.ajax({
    //
    //         url: 'https://randomuser.me/api/?page=' + pageIndexP + '&results=3&seed=' + seed,
    //
    //         dataType: 'json',
    //         success: function (data3) {
    //             // console.log(data.info.seed);
    //             // console.log(pageIndex);
    //             // display function above
    //             $("#result").html(" ");
    //             // $("#next2").html(data.info.page);
    //             $("#next2").val(data3.info.page);
    //
    //             display(data3.results);
    //
    //
    //
    //             var headers = {
    //                 name: 'Name'.replace(/,/g, ''), // remove commas to avoid errors
    //                 location: "Address",
    //                 email: "Email",
    //                 phone: "Phone",
    //                 cell: "Cell"
    //             };
    //
    //             let itemsFormatted = formatter(data3.results);
    //
    //
    //             var fileTitle = 'AllUsers'; // or 'my-unique-title'
    //             $("#download").click(function (e) {
    //                 e.preventDefault();
    //
    //                 exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
    //             })
    //
    //         }
    //     })
    //     // }
    // })

$(".return").click(function () {
    $("#widget1").removeClass("display").addClass("no-display");
    $("#widget").removeClass("no-display").addClass("display");
})


    //individual record
    $("#widget").on('click','#oneer',function(e){
        let display_block=$(this).prev().text();
        console.log(display_block);
        // $("#widget").text(" ");
        // $("#widget").html(display_block);

        $.ajax({

            url: 'https://randomuser.me/api/?results=100&seed=abc',//reduced result due to band with restrictions from API Server
            dataType: 'json',
            success:function (data) {


                var myArray=data.results;
                var result = $.grep(myArray, function(e){ return e.login.uuid=== display_block; }); //Louane or Julia or Milan these names exist in this seed
console.log(result);
                if(result.length!==0){
                        $("#widget").addClass("no-display");
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




                        $("#prev").prop('disabled', true);
                        $("#next").prop('disabled', true);
                        $(".download").prop('disabled', true);
                }
                else{
                    $("#widget").html(" ");

                    errorMessage("can't find a matching first name");

                }



                var headers = {
                    name: 'Name'.replace(/,/g, ''), // remove commas to avoid errors
                    location: "Address",
                    email: "Email",
                    phone: "Phone",
                    cell: "Cell"
                };
                var itemsFormatted = [];

                // format the data
                result.forEach((item) => {
                    itemsFormatted.push({
                        name: item.name.title+ "." + " "+item.name.first +" " +item.name.last, // remove commas to avoid errors,
                        location: item.location.street.number + ' ' + item.location.street.name + ' ' + item.location.city + ' ' + item.location.state,
                        email: item.email,
                        phone: item.phone,
                        cell: item.cell

                    });
                });

                var fileTitle = 'orders'; // or 'my-unique-title'
                $("#download").click(function (e) {
                    e.preventDefault();

                    exportCSVFile(headers,itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
                })

            }
        })
    });




    //search Record

    $('#search').click(function (e) {
        e.preventDefault()
        var pos = $(this).parent().find('.name').val().toLowerCase();
        var button_content = $(this);

        $.ajax({

            url: 'https://randomuser.me/api/?results=100&seed=abc',//reduced result due to band with restrictions from API Server
            dataType: 'json',
            success:function (data) {


                var myArray=data.results;
                var result = $.grep(myArray, function(e){ return e.name.first.toLowerCase() === pos; }); //Louane or Julia or Milan these names exist in this seed

                if(result.length!==0){
                    if(result.length===1) {
                        $("#widget").html(" ");
                        display(result);
                        $("#prev").prop('disabled', true);
                        $("#next").prop('disabled', true);
                    }
                }
                else{
                    $("#widget").html(" ");

                    errorMessage("can't find a matching first name");

                }



                var headers = {
                    name: 'Name'.replace(/,/g, ''), // remove commas to avoid errors
                    location: "Address",
                    email: "Email",
                    phone: "Phone",
                    cell: "Cell"
                };
                var itemsFormatted = [];

                // format the data
                result.forEach((item) => {
                    itemsFormatted.push({
                        name: item.name.title+ "." + " "+item.name.first +" " +item.name.last, // remove commas to avoid errors,
                        location: item.location.street.number + ' ' + item.location.street.name + ' ' + item.location.city + ' ' + item.location.state,
                        email: item.email,
                        phone: item.phone,
                        cell: item.cell

                    });
                });

                var fileTitle = 'orders'; // or 'my-unique-title'
                $("#download").click(function (e) {
                    e.preventDefault();

                    exportCSVFile(headers,itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
                })

            }
        })
    })


})



