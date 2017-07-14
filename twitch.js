$(document).ready(function() {
  $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/streams/freecodecamp",
      headers: {
        'Client-ID': 'fh27tbp29s8qwq54egfbxm7y6zsvyp'
      }, 
      success: function(data1) {
        if (data1.stream === null) {
          $('#fccStatus').html("freecodecamp is offline");
        } else {
          $('#fccStatus').html("freecodecamp is online");
        }
        
      }
    });
    $.ajax({
      type: "GET",          
      url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
      headers: {
        'Client-ID': 'fh27tbp29s8qwq54egfbxm7y6zsvyp'
      }, 
      
      success: function(data2) {
         
      
        console.log(data2);
        for (var i = 0; i < data2.follows.length; i++) {
              var logo = data2.follows[i].channel.logo;
              var status = data2.follows[i].channel.status;
              var displayName =  data2.follows[i].channel.display_name;

              if (logo === null) {
                logo = "https://static-cdn.jtvnw.net/jtv_user_pictures/frinlet-profile_image-0aebafebb4344cbe-300x300.png"; 
              }
              $("#followerInfo").prepend("<div class='row'>" + 
                                             "<div class='col-md-4'>"
                                                 + "<img src='"+ logo + "'>" +
                                             "</div>" + 
                                              "<div class='col-md-4'>" + displayName + "</div>" + 
                                               "<div class='col-md-4'>" + status  + "</div>" +


                                         "</div>"

                                        );
           }
      }
    
   
   }); 
  
    var deletedFollowers = ["brunofin", "comster404"];
    for (var i = 0 ; i < deletedFollowers.length; i++) {
               $.ajax({
                      type: "GET",          
                      url: "https://api.twitch.tv/kraken/streams/" + deletedFollowers[i],
                      headers: {
                        'Client-ID': 'fh27tbp29s8qwq54egfbxm7y6zsvyp'
                      }, 

                      error: function(data3) {

                        console.log(data3);

                        var logo = "https://static-cdn.jtvnw.net/jtv_user_pictures/frinlet-profile_image-0aebafebb4344cbe-300x300.png"; 
                        var displayName =  data3.statusText;
                        var status = data3.status;
                          
                        $("#followerInfo").prepend("<div class='row'>" + 
                                                      "<div class='col-md-4'>"
                                                                 + "<img src='"+ logo + "'>" +
                                                      "</div>" + 
                                                      "<div class='col-md-4'>" + displayName + "</div>" + 
                                                      "<div class='col-md-4'>" + status  + "</div>" +
                                                    "</div>"

                                                    );
                       }
           });
    }
});