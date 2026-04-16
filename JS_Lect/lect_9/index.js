 function getLocation(){

      if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(

          async function(position){

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

         
            let response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );

            let data = await response.json();

            console.log(data);

  
            let city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county ||
              "Not Found";

      
            let area =
              data.address.suburb ||
              data.address.neighbourhood ||
              data.address.hamlet ||
              data.address.city_district ||
              "Not Found";

       
            document.getElementById("city").innerText =
            "City : " + city;

            document.getElementById("area").innerText =
            "Area : " + area;

            document.getElementById("state").innerText =
            "State : " + (data.address.state || "Not Found");

            document.getElementById("country").innerText =
            "Country : " + (data.address.country || "Not Found");

            document.getElementById("pincode").innerText =
            "Pincode : " + (data.address.postcode || "Not Found");

          },

          function(error){

            alert("Please Allow Location Access");

          }

        );

      }
      else{

        alert("Geolocation Not Supported");

      }

    }
