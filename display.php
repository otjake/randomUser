
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://kit.fontawesome.com/760c3d66bf.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container-fluid">
    <div class="row">

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div class="Intro text-white pl-10">
                    <h2>Hello, <span>Emerald</span></h2>
                    <p>Welcome to your dashboard, kindly sort through the user base</p>

                    <div class="input-container mt-5">
                            <i class="fas fa-search icon  px-3 py-4" id="search"></i>
                            <input class="input-field rounded-right name" type="text" placeholder="Find a user" name="name">
                    </div>

                    <p class="sub my-5">Show Users</p>


                    <div class="query-Buttons d-flex justify-content-left">
                            <li class="all"><i class="fas fa-users mt-3"></i></li>
                            <li class="male"><i class="fas fa-male mt-3"></i></li>
                            <li class="female"><i class="fas fa-female mt-3"></i></li>
                    </div>

                    <div class="query-Buttons d-flex justify-content-left tags">
                            <li>All Users</li>
                            <li>Male Users</li>
                            <li>Female Users</li>
                    </div>
                </div>

        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">

            <div class="result pb-3">
            <div class="result-holder">
          <div class="header">
            <h2>All Users</h2>
              <p>filter by</p>

              <div class="header-sect d-flex justify-content-left">
              <li class="result-input-container2 mt-3">
                  <i class="fas fa-search result-icon2  py-2"></i>
                  <input class="result-input-field2 rounded-right" type="text" placeholder="Find in list" name="usrnm">
              </li>

                  <li class="result-input-country mt-3">
                      <input class="result-input-field3 rounded" type="text" placeholder="Country" name="usrnm" >
                      <i class="fas fa-caret-down result-icon3 py-2"></i>
                  </li>

                  <li>
                  <label class="switch mt-4">
                      <input type="checkbox" checked>
                      <span class="slider round"></span>
                  </label>
                  </li>

                  <li class="mt-4">
                     <span>Show Country </span>
                  </li>
              </div>
          </div>

<div id="widget" class="mt-3">




<!--              <div class="card mb-3">-->
<!--                  <div class="row no-gutters">-->
<!--                      <div class="col-xs-12 col-sm-12 col-md-4">-->
<!--                          <div class="rounder"></div>-->
<!---->
<!--                          <img src="img.jpg" class="card-img" alt="...">-->
<!---->
<!--                      </div>-->
<!--                      <div class="col-xs-12 col-sm-12 col-md-8">-->
<!--                          <div class="floater"></div>-->
<!--                          <div class="card-body">-->
<!--                              <h5 class="card-title name">Shalom Chioma</h5>-->
<!--                              <p class="card-text address">9278 new road, kilcoole, waterford</p>-->
<!--                              <p class="card-text">-->
<!--                              <div class="contact d-flex justify-content-left">-->
<!--                                  <li><i class="far fa-envelope"></i>brad.gibson@example.com</li>-->
<!--                                  <li><i class="fas fa-phone"></i>011-962-7516</li>-->
<!---->
<!--                                  <li>-->
<!--                                      <div class="oneer">-->
<!--                                      <i class="fas fa-arrow-right"></i>-->
<!--                                      </div>-->
<!--                                  </li>-->
<!--                          </div>-->
<!--                              </p>-->
<!--                          </div>-->
<!--                      </div>-->
<!--                  </div>-->
<!--              </div>-->






</div>

                <div class="widget1 mt-3">

                    <h3><i class="fas fa-arrow-left"></i>&nbsp;&nbsp;Return</h3>
                    <div class="card mb-3">
                        <div class="row no-gutters">
                            <div class="col-xs-12 col-sm-12 col-md-4">
                                <div class="rounder"></div>

                                <img src="img.jpg" class="card-img" alt="...">

                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-8">
                                <div class="floater"></div>
                                <div class="card-body">
                                    <h5 class="card-title name">Shalom Chioma</h5>
                                    <p class="card-text address">9278 new road, kilcoole, waterford</p>
                                    <p class="card-text">
                                    <div class="contact justify-content-left">
                                        <li class="mb-3"><div class="ELighter"><i class="far fa-envelope mt-3"></i>&nbsp;&nbsp;brad.gibson@example.com</div></li>
                                    <li class="mb-3"><div class="JLighter"><i class="fas fa-sign-in-alt mt-3"></i>&nbsp;&nbsp;JOINED: 2002-05-21</div></li>
                                        <li class="mb-3"><i class="fas fa-phone"></i>&nbsp;&nbsp;011-962-7516</li>
                                        <li class="mb-3"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;011-962-7516</li>

<!--                                        <li>-->
<!--                                            <div class="oneer">-->
<!--                                                <i class="fas fa-arrow-right"></i>-->
<!--                                            </div>-->
<!--                                        </li>-->
                                    </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


<div class="footer mt-4">
    <div class="footers d-flex justify-content-left">
        <li><button class="btn btn-success download"><i class="fas fa-cloud-download-alt"></i>  &nbsp;&nbsp;&nbsp; Download results</button></li>

        <div class="paginate d-flex justify-content-center">
        <li><button class="btn  next" id="next"><i class="fas fa-chevron-left text-white"></i></button></li>
        <li><button class="btn  prev" id="prev"><i class="fas fa-chevron-right text-white"></i></button></li>
        </div>
    </div>
</div>
        </div>
    </div>
    </div>
</div>
</div>
<script src="jquery.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script></body>
<script src="app.js"></script>

</body>
</html>
