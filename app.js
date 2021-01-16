
var info=document.getElementById("widget");
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
            // output +="<img src='"+pictureData.large+"'>";
            output +=" <img src='"+pictureData.large+"' class='card-img' alt='...'>";
            output +="</div>";
            output +="<div class='col-xs-12 col-sm-12 col-md-8'>\n" +
                "    <div class='floater'></div>\n" +
                "    <div class='card-body'>";

//name
            let nameData = a[key].name;
            // output += nameData.title + '.' + ' ' + nameData.first + ' ' + nameData.last;
            output +="<h5 class='card-title name'>"+nameData.title + '.' + ' ' + nameData.first + ' ' + nameData.last+"</h5>";
            // console.log(nameData.title+'.'+ ' '+nameData.first+ ' ' + nameData.last);


//location
            let locationData = a[key].location;
            let streetData = locationData.street;
            // output += locationData.street.number + ' ' + locationData.street.name + ',' + ' ' + locationData.city + ',' + ' ' + locationData.state;
            output += "<p class='card-text address'>"+locationData.street.number + ' ' + locationData.street.name + ',' + ' ' + locationData.city + ',' + ' ' + locationData.state+"</p>";
            // console.log(locationData.street.number+ ' ' + locationData.street.name + ','+ ' ' + locationData.city+','+ ' ' +locationData.state);


//email
//             output += a[key].email;
            output += "<p class='card-text'>\n" +
                "    <div class='contact d-flex justify-content-left'>\n" +
                "    <li><i class='far fa-envelope'></i>"+a[key].email+"</li>\n" +
                "<li><i class='fas fa-phone'></i>"+a[key].phone+"</li>\n";
            // console.log(data.as[key].email);


//phone
//             output += a[key].phone;
            // console.log(data.as[key].phone);

            //cell
            // output += a[key].cell;
            output +="<li>\n"+
                "<div class='oneer'>\n" +
                "    <i class='fas fa-arrow-right'></i>\n" +
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

// }
//             console.log(output);
//           output +='';

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

            url: 'https://randomuser.me/api/?page=1&results=3&gender=male',

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
    $(".female").click(function (e) {
        e.preventDefault();
        // let result=$("#result");

        $.ajax({

            url: 'https://randomuser.me/api/?page=1&results=3&gender=female',

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




    //individual record
    $("#result").on('click','#oneer',function(e){
        let display_block=$(this).parent().html();
        console.log(display_block);
        $("#result").text(" ");
        $("#result").text(display_block);

    });




    //search Record

    $('#search').click(function (e) {
        e.preventDefault()
        var pos = $(this).parent().find('.name').val().toLowerCase();
        var button_content = $(this);

        $.ajax({

            url: 'https://randomuser.me/api/?results=100',
            dataType: 'json',
            success:function (data) {


                var myArray=data.results;
                var result = $.grep(myArray, function(e){ return e.name.first.toLowerCase() === pos; }); //Louane

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



