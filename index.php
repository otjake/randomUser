<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Random user sh</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<button class="btn btn-primary btn-lg" id="getAll">Generate</button>
<button class="btn btn-primary btn-lg" id="getAllMale">Male</button>
<button class="btn btn-primary btn-lg" id="getAllFeMale">Female</button>

//search form
<form method="post"  class="searcher">
<input type="text" name="name" class="name">
    <button type="submit" class="btn btn-info buy" id="search">Search</button>
</form>

<div id="result">

</div>

<button  id="download">download</button>
<button  id="prev">Previous</button>
<button  id="next" >Next</button>
<!--<span id="next2" >1</span>-->
<label>
<input type="text" id="next2" value="1">
</label>
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="jquery.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script></body>

<script type="text/javascript">
    var info=document.getElementById("result");
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
            output +="<p>";

            if (a.hasOwnProperty(key)) {

//picture
                let pictureData = a[key].picture;
                output +="<img src='"+pictureData.large+"'>";

//name
                let nameData = a[key].name;
                output += nameData.title + '.' + ' ' + nameData.first + ' ' + nameData.last;
                // console.log(nameData.title+'.'+ ' '+nameData.first+ ' ' + nameData.last);


//location
                let locationData = a[key].location;
                let streetData = locationData.street;
                output += locationData.street.number + ' ' + locationData.street.name + ',' + ' ' + locationData.city + ',' + ' ' + locationData.state;
                // console.log(locationData.street.number+ ' ' + locationData.street.name + ','+ ' ' + locationData.city+','+ ' ' +locationData.state);


//email
                output += a[key].email;
                // console.log(data.as[key].email);


//phone
                output += a[key].phone;
                // console.log(data.as[key].phone);

                //cell
                output += a[key].cell;
                output +="<span class='btn btn-sm' id='oneer'>oneer</span>";
                // console.log(data.as[key].cell);
            }
            output +="</p><hr>";
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
        $("#getAll").click(function (e) {
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
                    $("#result").html(" ");
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
        $("#getAllMale").click(function (e) {
            e.preventDefault();
            // let result=$("#result");

            $.ajax({

                url: 'https://randomuser.me/api/?page=1&results=3&gender=male',

                dataType: 'json',
                success: function(data) {

                    // display function above
                    $("#result").html(" ");
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
        $("#getAllFeMale").click(function (e) {
            e.preventDefault();
            // let result=$("#result");

            $.ajax({

                url: 'https://randomuser.me/api/?page=1&results=3&gender=female',

                dataType: 'json',
                success: function(data) {

                    // display function above
                    $("#result").html(" ");
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

                url: 'https://randomuser.me/api/?results=5000',
                dataType: 'json',
                success:function (data) {
                    let firstName="";


                    for (var key in data.results) {
                        if (data.results.hasOwnProperty(key)) {
//name
                            let nameData = data.results[key].name;
                            // output += nameData.title + '.' + ' ' + nameData.first + ' ' + nameData.last;
                           firstName= nameData.first;
                            // console.log(data.results[key]);


                            let gender=data.results[key].gender;
                            // console.log(gender);
                        }


                        }
                    var myArray=data.results;
                    var result = $.grep(myArray, function(e){ return e.name.first.toLowerCase() === pos; }); //Louane

                  if(result.length!==0){
                      if(result.length===1) {
                          $("#result").html(" ");
                          display(result);
                          $("#prev").prop('disabled', true);
                          $("#next").prop('disabled', true);
                      }
                  }
else{
                      $("#result").html(" ");

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


</script>


</html>
