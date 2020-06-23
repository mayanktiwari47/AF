// const REGISTRATION_NUMBER_IMAGES_REQUIRE = {
//     "one":"./CarImages/100001/abc.jpg",
//     "100001":require("./CarImages/100001/abc.jpg"),
//     "100002":"./CarImages/100001/abc.jpg"
//     }

const REGISTRATION_NUMBER_IMAGES_REQUIRE = {
    "one":"./CarImages/100001/abc.jpg",
    "100001": [
       require("./CarImages/100001/1.jpg"),
        require("./CarImages/100001/2.jpg"),
        require("./CarImages/100001/3.jpg"),
        require("./CarImages/100001/4.jpg"),
        require("./CarImages/100001/5.jpg"),
        require("./CarImages/100001/6.jpg"),
      
    ],

    "up-123451": [
        require("./CarImages/up-123451/1.jpg"),
         require("./CarImages/up-123451/2.jpg"),
         require("./CarImages/up-123451/3.jpg"),
       
     ]

  

        
    // ,
    // "up-123451": [
    //     require("./carImages/up-123451/1.jpg"),
    //     require("./carImages/up-123451/2.jpg"),
    //     require("./carImages/up-123451/3.jpg"),
       
    // ],
  //  "100002":"./CarImages/100002",
   // "100003":"./CarImages/100002"
    }

export default REGISTRATION_NUMBER_IMAGES_REQUIRE;