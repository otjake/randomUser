<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bootstrap 101 Template</title>

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

<div id="result">

</div>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="jquery.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script></body>

<script type="text/javascript">
    $(document).ready(function () {
        var info=document.getElementById("result");

        $("#getAll").click(function (e) {
            e.preventDefault();
            $.ajax({

                url: 'https://randomuser.me/api/?results=3&inc=name,gender,nat,location,email,phone,cell,picture&noinfo',
                // url: 'https://randomuser.me/api/?results=5&gender=male',
                // url: 'https://randomuser.me/api/?page=3&results=3&seed=abc',
                // url: 'https://randomuser.me/api/?results=5&gender=female',
                // url: 'https://randomuser.me/api/?results=5000',
                // url: 'https://randomuser.me/api',
                dataType: 'json',
                success: function(data) {
                    console.log(data.results.length);
                    var output = " ";
// for (i=0; i<data.results.length;i++){
                    for (var key in data.results) {
                        output +="<p>";

                        if (data.results.hasOwnProperty(key)) {

//picture
                            let pictureData = data.results[key].picture;
                            output +="<img src='"+pictureData.large+"'>";

//name
                            let nameData = data.results[key].name;
                            output += nameData.title + '.' + ' ' + nameData.first + ' ' + nameData.last;
                            // console.log(nameData.title+'.'+ ' '+nameData.first+ ' ' + nameData.last);


//location
                            let locationData = data.results[key].location;
                            let streetData = locationData.street;
                            output += locationData.street.number + ' ' + locationData.street.name + ',' + ' ' + locationData.city + ',' + ' ' + locationData.state;
                            // console.log(locationData.street.number+ ' ' + locationData.street.name + ','+ ' ' + locationData.city+','+ ' ' +locationData.state);


//email
                            output += data.results[key].email;
                            // console.log(data.results[key].email);


//phone
                            output += data.results[key].phone;
                            // console.log(data.results[key].phone);

                            //cell
                            output += data.results[key].cell;

                            // console.log(data.results[key].cell);
                        }
                        output +="</p><hr>";
                    }

// }
                    console.log(output);
                    info.insertAdjacentHTML('beforeend',output);


                    }
            });
        })
        })
</script>

</html>