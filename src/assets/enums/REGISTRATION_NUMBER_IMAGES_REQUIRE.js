// const REGISTRATION_NUMBER_IMAGES_REQUIRE = {
//     "one":"./CarImages/100001/abc.jpg",
//     "100001":require("./CarImages/100001/abc.jpg"),
//     "100002":"./CarImages/100001/abc.jpg"
//     }

const REGISTRATION_NUMBER_IMAGES_REQUIRE = {
    "one":"./CarImages/100001/abc.jpg",
    "100001": [
       require("./CarImages/100001/abc.jpg"),
        require("./CarImages/100001/b.jpg"),
        require("./CarImages/100001/c.jpg"),
        require("./CarImages/100001/d.jpg")
    ],
    "100002":"./CarImages/100002",
    "100003":"./CarImages/100002"
    }

export default REGISTRATION_NUMBER_IMAGES_REQUIRE;